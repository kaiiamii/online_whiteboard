import React, { useRef, useState } from "react";
import { Group, Layer, Rect, Stage, Text } from "react-konva";
import "./styleSheet.css";
import { LuMousePointer2, LuPencil, LuFrame, LuShapes } from "react-icons/lu";
import { BiSticker } from "react-icons/bi";
import { PiHandPointingBold } from "react-icons/pi";
import { TbArrowGuide } from "react-icons/tb";
import { BsChatText } from "react-icons/bs";
import { IoText } from "react-icons/io5";
import { RiMindMap } from "react-icons/ri";
import { AiFillPlusCircle } from "react-icons/ai";
import { Note } from "./types";
import VirtualGrid from "./components/dotGrid";
import ScalePanel from "./components/scalePanel";


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

    const [hoveredMap, setHoveredMap] = useState(false);
    const [hoveredMinus, setHoveredMinus] = useState(false);
    const [hoveredPlus, setHoveredPlus] = useState(false);
    const [hoveredQues, setHoveredQues] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    const handleMouseEnterMap = () => {
        timeoutRef.current = window.setTimeout(() => {
            setHoveredMap(true);
        }, 500);
    };
    const handleMouseLeaveMap = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setHoveredMap(false);
    };
    const handleMouseEnterMinus = () => {
        timeoutRef.current = window.setTimeout(() => {
            setHoveredMinus(true);
        }, 500);
    };
    const handleMouseLeaveMinus = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setHoveredMinus(false);
    };
    const handleMouseEnterPlus = () => {
        timeoutRef.current = window.setTimeout(() => {
            setHoveredPlus(true);
        }, 500);
    };
    const handleMouseLeavePlus = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setHoveredPlus(false);
    };
    const handleMouseEnterQues = () => {
        timeoutRef.current = window.setTimeout(() => {
            setHoveredQues(true);
        }, 500);
    };
    const handleMouseLeaveQues = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setHoveredQues(false);
    };
    return (
        <div>
            <ScalePanel scale={scale} zoomIn={zoomIn} zoomOut={zoomOut}></ScalePanel>
            <div className="toolsPanel">
                <div className="tooltipsRight">
                    <span className={`tooltip-text ${hoveredMap ? "show" : ""}`}>Обзор</span>
                    <span className={`tooltip-text ${hoveredMinus ? "show" : ""}`} style={{ left: "93px", width: 50 }}>Меньше</span>
                    <span className={`tooltip-text ${hoveredPlus ? "show" : ""}`} style={{ left: "185px", width: 50 }}>Больше</span>
                    <span className={`tooltip-text ${hoveredQues ? "show" : ""}`} style={{ left: "243px", width: 50 }}>Помощь</span>
                </div>
                <div className="toolsPanelStyle">
                    <button className="toolButton" onClick={zoomIn}
                        onMouseEnter={handleMouseEnterMap} onMouseLeave={handleMouseLeaveMap}><PiHandPointingBold style={{ width: "90%", height: "90%"}} ></PiHandPointingBold></button>
                    <button className="toolButton" onClick={zoomOut}
                        onMouseEnter={handleMouseEnterMinus} onMouseLeave={handleMouseLeaveMinus}><LuMousePointer2 style={{ width: "100%", height: "100%" }}></LuMousePointer2></button>
                    <div style={{ height: 1, background: "#DDD", width: "85%", margin: "0 auto", marginTop: "5px"}}></div>
                    <button className="toolButton" onClick={zoomIn}
                        onMouseEnter={handleMouseEnterPlus} onMouseLeave={handleMouseLeavePlus}><LuFrame style={{ width: "100%", height: "100%" }}></LuFrame></button>
                    <button className="toolButton" onClick={zoomIn}
                        onMouseEnter={handleMouseEnterPlus} onMouseLeave={handleMouseLeavePlus}><TbArrowGuide style={{ width: "90%", height: "90%" }}></TbArrowGuide></button>
                    <button className="toolButton" onClick={addNote}
                        onMouseEnter={handleMouseEnterPlus} onMouseLeave={handleMouseLeavePlus}><BiSticker style={{ width: "90%", height: "90%" }}></BiSticker></button>
                    <button className="toolButton" onClick={zoomOut}
                        onMouseEnter={handleMouseEnterMinus} onMouseLeave={handleMouseLeaveMinus}><LuPencil style={{ width: "100%", height: "100%" }}></LuPencil></button>
                    <button className="toolButton" onClick={zoomIn}
                        onMouseEnter={handleMouseEnterPlus} onMouseLeave={handleMouseLeavePlus}><LuShapes style={{ width: "100%", height: "100%" }}></LuShapes></button>
                    <button className="toolButton" onClick={zoomIn}
                        onMouseEnter={handleMouseEnterPlus} onMouseLeave={handleMouseLeavePlus}><IoText style={{ width: "100%", height: "100%" }}></IoText></button>
                    <button className="toolButton" onClick={zoomIn}
                        onMouseEnter={handleMouseEnterPlus} onMouseLeave={handleMouseLeavePlus}><BsChatText style={{ width: "100%", height: "100%" }} ></BsChatText></button>
                    <button className="toolButton" onClick={zoomIn}
                        onMouseEnter={handleMouseEnterPlus} onMouseLeave={handleMouseLeavePlus}><RiMindMap style={{ width: "100%", height: "100%" }}></RiMindMap></button>
                    <div style={{ width: "85%", background: "#DDD", height: 1, margin: "0 auto", marginBottom: "5px" }}></div>
                    <button className="toolButton" onClick={zoomIn}
                        onMouseEnter={handleMouseEnterQues} onMouseLeave={handleMouseLeaveQues}><AiFillPlusCircle style={{ width: "100%", height: "100%" }}></AiFillPlusCircle></button>
                </div>
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