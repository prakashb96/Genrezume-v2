import { ResumeData } from "@shared/schema";

interface A4TemplateProps {
  data: Partial<ResumeData>;
}

export default function A4Template({ data }: A4TemplateProps) {
  if (!data) {
    return <div style={{ padding: '20px' }}>No resume data available</div>;
  }
  
  const { 
    personalDetails, 
    education = [], 
    projects = [], 
    technicalSkills,
    coursework,
    courseworkSkills,
    internships = [], 
    extracurricular = [], 
    certifications = [], 
    profileSummary, 
    languages = [], 
    hobbies, 
    references = [] 
  } = data;

  const printStyles = {
    container: {
      fontFamily: 'Inter, Arial, sans-serif',
      lineHeight: '1.5',
      color: '#000000',
      backgroundColor: '#ffffff',
      fontSize: '14px',
      width: '210mm',
      minHeight: '297mm',
      padding: '40px',
      margin: '0 auto',
      boxSizing: 'border-box' as const,
    },
    sectionHeader: {
      fontSize: '18px',
      fontWeight: '600' as const,
      color: '#1e293b',
      borderBottom: '1px solid #e2e8f0',
      paddingBottom: '5px',
      marginBottom: '15px',
      marginTop: '25px',
    },
    sectionContainer: {
      marginBottom: '25px',
    },
  };

  return (
    <div className="bg-white text-black resume-template" style={printStyles.container}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #2563eb', paddingBottom: '15px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          margin: '0 0 8px 0',
          color: '#1e293b'
        }}>
          {personalDetails?.firstName || "Your"} {personalDetails?.lastName || "Name"}
        </h1>
        <div style={{ fontSize: '16px', color: '#64748b', marginBottom: '10px' }}>
          {personalDetails?.title || "Your Professional Title"}
        </div>
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          {personalDetails?.email && <span>{personalDetails.email}</span>}
          {personalDetails?.phone && personalDetails?.email && <span> | </span>}
          {personalDetails?.phone && <span>{personalDetails.phone}</span>}
          {personalDetails?.location && (personalDetails?.email || personalDetails?.phone) && <span> | </span>}
          {personalDetails?.location && <span>{personalDetails.location}</span>}
        </div>
        <div style={{ fontSize: '14px', color: '#2563eb', marginTop: '8px' }}>
          {personalDetails?.linkedin && (
            <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', marginRight: '15px' }}>
              LinkedIn
            </a>
          )}
          {personalDetails?.github && (
            <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', marginRight: '15px' }}>
              GitHub
            </a>
          )}
          {personalDetails?.portfolio && (
            <a href={personalDetails.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>
              Portfolio
            </a>
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
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{edu.collegeName}</div>
                  <div style={{ fontStyle: 'italic', fontSize: '10px' }}>
                    {edu.degreeName} {edu.cgpa && `• CGPA: ${edu.cgpa}`}
                  </div>
                  {edu.description && (
                    <div style={{ fontSize: '9px', marginTop: '2px', color: '#666' }}>
                      {edu.description}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'right', fontSize: '10px', minWidth: '120px' }}>
                  <div>{edu.startDate} - {edu.endDate || "Present"}</div>
                  {(edu.city || edu.country) && (
                    <div style={{ fontStyle: 'italic' }}>
                      {edu.city}{edu.city && edu.country && ', '}{edu.country}
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
      {technicalSkills && (technicalSkills.languages?.length > 0 || technicalSkills.technologiesFrameworks?.length > 0 || technicalSkills.developerTools?.length > 0) && (
        <div style={printStyles.sectionContainer}>
          <h2 style={printStyles.sectionHeader}>TECHNICAL SKILLS</h2>
          <div style={{ fontSize: '10px' }}>
            {technicalSkills.languages && technicalSkills.languages.length > 0 && (
              <div style={{ marginBottom: '4px' }}>
                <strong>Programming Languages:</strong> {technicalSkills.languages.join(', ')}
              </div>
            )}
            {technicalSkills.technologiesFrameworks && technicalSkills.technologiesFrameworks.length > 0 && (
              <div style={{ marginBottom: '4px' }}>
                <strong>Technologies & Frameworks:</strong> {technicalSkills.technologiesFrameworks.join(', ')}
              </div>
            )}
            {technicalSkills.developerTools && technicalSkills.developerTools.length > 0 && (
              <div style={{ marginBottom: '4px' }}>
                <strong>Developer Tools:</strong> {technicalSkills.developerTools.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Coursework */}
      {(coursework && coursework.length > 0) || (courseworkSkills?.selectedCourses && courseworkSkills.selectedCourses.length > 0) && (
        <div style={printStyles.sectionContainer}>
          <h2 style={printStyles.sectionHeader}>RELEVANT COURSEWORK</h2>
          <div style={{ fontSize: '10px' }}>
            {courseworkSkills?.selectedCourses && courseworkSkills.selectedCourses.length > 0 
              ? courseworkSkills.selectedCourses.join(' • ')
              : coursework && coursework.join(' • ')
            }
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
                  {project.projectName} 
                  {project.downloadLink && (
                    <a href={project.downloadLink} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', fontSize: '10px', marginLeft: '4px' }}>🔗</a>
                  )}
                  {project.technologyStack && ` | ${project.technologyStack}`}
                </div>
                <div style={{ fontSize: '10px', minWidth: '80px', textAlign: 'right' }}>
                  {project.startDate && project.endDate ? `${project.startDate} - ${project.endDate}` : project.startDate || 'MM YYYY'}
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
                  <div style={{ fontStyle: 'italic', fontSize: '10px' }}>{internship.roleName}</div>
                  <div style={{ fontSize: '10px', marginTop: '2px' }}>
                    • {internship.description || 'About the role and responsibilities carried out.'}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '10px', minWidth: '120px' }}>
                  <div>{internship.startDate} - {internship.endDate || "Present"}</div>
                  {(internship.city || internship.country) && (
                    <div style={{ fontStyle: 'italic' }}>
                      {internship.city}{internship.city && internship.country && ', '}{internship.country}
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
      {hobbies?.hobbies && hobbies.hobbies.length > 0 && (
        <div style={printStyles.sectionContainer}>
          <h2 style={printStyles.sectionHeader}>INTERESTS & HOBBIES</h2>
          <div style={{ fontSize: '10px', lineHeight: '1.4' }}>
            {hobbies.hobbies.join(' • ')}
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
              <div style={{ fontSize: '9px', color: '#666' }}>Relationship: {ref.relationship}</div>
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