import React, { useState } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const AVAILABLE_COURSEWORK = [
  "Data Structures and Algorithms",
  "Object-Oriented Programming",
  "Database Management Systems",
  "Computer Networks",
  "Operating Systems",
  "Software Engineering",
  "Machine Learning",
  "Artificial Intelligence",
  "Web Development",
  "Mobile App Development",
  "Computer Graphics",
  "Cybersecurity",
  "Cloud Computing",
  "Discrete Mathematics",
  "Statistics and Probability",
  "Linear Algebra",
  "Calculus",
  "Computer Architecture",
  "Compiler Design",
  "Human-Computer Interaction"
];

export default function CourseworkSkillsForm() {
  const { state, updateData } = useResume();
  const existingCourses = state.resumeData.courseworkSkills?.selectedCourses || [];
  const [selectedCoursework, setSelectedCoursework] = useState<string[]>(existingCourses);

  const handleCourseworkChange = (course: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedCoursework, course]
      : selectedCoursework.filter(c => c !== course);
    
    setSelectedCoursework(updated);
    updateData("courseworkSkills", { selectedCourses: updated });
  };

  // Initialize the form with existing data
  React.useEffect(() => {
    if (existingCourses.length > 0 && selectedCoursework.length === 0) {
      setSelectedCoursework(existingCourses);
    }
  }, [existingCourses, selectedCoursework.length]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Relevant Coursework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AVAILABLE_COURSEWORK.map((course) => (
              <div key={course} className="flex items-center space-x-2">
                <Checkbox
                  id={course}
                  checked={selectedCoursework.includes(course)}
                  onCheckedChange={(checked) => 
                    handleCourseworkChange(course, checked as boolean)
                  }
                />
                <label
                  htmlFor={course}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {course}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        Selected: {selectedCoursework.length} courses
      </div>
    </div>
  );
}