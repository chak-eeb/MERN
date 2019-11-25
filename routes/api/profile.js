const express = require('express');
const router = express.Router();

// @route   GET api/profile (the endpoint)'
// @desc    test route.
// @access  public (meaning we don't need a passord to access it).
router.get('/', (req, res) => res.send('profile route'));

// and we ofcourse need to export it
module.exports = router;
