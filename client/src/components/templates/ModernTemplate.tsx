import { ResumeData } from "@shared/schema";
import { Mail, Phone, MapPin, Linkedin, Globe, User } from "lucide-react";

interface ModernTemplateProps {
  data: Partial<ResumeData>;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalDetails, education, projects, courseworkSkills, technicalSkills, internships, extracurricular, certifications } = data;

  return (
    <div className="bg-white p-8 text-slate-900 resume-template" id="resume-preview">
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
                  <span>{personalDetails.linkedin}</span>
                </div>
              )}
              {personalDetails?.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="text-primary w-4 h-4" />
                  <span>{personalDetails.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6 resume-section">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            EDUCATION
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-textprimary">
                    {edu.degreeName}
                  </h3>
                  <span className="text-sm text-slate-600">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </span>
                </div>
                <p className="text-slate-600 text-sm">{edu.collegeName}</p>
                {edu.cgpa && <p className="text-slate-600 text-sm">CGPA: {edu.cgpa}</p>}
                {edu.city && edu.country && (
                  <p className="text-slate-600 text-sm">{edu.city}, {edu.country}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coursework & Skills */}
      {courseworkSkills && (
        <div className="mb-6 resume-section">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            RELEVANT COURSEWORK
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.entries(courseworkSkills)
              .filter(([_, selected]) => selected)
              .map(([course, _]) => (
                <div key={course} className="bg-slate-100 px-3 py-1 rounded text-sm text-slate-700">
                  {course.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
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
                <h3 className="font-medium text-textprimary mb-1">{project.projectName}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
                    {project.technologyStack}
                  </span>
                </div>
                <p className="text-slate-700 text-sm mb-2">{project.description}</p>
                {project.keyPoints && project.keyPoints.length > 0 && (
                  <ul className="text-sm text-slate-700 space-y-1 mb-2">
                    {project.keyPoints.map((point, index) => (
                      <li key={index}>• {point}</li>
                    ))}
                  </ul>
                )}
                <div className="flex space-x-4 text-sm text-slate-600">
                  {project.downloadLink && (
                    <a href={project.downloadLink} className="text-primary hover:underline">
                      View Project
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Internships */}
      {internships && internships.length > 0 && (
        <div className="mb-6 resume-section">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            INTERNSHIP EXPERIENCE
          </h2>
          <div className="space-y-4">
            {internships.map((internship) => (
              <div key={internship.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-textprimary">{internship.role}</h3>
                  <span className="text-sm text-slate-600">
                    {internship.startDate} - {internship.endDate || "Present"}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-2">{internship.companyName}</p>
                {internship.location && <p className="text-slate-600 text-sm mb-2">{internship.location}</p>}
                <p className="text-slate-700 text-sm mb-2">{internship.description}</p>
                {internship.keyPoints && internship.keyPoints.length > 0 && (
                  <ul className="text-sm text-slate-700 space-y-1">
                    {internship.keyPoints.map((point, index) => (
                      <li key={index}>• {point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Skills */}
      {technicalSkills && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            TECHNICAL SKILLS
          </h2>
          <div className="space-y-2">
            {technicalSkills.programmingLanguages && technicalSkills.programmingLanguages.length > 0 && (
              <div>
                <span className="font-medium text-slate-700">Programming Languages: </span>
                <span className="text-slate-600">{technicalSkills.programmingLanguages.filter(Boolean).join(", ")}</span>
              </div>
            )}
            {technicalSkills.frameworks && technicalSkills.frameworks.length > 0 && (
              <div>
                <span className="font-medium text-slate-700">Frameworks: </span>
                <span className="text-slate-600">{technicalSkills.frameworks.filter(Boolean).join(", ")}</span>
              </div>
            )}
            {technicalSkills.tools && technicalSkills.tools.length > 0 && (
              <div>
                <span className="font-medium text-slate-700">Tools: </span>
                <span className="text-slate-600">{technicalSkills.tools.filter(Boolean).join(", ")}</span>
              </div>
            )}
            {technicalSkills.databases && technicalSkills.databases.length > 0 && (
              <div>
                <span className="font-medium text-slate-700">Databases: </span>
                <span className="text-slate-600">{technicalSkills.databases.filter(Boolean).join(", ")}</span>
              </div>
            )}
            {technicalSkills.platforms && technicalSkills.platforms.length > 0 && (
              <div>
                <span className="font-medium text-slate-700">Platforms: </span>
                <span className="text-slate-600">{technicalSkills.platforms.filter(Boolean).join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Extracurricular Activities */}
      {extracurricular && extracurricular.length > 0 && (
        <div className="mb-6 resume-section">
          <h2 className="text-lg font-semibold text-textprimary mb-3 flex items-center">
            <div className="w-1 h-6 bg-primary mr-3"></div>
            EXTRACURRICULAR ACTIVITIES
          </h2>
          <div className="space-y-4">
            {extracurricular.map((activity) => (
              <div key={activity.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-textprimary">{activity.activityName}</h3>
                  <span className="text-sm text-slate-600">
                    {activity.startDate} - {activity.endDate || "Present"}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-1">{activity.role}</p>
                {activity.organization && <p className="text-slate-600 text-sm mb-2">{activity.organization}</p>}
                <p className="text-slate-700 text-sm mb-2">{activity.description}</p>
                {activity.achievements && activity.achievements.length > 0 && (
                  <ul className="text-sm text-slate-700 space-y-1">
                    {activity.achievements.map((achievement, index) => (
                      <li key={index}>• {achievement}</li>
                    ))}
                  </ul>
                )}
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
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-4 bg-slate-50 rounded border-l-4 border-primary">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-textprimary">{cert.certificationName}</h3>
                  <span className="text-sm text-slate-600 bg-slate-200 px-2 py-1 rounded">{cert.issueDate}</span>
                </div>
                <p className="text-slate-600 text-sm font-medium">{cert.issuingOrganization}</p>
                {cert.credentialId && (
                  <p className="text-slate-600 text-xs mt-1">Credential ID: {cert.credentialId}</p>
                )}
                {cert.verificationLink && (
                  <a href={cert.verificationLink} className="text-primary text-xs hover:underline mt-1 inline-block">
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}