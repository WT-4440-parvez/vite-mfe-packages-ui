export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
  salary: number;
}

export const sampleUsers: User[] = [
  { id: 1, name: 'Aisha Rahman', email: 'aisha.rahman@example.com', role: 'Senior Developer', status: 'Active', joinDate: '2021-04-12', salary: 95000 },
  { id: 2, name: 'Liam Turner', email: 'liam.turner@example.com', role: 'Product Manager', status: 'Active', joinDate: '2019-08-24', salary: 115000 },
  { id: 3, name: 'Sofia Martinez', email: 'sofia.martinez@example.com', role: 'UX Designer', status: 'Pending', joinDate: '2023-01-03', salary: 78000 },
  { id: 4, name: 'Ethan Patel', email: 'ethan.patel@example.com', role: 'Junior Developer', status: 'Active', joinDate: '2024-03-21', salary: 59000 },
  { id: 5, name: 'Olivia Chen', email: 'olivia.chen@example.com', role: 'QA Engineer', status: 'Inactive', joinDate: '2018-11-11', salary: 82000 },
  { id: 6, name: 'Noah Kim', email: 'noah.kim@example.com', role: 'Tech Lead', status: 'Active', joinDate: '2017-06-17', salary: 130000 },
  { id: 7, name: 'Maya Singh', email: 'maya.singh@example.com', role: 'Data Analyst', status: 'Active', joinDate: '2020-09-05', salary: 88000 },
  { id: 8, name: 'Lucas Moreau', email: 'lucas.moreau@example.com', role: 'DevOps Engineer', status: 'Pending', joinDate: '2022-07-19', salary: 99000 },
  { id: 9, name: 'Emma Johansson', email: 'emma.johansson@example.com', role: 'Senior Designer', status: 'Active', joinDate: '2016-02-28', salary: 105000 },
  { id: 10, name: 'Mateo Rossi', email: 'mateo.rossi@example.com', role: 'Security Specialist', status: 'Inactive', joinDate: '2015-12-01', salary: 123000 },
  { id: 11, name: 'Hannah Green', email: 'hannah.green@example.com', role: 'Marketing Manager', status: 'Active', joinDate: '2021-10-10', salary: 87000 },
  { id: 12, name: 'Daniel Okafor', email: 'daniel.okafor@example.com', role: 'Backend Developer', status: 'Active', joinDate: '2019-05-23', salary: 98000 },
];
