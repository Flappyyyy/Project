import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem('paluwagan_remembered_email');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);

        let error;

        if (isLogin) {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            error = signInError;

            if (!error) {
                if (rememberMe) {
                    localStorage.setItem('paluwagan_remembered_email', email);
                } else {
                    localStorage.removeItem('paluwagan_remembered_email');
                }
            }
        } else {
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });
            error = signUpError;
            if (!error) {
                setErrorMsg('Registration successful! You may now log in.');
                setIsLogin(true);
            }
        }

        if (error) {
            setErrorMsg(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-pink-swirl flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-rose-400 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto shadow-sm mb-4">
                        P
                    </div>
                    <h2 className="text-2xl font-bold text-rose-900 tracking-tight">
                        {isLogin ? 'Welcome back' : 'Create an account'}
                    </h2>
                    <p className="text-pink-500 text-sm mt-1.5 font-medium">
                        {isLogin ? 'Log in to access your dashboard' : 'Sign up to manage your clients securely'}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-rose-700 mb-1.5">Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 bg-pink-50 border border-pink-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all placeholder:text-pink-300 font-medium"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-rose-700 mb-1.5">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 bg-pink-50 border border-pink-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all placeholder:text-pink-300 font-medium"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {isLogin && (
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 text-rose-500 bg-pink-50 border-pink-200 rounded focus:ring-rose-500 cursor-pointer accent-rose-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-rose-700 cursor-pointer">
                                Remember me
                            </label>
                        </div>
                    )}

                    {errorMsg && (
                        <div className={`p-3.5 rounded-lg text-sm font-medium ${errorMsg.includes('successful') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                            {errorMsg}
                        </div>
                    )}

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-3 px-4 bg-rose-400 hover:bg-rose-500 text-white font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50 mt-2"
                    >
                        {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-pink-500 font-medium">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setErrorMsg(null);
                        }}
                        className="text-rose-500 font-bold hover:underline"
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </div>
            </div>
        </div>
    );
}
