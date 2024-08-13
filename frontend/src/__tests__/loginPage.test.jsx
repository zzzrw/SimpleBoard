import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import LoginPage from '../pages/loginPage.jsx';
import {describe, it, expect, vi} from 'vitest';
import '@testing-library/jest-dom';
import {MemoryRouter} from "react-router-dom";

vi.mock('../context/AuthContext.jsx', () => ({
    useAuth: () => ({user: null})
}));

describe('LoginPage', () => {
    it('should render all child components', () => {
        render(
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>);

        expect(screen.getByText(/注册/i)).toBeInTheDocument();

        const loginButton = screen.getByRole('button', { name: /登录/i });
        expect(loginButton).toBeInTheDocument();
        fireEvent.click(loginButton);

        const registerButton = screen.getByRole('button', { name: /没有账号？点此注册/i });
        fireEvent.click(registerButton);

        fireEvent.click(screen.getByText(/忘记密码/i));
        expect(screen.getByText(/修改密码/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/提交/i));
    })
});
