import UserController from '../controllers/userController';
import User from '../models/User';

jest.mock('../models/User');

const mockUser1 = {
	_id: '1',
	nickname: 'TestUser1',
	age: 25,
	city: 'TestCity1',
};
const mockUser2 = {
	_id: '2',
	nickname: 'TestUser2',
	age: 25,
	city: 'TestCity2',
};
const mockUsers = [mockUser1, mockUser2];
const mockUserError = {};

describe('UserController', () => {
	describe('createUser', () => {
		it('should create a new user and return it', async () => {
			const req = {body: mockUser1};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			User.prototype.save = jest.fn().mockResolvedValue(mockUser1);

			await UserController.createUser(req, res);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith(mockUser1);
			expect(User.prototype.save).toHaveBeenCalled();
		});
		it('should handle errors', async () => {
			const req = {body: mockUserError};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			User.prototype.save = jest
				.fn()
				.mockRejectedValue(new Error('Error saving user'));

			await UserController.createUser(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({message: 'Error saving user'});
		});
	});
	describe('getAllUsers', () => {
		it('should retrieve all users and return them', async () => {
			const req = {};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			User.find.mockResolvedValue(mockUsers);

			await UserController.getAllUsers(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(mockUsers);
		});
	});
	describe('getUserById', () => {
		it('should return a user if the user is found', async () => {
			const req = {params: {id: mockUser1._id}};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};
			User.findById.mockResolvedValue(mockUser1);

			await UserController.getUserById(req, res);

			expect(User.findById).toHaveBeenCalledWith(mockUser1._id);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(mockUser1);
		});

		it('should return 404 if the user is not found', async () => {
			const req = {params: {id: 'nonExistingId'}};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};
			User.findById.mockResolvedValue(null);

			await UserController.getUserById(req, res);

			expect(User.findById).toHaveBeenCalledWith('nonExistingId');
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({message: 'User not found'});
		});
	});
	describe('deleteUser', () => {
		it('should delete a user and return the deleted user', async () => {
			const req = {params: {id: mockUser1._id}};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			// Mock the User.findByIdAndDelete method
			User.findByIdAndDelete.mockResolvedValue(mockUser1);

			await UserController.deleteUser(req, res);

			expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockUser1._id);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(mockUser1);
		});

		it('should return 404 if the user is not found', async () => {
			const req = {params: {id: mockUser1._id}};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			// Simulate the case where the user is not found
			User.findByIdAndDelete.mockResolvedValue(null);

			await UserController.deleteUser(req, res);

			expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockUser1._id);
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({message: 'User not found'});
		});
	});
});
