import { ResumeData } from "@shared/schema";

interface MinimalTemplateProps {
  data: Partial<ResumeData>;
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalDetails, profileSummary, education, experience, projects, skills, certifications, languages, hobbies, references } = data;

  return (
    <div className="bg-white p-8 text-slate-900 max-w-none resume-template" id="resume-preview">
      {/* Minimal Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-slate-900 mb-2">
          {personalDetails?.firstName || "Your"} {personalDetails?.lastName || "Name"}
        </h1>
        <p className="text-lg text-slate-600 mb-4">
          {personalDetails?.title || "Your Professional Title"}
        </p>
        <div className="text-sm text-slate-600 space-y-1">
          {personalDetails?.email && <div>{personalDetails.email}</div>}
          {personalDetails?.phone && <div>{personalDetails.phone}</div>}
          {personalDetails?.location && <div>{personalDetails.location}</div>}
          {personalDetails?.linkedin && (
            <div>
              <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          {personalDetails?.github && (
            <div>
              <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                GitHub
              </a>
            </div>
          )}
          {personalDetails?.portfolio && (
            <div>
              <a href={personalDetails.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Profile Summary */}
      {profileSummary?.summary && (
        <div className="mb-8">
          <p className="text-slate-700 leading-relaxed text-lg">{profileSummary.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-medium text-slate-900">{exp.position}</h3>
                  <span className="text-sm text-slate-500">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-slate-600 mb-3">{exp.company}</p>
                {exp.description && <p className="text-slate-700 mb-3">{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="text-slate-700 space-y-1 ml-4">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="list-disc">{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-slate-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <span className="text-sm text-slate-500">
                    {edu.startDate} – {edu.endDate || "Present"}
                  </span>
                </div>
                <p className="text-slate-600">{edu.institution}</p>
                {edu.gpa && <p className="text-slate-600 text-sm">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-medium text-slate-900 mb-1">{project.name}</h3>
                <p className="text-slate-700 mb-2">{project.description}</p>
                <p className="text-sm text-slate-600">
                  {project.technologies.join(" • ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && (skills.technical.length > 0 || skills.languages.length > 0 || skills.frameworks.length > 0 || skills.tools.length > 0) && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...skills.technical, ...skills.languages, ...skills.frameworks, ...skills.tools]
              .filter(Boolean)
              .map((skill, index) => (
                <div key={index} className="text-slate-700 py-1">{skill}</div>
              ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <span className="text-slate-900">{cert.name} — {cert.issuer}</span>
                <span className="text-slate-500 text-sm">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Languages
          </h2>
          <div className="flex flex-wrap gap-4">
            {languages.map((lang) => (
              <span key={lang.id} className="text-slate-700">
                {lang.language} ({lang.proficiency})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-slate-900 mb-4 pb-2 border-b border-slate-200">
            References
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {references.map((ref) => (
              <div key={ref.id} className="text-sm">
                <h3 className="font-medium text-slate-900">{ref.name}</h3>
                <p className="text-slate-600">{ref.title}, {ref.company}</p>
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
