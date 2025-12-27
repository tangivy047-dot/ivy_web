import { motion } from "motion/react";
import { ExternalLink, Bot } from "lucide-react";

export function AICoding() {
  const aiProjects = [
    {
      title: "AI Code Assistant",
      description: "Intelligent code completion and suggestion tool",
      tech: ["OpenAI", "React", "Python"],
      link: "https://example.com/ai-assistant",
    },
    {
      title: "Auto Documentation",
      description: "AI-powered automatic code documentation generator",
      tech: ["GPT-4", "TypeScript", "Node.js"],
      link: "https://example.com/auto-doc",
    },
    {
      title: "Code Review Bot",
      description: "Automated code review using machine learning",
      tech: ["TensorFlow", "FastAPI", "React"],
      link: "https://example.com/review-bot",
    },
    {
      title: "Smart Debugger",
      description: "AI-enhanced debugging and error resolution",
      tech: ["Anthropic", "Next.js", "PostgreSQL"],
      link: "https://example.com/debugger",
    },
  ];

  const handleProjectClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <section id="ai-coding" className="min-h-screen bg-[#FF6B6B] py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Bot className="w-10 h-10" />
          <h2 className="font-pixel text-3xl md:text-4xl">AI CODING</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiProjects.map((project, index) => (
            <motion.div
              key={index}
              onClick={() => handleProjectClick(project.link)}
              className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: index % 2 === 0 ? -1 : 1,
                y: -5,
                shadow: "12px_12px_0px_0px_rgba(0,0,0,1)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-pixel text-sm pr-2">{project.title}</h3>
                <ExternalLink className="w-5 h-5 flex-shrink-0" />
              </div>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-[#FFE951] border-2 border-black text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="text-xs text-gray-500 font-mono">{project.link}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}