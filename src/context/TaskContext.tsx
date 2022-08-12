import React, { createContext, useContext, useState } from 'react';

import { ITask } from '../interfaces/ITask';

interface ITaskContext {
  taskItems: ITask[];
  addTask(text: string): void;
  deleteTask(id: string): void;
}

const TaskContext = createContext<ITaskContext>({} as ITaskContext);

const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const TaskProvider = ({ children }: any) => {
  const [taskItems, setTaskItems] = useState<ITask[]>([]);

  const addTask = (text: string) => {
    setTaskItems([
      ...taskItems,
      {
        id: generateRandomId(),
        text,
        done: false,
      },
    ]);
  };

  const deleteTask = (id: string) => {
    setTaskItems(taskItems.filter((task: ITask) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        taskItems,
        addTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export function useTask() {
  const context = useContext(TaskContext);

  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }

  return context;
}

export default TaskContext;
