import User from '../models/User.js';

const UserController = {
	// Create new user
	createUser: async (req, res) => {
		try {
			const newUser = new User(req.body);
			const savedUser = await newUser.save();
			res.status(201).json(savedUser);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},
	// Get all users
	getAllUsers: async (req, res) => {
		try {
			const users = await User.find();
			res.status(200).json(users);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},
	// filter users
	searchAllUsers: async (req, res) => {
		try {
			const userQuery = {};
			const {userName, userAge, userMinAge, userMaxAge, userCity} = req.query;

			userName && (userQuery.nickname = {$regex: userName, $options: 'i'});
			userAge && (userQuery.age = {$eq: Number(req.query.userAge)});
			userMinAge && (userQuery.age = {$gte: Number(req.query.userMinAge)});
			userMaxAge && (userQuery.age = {$lte: Number(req.query.userMaxAge)});
			userCity && (userQuery.city = {$regex: userCity, $options: 'i'});
			const users = await User.find(userQuery);
			res.status(200).json(users);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},
	// Get user by ID
	getUserById: async (req, res) => {
		try {
			const user = await User.findById(req.params.id);
			if (!user) return res.status(404).json({message: 'User not found'});
			res.status(200).json(user);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},
	// Update an user info
	updateUser: async (req, res) => {
		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				req.body,
				{new: true}
			);
			if (!updatedUser)
				return res.status(404).json({message: 'User not found'});
			res.status(200).json(updatedUser);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},
	// Delete an user
	deleteUser: async (req, res) => {
		try {
			const deletedUser = await User.findByIdAndDelete(req.params.id);
			if (!deletedUser)
				return res.status(404).json({message: 'User not found'});
			res.status(200).json(deletedUser);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},
};
export default UserController;
