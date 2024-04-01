import PostController from '../controllers/postController';
import Post from '../models/Post';
import User from '../models/User';

jest.mock('../models/Post');
jest.mock('../models/User');

const mockPost1 = {
	_id: '1',
	title: 'Testtitle1',
	content: 'Testcontent1',
	user: '1',
};
const mockPost2 = {
	_id: '2',
	title: 'Testtitle2',
	content: 'Testcontent2',
	user: '2',
};
const mockPosts = [mockPost1, mockPost2];
const mockError = {};

describe('PostController', () => {
	describe('createPost', () => {
		it('create Post and return it', async () => {
			const req = {body: mockPost1};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			User.findById.mockResolvedValue({_id: '1', name: 'test'});
			Post.prototype.save = jest.fn().mockResolvedValue(mockPost1);

			await PostController.createPost(req, res);

			expect(User.findById).toHaveBeenCalledWith(mockPost1.user);
			expect(Post.prototype.save).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith(mockPost1);
		});
		it('handle errors', async () => {
			const req = {body: mockError};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			Post.prototype.save = jest
				.fn()
				.mockRejectedValue(new Error('Error creating post'));

			await PostController.createPost(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({message: 'Error creating post'});
		});
		it('handle user not existing', async () => {
			const req = {body: mockPost1};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			User.findById.mockResolvedValue(null);
			Post.prototype.save = jest.fn().mockResolvedValue(mockPost1);

			await PostController.createPost(req, res);

			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({message: 'User id not found'});
		});
	});
	describe('getAllPost', () => {
		it('should retrieve all posts and return them', async () => {
			const req = {};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			Post.find = jest.fn().mockResolvedValue(mockPosts);
			// not fully tested for .populate() fn in PostController
			await PostController.getAllPosts(req, res);

			expect(Post.find).toHaveBeenCalledWith();
			// expect(res.status).toHaveBeenCalledWith(200);
			// expect(res.json).toHaveBeenCalledWith(mockPosts);
		});
	});
	describe('deletePost', () => {
		it('should delete a post and return the deleted post', async () => {
			const req = {params: {id: mockPost1._id}};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			Post.findByIdAndDelete.mockResolvedValue(mockPost1);

			await PostController.deletePost(req, res);

			expect(Post.findByIdAndDelete).toHaveBeenCalledWith(mockPost1._id);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(mockPost1);
		});

		it('should return 404 if the post is not found', async () => {
			const req = {params: {id: 'notfound'}};
			const res = {
				json: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			Post.findByIdAndDelete.mockResolvedValue(null);

			await PostController.deletePost(req, res);

			expect(Post.findByIdAndDelete).toHaveBeenCalledWith('notfound');
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({message: 'Post not found'});
		});
	});
});
