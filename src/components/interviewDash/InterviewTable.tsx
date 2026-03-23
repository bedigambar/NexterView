import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const mockInterviews = [
  { id: 1, role: "Frontend Dev", topic: "React", difficulty: "Medium", score: 82, date: "Feb 10" },
  { id: 2, role: "Backend Dev", topic: "Node.js", difficulty: "Hard", score: 75, date: "Feb 05" },
  { id: 3, role: "Fullstack Dev", topic: "System Design", difficulty: "Hard", score: 58, date: "Jan 28" },
  { id: 4, role: "Frontend Dev", topic: "Javascript", difficulty: "Hard", score: 91, date: "Jan 15" },
];

export function InterviewTable() {
  return (
    <div className="rounded-xl border border-[#1F1F2A] bg-[#111118] overflow-hidden shadow-none">
      <div className="p-6 border-b border-[#1F1F2A] flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-[#F9FAFB]">Recent Interviews</h3>
        <Button variant="ghost" className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937] h-auto py-1 px-3">
          View All
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#0B0B0F]">
            <TableRow className="border-[#1F1F2A] hover:bg-transparent">
              <TableHead className="text-[#9CA3AF] font-medium h-10 w-[200px]">Role</TableHead>
              <TableHead className="text-[#9CA3AF] font-medium h-10">Topic</TableHead>
              <TableHead className="text-[#9CA3AF] font-medium h-10">Difficulty</TableHead>
              <TableHead className="text-[#9CA3AF] font-medium h-10">Date</TableHead>
              <TableHead className="text-[#9CA3AF] font-medium h-10 text-right">Score</TableHead>
              <TableHead className="text-[#9CA3AF] font-medium h-10 w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInterviews.map((interview) => (
              <TableRow key={interview.id} className="border-[#1F1F2A] hover:bg-[#18181F] transition-colors">
                <TableCell className="font-medium text-[#E5E7EB]">
                  {interview.role}
                </TableCell>
                <TableCell className="text-[#9CA3AF]">{interview.topic}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                    interview.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                    interview.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {interview.difficulty}
                  </span>
                </TableCell>
                <TableCell className="text-[#9CA3AF]">{interview.date}</TableCell>
                <TableCell className="text-right">
                  <div className={`inline-flex font-bold ${
                    interview.score >= 80 ? 'text-emerald-400' :
                    interview.score >= 60 ? 'text-amber-400' :
                    'text-rose-400'
                  }`}>
                    {interview.score}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937] h-8 text-xs px-3">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
