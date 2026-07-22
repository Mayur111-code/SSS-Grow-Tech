import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/api';
import {
    User, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Sparkles, CheckCircle, AlertCircle, Zap
} from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { setUser } = useAuth();
    const navigate = useNavigate();

    //  Google Auth Redirect
    const handleGoogleRegister = () => {
        window.location.href = 'https://web-craft.onrender.com/api/user/google';
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Min 8 characters required';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const { data } = await API.post('user/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            if (data.success) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                setUser(data);
                toast.success('🎉 Welcome to SSS Grow IT!');
                navigate('/');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const passwordStrength = formData.password ? Math.min(100, formData.password.length * 10) : 0;

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-[440px] z-10"
            >
                <div className="bg-gray-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-white mb-2">Create Account</h2>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">SSS Grow IT</p>
                    </div>

                    {/*  GOOGLE REGISTER BUTTON */}
                    <motion.button 
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={handleGoogleRegister}
                        className="w-full flex items-center justify-center gap-4 py-4 bg-white text-black rounded-2xl font-bold mb-6 transition-all shadow-xl"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        </svg>
                        Join with Google
                    </motion.button>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] flex-1 bg-white/10" />
                        <span className="text-[10px] text-gray-600 font-black">OR</span>
                        <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    {/* Manual Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-indigo-500/50 transition-all">
                            <input 
                                type="text" placeholder="Full Name"
                                className="bg-transparent border-none outline-none w-full text-white text-sm"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-indigo-500/50 transition-all">
                            <input 
                                type="email" placeholder="Email Address"
                                className="bg-transparent border-none outline-none w-full text-white text-sm"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-indigo-500/50 transition-all relative">
                            <input 
                                type={showPassword ? "text" : "password"} placeholder="Password"
                                className="bg-transparent border-none outline-none w-full text-white text-sm"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-600">
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button 
                            disabled={isLoading}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20 mt-4 flex items-center justify-center gap-2"
                        >
                            {isLoading ? "Creating..." : "Create Account"} <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                         <Link to="/login" className="text-sm text-gray-500 hover:text-white transition-all">
                           Already have an account? <span className="text-indigo-400 font-bold">Sign In</span>
                         </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;