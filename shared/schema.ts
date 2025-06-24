import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  title: text("title").notNull(),
  template: text("template").notNull().default("modern"),
  data: jsonb("data").notNull(),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Resume data structure
export const personalDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  title: z.string().min(1, "Professional title is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  portfolio: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  photo: z.string().optional(),
});

export const profileSummarySchema = z.object({
  summary: z.string().min(50, "Profile summary should be at least 50 characters"),
});

export const educationItemSchema = z.object({
  id: z.string(),
  collegeName: z.string().min(1, "College name is required"),
  degreeName: z.string().min(1, "Degree name is required"),
  cgpa: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export const internshipItemSchema = z.object({
  id: z.string(),
  companyName: z.string().min(1, "Company name is required"),
  roleName: z.string().min(1, "Role name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  description: z.string().optional(),
});

export const extracurricularItemSchema = z.object({
  id: z.string(),
  organizationName: z.string().min(1, "Organization name is required"),
  roleName: z.string().min(1, "Role name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export const projectItemSchema = z.object({
  id: z.string(),
  projectName: z.string().min(1, "Project name is required"),
  technologyStack: z.string().min(1, "Technology stack is required"),
  description: z.string().min(1, "Project description is required"),
  keyPoints: z.array(z.string()).default([]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  downloadLink: z.string().optional(),
});

export const courseworkSkillsSchema = z.object({
  selectedCourses: z.array(z.string()).default([]),
});

export const technicalSkillsSchema = z.object({
  languages: z.array(z.string()).default([]),
  developerTools: z.array(z.string()).default([]),
  technologiesFrameworks: z.array(z.string()).default([]),
});

export const certificationItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().min(1, "Date is required"),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  url: z.string().url().optional().or(z.literal("")),
});

export const languageItemSchema = z.object({
  id: z.string(),
  language: z.string().min(1, "Language is required"),
  proficiency: z.enum(["Beginner", "Intermediate", "Advanced", "Native"]),
});

export const hobbiesSchema = z.object({
  hobbies: z.array(z.string()).default([]),
});

export const referenceItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  relationship: z.string().min(1, "Relationship is required"),
});

export const resumeDataSchema = z.object({
  personalDetails: personalDetailsSchema.optional(),
  profileSummary: profileSummarySchema.optional(),
  education: z.array(educationItemSchema).default([]),
  coursework: z.array(z.string()).default([]),
  courseworkSkills: courseworkSkillsSchema.optional(),
  projects: z.array(projectItemSchema).default([]),
  internships: z.array(internshipItemSchema).default([]),
  technicalSkills: technicalSkillsSchema.optional(),
  extracurricular: z.array(extracurricularItemSchema).default([]),
  certifications: z.array(certificationItemSchema).default([]),
  languages: z.array(languageItemSchema).default([]),
  hobbies: hobbiesSchema.optional(),
  references: z.array(referenceItemSchema).default([]),
});

export const insertUserSchema = createInsertSchema(users).omit({ 
  createdAt: true, 
  updatedAt: true 
});
export const insertResumeSchema = createInsertSchema(resumes).omit({ id: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = typeof users.$inferInsert;
export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type ResumeData = z.infer<typeof resumeDataSchema>;
export type PersonalDetails = z.infer<typeof personalDetailsSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type InternshipItem = z.infer<typeof internshipItemSchema>;
export type ExtracurricularItem = z.infer<typeof extracurricularItemSchema>;
export type ProjectItem = z.infer<typeof projectItemSchema>;
export type CourseworkSkills = z.infer<typeof courseworkSkillsSchema>;
export type TechnicalSkills = z.infer<typeof technicalSkillsSchema>;
export type CertificationItem = z.infer<typeof certificationItemSchema>;
export type LanguageItem = z.infer<typeof languageItemSchema>;
export type Hobbies = z.infer<typeof hobbiesSchema>;
export type ReferenceItem = z.infer<typeof referenceItemSchema>;
