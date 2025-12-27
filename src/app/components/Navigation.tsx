import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const navItems = [
  { id: "about", label: "About me" },
  { id: "projects", label: "Projects" },
  { id: "ai-coding", label: "AI coding" },
  { id: "prompts", label: "Prompts" },
];

const contactItem = { id: "contact", label: "Contact me" };

export function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 bg-[#FFE951] border-b-4 border-black"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 左侧 Hi! */}
          <div className="w-32 md:w-40">
            <span className="font-pixel text-xl md:text-2xl">Hi!</span>
          </div>
          
          {/* 中间导航按钮 */}
          <div className="flex gap-4 md:gap-6 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-pixel text-[10px] md:text-xs"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* 右侧 Contact Me 按钮 */}
          <div className="w-32 md:w-40 flex justify-end">
            <button
              onClick={() => scrollToSection(contactItem.id)}
              className="px-4 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-pixel text-[10px] md:text-xs flex items-center gap-2 whitespace-nowrap border-b-4"
            >
              {contactItem.label}
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}