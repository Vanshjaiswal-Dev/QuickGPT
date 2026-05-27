import { describe, it, expect, vi } from 'vitest';
import { protect } from '../middlewares/auth.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

vi.mock('jsonwebtoken');
vi.mock('../models/User.js');

describe('Auth Middleware', () => {
    it('should return 401 if no token is provided', async () => {
        const req = { headers: {} };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        const next = vi.fn();

        await protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Not authorized, no token' });
    });

    it('should return 401 if token is invalid', async () => {
        const req = { headers: { authorization: 'Bearer invalid-token' } };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        const next = vi.fn();

        jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

        await protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Not authorized, token failed' });
    });

    it('should call next and set req.user if token is valid', async () => {
        const req = { headers: { authorization: 'Bearer valid-token' } };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        const next = vi.fn();
        const mockUser = { _id: '123', name: 'Test User' };

        jwt.verify.mockReturnValue({ id: '123' });
        User.findById.mockResolvedValue(mockUser);

        await protect(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith('valid-token', process.env.JWT_SECRET);
        expect(User.findById).toHaveBeenCalledWith('123');
        expect(req.user).toEqual(mockUser);
        expect(next).toHaveBeenCalled();
    });
});
