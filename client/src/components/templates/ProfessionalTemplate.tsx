import { ResumeData } from "@shared/schema";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface ProfessionalTemplateProps {
  data: Partial<ResumeData>;
}

export default function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const { personalDetails, profileSummary, education, experience, projects, skills, certifications, languages, hobbies, references } = data;

  return (
    <div className="bg-white text-slate-900 resume-template" id="resume-preview">
      {/* Header with sidebar layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-slate-800 text-white p-6">
          {/* Profile Photo */}
          <div className="w-32 h-32 bg-slate-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            {personalDetails?.photo ? (
              <img 
                src={personalDetails.photo} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <span className="text-4xl">👤</span>
            )}
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3 text-slate-300">CONTACT</h3>
            <div className="space-y-3 text-sm">
              {personalDetails?.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="break-all">{personalDetails.email}</span>
                </div>
              )}
              {personalDetails?.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{personalDetails.phone}</span>
                </div>
              )}
              {personalDetails?.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{personalDetails.location}</span>
                </div>
              )}
              {personalDetails?.linkedin && (
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4" />
                  <span className="break-all text-xs">{personalDetails.linkedin.replace("https://", "")}</span>
                </div>
              )}
              {personalDetails?.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span className="break-all text-xs">{personalDetails.website.replace("https://", "")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills && (skills.technical.length > 0 || skills.languages.length > 0 || skills.frameworks.length > 0 || skills.tools.length > 0) && (
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3 text-slate-300">SKILLS</h3>
              <div className="space-y-2">
                {[...skills.technical, ...skills.languages, ...skills.frameworks, ...skills.tools]
                  .filter(Boolean)
                  .map((skill, index) => (
                    <div key={index} className="text-sm bg-slate-700 px-2 py-1 rounded text-white">{skill}</div>
                  ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3 text-slate-300">LANGUAGES</h3>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.id} className="text-sm bg-slate-700 p-2 rounded">
                    <div className="font-medium text-white">{lang.language}</div>
                    <div className="text-slate-300 text-xs">{lang.proficiency}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3 text-slate-300">CERTIFICATIONS</h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-sm bg-slate-700 p-2 rounded">
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-slate-400 text-xs">{cert.issuer}</div>
                    <div className="text-slate-400 text-xs">{cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Name and Title */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {personalDetails?.firstName || "Your"} {personalDetails?.lastName || "Name"}
            </h1>
            <p className="text-xl text-slate-600">
              {personalDetails?.title || "Your Professional Title"}
            </p>
          </div>

          {/* Profile Summary */}
          {profileSummary?.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3 pb-1 border-b-2 border-slate-800">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-slate-700 leading-relaxed">{profileSummary.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3 pb-1 border-b-2 border-slate-800">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-semibold text-slate-900">{exp.position}</h3>
                      <span className="text-sm text-slate-600">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium mb-2">{exp.company}</p>
                    {exp.description && <p className="text-slate-700 mb-2">{exp.description}</p>}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="text-slate-700 ml-4 space-y-1">
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
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3 pb-1 border-b-2 border-slate-800">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-900">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <span className="text-sm text-slate-600">
                        {edu.startDate} - {edu.endDate || "Present"}
                      </span>
                    </div>
                    <p className="text-slate-700">{edu.institution}</p>
                    {edu.gpa && <p className="text-slate-600">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3 pb-1 border-b-2 border-slate-800">
                KEY PROJECTS
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-semibold text-slate-900 mb-1">{project.name}</h3>
                    <p className="text-slate-700 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="bg-slate-200 px-2 py-1 rounded text-xs text-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4 text-sm text-slate-600">
                      {project.url && (
                        <a href={project.url} className="text-slate-800 hover:underline">
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} className="text-slate-800 hover:underline">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {references && references.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3 pb-1 border-b-2 border-slate-800">
                REFERENCES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}
