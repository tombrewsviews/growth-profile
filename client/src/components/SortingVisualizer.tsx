import { useEffect, useMemo } from "react";
import { useSortingAnimation } from "@/hooks/useSortingAnimation";
import { cn } from "@/lib/utils";

interface SortingVisualizerProps {
  algorithm: "bubble" | "quick" | "merge" | "selection";
  label: string;
  color: string;
}

export function SortingVisualizer({
  algorithm,
  label,
  color,
}: SortingVisualizerProps) {
  const { array, containerRef, isAnimating, isTimeout, isInitializing, isResetting, startAnimation } = useSortingAnimation(algorithm);

  const stats = useMemo(() => {
    return Array(3).fill("> 300% increase");
  }, []);

  return (
    <div className="border border-gray-800 p-4 rounded">
      <div className="relative mb-4">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="w-full py-2 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors relative overflow-hidden"
        >
          {!isAnimating && isTimeout && (
            <div
              className="absolute left-0 top-0 bottom-0 bg-gray-800 transition-all"
              style={{
                width: '100%',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                animation: 'progress 5s linear forwards',
              }}
            />
          )}
          <span className="relative z-10">Show Growth Curve</span>
        </button>
      </div>
      <div
        ref={containerRef}
        className="h-32 mb-4 flex items-end gap-[2px]"
        style={{ opacity: isAnimating ? 1 : 0.7 }}
      >
        {array.map((value, idx) => (
          <div
            key={idx}
            style={{
              height: `${value}%`,
              backgroundColor: color,
              width: "100%",
              animation: isInitializing
                ? "growUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                : isResetting
                ? "resetGrowUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                : "none",
              animationDelay: (isInitializing || isResetting) ? `${idx * 0.01}s` : "0s",
              opacity: isInitializing || isResetting ? 0 : 1,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>
      <div className="text-gray-400">
        <div className="mb-2">{label}</div>
        {stats.map((stat, idx) => (
          <div key={idx} className="text-sm">{stat}</div>
        ))}
      </div>
    </div>
  );
}
