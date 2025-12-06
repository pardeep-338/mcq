const express = require('express');
const jwt = require('jsonwebtoken');
const Score = require('../models/Score');

const router = express.Router();

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (err) { res.status(401).json({ message: 'Invalid token' }); }
}

// Post a new score
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { score, total, username } = req.body;
    if (typeof score !== 'number' || typeof total !== 'number') return res.status(400).json({ message: 'Invalid score' });
    const s = new Score({ user: req.userId, score, total, username });
    await s.save();
    res.json(s);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// Get top leaderboard
router.get('/top', async (req, res) => {
  try {
    const top = await Score.find().sort({ score: -1, createdAt: 1 }).limit(50).select('-__v').lean();
    res.json(top);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
