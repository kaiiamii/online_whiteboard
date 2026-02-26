import { Stage, Layer, Group, Rect, Text } from "react-konva";
import { useRef } from "react";
import VirtualGrid from "./dotGrid";
import { Note } from "../types";

type Props = {
    notes: Note[];
    scale: number;
    position: { x: number; y: number };
    setScale: React.Dispatch<React.SetStateAction<number>>;
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
    updatePosition: (id: string, x: number, y: number) => void;
};

export default function Board({
    notes,
    scale,
    position,
    setScale,
    setPosition,
    updatePosition,
}: Props) {
    const stageRef = useRef<any>(null);
    const zoomStep = 1.05;

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            scaleX={scale}
            scaleY={scale}
            x={position.x}
            y={position.y}
            ref={stageRef}
            onWheel={(e) => {
                e.evt.preventDefault();
                const stage = stageRef.current;
                if (!stage) return;

                const pointer = stage.getPointerPosition();
                if (!pointer) return;

                const oldScale = scale;
                const newScale =
                    e.evt.deltaY > 0 ? oldScale / zoomStep : oldScale * zoomStep;

                const clampedScale = Math.max(0.4, Math.min(3.5, newScale));

                const mousePointTo = {
                    x: (pointer.x - position.x) / oldScale,
                    y: (pointer.y - position.y) / oldScale,
                };

                setScale(clampedScale);

                setPosition({
                    x: pointer.x - mousePointTo.x * clampedScale,
                    y: pointer.y - mousePointTo.y * clampedScale,
                });
            }}
        >
            <Layer>
                <VirtualGrid
                    scale={scale}
                    offsetX={position.x}
                    offsetY={position.y}
                />
            </Layer>

            <Layer>
                {notes.map((note) => (
                    <Group
                        key={note.id}
                        x={note.x}
                        y={note.y}
                        draggable
                        onDragEnd={(e) =>
                            updatePosition(note.id, e.target.x(), e.target.y())
                        }
                    >
                        <Rect width={150} height={100} fill="yellow" />
                        <Text
                            x={10}
                            y={40}
                            text={note.text}
                            fontSize={16}
                            width={130}
                            wrap="word"
                            fill="black"
                        />
                    </Group>
                ))}
            </Layer>
        </Stage>
    );
}