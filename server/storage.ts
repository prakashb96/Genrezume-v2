import {
  users,
  resumes,
  type User,
  type UpsertUser,
  type Resume,
  type InsertResume,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Resume operations
  createResume(resume: Omit<InsertResume, 'id'>): Promise<Resume>;
  getUserResumes(userId: string): Promise<Resume[]>;
  getResume(id: number, userId: string): Promise<Resume | undefined>;
  updateResume(id: number, userId: string, data: Partial<InsertResume>): Promise<Resume | undefined>;
  deleteResume(id: number, userId: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async createResume(resumeData: Omit<InsertResume, 'id'>): Promise<Resume> {
    const result = await db
      .insert(resumes)
      .values(resumeData)
      .returning();

    return result[0];
  }

  async getUserResumes(userId: string): Promise<Resume[]> {
    const result = await db
      .select()
      .from(resumes)
      .where(eq(resumes.userId, userId))
      .orderBy(desc(resumes.id));

    return result;
  }

  async getResume(id: number, userId: string): Promise<Resume | undefined> {
    const result = await db
      .select()
      .from(resumes)
      .where(and(eq(resumes.id, id), eq(resumes.userId, userId)))
      .limit(1);

    return result[0];
  }

  async updateResume(id: number, userId: string, data: Partial<InsertResume>): Promise<Resume | undefined> {
    const result = await db
      .update(resumes)
      .set(data)
      .where(and(eq(resumes.id, id), eq(resumes.userId, userId)))
      .returning();

    return result[0];
  }

  async deleteResume(id: number, userId: string): Promise<boolean> {
    const result = await db
      .delete(resumes)
      .where(and(eq(resumes.id, id), eq(resumes.userId, userId)));

    return result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();
