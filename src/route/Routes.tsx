import Layout from '@/components/Layout';
import { Suspense, lazy } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes as ReactRouterRoutes,
    Navigate,
} from 'react-router-dom';

const SignUp = lazy(() => import('@/pages/SignUp'));
const SignIn = lazy(() => import('@/pages/Login'));

export const Routes = () => {
    return (
        <Router>
            <Suspense fallback="..loading">
                <ReactRouterRoutes>
                    <Route element={<Layout />}>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<SignIn />} />
                        <Route path="*" element={<Navigate replace to="/" />} />
                    </Route>
                </ReactRouterRoutes>
            </Suspense>
        </Router>
    );
};
