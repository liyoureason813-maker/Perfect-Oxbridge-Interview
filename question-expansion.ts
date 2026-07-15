"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";
import type { Language } from "./question-locales";

interface SketchPadProps {
  language: Language;
  value: string;
  prompt: string;
  onChange: (dataUrl: string) => void;
}

export default function SketchPad({ language, value, prompt, onChange }: SketchPadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [colour, setColour] = useState("#102b3f");
  const [lineWidth, setLineWidth] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = "#fffdf8";
    context.fillRect(0, 0, canvas.width, canvas.height);
    if (!value) return;
    const image = new Image();
    image.onload = () => context.drawImage(image, 0, 0, canvas.width, canvas.height);
    image.src = value;
  }, [value]);

  function point(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function begin(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    drawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    const start = point(event);
    context.beginPath();
    context.moveTo(start.x, start.y);
  }

  function draw(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !drawingRef.current) return;
    const events = event.nativeEvent.getCoalescedEvents?.() ?? [event.nativeEvent];
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = tool === "eraser" ? "#fffdf8" : colour;
    context.lineWidth = tool === "eraser" ? lineWidth * 4 : lineWidth;
    for (const item of events) {
      const rect = canvas.getBoundingClientRect();
      context.lineTo(
        ((item.clientX - rect.left) / rect.width) * canvas.width,
        ((item.clientY - rect.top) / rect.height) * canvas.height,
      );
    }
    context.stroke();
  }

  function finish(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas || !drawingRef.current) return;
    drawingRef.current = false;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    onChange(canvas.toDataURL("image/png"));
  }

  function clear() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.fillStyle = "#fffdf8";
    context.fillRect(0, 0, canvas.width, canvas.height);
    onChange("");
  }

  return (
    <section className="sketch-pad">
      <div className="sketch-toolbar">
        <div>
          <strong>{language === "zh" ? "手写草图板" : "Working sketch"}</strong>
          <span>{prompt}</span>
        </div>
        <div className="sketch-tools" role="toolbar" aria-label={language === "zh" ? "画图工具" : "Drawing tools"}>
          <button
            type="button"
            className={tool === "pen" ? "active" : ""}
            onClick={() => setTool("pen")}
            aria-pressed={tool === "pen"}
          >
            {language === "zh" ? "画笔" : "Pen"}
          </button>
          <button
            type="button"
            className={tool === "eraser" ? "active" : ""}
            onClick={() => setTool("eraser")}
            aria-pressed={tool === "eraser"}
          >
            {language === "zh" ? "橡皮" : "Eraser"}
          </button>
          <label>
            <span>{language === "zh" ? "颜色" : "Colour"}</span>
            <input
              type="color"
              value={colour}
              onChange={(event) => {
                setColour(event.target.value);
                setTool("pen");
              }}
            />
          </label>
          <label>
            <span>{language === "zh" ? "粗细" : "Size"}</span>
            <input
              type="range"
              min="2"
              max="10"
              value={lineWidth}
              onChange={(event) => setLineWidth(Number(event.target.value))}
            />
          </label>
          <button type="button" onClick={clear}>
            {language === "zh" ? "清空" : "Clear"}
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width="1000"
        height="380"
        onPointerDown={begin}
        onPointerMove={draw}
        onPointerUp={finish}
        onPointerCancel={finish}
        aria-label={language === "zh" ? "可用鼠标、触控笔或手指作画的草图板" : "Sketch pad for mouse, stylus or touch"}
      />
      <p className="sketch-footnote">
        {language === "zh"
          ? "支持鼠标、触控笔和手指；草图会随本题答案一起保留到诊断页面。"
          : "Works with a mouse, stylus or finger. The sketch stays with this answer through diagnosis."}
      </p>
    </section>
  );
}
