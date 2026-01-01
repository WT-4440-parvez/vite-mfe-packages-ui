export interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export const employees: Employee[] = [
  { id: 101, name: 'Alice Johnson', department: 'Engineering', salary: 95000, status: 'Active' },
  { id: 102, name: 'Bob Smith', department: 'Marketing', salary: 75000, status: 'Active' },
  { id: 103, name: 'Carol Williams', department: 'HR', salary: 68000, status: 'On Leave' },
  { id: 104, name: 'David Brown', department: 'Engineering', salary: 105000, status: 'Active' },
  { id: 105, name: 'Eve Davis', department: 'Sales', salary: 82000, status: 'Active' },
  { id: 106, name: 'Frank Miller', department: 'Engineering', salary: 98000, status: 'Inactive' },
];
