import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // 检测是否在可点击元素上
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.onclick !== null ||
        target.style.cursor === "pointer" ||
        target.closest("button") !== null ||
        target.closest("a") !== null;
      setIsPointer(isClickable);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <>
      {/* 主箭头光标 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isPointer ? 1.3 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* 箭头形状 */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          <path
            d="M3 3L10.5 21L13 13L21 10.5L3 3Z"
            fill="#FFE951"
            stroke="black"
            strokeWidth="2"
            strokeLinejoin="miter"
          />
        </svg>
      </motion.div>

      {/* 鼠标轨迹效果 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99]"
        animate={{
          x: mousePosition.x + 8,
          y: mousePosition.y + 8,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-60">
          <path d="M3 3L10.5 21L13 13L21 10.5L3 3Z" fill="#FF6B6B" />
        </svg>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[98]"
        animate={{
          x: mousePosition.x + 12,
          y: mousePosition.y + 12,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 18,
          mass: 1,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" className="opacity-40">
          <path d="M3 3L10.5 21L13 13L21 10.5L3 3Z" fill="#4ECDC4" />
        </svg>
      </motion.div>
    </>
  );
}