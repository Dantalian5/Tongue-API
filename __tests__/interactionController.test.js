import InteractionController from '../controllers/interactionController';
import Post from '../models/Post';
import User from '../models/User';
import Interaction from '../models/Interaction';

jest.mock('../models/Post');
jest.mock('../models/User');
jest.mock('../models/Interaction');

const mockInt1 = {
	_id: '1',
	type: 'like',
	content: 'Testcontent1',
	user: '1',
	post: '1',
};
const mockInt2 = {
	_id: '2',
	type: 'comment',
	content: 'Testcontent2',
	user: '2',
	post: '2',
};
const mockInts = [mockInt1, mockInt2];
const mockError = {};

describe('InteractionController', () => {
	describe('createInteraction', () => {
		it('create Interaction and return it', async () => {
			const req = {body: mockInt1};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			User.findById.mockResolvedValue({_id: '1'});
			Post.findById.mockResolvedValue({_id: '1'});
			Interaction.prototype.save = jest.fn().mockResolvedValue(mockInt1);
			Post.findByIdAndUpdate = jest.fn().mockResolvedValue({});

			await InteractionController.createInteraction(req, res);

			expect(User.findById).toHaveBeenCalledWith('1');
			expect(Post.findById).toHaveBeenCalledWith('1');
			expect(Interaction.prototype.save).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith(mockInt1);
		});
		it('handle errors', async () => {
			const req = {body: mockError};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			Interaction.prototype.save = jest
				.fn()
				.mockRejectedValue(new Error('Error creating interaction'));

			await InteractionController.createInteraction(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				message: 'Error creating interaction',
			});
		});
		it('user or post not existing', async () => {
			const req = {body: mockInt1};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			User.findById.mockResolvedValue(null);
			Post.findById.mockResolvedValue(null);

			await InteractionController.createInteraction(req, res);

			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({
				message: 'User or Post not found',
			});
		});
	});
	describe('getAllInteractions', () => {
		it('should retrieve all interactions', async () => {
			const req = {};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			Interaction.find.mockResolvedValue(mockInts);

			await InteractionController.getAllInteractions(req, res);

			expect(Interaction.find).toHaveBeenCalled();
		});
	});
	describe('deleteInteraction', () => {
		it('should delete an interaction and return it', async () => {
			const req = {params: {id: mockInt1._id}};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			Interaction.findByIdAndDelete.mockResolvedValue(mockInt1);
			Post.findByIdAndUpdate = jest.fn().mockResolvedValue({});

			await InteractionController.deleteInteraction(req, res);

			expect(Interaction.findByIdAndDelete).toHaveBeenCalledWith(mockInt1._id);
			expect(Post.findByIdAndUpdate).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(mockInt1);
		});

		it('should return 404 if the interaction is not found', async () => {
			const req = {params: {id: 'notexisting'}};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			Interaction.findByIdAndDelete.mockResolvedValue(null);

			await InteractionController.deleteInteraction(req, res);

			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({message: 'Interaction not found'});
		});
	});
});
