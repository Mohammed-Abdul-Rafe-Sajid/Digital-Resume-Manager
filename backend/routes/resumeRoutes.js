const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const authMiddleware = require("../middleware/auth");  // ✅ fixed import

// CREATE Resume
router.post("/", authMiddleware, async (req, res) => {
  try {
    const resume = new Resume({ ...req.body, user: req.user.id });
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ
router.get("/", authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Resume not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: "Resume not found" });
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE Resume
router.post("/", authMiddleware, async (req, res) => {
  console.log("✅ /api/resumes route hit");
  console.log("User:", req.user);
  console.log("Body:", req.body);

  try {
    const resume = new Resume({ ...req.body, user: req.user.id });
    console.log("🧱 Resume object created");

    await resume.save();
    console.log("💾 Resume saved");

    res.status(201).json(resume);
    console.log("✅ Response sent");
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
