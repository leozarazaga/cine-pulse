import { useState } from "react";

type TextExpanderProps = {
    children: string
    collapsedNumWords: number;
    expanded?: boolean;
};

const TextExpander: React.FC<TextExpanderProps> = ({ children, collapsedNumWords = 20, expanded = false }) => {
    const [isExpanded, setIsExpanded] = useState(expanded);
    const displayText = isExpanded ? children : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

    const buttonStyle = {
        background: "none",
        border: "none",
        font: "inherit",
        cursor: "pointer",
        marginLeft: "6px",
        color: "#1f09cd",
    };

    return (
        <div>
            <span className="text-start">{displayText}</span>

            <button onClick={() => setIsExpanded((expanded) => !expanded)} style={buttonStyle}>
                {isExpanded ? "Read less." : "Read more."}
            </button>
        </div>
    );
};

export default TextExpander;
