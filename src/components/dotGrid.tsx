import { Circle } from "react-konva";

const GRID_SIZE = 30;

type Props = {
    scale: number;
    offsetX: number;
    offsetY: number;
};

export default function VirtualGrid({ scale, offsetX, offsetY }: Props) {
    const dots: JSX.Element[] = [];

    const startX = Math.floor(-offsetX / (GRID_SIZE * scale)) * GRID_SIZE;
    const endX = Math.ceil((window.innerWidth - offsetX) / (GRID_SIZE * scale)) * GRID_SIZE;
    const startY = Math.floor(-offsetY / (GRID_SIZE * scale)) * GRID_SIZE;
    const endY = Math.ceil((window.innerHeight - offsetY) / (GRID_SIZE * scale)) * GRID_SIZE;

    for (let x = startX; x <= endX; x += GRID_SIZE) {
        for (let y = startY; y <= endY; y += GRID_SIZE) {
            dots.push(
                <Circle key={`${x}-${y}`} x={x} y={y} radius={1 / scale} fill="#ccc" />
            );
        }
    }

    return <>{dots}</>;
}