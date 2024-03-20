import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

const Layout: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="grid place-items-center py-8">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
