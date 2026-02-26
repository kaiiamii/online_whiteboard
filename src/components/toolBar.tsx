import { LuMousePointer2, LuPencil, LuFrame, LuShapes } from "react-icons/lu";
import { BiSticker } from "react-icons/bi";
import { PiHandPointingBold } from "react-icons/pi";
import { TbArrowGuide } from "react-icons/tb";
import { BsChatText } from "react-icons/bs";
import { IoText } from "react-icons/io5";
import { RiMindMap } from "react-icons/ri";
import { AiFillPlusCircle } from "react-icons/ai";

type Tool =
    | "hand"
    | "select"
    | "frame"
    | "arrow"
    | "sticker"
    | "pencil"
    | "shape"
    | "text"
    | "chat"
    | "mindmap";

type Props = {
    activeTool: Tool;
    setActiveTool: (tool: Tool) => void;
};

export default function Toolbar({ activeTool, setActiveTool }: Props) {
    const buttonClass = (tool: Tool) =>
        toolButton ${ activeTool === tool ? "activeTool" : ""};

return (
    <div className="toolsPanel">
        <div className="toolsPanelStyle">

            <button
                className={buttonClass("hand")}
                onClick={() => setActiveTool("hand")}
            >
                <PiHandPointingBold />
            </button>

            <button
                className={buttonClass("select")}
                onClick={() => setActiveTool("select")}
            >
                <LuMousePointer2 />
            </button>

            <div className="toolDivider" />

            <button
                className={buttonClass("frame")}
                onClick={() => setActiveTool("frame")}
            >
                <LuFrame />
            </button>

            <button
                className={buttonClass("arrow")}
                onClick={() => setActiveTool("arrow")}
            >
                <TbArrowGuide />
            </button>

            <button
                className={buttonClass("sticker")}
                onClick={() => setActiveTool("sticker")}
            >
                <BiSticker />
            </button>

            <button
                className={buttonClass("pencil")}
                onClick={() => setActiveTool("pencil")}
            >
                <LuPencil />
            </button>

            <button
                className={buttonClass("shape")}
                onClick={() => setActiveTool("shape")}
            >
                <LuShapes />
            </button>

            <button
                className={buttonClass("text")}
                onClick={() => setActiveTool("text")}
            >
                <IoText />
            </button>

            <button
                className={buttonClass("chat")}
                onClick={() => setActiveTool("chat")}
            >
                <BsChatText />
            </button>

            <button
                className={buttonClass("mindmap")}
                onClick={() => setActiveTool("mindmap")}
            >
                <RiMindMap />
            </button>

            <div className="toolDivider" />

            <button className="toolButton">
                <AiFillPlusCircle />
            </button>

        </div>
    </div>
);