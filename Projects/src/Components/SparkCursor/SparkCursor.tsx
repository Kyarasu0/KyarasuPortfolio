import { useEffect } from "react";

export default function SparkTrail() {

  useEffect(() => {
    // sparkの作成
    const createSpark = (x: number, y: number) => {
      const spark = document.createElement("div");
      spark.className = "spark";
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      document.body.appendChild(spark);

      // アニメーション終了を感知するListenerを追加
      spark.addEventListener("animationend", () => {
        spark.remove();
      });
    };

    // タッチを検知してその部分でspark作成関数を実行
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // スクロール防止
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        createSpark(touch.clientX, touch.clientY);
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    // 画面描画が終了したらListenerを削除する
    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <>
      <style>{`
        body {
          touch-action: none; /* スクロール防止 */
          cursor: none;
        }
        .spark {
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #fff 0%, rgba(255,255,255,0) 80%);
          border-radius: 50%;
          pointer-events: none;
          will-change: transform, opacity;
          animation: sparkle 0.6s forwards;
        }
        @keyframes sparkle {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
    </>
  );
}
