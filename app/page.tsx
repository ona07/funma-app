"use client";

import { useEffect, useState } from "react";
import Heatmap from "@/components/Heatmap";
import PredictionChart from "@/components/PredictionChart";

export default function Home() {
  // 接続テスト用のステート
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/hello`)
      .then(async res => {
        const data = await res.text();
        return JSON.parse(data);
      })
      .then(data => setMessage(data.message))
      .catch(err => {
        console.error("API fetch error:", err);
        setMessage("Error fetching data");
      });
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* ヘッダー */}
      <header className="text-2xl font-bold">未来の混雑予測</header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        {/* ヒートマップコンポーネント */}
        <Heatmap />

        {/* 予測グラフコンポーネント */}
        <PredictionChart />

        {/* 接続テスト用のAPIレスポンス表示（削除せずコメントとして残す） */}
        <h2 className="text-xl font-bold">API 接続テスト:</h2>
        <p className="text-black bg-gray-200 border border-gray-400 p-2 rounded">
          {message}
        </p>
      </main>
    </div>
  );
}
