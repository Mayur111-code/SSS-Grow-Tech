import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import {
    Calendar,
    ArrowRight,
    User,
    Clock,
    Eye,
    Bookmark,
    Share2,
    TrendingUp,
    Sparkles
} from 'lucide-react';
import BlogHero from '../components/Blog/BlogHero';
import API from '../api/api';
import { SpotlightCard, ShinyText, Magnetic } from '../components/ui/ReactBits';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredBlog, setHoveredBlog] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await API.get('/blogs');
                if (data.success) setBlogs(data.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                toast.error("Failed to load blogs");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const getColorByCategory = (category) => {
        const colorMap = {
            'Technology': 'from-blue-500 to-cyan-600',
            'Design': 'from-purple-500 to-pink-600',
            'AI/ML': 'from-emerald-500 to-teal-600',
            'Business': 'from-amber-500 to-orange-600',
            'Development': 'from-violet-500 to-indigo-600',
            'default': 'from-orange-500 to-amber-600'
        };
        return colorMap[category] || colorMap.default;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Recent';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getExcerpt = (content) => {
        if (!content) return 'No content summary available...';
        const plainText = content.replace(/<[^>]*>/g, '').trim();
        return plainText.length > 130 ? plainText.substring(0, 130) + '...' : plainText;
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#030712]">
            <div className="w-14 h-14 border-4 border-gray-800 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="bg-[#030712] min-h-screen selection:bg-orange-500/30">
            {/*  1. Hero Section */}
            <BlogHero />

            {/*  2. Stats & Title Section (Clean Look) */}
            <section className="pt-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-800/80 pb-12">
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-orange-500 mb-4"
                        >
                            <TrendingUp className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-[0.25em]">Latest Publications</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Explore our <ShinyText text="Insights" speed={3} className="font-black italic" />
                        </h2>
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-8 text-gray-400 text-sm">
                        <div className="flex flex-col items-end">
                            <span className="text-white font-black text-xl">{blogs.length}</span>
                            <span className="text-xs uppercase tracking-wider font-bold">Articles Published</span>
                        </div>
                        <div className="w-[1px] h-10 bg-gray-800"></div>
                        <div className="flex flex-col items-end">
                            <span className="text-white font-black text-xl">Weekly</span>
                            <span className="text-xs uppercase tracking-wider font-bold">Fresh Content</span>
                        </div>
                    </div>
                </div>
            </section>

            {/*  3. Blogs Grid Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogs.map((blog, index) => {
                        const colorClass = getColorByCategory(blog.category);
                        
                        return (
                            <motion.article
                                key={blog._id || index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onHoverStart={() => setHoveredBlog(blog._id)}
                                onHoverEnd={() => setHoveredBlog(null)}
                                className="group relative flex flex-col h-full"
                            >
                                {/* Glow Effect on Hover */}
                                <div className={`absolute -inset-2 bg-gradient-to-br ${colorClass} rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                                <SpotlightCard className="relative bg-[#0a0a0a]/90 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col h-full group-hover:border-white/20 transition-all shadow-2xl">
                                    
                                    {/* Image Section */}
                                    <div className="relative h-60 overflow-hidden">
                                        <motion.img
                                            src={blog.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                            alt={blog.title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>
                                        
                                        {/* Category Tag */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/70 backdrop-blur-md border border-white/15 text-white shadow-md">
                                                {blog.category || 'Technology'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-gray-400 text-[11px] mb-4 font-bold uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-orange-400" /> {formatDate(blog.createdAt)}</span>
                                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-400" /> 5 min read</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
                                            {blog.title}
                                        </h3>

                                        <p className="text-gray-300 text-sm leading-relaxed mb-8 line-clamp-3 font-normal">
                                            {getExcerpt(blog.content)}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                                            <Magnetic strength={0.2}>
                                                <Link
                                                    to={`/blogs`}
                                                    className="text-white text-sm font-bold flex items-center gap-2 group/link hover:text-orange-400 transition-colors"
                                                >
                                                    Read Article
                                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform text-orange-500" />
                                                </Link>
                                            </Magnetic>
                                            
                                            <div className="flex gap-2">
                                                <button className="p-2 text-gray-400 hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
                                                <button className="p-2 text-gray-400 hover:text-white transition-colors"><Bookmark className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.article>
                        )
                    })}
                </div>
            </section>
        </div>
    );
};

export default Blogs;