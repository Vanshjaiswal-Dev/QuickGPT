import { describe, it, expect, vi } from 'vitest';
import { registerUser, loginUser } from '../controllers/userController.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

vi.mock('../models/User.js');
vi.mock('bcryptjs');
vi.mock('jsonwebtoken');

describe('User Controller', () => {
    describe('registerUser', () => {
        it('should return 409 if user already exists', async () => {
            const req = { body: { email: 'test@test.com', name: 'Test', password: 'password' } };
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

            User.findOne.mockResolvedValue({ email: 'test@test.com' });

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: 'User already exists' });
        });

        it('should create user and return 201 with token', async () => {
            const req = { body: { email: 'new@test.com', name: 'Test', password: 'password' } };
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue({ _id: '123', email: 'new@test.com' });
            jwt.sign.mockReturnValue('test-token');

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ success: true, token: 'test-token' });
        });
    });

    describe('loginUser', () => {
        it('should return 401 on invalid credentials', async () => {
            const req = { body: { email: 'test@test.com', password: 'wrong' } };
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

            User.findOne.mockResolvedValue(null);

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Invalid email or password' });
        });

        it('should return 200 and token on success', async () => {
            const req = { body: { email: 'test@test.com', password: 'password' } };
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

            User.findOne.mockResolvedValue({ _id: '123', password: 'hashed' });
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('test-token');

            await loginUser(req, res);

            expect(res.json).toHaveBeenCalledWith({ success: true, token: 'test-token' });
        });
    });
});
