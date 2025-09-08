import React from 'react';

interface ComingSoonPageProps {
    title: string;
    // FIX: The type for the icon prop has been made more specific to React.ReactElement<React.SVGProps<SVGSVGElement>>.
    // This informs TypeScript that the passed element is an SVG that accepts a className prop,
    // which resolves the error when using React.cloneElement.
    icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title, icon }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <div className="w-24 h-24 mb-6 text-gray-500">
                {React.cloneElement(icon, { className: "w-full h-full" })}
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
            <p className="text-xl">This feature is currently under development.</p>
            <p className="mt-4 max-w-md">
                As per the phased development plan, this module will be built in an upcoming stage. For now, please use the implemented 'Contacts' feature.
            </p>
        </div>
    );
};

export default ComingSoonPage;
