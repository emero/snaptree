"use client";

import React, { useEffect, useRef } from "react";

interface CanvasProps {
  onReady: ({}: {
    container: HTMLDivElement;
    height: number;
    width: number;
  }) => void;
}

export const Canvas = ({ onReady }: CanvasProps) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasContainerRef.current;

    if (!container) return;

    const { width, height } = container.getBoundingClientRect();

    onReady({ container, height, width });
  }, [onReady]);

  return (
    <div
      ref={canvasContainerRef}
      className="absolute right-0 left-0 top-0 bottom-0"
    ></div>
  );
};

export default Canvas;
