export function generateRandomArray(length: number, min: number, max: number): number[] {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

export async function bubbleSort(arr: number[]): Promise<number[][]> {
  const animations: number[][] = [];
  const n = arr.length;
  let swapped: boolean;
  
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        animations.push([...arr]);
      }
    }
  } while (swapped);
  
  return animations;
}

export async function quickSort(arr: number[]): Promise<number[][]> {
  const animations: number[][] = [];
  
  const partition = (low: number, high: number) => {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        animations.push([...arr]);
      }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    animations.push([...arr]);
    return i + 1;
  };
  
  const sort = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  };
  
  sort(0, arr.length - 1);
  return animations;
}

export async function mergeSort(arr: number[]): Promise<number[][]> {
  const animations: number[][] = [];
  
  const merge = (left: number[], right: number[]): number[] => {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
      animations.push([...result, ...left.slice(leftIndex), ...right.slice(rightIndex)]);
    }
    
    return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
  };
  
  const sort = (array: number[]): number[] => {
    if (array.length <= 1) return array;
    
    const mid = Math.floor(array.length / 2);
    const left = sort(array.slice(0, mid));
    const right = sort(array.slice(mid));
    
    return merge(left, right);
  };
  
  sort([...arr]);
  return animations;
}

export async function selectionSort(arr: number[]): Promise<number[][]> {
  const animations: number[][] = [];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      animations.push([...arr]);
    }
  }
  
  return animations;
}
