
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...props }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                className="w-full bg-brand-dark-300 border border-brand-dark-300 text-white rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"
                {...props}
            />
        </div>
    );
};

export default Input;
