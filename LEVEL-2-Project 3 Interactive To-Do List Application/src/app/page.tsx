'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

// Task interface
interface Task {
  id: string;
  date: string; // Store date as a string (e.g., '2025-07-13')
  description: string;
  completed: boolean;
}

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');
  const [newTaskDate, setNewTaskDate] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState<string>('');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('todoTasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage on update
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskDescription.trim() === '' || newTaskDate === '') return;

    const newTask: Task = {
      id: Date.now().toString(),
      description: newTaskDescription.trim(),
      date: newTaskDate,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskDescription('');
    setNewTaskDate('');
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = (id: string) => {
    if (editedDescription.trim() === '') return;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, description: editedDescription.trim() } : task
      )
    );
    setEditingTaskId(null);
    setEditedDescription('');
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedDescription('');
  };
{/*style={{backgroundColor:"#F7FAFC"}}*/}
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Head>
        <title>To-Do List</title>
        <meta name="description" content="Simple To-Do List with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-300 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My To-Do List</h1>

        <form onSubmit={handleAddTask} className="space-y-4 mb-6">
          <input
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Add a new task!"
            className="w-full p-3 bg-white text-lg border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
            className="w-full p-3  bg-white text-lg border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            Add Task
          </button>
        </form>

        <ul className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-900 italic mt-8">No tasks yet! Add one above.</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm"
              >
                {editingTaskId === task.id ? (
                  <div className="flex items-center w-full space-x-2">
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="flex-grow p-2 text-md border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      className="px-3 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        className="form-checkbox h-5 w-5 text-gray-900"
                      />
                      <div>
                        <p
                          className={`text-lg ${
                            task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                          }`}
                        >
                          {task.description}
                        </p>
                        <p className="text-sm text-red-500">Due: {task.date}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="px-3 py-2 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="px-3 py-2 bg-black text-white text-sm rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
