import { useEffect, useState } from "react";
import Shape1 from "../../assets/Shape1.png";
import Shape2 from "../../assets/Shape2.png";
import Shape3 from "../../assets/Shape3.png";

// TypeScriptにおいて追加可能な構造体
interface Shape {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  img: string;
  key: string;
}

// 配列と表示数の定義
const images = [Shape1, Shape2, Shape3];
const NUM_SHAPES = 20;

export default function FlyingShapes() {
  // shapesの定義
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    // ===== 各図形定義用関数 =====
    const createRandomShape = (id: number): Shape => {
      // サイズを80 + 0 * 70 ~ 80 + 1 * 70 = 80 ~ 150に固定
      const size = 80 + Math.random() * 70;
      // 図形情報を設定
      return {
        id,
        // 0 ~ window.innerWidth
        x: Math.random() * window.innerWidth,
        // 0 ~ window.innerHeight
        y: Math.random() * window.innerHeight,
        // (0 - 0.5) * 1.5 ~ (1 - 0.5) * 1.5 = -0.75 ~ 0.75
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        size,
        // 小数点切り捨て(画像の個数 * 0 ~ 画像の個数 * 1)
        img: images[Math.floor(Math.random() * images.length)],
        // idと時刻をkeyにする
        key: `${id}-${Date.now()}`,
      };
    };

    // 初期図形配列生成
    setShapes(Array.from({ length: NUM_SHAPES }, (_, i) => createRandomShape(i)));

    // ===== 図形操作関数 =====
    const moveShapes = () => {
      setShapes(prev =>
        prev.map(shape => {
          // 移動更新
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

      // 次の描画タイミングでも実行する
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
