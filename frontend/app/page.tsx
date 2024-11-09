"use client";

import { useMachine } from "@xstate/react";
import Canvas from "./components/Canvas";
import ControlBar, { UserEvent } from "./components/ControlBar";
import Header from "./components/Header";
import UploadButton from "./components/UploadButton";
import { drawingMachine } from "./services/drawingMachine";

export default function Home() {
  const [state, send] = useMachine(drawingMachine);
  const handleCanvasReady = ({
    container,
    height,
    width,
  }: {
    container: HTMLDivElement;
    height: number;
    width: number;
  }) => {
    send({ type: "CREATE_STAGE", container, height, width });
  };
  const handleUploadComplete = (url: string) => {
    send({ type: "LOAD_IMAGE", url });
  };
  const handleButtonClick = (event: UserEvent) => {
    send(event);
  };

  return (
    <div className="flex flex-col h-[100svh] relative z-10">
      <Header />
      <div className="flex  flex-1 justify-center relative z-0">
        <Canvas onReady={handleCanvasReady} />
        {state.matches("idle") && (
          <UploadButton onComplete={handleUploadComplete} />
        )}
      </div>
      <div className="absolute z-10 w-full bottom-[0svh] flex items-center">
        <ControlBar
          onButtonClick={handleButtonClick}
          isVisible={state.matches("ready")}
        />
      </div>
    </div>
  );
}
