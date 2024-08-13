import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import HomePage from '../pages/homePage';
import {MemoryRouter} from "react-router-dom";

vi.mock('../context/AuthContext.jsx', () => ({
    useAuth: () => ({ user: { id: 'user1' } })
}));

describe('HomePage', () => {
    it('should render all child components', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        expect(screen.getByText('欢迎使用SimpleBoard')).toBeInTheDocument();

        expect(screen.getByText('功能介绍')).toBeInTheDocument();
        expect(screen.getByText('项目创建')).toBeInTheDocument();
        expect(screen.getByText('任务添加')).toBeInTheDocument();
        expect(screen.getByText('看板展示')).toBeInTheDocument();

        expect(screen.getByText('开始使用')).toBeInTheDocument();
    });
});
