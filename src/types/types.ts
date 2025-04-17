export interface Task {
  id: string;
  title: string;
  category: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  category: string;
  openDialog: (category: string) => void;
  deleteTask: (id: string) => void;
}
export interface TaskCardProps {
  task: Task;
  deleteTask: (id: string) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant: 'primary' | 'secondary';
  size: 'big' | 'small';
  onlyIcon?: boolean;
  onClick?: () => void;
}

export interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  placeholder?: string;
  type?: string;
  className?: string;
}
