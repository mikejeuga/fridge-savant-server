const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../auth/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Bookmark = require('../models/Bookmark');

router.get('/', auth, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id });
    res.json(bookmarks);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { recipe } = req.body;

    try {
      const newBookmark = new Bookmark({
        recipe,
        user: req.user.id,
      });

      const bookmark = await newBookmark.save();
      res.json(bookmark);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/:id', auth, async (req, res) => {
  try {
    let bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark)
      return res.status(404).json({ msg: 'This bookmark does not exist' });

    if (bookmark.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'Not authorized' });
    }

    await Bookmark.findByIdAndRemove(req.params.id);

    res.json({ msg: 'This recipe is not bookmarked anymore ' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
