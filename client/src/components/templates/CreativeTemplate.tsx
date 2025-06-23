import { ResumeData } from "@shared/schema";
import { Mail, Phone, MapPin, Linkedin, Globe, User } from "lucide-react";

interface CreativeTemplateProps {
  data: Partial<ResumeData>;
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { personalDetails, profileSummary, education, experience, projects, skills, certifications, languages, hobbies, references } = data;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white p-8 text-slate-900 resume-template" id="resume-preview">
      {/* Creative Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-purple-600 p-6 mb-6 text-white">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
            {personalDetails?.photo ? (
              <img 
                src={personalDetails.photo} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <User className="text-white text-3xl" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {personalDetails?.firstName || "Your"} {personalDetails?.lastName || "Name"}
            </h1>
            <p className="text-xl text-purple-100 mb-3">
              {personalDetails?.title || "Your Professional Title"}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {personalDetails?.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{personalDetails.email}</span>
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
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
      </div>

      {/* Profile Summary */}
      {profileSummary?.summary && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">PS</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">PROFILE SUMMARY</h2>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-accent">
            <p className="text-slate-700 leading-relaxed">{profileSummary.summary}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Experience */}
          {experience && experience.length > 0 && (
            <div>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">EX</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">EXPERIENCE</h2>
              </div>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-accent">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-900">{exp.position}</h3>
                      <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-accent font-medium mb-2">{exp.company}</p>
                    {exp.description && <p className="text-slate-700 mb-2">{exp.description}</p>}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="text-sm text-slate-700 space-y-1">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-accent mr-2">▶</span>
                            {achievement}
                          </li>
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
            <div>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">PJ</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">PROJECTS</h2>
              </div>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-2">{project.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="bg-accent text-white px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-700 text-sm">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          {skills && (skills.technical.length > 0 || skills.languages.length > 0 || skills.frameworks.length > 0 || skills.tools.length > 0) && (
            <div>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">SK</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">SKILLS</h2>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {[...skills.technical, ...skills.languages, ...skills.frameworks, ...skills.tools]
                    .filter(Boolean)
                    .map((skill, index) => (
                      <span key={index} className="bg-purple-100 text-accent px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">ED</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">EDUCATION</h2>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3 last:mb-0">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-accent text-sm">{edu.institution}</p>
                    <p className="text-slate-600 text-xs">{edu.startDate} - {edu.endDate || "Present"}</p>
                    {edu.gpa && <p className="text-slate-600 text-xs">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">LN</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">LANGUAGES</h2>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center mb-2 last:mb-0">
                    <span className="text-slate-900 font-medium text-sm">{lang.language}</span>
                    <span className="text-accent text-xs">{lang.proficiency}</span>
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
