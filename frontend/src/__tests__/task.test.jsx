import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Task from '../components/Boardpage/Project/Task/Task.jsx';
import '@testing-library/jest-dom';
import TaskModal from '../components/Boardpage/Project/Task/TaskModal.jsx';

vi.mock('../context/AuthContext.jsx', () => ({
    useAuth: () => ({ user: { id: 'user1' } })
}));

describe('Task Component', () => {
    const mockTasks = [
        { id: '1', title: 'Task 1' },
        { id: '2', title: 'Task 2' }
    ];

    const mockDeleteTask = vi.fn();
    const mockOnTaskUpdated = vi.fn();

    it('renders tasks correctly', () => {
        render(
            <Task
                projectID="123"
                tasks={mockTasks}
                deleteTask={mockDeleteTask}
                showDelete={true}
                onTaskUpdated={mockOnTaskUpdated}
            />
        );

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    it('toggles TaskModal on task button click', () => {
        render(
            <Task
                projectID="123"
                tasks={mockTasks}
                deleteTask={mockDeleteTask}
                showDelete={true}
                onTaskUpdated={mockOnTaskUpdated}
            />
        );

        const taskButton = screen.getAllByText('Task 1')[0]; // 获取第一个匹配的任务按钮

        fireEvent.click(taskButton);

        expect(screen.getByRole('dialog')).toBeInTheDocument();

        fireEvent.click(taskButton);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('calls deleteTask when delete button is clicked', () => {
        render(
            <Task
                projectID="123"
                tasks={mockTasks}
                deleteTask={mockDeleteTask}
                showDelete={true}
                onTaskUpdated={mockOnTaskUpdated}
            />
        );

        fireEvent.click(screen.getAllByText('×')[0]);

        expect(mockDeleteTask).toHaveBeenCalledWith('123', '1');
    });
});