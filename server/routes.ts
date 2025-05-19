import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMoodEntrySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get all mood entries
  app.get("/api/mood-entries", async (_req: Request, res: Response) => {
    try {
      const entries = await storage.getAllMoodEntries();
      res.json(entries);
    } catch (error) {
      console.error("Error fetching mood entries:", error);
      res.status(500).json({ error: "Failed to fetch mood entries" });
    }
  });

  // API route to get a single mood entry
  app.get("/api/mood-entries/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const entry = await storage.getMoodEntry(id);
      if (!entry) {
        return res.status(404).json({ error: "Mood entry not found" });
      }

      res.json(entry);
    } catch (error) {
      console.error("Error fetching mood entry:", error);
      res.status(500).json({ error: "Failed to fetch mood entry" });
    }
  });

  // API route to create a new mood entry
  app.post("/api/mood-entries", async (req: Request, res: Response) => {
    try {
      // Validate the request body using Zod schema
      const validatedData = insertMoodEntrySchema.parse(req.body);
      
      // Create the mood entry in the database
      const newEntry = await storage.createMoodEntry(validatedData);
      
      res.status(201).json(newEntry);
    } catch (error) {
      console.error("Error creating mood entry:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid request data", 
          details: error.errors 
        });
      }
      
      res.status(500).json({ error: "Failed to create mood entry" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
