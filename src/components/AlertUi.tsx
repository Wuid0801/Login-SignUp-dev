import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface AlertProps {
    title: string;
    description: JSX.Element;
}

const AlertUi: React.FC<AlertProps> = ({ title, description }) => {
    return (
        <Alert>
            <div className="fixed top-0 left-0 z-50 w-full h-full bg-black opacity-50"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded shadow-lg">
                <Terminal className="h-4 w-4" />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>
            </div>
        </Alert>
    );
};

export default AlertUi;
