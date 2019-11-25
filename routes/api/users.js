const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route   POST api/users (the endpoint)'
// @desc    Register User.
// @access  public (meaning we don't need a passord to access it).
router.post(
	'/',
	[
		check('name', 'Please enter your name')
			.not()
			.isEmpty(),
		check('email', 'please enter a valid email').isEmail(),
		check('password', 'Enter a password with atleast 8 characters').isLength({
			min: 8
		})
	],
	async (req, res) => {
		// handling errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// to get the name email ..etc we use the req.body so it's better to destructure it:
		const { name, email, password } = req.body;

		try {
			// see if user exists
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exist' }] });
			}
			// get user's gravatar
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			user = new User({
				name,
				email,
				avatar,
				password
			});
			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();
			// go over the bcrypt docs

			// return jsonwebtoken

			res.send('User registered');
		} catch (err) {
			console.error(error.message);
			res.status(500).send('server error');
		}
	}
);

// and we ofcourse need to export it
module.exports = router;
