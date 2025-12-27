import { motion } from "motion/react";
import { Mail, Heart } from "lucide-react";

export function ContactMe() {
  return (
    <section id="contact" className="min-h-screen bg-[#4ECDC4] py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          className="text-center mb-12 font-pixel text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          CONTACT ME
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email */}
          <motion.a
            href="mailto:sqitang@163.com"
            className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] block"
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
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#FFE951] border-2 border-black">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-pixel text-sm mb-1">EMAIL</h3>
                <p className="text-sm text-gray-600">Get in touch</p>
              </div>
            </div>
            <div className="bg-gray-50 border-2 border-black p-4">
              <p className="font-mono text-sm break-all">sqitang@163.com</p>
            </div>
          </motion.a>

          {/* 小红书 (Xiaohongshu/RED) */}
          <motion.a
            href="https://www.xiaohongshu.com/user/profile/5fbde4350000000001006084"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] block"
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
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#FF6B6B] border-2 border-black">
                <Heart className="w-8 h-8 fill-white text-white" />
              </div>
              <div>
                <h3 className="font-pixel text-sm mb-1">小红书</h3>
                <p className="text-sm text-gray-600">Follow me</p>
              </div>
            </div>
            <div className="bg-gray-50 border-2 border-black p-4">
              <p className="font-mono text-sm">@nice的ttamg</p>
            </div>
          </motion.a>
        </div>

        {/* Footer Message */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="inline-block bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-pixel text-sm">LET'S BUILD SOMETHING AMAZING!</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}