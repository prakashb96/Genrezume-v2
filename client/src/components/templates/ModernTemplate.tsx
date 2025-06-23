import { ResumeData } from "@shared/schema";
import { Mail, Phone, MapPin, Linkedin, Globe, User } from "lucide-react";

interface ModernTemplateProps {
  data: Partial<ResumeData>;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalDetails, profileSummary, education, experience, projects, skills, certifications, languages, hobbies, references } = data;

  return (
    <div className="bg-white p-8 text-slate-900">
      {/* Header Section */}
      <div className="border-b-2 border-primary pb-6 mb-6">
        <div className="flex items-start space-x-6">
          <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
            {personalDetails?.photo ? (
              <img 
                src={personalDetails.photo} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <User className="text-slate-400 text-2xl" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-textprimary mb-2">
              {personalDetails?.firstName || "Your"} {personalDetails?.lastName || "Name"}
            </h1>
            <p className="text-xl text-slate-600 mb-3">
              {personalDetails?.title || "Your Professional Title"}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              {personalDetails?.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="text-primary w-4 h-4" />
                  <span>{personalDetails.email}</span>
                </div>
              )}
              {personalDetails?.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="text-primary w-4 h-4" />
                  <span>{personalDetails.phone}</span>
                </div>
              )}
              {personalDetails?.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="text-primary w-4 h-4" />
                  <span>{personalDetails.location}</span>
                </div>
              )}
              {personalDetails?.linkedin && (
                <div className="flex items-center space-x-2">
                  <Linkedin className="text-primary w-4 h-4" />
                  <span>{personalDetails.linkedin.replace("https://", "")}</span>
                </div>
              )}
              {personalDetails?.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="text-primary w-4 h-4" />
                  <span>{personalDetails.website.replace("https://", "")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      {profileSummary?.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            PROFILE SUMMARY
          </h2>
          <p className="text-slate-700 leading-relaxed">{profileSummary.summary}</p>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            EDUCATION
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-textprimary">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <span className="text-sm text-slate-600">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </span>
                </div>
                <p className="text-slate-600 text-sm">{edu.institution}</p>
                {edu.gpa && <p className="text-slate-600 text-sm">GPA: {edu.gpa}</p>}
                {edu.description && <p className="text-slate-600 text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-textprimary">{exp.position}</h3>
                  <span className="text-sm text-slate-600">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-2">{exp.company}</p>
                {exp.description && <p className="text-slate-700 text-sm mb-2">{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="text-sm text-slate-700 space-y-1">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>• {achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            PROJECTS
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-medium text-textprimary mb-1">{project.name}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-slate-700 text-sm mb-2">{project.description}</p>
                <div className="flex space-x-4 text-sm text-slate-600">
                  {project.url && (
                    <a href={project.url} className="text-primary hover:underline">
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} className="text-primary hover:underline">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && (skills.technical.length > 0 || skills.languages.length > 0 || skills.frameworks.length > 0 || skills.tools.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            TECHNICAL SKILLS
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[...skills.technical, ...skills.languages, ...skills.frameworks, ...skills.tools].map((skill, index) => (
              <div key={index} className="bg-slate-100 px-3 py-1 rounded text-sm text-slate-700">
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            CERTIFICATIONS
          </h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-textprimary">{cert.name}</h3>
                  <span className="text-sm text-slate-600">{cert.date}</span>
                </div>
                <p className="text-slate-600 text-sm">{cert.issuer}</p>
                {cert.credentialId && (
                  <p className="text-slate-600 text-sm">ID: {cert.credentialId}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            LANGUAGES
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <div key={lang.id} className="flex justify-between">
                <span className="text-slate-700">{lang.language}</span>
                <span className="text-slate-600 text-sm">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hobbies */}
      {hobbies?.hobbies && hobbies.hobbies.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            INTERESTS & HOBBIES
          </h2>
          <p className="text-slate-700">{hobbies.hobbies.join(", ")}</p>
        </div>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            REFERENCES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {references.map((ref) => (
              <div key={ref.id} className="text-sm">
                <h3 className="font-medium text-textprimary">{ref.name}</h3>
                <p className="text-slate-600">{ref.title}</p>
                <p className="text-slate-600">{ref.company}</p>
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
