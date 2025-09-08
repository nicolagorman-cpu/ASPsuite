
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
    const baseClasses = 'px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark-200 transition-transform transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary: 'bg-brand-primary text-white hover:bg-brand-primary-hover focus:ring-brand-primary',
        secondary: 'bg-brand-dark-300 text-gray-200 hover:bg-brand-dark-300/80 focus:ring-brand-secondary',
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
