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

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "15mm",
        fontFamily: "'Arial', sans-serif",
        fontSize: "10px",
        lineHeight: "1.3",
        color: "#000",
        backgroundColor: "white",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* Header with Name */}
      <div style={{ textAlign: "center", marginBottom: "20px", borderBottom: "2px solid #000", paddingBottom: "10px" }}>
        <h1 style={{ 
          fontSize: "24px", 
          fontWeight: "bold", 
          margin: "0",
          letterSpacing: "2px",
          textTransform: "uppercase"
        }}>
          {personalDetails?.firstName || "YOUR"} {personalDetails?.lastName || "NAME"}
        </h1>
        <div style={{ fontSize: "12px", marginTop: "5px", display: "flex", justifyContent: "center", gap: "20px" }}>
          {personalDetails?.email && <span>📧 {personalDetails.email}</span>}
          {personalDetails?.phone && <span>📱 {personalDetails.phone}</span>}
          {personalDetails?.location && <span>📍 {personalDetails.location}</span>}
        </div>
        {(personalDetails?.linkedin || personalDetails?.github || personalDetails?.portfolio) && (
          <div style={{ fontSize: "10px", marginTop: "3px", display: "flex", justifyContent: "center", gap: "15px" }}>
            {personalDetails?.linkedin && (
              <a href={personalDetails.linkedin} style={{ color: "#0066cc", textDecoration: "underline" }} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            
            {personalDetails?.github && (
              <a href={personalDetails.github} style={{ color: "#0066cc", textDecoration: "underline" }} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            
            {personalDetails?.portfolio && (
              <a href={personalDetails.portfolio} style={{ color: "#0066cc", textDecoration: "underline" }} target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            )}
          </div>
        )}
      </div>

      {/* Profile Summary */}
      {profileSummary?.summary && (
        <div style={{ marginBottom: "18px" }}>
          <h2 style={{ 
            fontSize: "12px", 
            fontWeight: "bold", 
            marginBottom: "8px",
            textTransform: "uppercase",
            borderBottom: "1px solid #000",
            paddingBottom: "2px"
          }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p style={{ margin: "0", textAlign: "justify", fontSize: "10px" }}>
            {profileSummary.summary}
          </p>
        </div>
      )}

      {/* Education */}
      <div style={{ marginBottom: "18px" }}>
        <h2 style={{ 
          fontSize: "12px", 
          fontWeight: "bold", 
          marginBottom: "8px",
          textTransform: "uppercase",
          borderBottom: "1px solid #000",
          paddingBottom: "2px"
        }}>
          EDUCATION
        </h2>
        {education && education.length > 0 ? (
          education.map((edu, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", fontSize: "11px" }}>
                    {edu.collegeName || "College Name"}
                  </div>
                  <div style={{ fontSize: "10px", fontStyle: "italic" }}>
                    {edu.degreeName || "Degree Name"} {edu.cgpa && `• CGPA - ${edu.cgpa}`}
                  </div>
                  {edu.description && (
                    <div style={{ fontSize: "9px", marginTop: "2px" }}>
                      {edu.description}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right", fontSize: "10px", minWidth: "120px" }}>
                  <div style={{ fontWeight: "bold" }}>
                    {edu.startDate || "MM YYYY"} - {edu.endDate || "MM YYYY"}
                  </div>
                  {(edu.city || edu.country) && (
                    <div style={{ fontStyle: "italic" }}>
                      {edu.city}{edu.city && edu.country && ', '}{edu.country}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", fontSize: "11px" }}>College Name</div>
                <div style={{ fontSize: "10px", fontStyle: "italic" }}>Degree Name • CGPA - xx</div>
              </div>
              <div style={{ textAlign: "right", fontSize: "10px", minWidth: "120px" }}>
                <div style={{ fontWeight: "bold" }}>MM YYYY - MM YYYY</div>
                <div style={{ fontStyle: "italic" }}>city, country</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Coursework / Skills - Always Show Section */}
      <div style={{ marginBottom: "18px" }}>
        <h2 style={{ 
          fontSize: "12px", 
          fontWeight: "bold", 
          marginBottom: "8px",
          textTransform: "uppercase",
          borderBottom: "1px solid #000",
          paddingBottom: "2px"
        }}>
          COURSEWORK / SKILLS
        </h2>
        {courseworkSkills?.selectedCourses && courseworkSkills.selectedCourses.length > 0 ? (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "8px 20px", 
            fontSize: "10px" 
          }}>
            {courseworkSkills.selectedCourses.map((course, index) => (
              <div key={index} style={{ marginBottom: "4px" }}>
                • {course}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "8px 20px", 
            fontSize: "10px" 
          }}>
            <div>• Data Structures & Algorithms</div>
            <div>• Network Security</div>
            <div>• Artificial Intelligence</div>
            <div>• Operating Systems</div>
            <div>• Database Management System (DBMS)</div>
            <div>• Web Development</div>
            <div>• OOPS Concept</div>
            <div>• Android Development</div>
          </div>
        )}
      </div>

      {/* Projects */}
      <div style={{ marginBottom: "18px" }}>
        <h2 style={{ 
          fontSize: "12px", 
          fontWeight: "bold", 
          marginBottom: "8px",
          textTransform: "uppercase",
          borderBottom: "1px solid #000",
          paddingBottom: "2px"
        }}>
          PROJECTS
        </h2>
        {projects && projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2px" }}>
                <div style={{ fontWeight: "bold", fontSize: "11px", flex: 1 }}>
                  {project.projectName} {project.downloadLink && (
                    <a href={project.downloadLink} style={{ color: "#0066cc", textDecoration: "none", marginLeft: "2px" }} target="_blank" rel="noopener noreferrer">
                      🔗
                    </a>
                  )} | {project.technologyStack || "Technology Stack Used"}
                </div>
                <div style={{ fontSize: "10px", minWidth: "80px", textAlign: "right" }}>
                  {project.startDate || "MM YYYY"}
                </div>
              </div>
              <div style={{ fontSize: "10px" }}>
                • {project.description || "About project highlight key points."}
              </div>

            </div>
          ))
        ) : (
          <>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2px" }}>
                <div style={{ fontWeight: "bold", fontSize: "11px" }}>
                  Project Name 🔗 | Technology Stack Used
                </div>
                <div style={{ fontSize: "10px" }}>MM YYYY</div>
              </div>
              <div style={{ fontSize: "10px" }}>
                • About project highlight key points.
              </div>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2px" }}>
                <div style={{ fontWeight: "bold", fontSize: "11px" }}>
                  Project Name 🔗 | Technology Stack Used
                </div>
                <div style={{ fontSize: "10px" }}>MM YYYY</div>
              </div>
              <div style={{ fontSize: "10px" }}>
                • About project highlight key points.
              </div>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2px" }}>
                <div style={{ fontWeight: "bold", fontSize: "11px" }}>
                  Project Name 🔗 | Technology Stack Used
                </div>
                <div style={{ fontSize: "10px" }}>MM YYYY</div>
              </div>
              <div style={{ fontSize: "10px" }}>
                • About project highlight key points.
                <br />• Download
              </div>
            </div>
          </>
        )}
      </div>

      {/* Internship */}
      <div style={{ marginBottom: "18px" }}>
        <h2 style={{ 
          fontSize: "12px", 
          fontWeight: "bold", 
          marginBottom: "8px",
          textTransform: "uppercase",
          borderBottom: "1px solid #000",
          paddingBottom: "2px"
        }}>
          INTERNSHIP
        </h2>
        {internships && internships.length > 0 ? (
          internships.map((internship, index) => (
            <div key={index} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", fontSize: "11px" }}>
                    {internship.companyName} {internship.downloadLink && (
                      <a href={internship.downloadLink} style={{ color: "#0066cc", textDecoration: "none", marginLeft: "2px" }} target="_blank" rel="noopener noreferrer">
                        🔗
                      </a>
                    )}
                  </div>
                  <div style={{ fontStyle: "italic", fontSize: "10px" }}>
                    {internship.roleName}
                  </div>
                  <div style={{ fontSize: "10px", marginTop: "2px" }}>
                    • {internship.description || "About the role and responsibilities carried out."}
                  </div>
                </div>
                <div style={{ textAlign: "right", fontSize: "10px", minWidth: "120px" }}>
                  <div style={{ fontWeight: "bold" }}>
                    {internship.startDate || "MM YYYY"} - {internship.endDate || "MM YYYY"}
                  </div>
                  {(internship.city || internship.country) && (
                    <div style={{ fontStyle: "italic" }}>
                      {internship.city}{internship.city && internship.country && ', '}{internship.country}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", fontSize: "11px" }}>Company Name 🔗</div>
                <div style={{ fontStyle: "italic", fontSize: "10px" }}>Role Name</div>
                <div style={{ fontSize: "10px", marginTop: "2px" }}>
                  • About the role and responsibilities carried out.
                </div>
              </div>
              <div style={{ textAlign: "right", fontSize: "10px", minWidth: "120px" }}>
                <div style={{ fontWeight: "bold" }}>MM YYYY - MM YYYY</div>
                <div style={{ fontStyle: "italic" }}>city, country</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Technical Skills - Always Show Section */}
      <div style={{ marginBottom: "18px" }}>
        <h2 style={{ 
          fontSize: "12px", 
          fontWeight: "bold", 
          marginBottom: "8px",
          textTransform: "uppercase",
          borderBottom: "1px solid #000",
          paddingBottom: "2px"
        }}>
          TECHNICAL SKILLS
        </h2>
        {technicalSkills && (technicalSkills.languages?.length > 0 || technicalSkills.technologiesFrameworks?.length > 0 || technicalSkills.developerTools?.length > 0) ? (
          <div style={{ fontSize: "10px", lineHeight: "1.4" }}>
            {technicalSkills.languages && technicalSkills.languages.length > 0 && (
              <div style={{ marginBottom: "6px" }}>
                <strong>Languages:</strong> {technicalSkills.languages.join(", ")}
              </div>
            )}
            {technicalSkills.technologiesFrameworks && technicalSkills.technologiesFrameworks.length > 0 && (
              <div style={{ marginBottom: "6px" }}>
                <strong>Technologies:</strong> {technicalSkills.technologiesFrameworks.join(", ")}
              </div>
            )}
            {technicalSkills.developerTools && technicalSkills.developerTools.length > 0 && (
              <div style={{ marginBottom: "6px" }}>
                <strong>Developer Tools:</strong> {technicalSkills.developerTools.join(", ")}
              </div>
            )}
          </div>
        ) : (
          <div style={{ fontSize: "10px", lineHeight: "1.4" }}>
            <div style={{ marginBottom: "6px" }}>
              <strong>Languages:</strong> Python, Java, C, C++, Dart, JavaScript, SQL, NoSQL, R, XML, Go
            </div>
            <div style={{ marginBottom: "6px" }}>
              <strong>Technologies:</strong> React, Flutter, Firebase, Node.js, ReactJS, Git, MongoDB
            </div>
            <div style={{ marginBottom: "6px" }}>
              <strong>Developer Tools:</strong> VS Code, Android Studio, DataGrip, IntelliJ, PyCharm, Netlify
            </div>
          </div>
        )}
      </div>

      {/* Extracurricular - Always Show Section */}
      <div style={{ marginBottom: "18px" }}>
        <h2 style={{ 
          fontSize: "12px", 
          fontWeight: "bold", 
          marginBottom: "8px",
          textTransform: "uppercase",
          borderBottom: "1px solid #000",
          paddingBottom: "2px"
        }}>
          EXTRACURRICULAR
        </h2>
        {extracurricular && extracurricular.length > 0 ? (
          extracurricular.map((activity, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", fontSize: "11px" }}>
                    {activity.organizationName}
                  </div>
                  <div style={{ fontStyle: "italic", fontSize: "10px" }}>
                    {activity.roleName}
                  </div>
                  <div style={{ fontSize: "10px", marginTop: "2px" }}>
                    • {activity.description || "About the role and responsibilities carried out."}
                  </div>
                </div>
                <div style={{ textAlign: "right", fontSize: "10px", minWidth: "120px" }}>
                  <div style={{ fontWeight: "bold" }}>
                    {activity.startDate || "MM YYYY"} - {activity.endDate || "MM YYYY"}
                  </div>
                  <div style={{ fontStyle: "italic" }}>Location</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", fontSize: "11px" }}>Organization Name</div>
                <div style={{ fontStyle: "italic", fontSize: "10px" }}>Role</div>
                <div style={{ fontSize: "10px", marginTop: "2px" }}>
                  • About the role and responsibilities carried out.
                  <br />• Participation Certificate.
                </div>
              </div>
              <div style={{ textAlign: "right", fontSize: "10px", minWidth: "120px" }}>
                <div style={{ fontWeight: "bold" }}>MM YYYY - MM YYYY</div>
                <div style={{ fontStyle: "italic" }}>Location</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Certifications - Always Show Section */}
      <div style={{ marginBottom: "18px" }}>
        <h2 style={{ 
          fontSize: "12px", 
          fontWeight: "bold", 
          marginBottom: "8px",
          textTransform: "uppercase",
          borderBottom: "1px solid #000",
          paddingBottom: "2px"
        }}>
          CERTIFICATIONS
        </h2>
        {certifications && certifications.length > 0 ? (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(2, 1fr)", 
            gap: "8px 20px", 
            fontSize: "10px" 
          }}>
            {certifications.map((cert, index) => (
              <div key={index}>
                • {cert.name} - {cert.issuer}
                {cert.url && (
                  <a href={cert.url} style={{ color: "#0066cc", textDecoration: "none", marginLeft: "2px" }} target="_blank" rel="noopener noreferrer">
                    🔗
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(2, 1fr)", 
            gap: "8px 20px", 
            fontSize: "10px" 
          }}>
            <div>• ReactJS & Redux - Udemy</div>
            <div>• Java</div>
            <div>• Python for Data Science - XYZ</div>
            <div>• SQL</div>
            <div>• 5 Stars in C++ & SQL</div>
            <div>• MongoDB Basics</div>
            <div></div>
            <div>• Command Line in Linux - Coursera</div>
            <div></div>
            <div>• Microsoft AI Classroom - Microsoft</div>
            <div></div>
            <div>• NodeJS with Express & MongoDB - Udemy</div>
          </div>
        )}
      </div>

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div style={{ marginBottom: "18px" }}>
          <h2 style={{ 
            fontSize: "12px", 
            fontWeight: "bold", 
            marginBottom: "8px",
            textTransform: "uppercase",
            borderBottom: "1px solid #000",
            paddingBottom: "2px"
          }}>
            LANGUAGES
          </h2>
          <div style={{ fontSize: "10px" }}>
            {languages.map((lang, index) => (
              <div key={index} style={{ marginBottom: "2px" }}>
                <strong>{lang.language}:</strong> {lang.proficiency}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hobbies */}
      {hobbies?.hobbies && hobbies.hobbies.length > 0 && (
        <div style={{ marginBottom: "18px" }}>
          <h2 style={{ 
            fontSize: "12px", 
            fontWeight: "bold", 
            marginBottom: "8px",
            textTransform: "uppercase",
            borderBottom: "1px solid #000",
            paddingBottom: "2px"
          }}>
            INTERESTS & HOBBIES
          </h2>
          <div style={{ fontSize: "10px" }}>
            {hobbies.hobbies.join(", ")}
          </div>
        </div>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <h2 style={{ 
            fontSize: "12px", 
            fontWeight: "bold", 
            marginBottom: "8px",
            textTransform: "uppercase",
            borderBottom: "1px solid #000",
            paddingBottom: "2px"
          }}>
            REFERENCES
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}>
            {references.map((ref, index) => (
              <div key={index} style={{ fontSize: "10px" }}>
                <div style={{ fontWeight: "bold" }}>{ref.name}</div>
                <div>{ref.title}</div>
                <div>{ref.company}</div>
                <div>{ref.email}</div>
                <div>{ref.phone}</div>
                <div style={{ fontSize: "9px", color: "#666" }}>
                  Relationship: {ref.relationship}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}