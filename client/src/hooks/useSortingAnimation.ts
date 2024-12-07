import { useEffect, useRef, useState } from "react";
import {
  bubbleSort,
  quickSort,
  mergeSort,
  selectionSort,
  generateRandomArray
} from "@/lib/sortingAlgorithms";

export function useSortingAnimation(algorithm: "bubble" | "quick" | "merge" | "selection") {
  const [array, setArray] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const newArray = generateRandomArray(100, 10, 100);
    setArray(newArray);
    // Remove initializing state after initial animation duration
    // Give enough time for initial animation to complete
    setTimeout(() => setIsInitializing(false), array.length * 10 + 500);
  }, []);

  const startAnimation = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const currentArray = [...array];

    let sortFunction;
    switch (algorithm) {
      case "bubble": sortFunction = bubbleSort; break;
      case "quick": sortFunction = quickSort; break;
      case "merge": sortFunction = mergeSort; break;
      case "selection": sortFunction = selectionSort; break;
    }

    const animations = await sortFunction([...currentArray]);
    let frame = 0;

    const animate = () => {
      if (frame < animations.length) {
        setArray([...animations[frame]]);
        frame++;
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        // Keep the sorted array for 5 seconds
        // Show sorted array for 5 seconds
        setIsAnimating(false);
        setIsTimeout(true);
        
        // After 5 seconds, start reset animation
        setTimeout(() => {
          setIsTimeout(false);
          setIsResetting(true);
          
          // After reset animation starts, prepare new array
          // Start reset animation
          setTimeout(() => {
            const newArray = generateRandomArray(100, 10, 100);
            
            // After reset animation completes, show new array with growth animation
            setTimeout(() => {
              setArray(newArray);
              setIsResetting(false);
              setIsInitializing(true);
              
              // Remove initializing state after growth animation completes
              setTimeout(() => setIsInitializing(false), array.length * 10 + 500);
            }, array.length * 10 + 500);
          }, 100);
        }, 5000);
      }
    };

    animate();
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return { array, containerRef, isAnimating, isTimeout, isInitializing, isResetting, startAnimation };
}
