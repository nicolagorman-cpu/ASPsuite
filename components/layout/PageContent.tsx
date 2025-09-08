
import React from 'react';

interface PageContentProps {
    children: React.ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
    return (
        <main className="flex-1 overflow-y-auto p-8">
            {children}
        </main>
    );
};

export default PageContent;
