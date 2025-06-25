import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Local development authentication
const mockUser = {
  id: 'local-dev-user-123',
  email: 'dev@localhost.com',
  firstName: 'Local',
  lastName: 'Developer',
  profileImageUrl: null
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Local auth routes
  app.get('/api/login', async (req, res) => {
    // For local development, automatically "log in" the user
    await storage.upsertUser(mockUser);
    res.redirect('/');
  });

  app.get('/api/auth/user', async (req, res) => {
    try {
      // For local development, always return the mock user
      const user = await storage.getUser(mockUser.id);
      res.json(user || mockUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Resume routes - no auth check needed for local development
  app.post('/api/resumes', async (req, res) => {
    try {
      const { title, template, data } = req.body;
      
      const resume = await storage.createResume({
        userId: mockUser.id,
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

  app.get('/api/resumes', async (req, res) => {
    try {
      const resumes = await storage.getUserResumes(mockUser.id);
      res.json(resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      res.status(500).json({ message: "Failed to fetch resumes" });
    }
  });

  app.get('/api/resumes/:id', async (req, res) => {
    try {
      const resumeId = parseInt(req.params.id);
      const resume = await storage.getResume(resumeId, mockUser.id);
      
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      res.json(resume);
    } catch (error) {
      console.error("Error fetching resume:", error);
      res.status(500).json({ message: "Failed to fetch resume" });
    }
  });

  app.put('/api/resumes/:id', async (req, res) => {
    try {
      const resumeId = parseInt(req.params.id);
      const { title, template, data } = req.body;
      
      const resume = await storage.updateResume(resumeId, mockUser.id, {
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

  app.delete('/api/resumes/:id', async (req, res) => {
    try {
      const resumeId = parseInt(req.params.id);
      
      const success = await storage.deleteResume(resumeId, mockUser.id);
      
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
