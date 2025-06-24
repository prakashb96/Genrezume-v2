import { ResumeData } from "@shared/schema";

interface A4TemplateProps {
  data: Partial<ResumeData>;
}

export default function A4Template({ data }: A4TemplateProps) {
  const { personalDetails, education, projects, skills, internships, extracurricular, certifications, profileSummary, languages, hobbies, references } = data;

  const printStyles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.3',
      color: 'black',
      backgroundColor: 'white',
      fontSize: '11px',
      width: '210mm',
      minHeight: '297mm',
      padding: '15mm',
      margin: '0 auto',
      boxSizing: 'border-box' as const,
      pageBreakInside: 'avoid' as const,
    },
    sectionHeader: {
      fontSize: '12px',
      fontWeight: 'bold' as const,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      borderBottom: '1px solid black',
      paddingBottom: '2px',
      margin: '0 0 6px 0',
    },
    sectionContainer: {
      marginBottom: '12px',
    },
  };

  return (
    <div className="bg-white text-black resume-template" id="resume-preview" style={printStyles.container}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <h1 style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          textTransform: 'uppercase', 
          letterSpacing: '1px', 
          margin: '0 0 6px 0' 
        }}>
          {personalDetails?.firstName || "NAME"} {personalDetails?.lastName || ""}
        </h1>
        <div style={{ fontSize: '10px', lineHeight: '1.2' }}>
          {personalDetails?.email && <div>{personalDetails.email}</div>}
          {personalDetails?.phone && <div>{personalDetails.phone}</div>}
          {personalDetails?.location && <div>{personalDetails.location}</div>}
          {personalDetails?.linkedin && (
            <div>
              <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                LinkedIn
              </a>
            </div>
          )}
          {personalDetails?.github && (
            <div>
              <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                GitHub
              </a>
            </div>
          )}
          {personalDetails?.portfolio && (
            <div>
              <a href={personalDetails.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                Portfolio
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Education */}
      <div style={printStyles.sectionContainer}>
        <h2 style={printStyles.sectionHeader}>EDUCATION</h2>
        {education && education.length > 0 ? (
          education.map((edu, index) => (
            <div key={edu.id || index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{edu.institutionName || edu.collegeName}</div>
                  <div style={{ fontStyle: 'italic', fontSize: '10px' }}>
                    {edu.degree || edu.degreeName} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`} {edu.gpa && `• GPA: ${edu.gpa}`}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '10px', minWidth: '120px' }}>
                  <div>{edu.startDate} - {edu.endDate || "Present"}</div>
                  {edu.location && (
                    <div style={{ fontStyle: 'italic' }}>
                      {edu.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '11px' }}>College Name</div>
                <div style={{ fontStyle: 'italic', fontSize: '10px' }}>Degree Name • CGPA: xx</div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '10px', minWidth: '120px' }}>
                <div>MM YYYY - MM YYYY</div>
                <div style={{ fontStyle: 'italic' }}>city, country</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Summary */}
      {profileSummary?.summary && (
        <div style={printStyles.sectionContainer}>
          <h2 style={printStyles.sectionHeader}>PROFESSIONAL SUMMARY</h2>
          <div style={{ fontSize: '10px', lineHeight: '1.4' }}>
            {profileSummary.summary}
          </div>
        </div>
      )}

      {/* Technical Skills */}
      {skills && (skills.technical?.length > 0 || skills.frameworks?.length > 0 || skills.tools?.length > 0) && (
        <div style={printStyles.sectionContainer}>
          <h2 style={printStyles.sectionHeader}>TECHNICAL SKILLS</h2>
          <div style={{ fontSize: '10px' }}>
            {skills.technical && skills.technical.length > 0 && (
              <div style={{ marginBottom: '4px' }}>
                <strong>Languages:</strong> {skills.technical.join(', ')}
              </div>
            )}
            {skills.frameworks && skills.frameworks.length > 0 && (
              <div style={{ marginBottom: '4px' }}>
                <strong>Frameworks:</strong> {skills.frameworks.join(', ')}
              </div>
            )}
            {skills.tools && skills.tools.length > 0 && (
              <div style={{ marginBottom: '4px' }}>
                <strong>Tools:</strong> {skills.tools.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      <div style={printStyles.sectionContainer}>
        <h2 style={printStyles.sectionHeader}>PROJECTS</h2>
        {projects && projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={project.id || index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '11px', flex: 1 }}>
                  {project.name || project.projectName} 
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', fontSize: '10px', marginLeft: '4px' }}>🔗</a>
                  )}
                  {project.technologies && ` | ${project.technologies}`}
                </div>
                <div style={{ fontSize: '10px', minWidth: '80px', textAlign: 'right' }}>
                  {project.startDate || 'MM YYYY'}
                </div>
              </div>
              <div style={{ fontSize: '10px', marginBottom: '4px' }}>
                • {project.description}
              </div>
              {project.keyPoints && project.keyPoints.length > 0 && (
                <div style={{ fontSize: '10px' }}>
                  {project.keyPoints.map((point, pointIndex) => (
                    <div key={pointIndex} style={{ marginBottom: '1px' }}>• {point}</div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '11px' }}>
                  Project Name <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', fontSize: '10px', marginLeft: '4px' }}>🔗</a> | Technology Stack Used
                </div>
                <div style={{ fontSize: '10px' }}>MM YYYY</div>
              </div>
              <div style={{ fontSize: '10px' }}>
                • About project highlight key points.
              </div>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '11px' }}>
                  Project Name <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', fontSize: '10px', marginLeft: '4px' }}>🔗</a> | Technology Stack Used
                </div>
                <div style={{ fontSize: '10px' }}>MM YYYY</div>
              </div>
              <div style={{ fontSize: '10px' }}>
                • About project highlight key points.
              </div>
            </div>
          </>
        )}
      </div>

      {/* Internship */}
      <div style={printStyles.sectionContainer}>
        <h2 style={printStyles.sectionHeader}>INTERNSHIP</h2>
        {internships && internships.length > 0 ? (
          internships.map((internship, index) => (
            <div key={internship.id || index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>
                    {internship.companyName} 
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: '10px' }}>{internship.jobTitle || internship.roleName}</div>
                  <div style={{ fontSize: '10px', marginTop: '2px' }}>
                    • {internship.description || 'About the role and responsibilities carried out.'}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '10px', minWidth: '120px' }}>
                  <div>{internship.startDate} - {internship.endDate || "Present"}</div>
                  {internship.location && (
                    <div style={{ fontStyle: 'italic' }}>
                      {internship.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '11px' }}>Company Name <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', fontSize: '10px', marginLeft: '4px' }}>🔗</a></div>
                <div style={{ fontStyle: 'italic', fontSize: '10px' }}>Role Name</div>
                <div style={{ fontSize: '10px', marginTop: '2px' }}>
                  • About the role and responsibilities carried out.
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '10px', minWidth: '120px' }}>
                <div>MM YYYY - MM YYYY</div>
                <div style={{ fontStyle: 'italic' }}>city, country</div>
              </div>
            </div>
          </div>
        )}
      </div>



      {/* Extracurricular */}
      {extracurricular && extracurricular.length > 0 && (
        <div style={printStyles.sectionContainer}>
          <h2 style={printStyles.sectionHeader}>EXTRACURRICULAR</h2>
          {extracurricular.map((activity, index) => (
            <div key={activity.id || index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{activity.organizationName}</div>
                  <div style={{ fontStyle: 'italic', fontSize: '10px' }}>{activity.roleName}</div>
                  {activity.description && (
                    <div style={{ fontSize: '10px', marginTop: '2px' }}>
                      • {activity.description}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'right', fontSize: '10px', minWidth: '120px' }}>
                  <div>{activity.startDate} - {activity.endDate || "Present"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div style={printStyles.sectionContainer}>
          <h2 style={printStyles.sectionHeader}>LANGUAGES</h2>
          <div style={{ fontSize: '10px' }}>
            {languages.map((lang, index) => (
              <div key={index} style={{ marginBottom: '4px' }}>
                <strong>{lang.language}:</strong> {lang.proficiency}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hobbies & Interests */}
      {hobbies?.interests && (
        <div style={printStyles.sectionContainer}>
          <h2 style={printStyles.sectionHeader}>INTERESTS & HOBBIES</h2>
          <div style={{ fontSize: '10px', lineHeight: '1.4' }}>
            {hobbies.interests}
          </div>
        </div>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <div style={printStyles.sectionContainer}>
          <h2 style={printStyles.sectionHeader}>REFERENCES</h2>
          {references.map((ref, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{ref.name}</div>
              <div style={{ fontSize: '10px' }}>{ref.title} at {ref.company}</div>
              <div style={{ fontSize: '10px' }}>{ref.email} | {ref.phone}</div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div style={printStyles.sectionContainer}>
          <h2 style={printStyles.sectionHeader}>CERTIFICATIONS</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '4px 16px', 
            fontSize: '10px' 
          }}>
            {certifications.map((cert, index) => (
              <div key={cert.id || index} style={{ marginBottom: '4px' }}>
                <div style={{ fontWeight: 'bold' }}>• {cert.name}</div>
                <div style={{ fontSize: '9px', color: '#666', marginLeft: '8px' }}>
                  {cert.issuer} - {cert.date}
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', marginLeft: '4px' }}>🔗</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}