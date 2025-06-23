import { ResumeData } from "@shared/schema";

interface ModernTemplateProps {
  data: Partial<ResumeData>;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalDetails, education, projects, courseworkSkills, technicalSkills, internships, extracurricular, certifications } = data;

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto text-black resume-template" id="resume-preview">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">
          {personalDetails?.firstName || "FIRST"} {personalDetails?.lastName || "LAST"}
        </h1>
        <div className="text-sm space-y-1">
          {personalDetails?.email && <div>{personalDetails.email}</div>}
          {personalDetails?.phone && <div>{personalDetails.phone}</div>}
          {personalDetails?.location && <div>{personalDetails.location}</div>}
          {personalDetails?.linkedin && <div>{personalDetails.linkedin}</div>}
          {personalDetails?.website && <div>{personalDetails.website}</div>}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
          EDUCATION
        </h2>
        {education && education.length > 0 ? (
          education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{edu.collegeName}</div>
                  <div className="italic">{edu.degreeName}</div>
                  {edu.cgpa && <div>CGPA: {edu.cgpa}</div>}
                </div>
                <div className="text-right text-sm">
                  <div>{edu.startDate} - {edu.endDate || "Present"}</div>
                  {edu.city && edu.country && <div className="italic">{edu.city}, {edu.country}</div>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">College Name</div>
                <div className="italic">Degree Name • CGPA: xx</div>
              </div>
              <div className="text-right text-sm">
                <div>MM YYYY - MM YYYY</div>
                <div className="italic">city, country</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Coursework/Skills */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
          COURSEWORK / SKILLS
        </h2>
        {courseworkSkills ? (
          <div className="grid grid-cols-3 gap-x-8 gap-y-1 text-sm">
            {Object.entries(courseworkSkills)
              .filter(([_, selected]) => selected)
              .map(([course, _]) => (
                <div key={course}>
                  {course.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-x-8 gap-y-1 text-sm">
            <div>Data Structures &</div>
            <div>Network Security</div>
            <div>Artificial Intelligence</div>
            <div>Algorithms</div>
            <div>Database Management</div>
            <div>OOPS Concepts</div>
            <div>Operating Systems</div>
            <div>System OSMD</div>
            <div>Web Development</div>
            <div></div>
            <div></div>
            <div>Android Development</div>
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
          PROJECTS
        </h2>
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div className="font-semibold">
                  Project Name <span className="text-blue-600 underline">🔗</span> | Technology Stack Used
                </div>
                <div className="text-sm">MM YYYY</div>
              </div>
              <div className="text-sm mb-2">
                • {project.description}
              </div>
              {project.keyPoints && project.keyPoints.length > 0 && (
                <div className="text-sm space-y-1">
                  {project.keyPoints.map((point, index) => (
                    <div key={index}>• {point}</div>
                  ))}
                </div>
              )}
              {project.downloadLink && (
                <div className="text-sm text-blue-600 underline">Download</div>
              )}
            </div>
          ))
        ) : (
          <div className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <div className="font-semibold">
                Project Name <span className="text-blue-600 underline">🔗</span> | Technology Stack Used
              </div>
              <div className="text-sm">MM YYYY</div>
            </div>
            <div className="text-sm mb-2">
              • About project highlight key points.
            </div>
            <div className="text-sm text-blue-600 underline">Download</div>
          </div>
        )}
      </div>

      {/* Internship */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
          INTERNSHIP
        </h2>
        {internships && internships.length > 0 ? (
          internships.map((internship) => (
            <div key={internship.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div className="font-semibold">
                  {internship.companyName} <span className="text-blue-600 underline">🔗</span>
                </div>
                <div className="text-sm">{internship.startDate} - {internship.endDate || "Present"}</div>
              </div>
              <div className="italic mb-1">{internship.roleName}</div>
              {internship.city && internship.country && (
                <div className="text-sm italic mb-2">{internship.city}, {internship.country}</div>
              )}
              <div className="text-sm">
                • {internship.description}
              </div>
            </div>
          ))
        ) : (
          <div className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <div className="font-semibold">
                Company Name <span className="text-blue-600 underline">🔗</span>
              </div>
              <div className="text-sm">MM YYYY - MM YYYY</div>
            </div>
            <div className="italic mb-1">Role Name</div>
            <div className="text-sm italic mb-2">city, country</div>
            <div className="text-sm">
              • About the role and responsibilities carried out.
            </div>
          </div>
        )}
      </div>

      {/* Technical Skills */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
          TECHNICAL SKILLS
        </h2>
        {technicalSkills ? (
          <div className="text-sm space-y-1">
            {technicalSkills.languages && technicalSkills.languages.length > 0 && (
              <div>
                <span className="font-semibold">Languages: </span>
                {technicalSkills.languages.filter(Boolean).join(", ")}
              </div>
            )}
            {technicalSkills.developerTools && technicalSkills.developerTools.length > 0 && (
              <div>
                <span className="font-semibold">Developer Tools: </span>
                {technicalSkills.developerTools.filter(Boolean).join(", ")}
              </div>
            )}
            {technicalSkills.technologiesFrameworks && technicalSkills.technologiesFrameworks.length > 0 && (
              <div>
                <span className="font-semibold">Technologies/Frameworks: </span>
                {technicalSkills.technologiesFrameworks.filter(Boolean).join(", ")}
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm space-y-1">
            <div>
              <span className="font-semibold">Languages: </span>
              Python, Java, C, C++, Dart, JavaScript, SQL, NoSQL, R, XML, Go
            </div>
            <div>
              <span className="font-semibold">Developer Tools: </span>
              VS Code, Android Studio, DataGrip, Discord, IntelliJ Idea Ultimate
            </div>
            <div>
              <span className="font-semibold">Technologies/Frameworks: </span>
              Linux, GitHub, ReactJS, Redux, NextJS, NodeJS, ExpressJS, Git, MongoDB, Flutter
            </div>
          </div>
        )}
      </div>

      {/* Extracurricular */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
          EXTRACURRICULAR
        </h2>
        {extracurricular && extracurricular.length > 0 ? (
          extracurricular.map((activity) => (
            <div key={activity.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div className="font-semibold">
                  Organization Name <span className="text-blue-600 underline">🔗</span>
                </div>
                <div className="text-sm">{activity.startDate} - {activity.endDate || "Present"}</div>
              </div>
              <div className="italic mb-1">{activity.roleName}</div>
              <div className="text-sm">
                • {activity.description}
              </div>
            </div>
          ))
        ) : (
          <div className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <div className="font-semibold">
                Organization Name <span className="text-blue-600 underline">🔗</span>
              </div>
              <div className="text-sm">MM YYYY - MM YYYY</div>
            </div>
            <div className="italic mb-1">Position</div>
            <div className="text-sm">
              • About the role and responsibilities carried out.
            </div>
            <div className="text-sm">
              • Participation Certificate: <span className="text-blue-600 underline">🔗</span>
            </div>
          </div>
        )}
      </div>

      {/* Certifications */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
          CERTIFICATIONS
        </h2>
        {certifications && certifications.length > 0 ? (
          <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-sm">
            {certifications.map((cert) => (
              <div key={cert.id} className="space-y-1">
                <div className="font-semibold">• {cert.name}</div>
                <div>{cert.issuer}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-sm">
            <div className="space-y-1">
              <div className="font-semibold">• Java</div>
              <div>• Python for Data Science - XIE</div>
              <div>• 5 Stars in C++ & SQL <span className="text-blue-600 underline">🔗</span></div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold">• Java</div>
              <div>• SQL</div>
              <div>• MongoDB Basics</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold">• Command Line in Linux - Coursera</div>
              <div>• Microsoft AI Classroom - Microsoft</div>
              <div>• NodeJS 16 Express & MongoDB - Udemy</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}