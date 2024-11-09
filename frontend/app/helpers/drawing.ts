import Konva from "konva";
import { ContextFrom } from "xstate";
import { drawingMachine } from "../services/drawingMachine";

export function getStage(
  context: ContextFrom<typeof drawingMachine>
): Konva.Stage {
  const stage = context.stage as Konva.Stage;

  return stage;
}

export function getLayer(
  context: ContextFrom<typeof drawingMachine>
): Konva.Layer {
  const stage = getStage(context);
  const layer = stage.getLayers()[0];

  return layer;
}

export function getImage(
  context: ContextFrom<typeof drawingMachine>
): Konva.Node {
  const layer = getLayer(context);
  const image = layer.getChildren()[0];

  return image;
}

export function getConstrainedImageDimensions({
  image,
  stage,
}: {
  image: HTMLImageElement;
  stage: Konva.Stage;
}) {
  const CONSTRAINT_FACTOR = 0.8;
  const imageRatio = image.width / image.height;
  let height = image.height;
  let width = image.width;

  if (width > stage.width()) {
    width = stage.width() * CONSTRAINT_FACTOR;
    height = width / imageRatio;
  }

  if (height > stage.height()) {
    height = stage.height() * CONSTRAINT_FACTOR;
    width = height * imageRatio;
  }

  return {
    height,
    width,
  };
}
