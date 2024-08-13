import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import BoardPage from '../pages/boardPage';
import axios from 'axios';

vi.mock('../context/AuthContext.jsx', () => ({
    useAuth: () => ({ user: { id: 'user1' } })
}));
vi.mock('axios');

vi.mocked(axios.get).mockResolvedValue({
    data: { data: [{ id: '1', name: 'Project 1' }, { id: '2', name: 'Project 2'}, { id: '3', name: 'Project 3'}] }
});

describe('BoardPage', () => {
    it('should render Projects component with projects', async () => {
        render(<BoardPage />);
        expect(await screen.findByText('Project 1')).toBeInTheDocument();
        expect(await screen.findByText('Project 2')).toBeInTheDocument();
        expect(await screen.findByText('Project 3')).toBeInTheDocument();
    });
});
