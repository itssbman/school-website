import { demoTeacherGrades, demoTeacher } from "@/lib/demo-data";

function scoreColor(score: number) {
  if (score >= 70) return "text-[#3D5A45] font-semibold";
  if (score >= 50) return "text-[#D97706] font-semibold";
  return "text-[#C2593F] font-semibold";
}

export default function TeacherGradesPage() {
  const classes = demoTeacher.classes;

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Grade Entry</h2>
        <p className="text-[14px] text-[#6B7280]">View and manage student scores</p>
      </div>

      {classes.map((className) => {
        const sheet = demoTeacherGrades[className as keyof typeof demoTeacherGrades];
        if (!sheet) return null;

        return (
          <div key={className} className="bg-white border border-[#E5E3DF]">
            <div className="px-5 py-4 border-b border-[#E5E3DF] flex items-center justify-between">
              <div>
                <p className="font-heading text-[15px] font-bold text-[#1A2B49]">Class {className}</p>
                <p className="text-[12px] text-[#6B7280]">{sheet.students.length} students · {sheet.columns.length} assessments</p>
              </div>
              <button
                disabled
                title="Available in full version"
                className="px-4 py-2 text-[12px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
              >
                Save Grades
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student</th>
                    {sheet.columns.map((col) => (
                      <th key={col} className="text-center">{col}</th>
                    ))}
                    <th className="text-center">Average</th>
                  </tr>
                </thead>
                <tbody>
                  {sheet.students.map((s, i) => {
                    const avg = Math.round(s.scores.reduce((a, b) => a + b, 0) / s.scores.length);
                    return (
                      <tr key={s.name}>
                        <td className="text-[#6B7280] font-mono text-[13px]">{String(i + 1).padStart(2, "0")}</td>
                        <td className="font-medium text-[#1A2B49]">{s.name}</td>
                        {s.scores.map((score, j) => (
                          <td key={j} className={`text-center font-mono text-[13px] ${scoreColor(score)}`}>
                            {score}
                          </td>
                        ))}
                        <td className={`text-center font-mono text-[13px] ${scoreColor(avg)}`}>{avg}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
