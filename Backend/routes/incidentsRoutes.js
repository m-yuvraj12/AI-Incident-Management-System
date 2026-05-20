import express from "express";
import pool from "../config/database.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const genAI = new GoogleGenerativeAI("AIzaSyBgqz9ZmpjnNW5zFY3Cov_VfYcZBOI_YY8"); // Replace with your API key

// Function to get AI suggestion
async function generateAISuggestion(description) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(`Suggest a quick resolution for: ${description}`);
        const response = await result.response.text();
        
        // Limit response to 4-5 lines
        return response.split("\n").slice(0,15).join(" ");
    } catch (error) {
        console.error("AI Generation Error:", error);
        return "AI suggestion not available"; // Default message if AI fails
    }
}

// Route to create an incident with AI suggestion
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM incidents WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Incident not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching incident:", error);
        res.status(500).json({ error: "Failed to fetch incident" });
    }
});
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM incidents ORDER BY created_at DESC;");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching incidents:", error);
        res.status(500).json({ error: "Failed to fetch incidents" });
    }
});
router.post("/", async (req, res) => {
    try {
        const { title, description, priority, reportedBy, assignedTo } = req.body;

        // Validate required fields
        if (!title || !description || !reportedBy) {
            return res.status(400).json({ error: "Title, description, and reportedBy are required" });
        }

        // Generate AI suggestion
        const aiSuggestion = await generateAISuggestion(description);

        // Insert into database with AI suggestion
        const result = await pool.query(
            `INSERT INTO incidents (title, description, priority, reported_by, assigned_to, status, ai_suggestion, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, 'Open', $6, NOW(), NOW()) RETURNING *;`,
            [title, description, priority, reportedBy, assignedTo || null, aiSuggestion]
        );

        res.status(201).json({
            message: "Incident created successfully",
            incident: result.rows[0]
        });

    } catch (err) {
        console.error("Error creating incident:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
