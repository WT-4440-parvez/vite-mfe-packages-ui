import Layout from '../components/Layout/Layout';
import Dashboard from '../pages/Dashboard';
import Analytics from '../pages/AnalyticsHub';
import IndexDetails from '../pages/IndexDetails';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: 'analytics',
                element: <Analytics />,
            },
            {
                path: 'index/:id',
                element: <IndexDetails />,
            },
        ],
    },
]