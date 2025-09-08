// New file: components/pages/LoginPage.tsx
import React, { useState } from 'react';
import { signIn, signUp } from '../../services/authService';
import Input from '../shared/Input';
import Button from '../shared/Button';

const LoginPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await signIn(email, password);
            } else {
                await signUp(email, password);
            }
            // On success, the App component's auth listener will handle the redirect.
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-brand-dark-200">
            <div className="w-full max-w-md p-8 space-y-6 bg-brand-dark rounded-lg shadow-2xl border border-brand-dark-300">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white tracking-wider">ASP<span className="text-brand-primary">suite</span></h1>
                    <p className="mt-2 text-gray-400">{isLogin ? 'Sign in to your account' : 'Create a new account'}</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete={isLogin ? "current-password" : "new-password"}
                    />
                     {error && <p className="text-sm text-red-500">{error}</p>}
                    <div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                        </Button>
                    </div>
                </form>
                <p className="text-sm text-center text-gray-400">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)} className="ml-2 font-medium text-brand-primary hover:underline">
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
