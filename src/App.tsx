import React, { useRef, useState } from "react";
import { Stage, Layer, Group, Rect, Text, Circle } from "react-konva";
import "./styleSheet.css";
import { FaMinus, FaPlus } from "react-icons/fa6";

type Note = { id: string; x: number; y: number; text: string };

const GRID_SIZE = 30;

const VirtualGrid = ({
    scale,
    offsetX,
    offsetY,
}: {
    scale: number;
    offsetX: number;
    offsetY: number;
}) => {
    const dots: JSX.Element[] = [];

    const startX = Math.floor(-offsetX / (GRID_SIZE * scale)) * GRID_SIZE;
    const endX = Math.ceil((window.innerWidth - offsetX) / (GRID_SIZE * scale)) * GRID_SIZE;
    const startY = Math.floor(-offsetY / (GRID_SIZE * scale)) * GRID_SIZE;
    const endY = Math.ceil((window.innerHeight - offsetY) / (GRID_SIZE * scale)) * GRID_SIZE;

    for (let x = startX; x <= endX; x += GRID_SIZE) {
        for (let y = startY; y <= endY; y += GRID_SIZE) {
            dots.push(<Circle key={`${x}-${y}`} x={x} y={y} radius={1 / scale} fill="#ccc" />);
        }
    }

    return <>{dots}</>;

};

const scalePanelStyle: React.CSSProperties = {
    height: 28,
    position: "fixed",
    right: 20,
    bottom: 20,
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    gap: 0,
    fontFamily: "Roboto, sans-serif",
    fontSize: 16,
    zIndex: 1000,
    boxShadow: "0 0 12px rgba(0,0,0,0.2)",
};


function App() {

    const zoomStep = 0.03;
    const zoomIn = () => {
        setScale((prev) => Math.min(prev + zoomStep, 3.5));
    }
    const zoomOut = () => {
        setScale((prev) => Math.max(prev - zoomStep, 0.4));
    }

    const [notes, setNotes] = useState<Note[]>([{ id: "1", x: 100, y: 100, text: "Первая карточка" }]);
    const [draggingCard, setDraggingCard] = useState(false);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const stageRef = useRef<any>(null);

    const addNote = () => setNotes([...notes, { id: Date.now().toString(), x: 150, y: 150, text: "Новая карточка" }]);

    const updatePosition = (id: string, x: number, y: number) => {
        setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, x, y } : note)));
    };

    const snapToGrid = (pos: number) => Math.round(pos / GRID_SIZE) * GRID_SIZE;

    return (
        <div>
            <button onClick={addNote}>Добавить карточку</button>
            <div style={scalePanelStyle}>
                <div style={{ width: 1, background: "#DDD", height: "85%" }}></div>
                <button className="signButton" onClick={zoomOut}><FaMinus size={13}></FaMinus></button>
                <span>{Math.round(scale * 100)}%</span>
                <button className="signButton" onClick={zoomIn}><FaPlus size={13}></FaPlus></button>
                <div style={{ width: 1, background: "#DDD", height: "85%"}}></div>
            </div>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                scaleX={scale}
                scaleY={scale}
                x={position.x}
                y={position.y}
                draggable={!draggingCard}
                onMouseDown={(e) => {
                    const shape = e.target;
                    const clickedOnCard = e.target.getParent()?.name() === "card" || shape.name === "card";
                    setDraggingCard(clickedOnCard);
                }}
                onMouseUp={() => setDraggingCard(false)}
                ref={stageRef}
                onDragMove={(e) => {
                    if (!draggingCard) setPosition({ x: e.target.x(), y: e.target.y() });
                }}
                onWheel={(e) => {
                    e.evt.preventDefault();
                    const stage = stageRef.current;
                    if (!stage) return;
                    const pointer = stage.getPointerPosition();
                    if (!pointer) return;
                    const oldScale = scale;
                    const scaleBy = 1.05;
                    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
                    const clampedScale = Math.max(0.4, Math.min(3.5, newScale));
                    const mousePointTo = { x: (pointer.x - position.x) / oldScale, y: (pointer.y - position.y) / oldScale };
                    setScale(clampedScale);
                    setPosition({ x: pointer.x - mousePointTo.x * clampedScale, y: pointer.y - mousePointTo.y * clampedScale });
                }}
            >
                <Layer>
                    <VirtualGrid scale={scale} offsetX={position.x} offsetY={position.y} />
                </Layer>

                <Layer>
                    {notes.map((note) => (
                        <Group
                            key={note.id}
                            name = "card"
                            x={note.x}
                            y={note.y}
                            draggable
                            onDragStart={() => setDraggingCard(true)}
                            onDragEnd={(e) => {
                                updatePosition(note.id, e.target.x(), e.target.y());
                                setDraggingCard(false);
                            }}
                        >
                            <Rect width={150} height={100} fill="yellow" />
                            <Text x={10} y={40} text={note.text} fontSize={16} width={130} wrap="word" align="left" fill="black" font="Josefin Sans, sans-serif" />
                        </Group>
                    ))}
                </Layer>
            </Stage>
        </div>
    );
}

export default App;