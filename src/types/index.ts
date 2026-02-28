export interface User {
  name: string;
  email: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

export interface DailyLogEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'okay' | 'bad';
  productivity: number;
  notes: string;
}

export interface DocItem {
  id: string;
  title: string;
  folder: string;
  content: string;
  updatedAt: string;
  versions: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type ColumnId = 'backlog' | 'todo' | 'inProgress' | 'review' | 'done';
