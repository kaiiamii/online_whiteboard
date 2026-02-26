import React, { useRef, useState } from "react";
import "../styleSheet.css";
import { FaMinus, FaPlus, FaQuestion, FaRegMap } from "react-icons/fa6";

type Props = {
    scale: number;
    zoomIn: () => void;
    zoomOut: () => void;
};

const scalePanelStyle: React.CSSProperties = {
    height: 45,
    position: "fixed",
    right: 15,
    bottom: 15,
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    gap: 0,
    fontFamily: "George Bold, sans-serif",
    fontSize: 16,
    zIndex: 1000,
    boxShadow: "0 0 12px rgba(0,0,0,0.2)",
    paddingRight: "1px",
    paddingLeft: "1px",
};


export default function ScalePanel({ scale, zoomIn, zoomOut }: Props) {
    const stageRef = useRef<any>(null);
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

        <div className="downPanel">
            <div className="tooltips">
                <span className={`tooltip-text ${hoveredMap ? "show" : ""}`}>Обзор</span>
                <span className={`tooltip-text ${hoveredMinus ? "show" : ""}`} style={{ left: "93px", width: 50 }}>Меньше</span>
                <span className={`tooltip-text ${hoveredPlus ? "show" : ""}`} style={{ left: "185px", width: 50 }}>Больше</span>
                <span className={`tooltip-text ${hoveredQues ? "show" : ""}`} style={{ left: "243px", width: 50 }}>Помощь</span>
            </div>
            <div style={scalePanelStyle}>
                <button className="signButtonPlus" onClick={zoomIn}
                    onMouseEnter={handleMouseEnterMap} onMouseLeave={handleMouseLeaveMap}><FaRegMap size={19}></FaRegMap></button>
                <div style={{ width: 1, background: "#DDD", height: "85%" }}></div>
                <button className="signButtonMinus" onClick={zoomOut}
                    onMouseEnter={handleMouseEnterMinus} onMouseLeave={handleMouseLeaveMinus}><FaMinus size={19}></FaMinus></button>
                <span>{Math.round(scale * 100)}%</span>
                <button className="signButtonPlus" onClick={zoomIn}
                    onMouseEnter={handleMouseEnterPlus} onMouseLeave={handleMouseLeavePlus}><FaPlus size={19}></FaPlus></button>
                <div style={{ width: 1, background: "#DDD", height: "85%" }}></div>
                <button className="signButtonPlus" onClick={zoomIn}
                    onMouseEnter={handleMouseEnterQues} onMouseLeave={handleMouseLeaveQues}><FaQuestion size={19}></FaQuestion></button>
            </div>
        </div>
    );
}