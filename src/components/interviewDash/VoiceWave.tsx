export default function VoiceWave({ active }: { active: boolean }) {
  return (
    <div className="flex gap-1 justify-center items-end h-12">
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full bg-white ${
            active ? "animate-wave" : ""
          }`}
          style={{
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}
