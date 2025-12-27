import { motion } from "motion/react";
import { GraduationCap, Briefcase, Code2 } from "lucide-react";

export function AboutMe() {
  const education = [
    { degree: "Computer Science", school: "Tech University", year: "2018-2022" },
    { degree: "Web Development", school: "Code Academy", year: "2020" },
  ];

  const experience = [
    { position: "Senior Developer", company: "Tech Corp", period: "2022-Present" },
    { position: "Frontend Developer", company: "StartUp Inc", period: "2020-2022" },
    { position: "Intern Developer", company: "Dev Studio", period: "2019-2020" },
  ];

  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Next.js"] },
    { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB"] },
    { category: "Tools", items: ["Git", "Docker", "Figma", "VS Code"] },
  ];

  return (
    <section id="about" className="min-h-screen bg-[#95E1D3] py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-center mb-12 font-pixel text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          ABOUT ME
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Education */}
          <motion.div
            className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ 
              scale: 1.05, 
              rotate: -2,
              shadow: "12px_12px_0px_0px_rgba(0,0,0,1)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-black">
              <div className="p-2 bg-[#FFE951] border-2 border-black">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-pixel">EDUCATION</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="pb-4 border-b-2 border-dashed border-gray-300 last:border-0">
                  <div className="font-pixel text-xs mb-1">{edu.degree}</div>
                  <div className="text-sm text-gray-700">{edu.school}</div>
                  <div className="text-xs text-gray-500 mt-1">{edu.year}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Work Experience */}
          <motion.div
            className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              shadow: "12px_12px_0px_0px_rgba(0,0,0,1)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-black">
              <div className="p-2 bg-[#FF6B6B] border-2 border-black">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-pixel">EXPERIENCE</h3>
            </div>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="relative pl-6 pb-4 last:pb-0">
                  {/* Timeline line */}
                  {index < experience.length - 1 && (
                    <div className="absolute left-1 top-6 bottom-0 w-0.5 bg-black" />
                  )}
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 w-3 h-3 bg-black border-2 border-white" />
                  <div className="font-pixel text-xs mb-1">{exp.position}</div>
                  <div className="text-sm text-gray-700">{exp.company}</div>
                  <div className="text-xs text-gray-500 mt-1">{exp.period}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Tree */}
          <motion.div
            className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 2,
              shadow: "12px_12px_0px_0px_rgba(0,0,0,1)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-black">
              <div className="p-2 bg-[#4ECDC4] border-2 border-black">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="font-pixel">SKILLS</h3>
            </div>
            <div className="space-y-4">
              {skills.map((skillGroup, index) => (
                <div key={index}>
                  <div className="font-pixel text-xs mb-2">
                    {skillGroup.category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-100 border-2 border-black text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}