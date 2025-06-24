import { ResumeData } from "@shared/schema";

interface ClassicTemplateProps {
  data: Partial<ResumeData>;
}

export default function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalDetails, profileSummary, education, experience, projects, skills, certifications, languages, hobbies, references } = data;

  return (
    <div className="bg-white p-8 text-slate-900 font-serif resume-template" id="resume-preview">
      {/* Header */}
      <div className="text-center border-b-2 border-slate-700 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {personalDetails?.firstName || "Your"} {personalDetails?.lastName || "Name"}
        </h1>
        <p className="text-lg text-slate-700 mb-3">
          {personalDetails?.title || "Your Professional Title"}
        </p>
        <div className="flex justify-center space-x-6 text-sm text-slate-600">
          {personalDetails?.email && <span>{personalDetails.email}</span>}
          {personalDetails?.phone && <span>{personalDetails.phone}</span>}
          {personalDetails?.location && <span>{personalDetails.location}</span>}
        </div>
        <div className="flex justify-center space-x-4 text-sm text-slate-600 mt-2">
          {personalDetails?.linkedin && (
            <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          )}
          {personalDetails?.github && (
            <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
          )}
          {personalDetails?.portfolio && (
            <a href={personalDetails.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Profile Summary */}
      {profileSummary?.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-400 pb-1 mb-3">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-slate-700 leading-relaxed">{profileSummary.summary}</p>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-400 pb-1 mb-3">
            EDUCATION
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-semibold text-slate-900">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <span className="text-slate-600">{edu.startDate} - {edu.endDate || "Present"}</span>
              </div>
              <p className="text-slate-700">{edu.institution}</p>
              {edu.gpa && <p className="text-slate-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-400 pb-1 mb-3">
            PROFESSIONAL EXPERIENCE
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold text-slate-900">{exp.position}</h3>
                <span className="text-slate-600">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <p className="text-slate-700 italic mb-2">{exp.company}</p>
              {exp.description && <p className="text-slate-700 mb-2">{exp.description}</p>}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="text-slate-700 ml-4">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index} className="list-disc">{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && (skills.technical.length > 0 || skills.languages.length > 0 || skills.frameworks.length > 0 || skills.tools.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-400 pb-1 mb-3">
            TECHNICAL SKILLS
          </h2>
          <div className="text-slate-700 leading-relaxed">
            {[...skills.technical, ...skills.languages, ...skills.frameworks, ...skills.tools]
              .filter(Boolean)
              .join(" • ")}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-400 pb-1 mb-3">
            PROJECTS
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-semibold text-slate-900">{project.name}</h3>
              <p className="text-slate-700 mb-1">{project.description}</p>
              <p className="text-slate-600 text-sm">
                Technologies: {project.technologies.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-400 pb-1 mb-3">
            CERTIFICATIONS
          </h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-900">{cert.name}</span>
                <span className="text-slate-600">{cert.date}</span>
              </div>
              <p className="text-slate-700">{cert.issuer}</p>
            </div>
          ))}
        </div>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-400 pb-1 mb-3">
            REFERENCES
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {references.map((ref) => (
              <div key={ref.id} className="text-sm">
                <h3 className="font-semibold text-slate-900">{ref.name}</h3>
                <p className="text-slate-700">{ref.title}</p>
                <p className="text-slate-700">{ref.company}</p>
                <p className="text-slate-600">{ref.email}</p>
                <p className="text-slate-600">{ref.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
