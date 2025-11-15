import { useEffect, useState } from "react";
import Shape1 from "../../assets/Shape1.png";
import Shape2 from "../../assets/Shape2.png";
import Shape3 from "../../assets/Shape3.png";

interface Shape {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  img: string;
  key: string; // Reactの再マウント用
}

const images = [Shape1, Shape2, Shape3];
const NUM_SHAPES = 20;

export default function FlyingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const createRandomShape = (id: number): Shape => {
      const size = 80 + Math.random() * 70;
      return {
        id,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        size,
        img: images[Math.floor(Math.random() * images.length)],
        key: `${id}-${Date.now()}`, // 再マウント用に一意のkey
      };
    };

    // 初期図形生成
    setShapes(Array.from({ length: NUM_SHAPES }, (_, i) => createRandomShape(i)));

    const moveShapes = () => {
      setShapes(prev =>
        prev.map(shape => {
          let newX = shape.x + shape.dx;
          let newY = shape.y + shape.dy;

          // 画面外なら再生成
          if (
            newX < -shape.size ||
            newX > window.innerWidth + shape.size ||
            newY < -shape.size ||
            newY > window.innerHeight + shape.size
          ) {
            return createRandomShape(shape.id);
          }

          return { ...shape, x: newX, y: newY };
        })
      );

      requestAnimationFrame(moveShapes);
    };

    moveShapes();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      {shapes.map(shape => (
        <img
          key={shape.key} // keyをshape.keyに変更
          src={shape.img}
          alt={`shape-${shape.id}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: shape.size,
            height: shape.size,
            transform: `translate(${shape.x}px, ${shape.y}px)`,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: -1,
            opacity: 0,
            animation: "fadeIn 01s ease-out forwards", // forwardsで維持
          }}
        />
      ))}
    </>
  );
}
