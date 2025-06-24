import { ResumeData } from "@shared/schema";

interface A4TemplateProps {
  data: Partial<ResumeData>;
}

export default function A4Template({ data }: A4TemplateProps) {
  const { personalDetails, education, projects, courseworkSkills, technicalSkills, internships, extracurricular, certifications } = data;

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
          {personalDetails?.linkedin && <div>{personalDetails.linkedin}</div>}
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
                </div>
                <div style={{ textAlign: 'right', fontSize: '10px', minWidth: '120px' }}>
                  <div>{edu.startDate} - {edu.endDate || "Present"}</div>
                  {(edu.city || edu.country) && (
                    <div style={{ fontStyle: 'italic' }}>
                      {[edu.city, edu.country].filter(Boolean).join(', ')}
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

      {/* Coursework/Skills */}
      <div style={printStyles.sectionContainer}>
        <h2 style={printStyles.sectionHeader}>COURSEWORK / SKILLS</h2>
        {courseworkSkills ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '4px 16px', 
            fontSize: '10px' 
          }}>
            {Object.entries(courseworkSkills)
              .filter(([_, selected]) => selected)
              .map(([course, _]) => (
                <div key={course}>
                  {course === 'dataStructures' && 'Data Structures &'}
                  {course === 'networkSecurity' && 'Network Security'}
                  {course === 'artificialIntelligence' && 'Artificial Intelligence'}
                  {course === 'webDevelopment' && 'Web Development'}
                  {course === 'operatingSystems' && 'Operating Systems'}
                  {course === 'databaseManagement' && 'Database Management'}
                  {course === 'oopsConceptsAdvanced' && 'OOPS Concepts'}
                  {course === 'androidDevelopment' && 'Android Development'}
                  {course === 'systemDesign' && 'System Design'}
                </div>
              ))}
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '4px 16px', 
            fontSize: '10px' 
          }}>
            <div>Data Structures &</div>
            <div>Network Security</div>
            <div>Artificial Intelligence</div>
            <div>Algorithms</div>
            <div>Database Management</div>
            <div>OOPS Concepts</div>
            <div>Operating Systems</div>
            <div>System (OSMD)</div>
            <div>Web Development</div>
            <div></div>
            <div></div>
            <div>Android Development</div>
          </div>
        )}
      </div>

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
                    <a href={internship.companyUrl || "#"} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', fontSize: '10px', marginLeft: '4px' }}>🔗</a>
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
                      {[internship.city, internship.country].filter(Boolean).join(', ')}
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

      {/* Technical Skills */}
      <div style={printStyles.sectionContainer}>
        <h2 style={printStyles.sectionHeader}>TECHNICAL SKILLS</h2>
        {technicalSkills ? (
          <div style={{ fontSize: '10px', lineHeight: '1.4' }}>
            {technicalSkills.languages && technicalSkills.languages.length > 0 && (
              <div style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold' }}>Languages: </span>
                {technicalSkills.languages.join(', ')}
              </div>
            )}
            {technicalSkills.developerTools && technicalSkills.developerTools.length > 0 && (
              <div style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold' }}>Developer Tools: </span>
                {technicalSkills.developerTools.join(', ')}
              </div>
            )}
            {technicalSkills.technologiesFrameworks && technicalSkills.technologiesFrameworks.length > 0 && (
              <div style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold' }}>Technologies/Frameworks: </span>
                {technicalSkills.technologiesFrameworks.join(', ')}
              </div>
            )}
          </div>
        ) : (
          <div style={{ fontSize: '10px', lineHeight: '1.4' }}>
            <div style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 'bold' }}>Languages: </span>
              Python, Java, C, C++, Dart, JavaScript, SQL, NoSQL, R, XML, Go
            </div>
            <div style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 'bold' }}>Developer Tools: </span>
              VS Code, Android Studio, DataGrip, Scienze, IntelliJ Idea Ultimate
            </div>
            <div style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 'bold' }}>Technologies/Frameworks: </span>
              Linux, GitHub, ReactJS, Redux, NextJS, NodeJS, ExpressJS, Git, MongoDB, Flutter
            </div>
          </div>
        )}
      </div>

      {/* Extracurricular */}
      <div style={printStyles.sectionContainer}>
        <h2 style={printStyles.sectionHeader}>EXTRACURRICULAR</h2>
        {extracurricular && extracurricular.length > 0 ? (
          extracurricular.map((activity, index) => (
            <div key={activity.id || index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{activity.organizationName} <span style={{ color: 'blue', textDecoration: 'underline', fontSize: '10px' }}>🔗</span></div>
                  <div style={{ fontStyle: 'italic', fontSize: '10px' }}>{activity.roleName}</div>
                  <div style={{ fontSize: '10px', marginTop: '2px' }}>
                    • {activity.description || 'About the role and responsibilities carried out.'}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '10px', minWidth: '120px' }}>
                  <div>{activity.startDate} - {activity.endDate || "Present"}</div>
                  <div style={{ fontStyle: 'italic' }}>Position</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '11px' }}>Organization Name <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', fontSize: '10px', marginLeft: '4px' }}>🔗</a></div>
                <div style={{ fontStyle: 'italic', fontSize: '10px' }}>Role Name</div>
                <div style={{ fontSize: '10px', marginTop: '2px' }}>
                  • About the role and responsibilities carried out.
                  • Participation Certificate <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', fontSize: '10px' }}>🔗</a>
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '10px', minWidth: '120px' }}>
                <div>MM YYYY - MM YYYY</div>
                <div style={{ fontStyle: 'italic' }}>Position</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Certifications */}
      <div style={printStyles.sectionContainer}>
        <h2 style={printStyles.sectionHeader}>CERTIFICATIONS</h2>
        {certifications && certifications.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '4px 16px', 
            fontSize: '10px' 
          }}>
            {certifications.map((cert, index) => (
              <div key={cert.id || index}>
                • {cert.name}
                {cert.url && (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', marginLeft: '4px' }}>🔗</a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '4px 16px', 
            fontSize: '10px' 
          }}>
            <div>• Java & DSA - <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>🔗</a></div>
            <div>• SQL</div>
            <div>• Command Line in Linux - Coursera</div>
            <div>• Python for Data Science - KE</div>
            <div>• MongoDB Basics</div>
            <div>• Microsoft AI Classroom - Microsoft</div>
            <div>• 5 Stars in C++ & SQL <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>🔗</a></div>
            <div></div>
            <div>• Node.js with Express & MongoDB - Udemy</div>
          </div>
        )}
      </div>
    </div>
  );
}