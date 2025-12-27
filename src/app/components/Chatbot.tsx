import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Bot, X, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm your assistant. How can I help you today?", isBot: true },
  ]);
  const [inputValue, setInputValue] = useState("");

  const botResponses = [
    "That's an interesting question! Let me help you with that.",
    "I'd be happy to provide more information about that.",
    "Great question! Here's what I know about that topic.",
    "Thanks for asking! Let me explain that to you.",
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-5 bg-[#FF6B6B] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all rounded-full"
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          rotate: isOpen ? 0 : [0, -10, 10, -10, 10, 0],
        }}
        transition={{ 
          scale: { duration: 0.3, delay: 1 },
          rotate: { duration: 2, repeat: Infinity, repeatDelay: 3 }
        }}
        whileHover={{ scale: 1.1, rotate: 0 }}
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <div className="relative">
            <Bot className="w-8 h-8" strokeWidth={2.5} />
            {/* 闪烁的提示点 */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFE951] border-2 border-black rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="bg-[#FFE951] border-b-4 border-black p-4">
              <h3 className="font-pixel text-sm">CHAT ASSISTANT</h3>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 border-2 border-black ${
                      message.isBot
                        ? 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-[#4ECDC4] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t-4 border-black p-4 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border-2 border-black outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-[#4ECDC4] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}