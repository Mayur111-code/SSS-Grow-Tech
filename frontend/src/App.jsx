import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { AdminRoute } from './components/ProtectedRoute';
import SmoothScroll from './components/ui/SmoothScroll';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/admin/Sidebar';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/Dashboard';
import ManageServices from './pages/admin/ManageServices';

// User & Public Pages
import Home from './pages/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import LoginSuccess from './pages/user/LoginSuccess';
import ManageProjects from './pages/admin/ManageProjects';
import ManageBlogs from './pages/admin/ManageBlogs';
import Footer from './components/layout/Footer';
import GlobalPresence from './pages/user/GlobalPresence';
import Documentation from './pages/Documentation';

const PublicPageEffects = () => {
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const orbY = useTransform(scrollYProgress, [0, 1], ['-8vh', '84vh']);
    const orbRotate = useTransform(scrollYProgress, [0, 1], [-12, 28]);

    if (shouldReduceMotion) return null;

    return (
        <>
            {/* Top Scroll Progress Line */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 z-[1000] origin-left"
                style={{ scaleX: scrollYProgress }}
            />
            <motion.div className="page-scroll-orb" style={{ y: orbY, rotate: orbRotate }} />
            <div className="page-scroll-rail" aria-hidden="true">
                <motion.span style={{ scaleY: scrollYProgress }} />
            </div>
        </>
    );
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex-1"
            >
                <Routes location={location}>
                    {/* --- PUBLIC ROUTES --- */}
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path='/blogs' element={<Blogs />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path="/login-success" element={<LoginSuccess />} />
                    <Route path="/docs" element={<Documentation />} />

                    {/* --- USER AUTH --- */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* --- ADMIN AUTH --- */}
                    <Route path="/admin/login" element={<AdminLogin />} />

                    {/* --- PROTECTED ADMIN ROUTES --- */}
                    <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    <Route path="/admin/services" element={<AdminRoute><ManageServices /></AdminRoute>} />
                    <Route path="/admin/projects" element={<AdminRoute><ManageProjects /></AdminRoute>} />
                    <Route path="/admin/blogs" element={<AdminRoute><ManageBlogs /></AdminRoute>} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
};

const LayoutHandler = ({ children }) => {
    const location = useLocation();
    const isAdminPath = location.pathname.startsWith('/admin');
    const isLoginPage = location.pathname === '/admin/login';

    return (
        <div className={isAdminPath && !isLoginPage ? "flex min-h-screen bg-gray-950" : "min-h-screen flex flex-col bg-[#030712]"}>
            {!isAdminPath && <Navbar />}

            {isAdminPath && !isLoginPage && <Sidebar />}

            <main className={!isAdminPath ? "pt-16 flex-1 page-shell flex flex-col" : "flex-1 flex flex-col"}>
                {!isAdminPath && <PublicPageEffects />}
                {children}
                {!isAdminPath && <GlobalPresence />}
                {!isAdminPath && <Footer />}
            </main>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <SmoothScroll>
                    <Toaster position="top-right" richColors />
                    <LayoutHandler>
                        <AnimatedRoutes />
                    </LayoutHandler>
                </SmoothScroll>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

