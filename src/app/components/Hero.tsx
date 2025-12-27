import { motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";
import photo1 from "src/assets/5993fac721708a0c3004bea89a4c0d656faa80a8.png";
import photo2 from "src/assets/3e30d42b90ab5be6471e165dc94da3e1bacb8dc9.png";

const photos = [
  photo1,
  photo2,
];

export function Hero() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [tags, setTags] = useState([
    {
      text: "Developer",
      size: "large",
      color: "#FFE951",
      position: { top: -80, left: -120, rotate: -5 },
    },
    {
      text: "Designer",
      size: "medium",
      color: "#FF6B6B",
      position: { top: -60, right: -100, rotate: 8 },
    },
    {
      text: "Creator",
      size: "small",
      color: "#4ECDC4",
      position: { bottom: -50, left: -100, rotate: 3 },
    },
    {
      text: "Artist",
      size: "medium",
      color: "#95E1D3",
      position: { bottom: -60, right: -90, rotate: -7 },
    },
    {
      text: "Innovator",
      size: "large",
      color: "#FFE951",
      position: { top: 120, left: -150, rotate: 12 },
    },
  ]);
  const [draggingTag, setDraggingTag] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleTagClick = (e: React.MouseEvent) => {
    // 只在没有拖动的情况下触发撒花
    if (draggingTag === null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ['#FFE951', '#FF6B6B', '#4ECDC4', '#95E1D3'],
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setDraggingTag(index);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOffset({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingTag !== null) {
      const offsetX = e.clientX - dragStart.x;
      const offsetY = e.clientY - dragStart.y;
      setDragOffset({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseUp = () => {
    if (draggingTag !== null) {
      const newTags = [...tags];
      const tag = newTags[draggingTag];
      const newPosition = { ...tag.position };

      // 更新位置
      if ("top" in newPosition) {
        newPosition.top = (newPosition.top || 0) + dragOffset.y;
      } else if ("bottom" in newPosition) {
        newPosition.bottom = (newPosition.bottom || 0) - dragOffset.y;
      }

      if ("left" in newPosition) {
        newPosition.left = (newPosition.left || 0) + dragOffset.x;
      } else if ("right" in newPosition) {
        newPosition.right = (newPosition.right || 0) - dragOffset.x;
      }

      newTags[draggingTag] = { ...tag, position: newPosition };
      setTags(newTags);
      setDraggingTag(null);
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "px-4 py-3 text-sm";
      case "medium":
        return "px-3 py-2 text-xs";
      case "small":
        return "px-2 py-1 text-[10px]";
      default:
        return "px-3 py-2 text-xs";
    }
  };

  // 为每个标签定义不同的进入动画
  const getTagAnimation = (index: number) => {
    const animations = [
      { // 从左上飞入
        initial: { opacity: 0, x: -200, y: -200, scale: 0, rotate: -180 },
        animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
      },
      { // 从右上飞入
        initial: { opacity: 0, x: 200, y: -200, scale: 0, rotate: 180 },
        animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
      },
      { // 从左下飞入
        initial: { opacity: 0, x: -200, y: 200, scale: 0, rotate: 180 },
        animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
      },
      { // 从右下飞入
        initial: { opacity: 0, x: 200, y: 200, scale: 0, rotate: -180 },
        animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
      },
      { // 从左中飞入并旋转
        initial: { opacity: 0, x: -250, scale: 0, rotate: 360 },
        animate: { opacity: 1, x: 0, scale: 1, rotate: 0 },
      },
    ];
    return animations[index % animations.length];
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-[#4ECDC4] pt-20 px-4 pb-10"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Photo Carousel with Overlapping Tags */}
          <div className="relative mb-16">
            {/* Photo Container */}
            <div className="relative w-[400px] h-[300px] md:w-[600px] md:h-[450px] border-8 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] z-10">
              <img
                src={photos[currentPhotoIndex]}
                alt="Profile"
                className="w-full h-full object-cover"
              />

              {/* Carousel Controls */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`w-3 h-3 border-2 border-black transition-colors ${
                      index === currentPhotoIndex ? "bg-black" : "bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Overlapping Tags with Different Sizes */}
            {tags.map((tag, index) => {
              const position = tag.position;
              const isDragging = draggingTag === index;
              const currentOffset = isDragging ? dragOffset : { x: 0, y: 0 };
              const animation = getTagAnimation(index);

              return (
                <motion.div
                  key={index}
                  className={`absolute ${isDragging ? "cursor-grabbing z-50" : "cursor-grab"}`}
                  style={{
                    top:
                      position.top !== undefined
                        ? `${position.top + currentOffset.y}px`
                        : undefined,
                    left:
                      position.left !== undefined
                        ? `${position.left + currentOffset.x}px`
                        : undefined,
                    right:
                      position.right !== undefined
                        ? `${position.right - currentOffset.x}px`
                        : undefined,
                    bottom:
                      position.bottom !== undefined
                        ? `${position.bottom - currentOffset.y}px`
                        : undefined,
                    transform: `rotate(${position.rotate}deg)`,
                    zIndex: isDragging ? 50 : 15 + index,
                  }}
                  initial={animation.initial}
                  animate={animation.animate}
                  transition={{
                    duration: 0.8,
                    delay: 1 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <div
                    onClick={handleTagClick}
                    onMouseDown={(e) => handleMouseDown(e, index)}
                    className={`border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-pixel select-none hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow ${getSizeClasses(tag.size)} ${
                      isDragging ? "shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]" : ""
                    }`}
                    style={{ backgroundColor: tag.color }}
                  >
                    {tag.text}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Motto */}
          <motion.div
            className="text-center px-6 py-4 bg-[#FF6B6B] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <p className="text-white font-pixel text-sm md:text-base">
              "Code with passion, design with purpose, create with heart."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
