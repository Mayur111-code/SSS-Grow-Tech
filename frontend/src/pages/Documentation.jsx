import { motion } from "framer-motion";
import {
  Book,
  Code,
  ShieldCheck,
  Zap,
  Globe,
  Cpu,
  Database,
  GitBranch,
  Bug,
  Layers,
} from "lucide-react";

const Documentation = () => {
  const sections = [
    {
      icon: <Cpu className="text-emerald-500" />,
      title: "1. System Architecture Overview",
      content: `
SSS Grow IT is built using a scalable, service-oriented MERN architecture. The application is divided into independent layers to ensure maintainability, performance, and scalability.

• Presentation Layer: React 18 + Tailwind CSS
• Application Layer: Node.js with Express
• Data Layer: MongoDB with Mongoose ODM
• Authentication Layer: JWT-based token system

The frontend and backend are completely decoupled and communicate via RESTful APIs, allowing independent deployment and scaling.
      `,
    },
    {
      icon: <Layers className="text-emerald-500" />,
      title: "2. Frontend Architecture",
      content: `
The frontend is built with React 18 using a component-driven architecture.

Key practices:
• Reusable UI components
• Atomic design principles
• Framer Motion for animations
• Lazy loading with React Suspense
• Global state management using Context API

Folder structure:
• components/ – reusable UI components
• pages/ – route-level components
• hooks/ – custom React hooks
• services/ – API communication
• utils/ – helper functions

This approach ensures readability, scalability, and ease of collaboration.
      `,
    },
    {
      icon: <Database className="text-emerald-500" />,
      title: "3. Backend Architecture",
      content: `
The backend is built with Node.js and Express following MVC principles.

Core layers:
• Routes – API endpoints
• Controllers – business logic
• Services – reusable logic
• Models – MongoDB schemas
• Middleware – authentication, logging, validation

MongoDB is used for flexible schema design and high performance with indexing and aggregation pipelines.
      `,
    },
    {
      icon: <ShieldCheck className="text-emerald-500" />,
      title: "4. Authentication & Security",
      content: `
Security is implemented at multiple levels.

Implemented mechanisms:
• JWT authentication with access & refresh tokens
• Password hashing using bcrypt
• Role-based access control (Admin, Officer, User)
• CSRF protection
• Rate limiting for APIs
• Secure HTTP headers

All sensitive environment variables are stored securely using environment configuration.
      `,
    },
    {
      icon: <Code className="text-emerald-500" />,
      title: "5. Coding Standards & Best Practices",
      content: `
SSS Grow IT follows strict development standards:

• Clean Code principles
• Meaningful variable & function names
• Single Responsibility Principle
• DRY (Don't Repeat Yourself)
• ESLint & Prettier enforced formatting
• Consistent folder and file naming

Git-flow strategy is used for feature development, bug fixes, and production releases.
      `,
    },
    {
      icon: <Bug className="text-emerald-500" />,
      title: "6. Testing & Quality Assurance",
      content: `
Quality assurance is integrated into the development lifecycle.

Testing includes:
• Unit testing for components and utilities
• API testing using Postman
• Manual UI testing
• Error handling & logging

Every release is tested against real-world scenarios to ensure reliability and stability.
      `,
    },
    {
      icon: <Zap className="text-emerald-500" />,
      title: "7. Performance Optimization",
      content: `
SSS Grow IT is optimized for high performance.

Techniques used:
• Code splitting
• Lazy loading components
• Image optimization (WebP)
• API response caching
• Database indexing
• Optimized queries

The application consistently achieves 90+ Lighthouse performance scores.
      `,
    },
    {
      icon: <GitBranch className="text-emerald-500" />,
      title: "8. Version Control & Collaboration",
      content: `
Git and GitHub are used for version control.

Workflow:
• Feature branches
• Pull requests
• Code reviews
• Merge validations
• Commit message conventions

This ensures safe collaboration and production stability.
      `,
    },
    {
      icon: <Globe className="text-emerald-500" />,
      title: "9. Deployment & DevOps",
      content: `
Deployment is automated using CI/CD pipelines.

Deployment stack:
• Frontend: Vercel
• Backend: AWS / Render
• CI/CD: GitHub Actions
• HTTPS with SSL
• Auto-scaling enabled

Zero-downtime deployments are ensured using proper build pipelines.
      `,
    },
    {
      icon: <Book className="text-emerald-500" />,
      title: "10. Future Enhancements",
      content: `
Planned improvements include:
• Microservices architecture
• WebSocket-based real-time updates
• Advanced monitoring dashboards
• AI-powered analytics
• Offline-first support
• Mobile application integration

SSS Grow IT is designed to evolve with future technological demands.
      `,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-300 py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 border-b border-gray-800 pb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Book className="text-emerald-500" size={34} />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              SSS Grow IT <span className="text-emerald-500">Technical Documentation</span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl">
            This document provides a complete technical overview of SSS Grow IT's architecture,
            development standards, security practices, and deployment strategies.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-14">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-gray-900 rounded-xl">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-24 p-10 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl text-center">
          <p className="text-sm text-emerald-500 font-mono italic">
            "SSS Grow IT is engineered with clarity, security, and scalability at its core."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
