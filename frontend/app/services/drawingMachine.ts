import Konva from "konva";
import { setup, assign, AnyEventObject, fromPromise } from "xstate";
import { UserEvent } from "../components/ControlBar";
import {
  getConstrainedImageDimensions,
  getImage,
  getLayer,
  getStage,
} from "../helpers/drawing";

const ZOOM_IN_FACTOR = 1.1;
const ZOOM_OUT_FACTOR = 0.9;
const ROTATION_ANGLE = -90;

export const drawingMachine = setup({
  types: {} as {
    context: {
      stage: Konva.Stage | undefined;
      imageUrl: string;
      history: Konva.NodeConfig[];
    };
    events:
      | { type: "LOAD_IMAGE"; url: string }
      | {
          type: "CREATE_STAGE";
          container: HTMLDivElement;
          height: number;
          width: number;
        }
      | UserEvent;
  },
  actions: {
    assignStage: assign(
      (
        _,
        params: { container: HTMLDivElement; height: number; width: number }
      ) => {
        const stage = new Konva.Stage({
          container: params.container,
          width: params.width,
          height: params.height,
        });
        const layer = new Konva.Layer();

        stage.add(layer);
        layer.draw();

        return {
          stage,
        };
      }
    ),
    assignImageUrl: assign((_, params: { imageUrl: string }) => {
      const { imageUrl } = params;

      return {
        imageUrl,
      };
    }),
    drawImage: ({ context, event }) => {
      const { output } = event as AnyEventObject;
      const stage = getStage(context);
      const layer = getLayer(context);
      const imageObj = output.image;
      const { height, width } = getConstrainedImageDimensions({
        image: imageObj,
        stage,
      });
      const image = new Konva.Image({
        x: stage.width() / 2,
        y: stage.height() / 2,
        image: output.image,
        width: width,
        height: height,
        offset: {
          x: width / 2,
          y: height / 2,
        },
      });
      layer.add(image);
    },
    rotateImage90: ({ context }) => {
      const image = getImage(context);

      image.rotate(ROTATION_ANGLE);
    },
    zoomIn: ({ context }) => {
      const image = getImage(context);
      image.scale({
        x: image.getAttr("scaleX") * ZOOM_IN_FACTOR,
        y: image.getAttr("scaleY") * ZOOM_IN_FACTOR,
      });
    },
    zoomOut: ({ context }) => {
      const image = getImage(context);
      image.scale({
        x: image.getAttr("scaleX") * ZOOM_OUT_FACTOR,
        y: image.getAttr("scaleY") * ZOOM_OUT_FACTOR,
      });
    },
    saveHistoryState: assign(({ context }) => {
      const image = getImage(context);
      const attrs = {
        rotation: 0, // Initial attrs don't have info about the rotation
        ...image.getAttrs(),
      };
      return {
        history: [...context.history, { ...attrs }],
      };
    }),
    undo: assign(({ context }) => {
      const history = [...context.history];
      if (!history.length) return {};
      const image = getImage(context);
      const previousAttrs = history.pop();
      image.setAttrs(previousAttrs);

      return {
        history,
      };
    }),
  },
  actors: {
    loadImage: fromPromise<{ image: HTMLImageElement }, { url: string }>(
      ({ input }) => {
        return new Promise((resolve) => {
          const image = new Image();
          image.addEventListener("load", () => {
            resolve({ image });
          });
          image.src = input.url;
        });
      }
    ),
  },
}).createMachine({
  context: {
    stage: undefined,
    imageUrl: "",
    history: [],
  },
  id: "drawingMachine",
  initial: "setup",
  states: {
    setup: {
      on: {
        CREATE_STAGE: {
          target: "idle",
          actions: [
            {
              type: "assignStage",
              params: ({ event }) => ({
                container: event.container,
                height: event.height,
                width: event.width,
              }),
            },
          ],
        },
      },
    },
    idle: {
      on: {
        LOAD_IMAGE: {
          target: "loading",
          actions: [
            {
              type: "assignImageUrl",
              params: ({ event }) => ({
                imageUrl: event.url,
              }),
            },
          ],
        },
      },
    },
    loading: {
      invoke: {
        src: "loadImage",
        input: ({ context }) => ({
          url: context.imageUrl,
        }),
        onDone: {
          target: "ready",
          actions: ["drawImage", "saveHistoryState"],
        },
        onError: {
          target: "idle",
        },
      },
    },
    ready: {
      on: {
        ROTATE: {
          actions: ["saveHistoryState", "rotateImage90"],
        },
        ZOOM_IN: {
          actions: ["saveHistoryState", "zoomIn"],
        },
        ZOOM_OUT: {
          actions: ["saveHistoryState", "zoomOut"],
        },
        UNDO: {
          actions: ["undo"],
        },
      },
    },
  },
});
