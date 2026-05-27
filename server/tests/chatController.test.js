import { describe, it, expect, vi } from 'vitest';
import { createChat, getChats, deleteChat } from '../controllers/chatController.js';
import Chat from '../models/chat.js';

vi.mock('../models/chat.js');

describe('Chat Controller', () => {
    describe('createChat', () => {
        it('should create a chat and return 201', async () => {
            const req = { user: { _id: '123', name: 'User' } };
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

            Chat.create.mockResolvedValue({});

            await createChat(req, res);

            expect(Chat.create).toHaveBeenCalledWith({
                userId: '123',
                messages: [],
                name: 'New Chat',
                userName: 'User'
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Chat created successfully' });
        });
    });

    describe('getChats', () => {
        it('should fetch chats for user', async () => {
            const req = { user: { _id: '123' } };
            const res = { json: vi.fn(), status: vi.fn().mockReturnThis() };

            const mockChats = [{ _id: 'chat1' }];
            const sortMock = vi.fn().mockResolvedValue(mockChats);
            Chat.find.mockReturnValue({ sort: sortMock });

            await getChats(req, res);

            expect(Chat.find).toHaveBeenCalledWith({ userId: '123' });
            expect(res.json).toHaveBeenCalledWith({ success: true, chats: mockChats });
        });
    });

    describe('deleteChat', () => {
        it('should delete a chat', async () => {
            const req = { user: { _id: '123' }, params: { chatId: 'chat1' } };
            const res = { json: vi.fn(), status: vi.fn().mockReturnThis() };

            Chat.deleteOne.mockResolvedValue({ deletedCount: 1 });

            await deleteChat(req, res);

            expect(Chat.deleteOne).toHaveBeenCalledWith({ _id: 'chat1', userId: '123' });
            expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Chat deleted successfully' });
        });
    });
});
