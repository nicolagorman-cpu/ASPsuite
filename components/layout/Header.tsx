import React from 'react';
import Button from '../shared/Button';

interface HeaderProps {
    title: string;
    userEmail: string | null;
    onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, userEmail, onSignOut }) => {
    return (
        <header className="h-20 bg-brand-dark flex-shrink-0 flex items-center justify-between px-8 border-b border-brand-dark-300">
            <h2 className="text-3xl font-semibold text-white">{title}</h2>
            {userEmail && (
                <div className="flex items-center space-x-4">
                    <span className="text-gray-300">{userEmail}</span>
                    <Button onClick={onSignOut} variant="secondary" className="!py-2">
                        Sign Out
                    </Button>
                </div>
            )}
        </header>
    );
};

export default Header;
