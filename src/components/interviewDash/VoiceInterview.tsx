"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Mic,
  User,
  X,
  Loader2,
  BrainCircuit,
  RefreshCw,
  Keyboard,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateFeedback } from "@/actions/Interview";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Question {
  id: string;
  question: string;
  order: number;
  interviewId: string;
}

interface VoiceInterviewProps {
  questions: Question[];
  interviewId: string;
  role: string;
  skills: string[];
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  0: SpeechRecognitionAlternativeLike;
  isFinal: boolean;
}

interface SpeechRecognitionResultListLike {
  length: number;
  [index: number]: SpeechRecognitionResultLike;
}

interface SpeechRecognitionEventLike {
  results: SpeechRecognitionResultListLike;
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
}

export default function VoiceInterview({
  questions,
  interviewId,
  role,
  skills,
}: VoiceInterviewProps) {
  const router = useRouter();
  const { user } = useUser();

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const finishedRef = useRef(false);

  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );

  const [listening, setListening] = useState(false);
  const listeningRef = useRef(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");
  const answersRef = useRef<{ question: string; answer: string }[]>([]);
  const currentQuestionRef = useRef<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const silenceTimer = useRef<NodeJS.Timeout | null>(null);
  const speakTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const processingRef = useRef(false);
  const startedRef = useRef(false);
  const isMountedRef = useRef(true);
  const recognitionRetryCountRef = useRef(0);
  const manualModeRef = useRef(false);

  const clearSilenceTimer = () => {
    if (silenceTimer.current) {
      clearTimeout(silenceTimer.current);
      silenceTimer.current = null;
    }
  };

  function askQuestion(index: number) {
    clearSilenceTimer();

    const question = questions[index].question;
    currentQuestionRef.current = question;

    setTimeout(() => {
      if (!isMountedRef.current) return;
      aiSpeak(question);
    }, 500);
  }

  async function startListening() {
    if (manualModeRef.current) {
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      console.error("Mic permission denied");
      return;
    }

    if (!recognitionRef.current) return;

    setListening(true);
    listeningRef.current = true;

    try {
      recognitionRef.current.start();
    } catch { }

    startSilenceTimer();
  }

  const startSilenceTimer = () => {
    clearSilenceTimer();

    silenceTimer.current = setTimeout(() => {
      if (!isMountedRef.current) return;
      if (aiSpeaking) return;

      aiSpeak("I didn't hear your answer. Please try again.");

      setListening(false);
      listeningRef.current = false;

      try {
        recognitionRef.current?.stop();
      } catch { }
    }, 20000);
  };

  function speak(text: string) {
    if (!isMountedRef.current) return;
    if (!("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;

    synth.cancel();

    clearSilenceTimer();

    setListening(false);
    listeningRef.current = false;
    try {
      recognitionRef.current?.stop();
    } catch { }

    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
    }

    const utterance = new SpeechSynthesisUtterance(text);

    setAiSpeaking(true);

    utterance.onend = () => {
      setAiSpeaking(false);

      if (finishedRef.current) return;
      if (manualModeRef.current) return;

      if (startedRef.current && !processingRef.current) {
        startListening();
      }
    };

    utterance.onerror = () => {
      setAiSpeaking(false);
    };

    speakTimeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;
      synth.speak(utterance);
    }, 50);
  }

  function aiSpeak(text: string) {
    if (!isMountedRef.current) return;
    setMessages((prev) => [...prev, { role: "ai", content: text }]);
    speak(text);
  }

  function enableManualMode() {
    manualModeRef.current = true;
    setManualMode(true);
    clearSilenceTimer();
    setListening(false);
    listeningRef.current = false;
    try {
      recognitionRef.current?.stop();
    } catch { }
  }

  function disableManualMode() {
    manualModeRef.current = false;
    setManualMode(false);
    setTypedAnswer("");

    if (!aiSpeaking && !thinking && !processingRef.current) {
      startListening();
    }
  }

  function queueRecognitionRetry(delayMs: number = 1200) {
    if (
      finishedRef.current ||
      processingRef.current ||
      aiSpeaking ||
      !startedRef.current
    ) {
      return;
    }

    const maxRetries = 3;
    if (recognitionRetryCountRef.current >= maxRetries) {
      enableManualMode();
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Mic connection is unstable. Click Retry Mic after checking your internet and microphone permissions.",
        },
      ]);
      return;
    }

    recognitionRetryCountRef.current += 1;
    setTimeout(() => {
      if (!isMountedRef.current) return;
      startListening();
    }, delayMs);
  }

  async function handleAnswer(answer: string) {
    clearSilenceTimer();

    try {
      recognitionRef.current?.stop();
    } catch { }

    setListening(false);
    listeningRef.current = false;
    setThinking(true);
    processingRef.current = true;
    const question = currentQuestionRef.current;

    if (question) {
      answersRef.current.push({ question, answer });
    }

    await new Promise((res) => setTimeout(res, 1500));

    if (!isMountedRef.current) return;

    const responses = [
      "Nice explanation. Let's move to the next question.",
      "Great, thank you for that. Moving on.",
      "Good answer. Let's continue.",
      "Understood, thanks for sharing that. Next question.",
      "Appreciate the response. Let's keep going.",
      "Got it, thanks. Here comes the next one.",
      "Thank you. Let's proceed to the next question.",
      "Perfect, noted. Moving to the next topic.",
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];

    setThinking(false);

    aiSpeak(response);

    setTimeout(() => {
      if (!isMountedRef.current) return;
      processingRef.current = false;
      nextQuestion();
    }, 3500);
  }

  function submitTypedAnswer() {
    const answer = typedAnswer.trim();
    if (!answer || processingRef.current || aiSpeaking || thinking) {
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: answer }]);
    setTypedAnswer("");
    handleAnswer(answer);
  }

  function nextQuestion() {
    const next = currentIndexRef.current + 1;

    if (next >= questions.length) {
      finishInterview();
      return;
    }

    currentIndexRef.current = next;
    setCurrentIndex(next);
    askQuestion(next);
  }

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const greeting = `Hello ${user?.firstName || "there"}, I am John, your AI interviewer. Let's start your interview.`;

    aiSpeak(greeting);

    setTimeout(() => {
      if (!isMountedRef.current) return;
      askQuestion(0);
    }, 6500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const speechWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };

    const SpeechRecognition =
      speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      router.push("/dashboard/interviews");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      recognitionRetryCountRef.current = 0;

      if (processingRef.current) return;

      clearSilenceTimer();
      startSilenceTimer();

      const result = event.results[event.results.length - 1];

      const transcript = result[0].transcript;

      if (!result.isFinal) {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "user", content: transcript };
          return copy;
        });

        return;
      }

      processingRef.current = true;

      setMessages((prev) => [...prev, { role: "user", content: transcript }]);

      handleAnswer(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
      setListening(false);
      listeningRef.current = false;

      if (event.error === "aborted") {
        return;
      }

      if (event.error === "no-speech") {
        queueRecognitionRetry(800);
        return;
      }

      if (event.error === "network") {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content:
              "Speech recognition network issue detected. Retrying microphone...",
          },
        ]);
        queueRecognitionRetry(1500);
        return;
      }

      console.error("Speech recognition error:", event.error);
      queueRecognitionRetry(1200);
    };

    recognition.onend = () => {
      if (listeningRef.current && !processingRef.current) {
        try {
          recognition.start();
        } catch { }
      }
    };

    recognitionRef.current = recognition;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finishInterview = async () => {
    if (finishedRef.current) return;

    finishedRef.current = true;
    processingRef.current = true;

    const closing = `Great job ${user?.firstName}, you have completed the interview.`;

    aiSpeak(closing);

    const waitForSpeech = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(waitForSpeech);

        setShowFeedbackDialog(true);
        generateReport();
      }
    }, 200);
  };

  const generateReport = async () => {
    try {
      recognitionRef.current?.stop();
    } catch { }

    const attemptId = await generateFeedback(
      answersRef.current,
      interviewId,
      role,
      skills,
    );

    if (attemptId) {
      router.push(
        `/dashboard/interview/${interviewId}/attempts/feedback/${attemptId}`,
      );
    } else {
      router.push(`/dashboard/interviews`);
    }
  };

  const exitInterview = () => {
    window.speechSynthesis.cancel();

    clearSilenceTimer();

    try {
      recognitionRef.current?.stop();
    } catch { }

    router.push("/dashboard/interviews");
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      window.speechSynthesis.cancel();
      clearSilenceTimer();

      try {
        recognitionRef.current?.stop();
      } catch { }
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        window.speechSynthesis.cancel();

        try {
          recognitionRef.current?.stop();
        } catch { }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const progress = Math.min(((currentIndex + 1) / questions.length) * 100, 100);

  const lastMessage = messages[messages.length - 1];

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center px-6 pt-16 pb-12">
      <div className="w-full max-w-4xl mb-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-[#E0D4FF]" />
            <span className="font-bold text-lg">NexterView</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                if (manualMode) {
                  disableManualMode();
                } else {
                  enableManualMode();
                }
              }}
            >
              <Keyboard className="w-4 h-4 mr-2" />
              {manualMode ? "Use Voice Mode" : "Use Text Mode"}
            </Button>
            <Button
              variant="outline"
              onClick={() => startListening()}
              disabled={manualMode}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Mic
            </Button>
            <Button variant="destructive" onClick={exitInterview}>
              <X className="w-4 h-4 mr-2" />
              Exit
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-end mt-5">
          <div className="flex flex-col gap-5">
            <h1 className="text-lg font-bold text-gray-300">{role}</h1>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-medium text-gray-300">
                Interview Generation
              </h3>
              <h3 className="text-base font-medium text-gray-300">
                {skills.join(", ")}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Question {currentIndex + 1} / {questions.length}
              </p>
            </div>
          </div>

          <div className="w-40 bg-[#1F1F2A] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#E0D4FF] h-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-5 mb-8">
        <div className="flex-1 bg-[#111118] border border-[#1F1F2A] rounded-2xl p-8 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center mb-6">
            {aiSpeaking && (
              <div className="absolute w-28 h-28 bg-[#E0D4FF]/20 rounded-full animate-ping"></div>
            )}

            <div className="w-20 h-20 bg-[#E0D4FF] rounded-full flex items-center justify-center">
              <Mic className="text-[#1E114D] w-10 h-10" />
            </div>
          </div>

          <p className="text-lg font-medium">AI Interviewer</p>

          <div className="h-5 mt-2 text-xs text-gray-400">
            {thinking && "Thinking..."}
            {aiSpeaking && "Speaking..."}
            {listening && "Listening..."}
          </div>
        </div>
        <div className="flex-1 bg-[#111118] border border-[#1F1F2A] rounded-2xl p-8 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-[#1F1F2A] rounded-full flex items-center justify-center">
            <User className="text-gray-400 w-10 h-10" />
          </div>

          <p className="text-lg font-medium mt-4">You</p>
        </div>
      </div>
      <div className="w-full max-w-4xl bg-[#111118] border border-[#1F1F2A] rounded-full px-6 py-3 flex justify-center mb-6">
        {lastMessage && (
          <div className="text-sm">
            <strong>{lastMessage.role === "ai" ? "AI:" : "You:"}</strong>{" "}
            {lastMessage.content}
          </div>
        )}
      </div>

      {manualMode && (
        <div className="w-full max-w-4xl bg-[#111118] border border-[#1F1F2A] rounded-2xl p-4 mb-6">
          <p className="text-sm text-gray-300 mb-3">
            Voice mode is unstable. Continue by typing your answer.
          </p>
          <div className="flex gap-2">
            <Input
              value={typedAnswer}
              onChange={(event) => setTypedAnswer(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  submitTypedAnswer();
                }
              }}
              placeholder="Type your answer here..."
              className="bg-[#0B0B0F] border-[#1F1F2A] text-white"
              disabled={aiSpeaking || thinking}
            />
            <Button
              onClick={submitTypedAnswer}
              disabled={!typedAnswer.trim() || aiSpeaking || thinking}
            >
              Submit
            </Button>
          </div>
        </div>
      )}

      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="sm:max-w-md bg-[#111118] border border-[#1F1F2A] text-white">
          <DialogHeader>
            <DialogTitle className="text-xl">Interview Completed</DialogTitle>
            <DialogDescription className="text-gray-400">
              Generating your personalized feedback report. This might take a
              few moments...
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <Loader2 className="w-12 h-12 text-[#E0D4FF] animate-spin" />
            <p className="text-sm text-gray-400 font-medium animate-pulse">
              Analyzing responses and calculating scores...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
