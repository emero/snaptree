import React from "react";

enum UserAction {
  ROTATE = "ROTATE",
  ZOOM_IN = "ZOOM_IN",
  ZOOM_OUT = "ZOOM_OUT",
  UNDO = "UNDO",
}

export type UserEvent =
  | {
      type: UserAction.ROTATE;
    }
  | {
      type: UserAction.ZOOM_IN;
    }
  | {
      type: UserAction.ZOOM_OUT;
    }
  | {
      type: UserAction.UNDO;
    };

interface ControlBarProps {
  onButtonClick: (event: UserEvent) => void;
}

const ControlBar = ({ onButtonClick }: ControlBarProps) => {
  const onRotateButtonClick = () => {
    onButtonClick({ type: UserAction.ROTATE });
  };
  const onZoomInButtonClick = () => {
    onButtonClick({ type: UserAction.ZOOM_IN });
  };
  const onZoomOutButtonClick = () => {
    onButtonClick({ type: UserAction.ZOOM_OUT });
  };
  const onUndoButtonClick = () => {
    onButtonClick({ type: UserAction.UNDO });
  };

  return (
    <div className="bg-accent">
      <button onClick={onRotateButtonClick}>rotate</button>
      <button onClick={onZoomInButtonClick}>zoom in</button>
      <button onClick={onZoomOutButtonClick}>zoom out</button>
      <button onClick={onUndoButtonClick}>undo</button>
    </div>
  );
};

export default ControlBar;
