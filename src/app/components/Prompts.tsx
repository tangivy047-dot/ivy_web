import { motion } from "motion/react";
import { FileText, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function Prompts() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const prompts = [
    {
      title: "Code Generator Prompt",
      description: "A comprehensive prompt template for generating production-ready code",
      category: "Development",
      content: "You are an expert software engineer. Generate clean, well-documented, and tested code following best practices. Consider edge cases, error handling, and performance optimization. Use modern syntax and patterns. Include comprehensive comments explaining complex logic. Follow the DRY principle and write modular, reusable code. Ensure type safety and validate inputs. Write unit tests for critical functionality.",
      tags: ["Code", "Development", "Best Practices"],
    },
    {
      title: "UI/UX Design Prompt",
      description: "Create beautiful and accessible user interfaces with this prompt",
      category: "Design",
      content: "Design a modern, accessible, and responsive user interface considering user experience principles. Use a clear visual hierarchy and consistent design language. Ensure WCAG 2.1 AA compliance for accessibility. Implement intuitive navigation and clear call-to-actions. Consider mobile-first design and touch targets. Use appropriate color contrast and readable typography. Provide meaningful feedback for user interactions.",
      tags: ["Design", "UI/UX", "Accessibility"],
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

  const copyToClipboard = (text: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 防止触发卡片展开/折叠
    
    // 尝试使用 Clipboard API，如果失败则使用 fallback 方法
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => {
          toast.success(`"${title}" copied to clipboard!`);
        })
        .catch(() => {
          // Clipboard API 失败，使用 fallback
          fallbackCopyToClipboard(text, title);
        });
    } else {
      // 不支持 Clipboard API，使用 fallback
      fallbackCopyToClipboard(text, title);
    }
  };

  const fallbackCopyToClipboard = (text: string, title: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      toast.success(`"${title}" copied to clipboard!`);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <section id="prompts" className="min-h-screen bg-[#95E1D3] py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <FileText className="w-10 h-10" />
          <h2 className="font-pixel text-3xl md:text-4xl">PROMPTS</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {prompts.map((prompt, index) => {
            const isExpanded = expandedCards.has(index);
            
            return (
              <motion.div
                key={index}
                className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden cursor-pointer"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotate: index % 2 === 0 ? -1 : 1,
                  shadow: "12px_12px_0px_0px_rgba(0,0,0,1)",
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => toggleCard(index)}
              >
                {/* Header */}
                <div className="bg-[#FFE951] border-b-4 border-black p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-pixel text-sm mb-1">{prompt.title}</h3>
                    <span className="text-xs bg-white border-2 border-black px-2 py-1">
                      {prompt.category}
                    </span>
                  </div>
                  <motion.div
                    className="p-2 bg-white border-2 border-black flex items-center justify-center"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {prompt.description}
                  </p>

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
                    <div className="bg-gray-50 border-2 border-black p-4 font-mono text-xs overflow-x-auto leading-relaxed">
                      {prompt.content}
                    </div>
                  </motion.div>

                  {/* Copy button - only shows when expanded */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                      marginBottom: isExpanded ? 16 : 0,
                    }}
                    transition={{
                      height: { duration: 0.4, ease: "easeInOut" },
                      opacity: { duration: 0.3, ease: "easeInOut", delay: isExpanded ? 0.2 : 0 },
                      marginBottom: { duration: 0.4, ease: "easeInOut" },
                    }}
                    style={{ overflow: "hidden" }}
                  >
                    <button
                      onClick={(e) => copyToClipboard(prompt.content, prompt.title, e)}
                      className="w-full p-3 bg-[#FFE951] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 font-pixel text-xs"
                    >
                      <Copy className="w-4 h-4" />
                      COPY PROMPT
                    </button>
                  </motion.div>

                  <div className="flex flex-wrap gap-2">
                    {prompt.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        className="px-3 py-1.5 bg-white border-2 border-black text-xs font-bold"
                        style={{
                          transform: `translateY(${tagIndex % 2 === 0 ? -2 : 2}px)`
                        }}
                        whileHover={{
                          y: -8,
                          scale: 1.05,
                          boxShadow: "0px 8px 0px 0px rgba(0,0,0,1)",
                          transition: { 
                            type: "spring",
                            stiffness: 400,
                            damping: 10
                          }
                        }}
                        whileTap={{ 
                          y: 0,
                          scale: 0.98,
                          boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)"
                        }}
                      >
                        #{tag}
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