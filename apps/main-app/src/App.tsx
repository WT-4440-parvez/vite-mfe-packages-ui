// import { useState } from 'react';
// import type { ChangeEvent } from 'react';
// import { Button } from 'utilityApp/Button';
// import { Card } from 'utilityApp/Card';
// import { Input } from 'utilityApp/Input';
// import { Modal } from 'utilityApp/Modal';
// import { Table } from 'utilityApp/Table';
// import { Tabs } from 'utilityApp/Tabs';
// import { employees } from './data/employees';
// import './App.css';

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = () => {
//     setMessage(`Welcome, ${username}! We'll contact you at ${email}`);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="app">
//       <header className="header">
//         <div className="container">
//           <h1>🚀 Main Application</h1>
//           <p className="tagline">
//             Powered by Micro-Frontend Architecture with Module Federation
//           </p>
//         </div>
//       </header>

//       <main className="main-content">
//         <div className="container">
//           <Card
//             title="Welcome to the Main Application"
//             subtitle="Using shared components from the Utility App"
//             bordered
//             hoverable
//           >
//             <p className="intro-text">
//               This main application dynamically imports and uses components from
//               the <strong>utility-app</strong> micro-frontend. All components
//               (Button, Card, Input, Modal) are loaded at runtime using Vite's
//               Module Federation.
//             </p>
//             <div className="button-group">
//               <Button variant="primary" onClick={() => setIsModalOpen(true)}>
//                 Open Registration Modal
//               </Button>
//               <Button variant="secondary" onClick={() => alert('Coming soon!')}>
//                 Learn More
//               </Button>
//             </div>
//           </Card>

//           {message && (
//             <Card
//               title="Success!"
//               bordered
//               className="success-card"
//             >
//               <p>{message}</p>
//               <Button variant="success" onClick={() => setMessage('')}>
//                 Clear Message
//               </Button>
//             </Card>
//           )}

//           <div className="grid">
//             <Card
//               title="Feature 1"
//               subtitle="Real-time Updates"
//               bordered
//               hoverable
//             >
//               <p>
//                 Components are shared across micro-frontends with singleton
//                 React instances, ensuring optimal performance.
//               </p>
//             </Card>

//             <Card
//               title="Feature 2"
//               subtitle="Independent Deployment"
//               bordered
//               hoverable
//             >
//               <p>
//                 Each micro-frontend can be deployed independently without
//                 affecting others.
//               </p>
//             </Card>

//             <Card
//               title="Feature 3"
//               subtitle="TypeScript Support"
//               bordered
//               hoverable
//             >
//               <p>
//                 Full TypeScript support with type safety across all shared
//                 components.
//               </p>
//             </Card>
//           </div>
//         </div>
//       </main>

//       {/* Table Showcase */}
//       <section className="main-content">
//         <div className="container">
//           <Card title="👥 Employee Directory" subtitle="Remote Table component from utility-app" bordered hoverable>
//             <div style={{ overflowX: 'auto', marginTop: '12px' }}>
//               <Table
//                 columns={[
//                   { key: 'id', label: 'ID', sortable: true, filterable: true, width: 'w-16' },
//                   { key: 'name', label: 'Name', sortable: true, filterable: true },
//                   { key: 'department', label: 'Department', sortable: true, filterable: true },
//                   {
//                     key: 'status',
//                     label: 'Status',
//                     sortable: true,
//                     filterable: true,
//                     render: (val: string) => (
//                       <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
//                         val === 'Active' ? 'bg-green-100 text-green-800' : val === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
//                       }`}>
//                         {val}
//                       </span>
//                     ),
//                   },
//                   { key: 'salary', label: 'Salary', sortable: true, filterable: false, render: (v: number) => `$${v.toLocaleString()}` },
//                 ]}
//                 data={employees}
//                 rowKey="id"
//                 striped
//                 hover
//               />
//             </div>
//           </Card>

//           <Card>
//             <div className="mt-6">
//               <Tabs
//                 items={[
//                   { key: 'overview', label: 'Overview', content: <div>Overview content goes here</div> },
//                   { key: 'executions', label: 'Executions', content: <div>Executions table or chart</div> },
//                   { key: 'settings', label: 'Settings', content: <div>Settings controls</div> },
//                 ]}
//               />
//             </div>
//           </Card>
//         </div>
        
//       </section>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="User Registration"
//         size="medium"
//         footer={
//           <>
//             <Button
//               variant="secondary"
//               onClick={() => setIsModalOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="primary"
//               onClick={handleSubmit}
//               disabled={!username || !email}
//             >
//               Submit
//             </Button>
//           </>
//         }
//       >
//         <div className="form-container">
//           <Input
//             label="Username"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
//             fullWidth
//             helperText="Choose a unique username"
//           />
//           <Input
//             label="Email Address"
//             type="email"
//             placeholder="your.email@example.com"
//             value={email}
//             onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
//             fullWidth
//             helperText="We'll never share your email with anyone"
//           />
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default App;



import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;