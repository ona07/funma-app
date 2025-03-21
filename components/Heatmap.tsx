"use client";

import React, { useEffect, useState, useRef } from "react";
import h337 from "heatmap.js";

const Heatmap: React.FC = () => {
  const [data, setData] = useState<{ time: string; count: number }[]>([]);
  const heatmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`)
      .then(res => res.json())
      .then(json => {
        setData(json.predictions);
      })
      .catch(err => {
        console.error("API fetch error:", err);
      });
  }, []);

  useEffect(() => {
    if (heatmapRef.current && data.length > 0) {
      const heatmapInstance = h337.create({
        container: heatmapRef.current,
        radius: 40, // 半径を広げて視認性を向上
        maxOpacity: 0.7,
        minOpacity: 0.2,
        blur: 0.75,
      });

      const points = data.map((d, index) => ({
        x: (index / data.length) * heatmapRef.current!.clientWidth,
        y: heatmapRef.current!.clientHeight / 2, // ヒートマップを中央に配置
        value: Math.round(d.count), // 小数点を丸める
      }));

      heatmapInstance.setData({
        max: 30, // 最大値を30に設定（カラースケールの基準）
        min: 0,
        data: points,
      });
    }
  }, [data]);

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-2">混雑予測（ヒートマップ）</h2>
      <div ref={heatmapRef} className="relative w-full h-24 bg-white border border-gray-300 rounded"></div>
    </div>
  );
};

export default Heatmap;
