import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Resume routes
  app.post('/api/resumes', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { title, template, data } = req.body;
      
      const resume = await storage.createResume({
        userId,
        title: title || 'My Resume',
        template: template || 'modern',
        data: JSON.stringify(data || {}),
        isPublic: false
      });
      
      res.json(resume);
    } catch (error) {
      console.error("Error creating resume:", error);
      res.status(500).json({ message: "Failed to create resume" });
    }
  });

  app.get('/api/resumes', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const resumes = await storage.getUserResumes(userId);
      res.json(resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      res.status(500).json({ message: "Failed to fetch resumes" });
    }
  });

  app.get('/api/resumes/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const resumeId = parseInt(req.params.id);
      const resume = await storage.getResume(resumeId, userId);
      
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      res.json(resume);
    } catch (error) {
      console.error("Error fetching resume:", error);
      res.status(500).json({ message: "Failed to fetch resume" });
    }
  });

  app.put('/api/resumes/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const resumeId = parseInt(req.params.id);
      const { title, template, data } = req.body;
      
      const resume = await storage.updateResume(resumeId, userId, {
        title,
        template,
        data: JSON.stringify(data)
      });
      
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      res.json(resume);
    } catch (error) {
      console.error("Error updating resume:", error);
      res.status(500).json({ message: "Failed to update resume" });
    }
  });

  app.delete('/api/resumes/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const resumeId = parseInt(req.params.id);
      
      const success = await storage.deleteResume(resumeId, userId);
      
      if (!success) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      res.json({ message: "Resume deleted successfully" });
    } catch (error) {
      console.error("Error deleting resume:", error);
      res.status(500).json({ message: "Failed to delete resume" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
