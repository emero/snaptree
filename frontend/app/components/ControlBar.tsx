import React from "react";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUturnDownIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
} from "@heroicons/react/24/solid";
import Button from "./Button";

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
  isVisible: boolean;
  onButtonClick: (event: UserEvent) => void;
}

const ControlBar = ({ isVisible, onButtonClick }: ControlBarProps) => {
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
    <div
      className={`${
        isVisible ? "opacity-1" : "opacity-0"
      } transition duration-250 ease-in-out justify-self-center flex gap-4 mb-8`}
    >
      <Button
        onClick={onRotateButtonClick}
        icon={<ArrowPathRoundedSquareIcon />}
      >
        rotate
      </Button>
      <Button onClick={onZoomInButtonClick} icon={<MagnifyingGlassPlusIcon />}>
        zoom in
      </Button>
      <Button
        onClick={onZoomOutButtonClick}
        icon={<MagnifyingGlassMinusIcon />}
      >
        zoom out
      </Button>
      <Button onClick={onUndoButtonClick} icon={<ArrowUturnDownIcon />}>
        undo
      </Button>
    </div>
  );
};

export default ControlBar;
