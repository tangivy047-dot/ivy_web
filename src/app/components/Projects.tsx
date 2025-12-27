import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function Projects() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment integration",
      tech: ["React", "Node.js", "Stripe"],
      color: "#FFE951",
      detailedInfo: "This comprehensive e-commerce platform revolutionizes online shopping experiences with cutting-edge technology. Built with React for a dynamic frontend, Node.js powering a robust backend API, and seamless Stripe integration for secure payments. The platform features real-time inventory management, advanced product filtering, personalized recommendations using machine learning algorithms, and a responsive design that works flawlessly across all devices. Key highlights include multi-currency support, automated email notifications, comprehensive admin dashboard with analytics, customer review systems, and wishlist functionality. The architecture emphasizes scalability and security, implementing JWT authentication, data encryption, and following industry best practices for e-commerce applications.",
    },
    {
      title: "Task Management App",
      description: "Collaborative task manager with real-time updates",
      tech: ["Next.js", "Firebase", "Tailwind"],
      color: "#FF6B6B",
      detailedInfo: "An innovative task management application designed for modern teams seeking efficient collaboration. Leveraging Next.js for server-side rendering and optimal performance, Firebase for real-time database synchronization, and Tailwind CSS for a beautiful, customizable interface. Features include drag-and-drop task organization, priority levels, deadline tracking, team member assignments, and real-time notifications. The app supports multiple project workspaces, Kanban board visualization, Gantt chart timeline views, and comprehensive activity logs. Advanced features include recurring tasks, time tracking integration, file attachments, comment threads on tasks, and customizable workflow automation. The real-time collaboration ensures all team members stay synchronized, with instant updates reflected across all connected devices.",
    },
    {
      title: "Portfolio Generator",
      description: "Automated portfolio website builder for developers",
      tech: ["React", "TypeScript", "Vercel"],
      color: "#4ECDC4",
      detailedInfo: "A revolutionary tool that empowers developers to create stunning portfolio websites in minutes without writing code. Built with React and TypeScript for type-safe, maintainable code, and deployed seamlessly on Vercel's edge network for lightning-fast global performance. The generator offers dozens of professionally designed templates, customizable color schemes, responsive layouts, and interactive components. Users can import projects from GitHub, showcase skills with visual progress bars, integrate blog posts, and display testimonials. Features include SEO optimization, custom domain support, analytics integration, contact form functionality, and automatic light/dark mode. The platform generates clean, optimized code that developers can export and customize further, making it perfect for both beginners and experienced developers seeking a professional online presence.",
    },
  ];

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section id="projects" className="min-h-screen bg-[#FFE951] py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-center mb-12 font-pixel text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          PROJECTS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {projects.map((project, index) => {
            const isExpanded = expandedCards.has(index);
            
            return (
              <motion.div
                key={index}
                className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotate: index % 2 === 0 ? -2 : 2,
                  shadow: "12px_12px_0px_0px_rgba(0,0,0,1)",
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => toggleCard(index)}
              >
                {/* Color bar */}
                <div className="h-3 border-b-4 border-black" style={{ backgroundColor: project.color }} />
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-pixel text-sm">{project.title}</h3>
                    <motion.div
                      className="flex-shrink-0"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Detailed info - expandable */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                      marginBottom: isExpanded ? 16 : 0,
                    }}
                    transition={{
                      height: { duration: 0.4, ease: "easeInOut" },
                      opacity: { duration: 0.3, ease: "easeInOut" },
                      marginBottom: { duration: 0.4, ease: "easeInOut" },
                    }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="bg-gray-50 border-2 border-black p-4 text-xs leading-relaxed text-gray-700">
                      {project.detailedInfo}
                    </div>
                  </motion.div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-3 py-1.5 border-2 border-black text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-default"
                        style={{
                          backgroundColor: techIndex === 0 ? '#FFE951' : techIndex === 1 ? '#FF6B6B' : '#4ECDC4',
                          transform: `rotate(${techIndex % 2 === 0 ? -1 : 1}deg)`
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: techIndex % 2 === 0 ? -3 : 3,
                          shadow: "4px_4px_0px_0px_rgba(0,0,0,1)",
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}