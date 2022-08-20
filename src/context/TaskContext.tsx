import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';

import { ITask } from '../interfaces/ITask';

interface ITaskContext {
  taskItems: ITask[];
  addTask(text: string): void;
  deleteTask(id: string): void;
  taskDone(id: string): void;
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
        created_at: new Date(),
      },
    ]);
  };

  const deleteTask = (id: string) => {
    setTaskItems(taskItems.filter((task: ITask) => task.id !== id));
  };

  const taskDone = (id: string) => {
    const task = taskItems.find((task: ITask) => task.id === id);

    if (task) {
      task.done = !task.done;

      setTaskItems([...taskItems]);
    } else {
      Alert.alert('Ops!', 'Não foi possível marcar a tarefa como concluída.');
    }
  };

  return (
    <TaskContext.Provider
      value={{
        taskItems,
        addTask,
        deleteTask,
        taskDone,
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
