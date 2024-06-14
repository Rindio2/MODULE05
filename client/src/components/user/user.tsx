import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserComponent = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [newTask, setNewTask] = useState({ name: '', status: false });
    const [editTaskId, setEditTaskId] = useState<number | null>(null); // ID của task đang được chỉnh sửa

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/tasks');
            setTasks(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleAddTask = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/tasks', newTask);
            const addedTask = { id: response.data.taskId, name: newTask.name, status: newTask.status };
            setTasks([...tasks, addedTask]);
            setNewTask({ name: '', status: false });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleEditTask = async (taskId: number) => {
        try {
            const editedTask = tasks.find(task => task.id === taskId);
            if (!editedTask) {
                console.error('Task not found for editing.');
                return;
            }
    
            const response = await axios.put(`http://localhost:8080/api/v1/tasks/${taskId}`, editedTask);
            const updatedTask = response.data; // Assuming response.data contains the updated task object
            const updatedTasks = tasks.map(task => (task.id === taskId ? updatedTask : task));
            setTasks(updatedTasks);
            setEditTaskId(null);
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/tasks/${taskId}`);
            const filteredTasks = tasks.filter(task => task.id !== taskId);
            setTasks(filteredTasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleStatus = async (taskId: number, currentStatus: boolean) => {
        try {
            const updatedTask = { ...tasks.find(task => task.id === taskId), status: !currentStatus };
            const response = await axios.put(`http://localhost:8080/api/v1/tasks/${taskId}`, updatedTask);
            const updatedTasks = tasks.map(task => (task.id === taskId ? response.data : task));
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error toggling task status:', error);
        }
    };

    const handleEditInputChange = (taskId: number, newName: string) => {
        const updatedTasks = tasks.map(task => ({
            ...task,
            name: task.id === taskId ? newName : task.name
        }));
        setTasks(updatedTasks);
    };

    return (
        <div>
            <h1>User Tasks</h1>
            <div>
                <input
                    type="text"
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    placeholder="Task name"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <div>
                {tasks && tasks.length > 0 ? (
                    <ul>
                        {tasks.map((task) => (
                            <li key={task.id}>
                                <input
                                    type="text"
                                    value={task.name}
                                    onChange={(e) => handleEditInputChange(task.id, e.target.value)}
                                    disabled={editTaskId !== null && editTaskId !== task.id}
                                />
                                <button onClick={() => handleEditTask(task.id)} disabled={editTaskId !== task.id}>Save</button>
                                <button onClick={() => setEditTaskId(task.id)} disabled={editTaskId !== null}>Edit</button>
                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                <input
                                    type="checkbox"
                                    checked={task.status}
                                    onChange={() => handleToggleStatus(task.id, task.status)}
                                />
                                <label>Completed</label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tasks found</p>
                )}
            </div>
        </div>
    );
};

export default UserComponent;
