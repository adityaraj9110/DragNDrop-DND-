import { useState } from "react";
import "./styles.css";

const cloInfo: Record<string, string[]> = {
  col1: ["Aditya", "Kishu"],
  col2: ["Ayush", "Rishu"],
};

export default function App() {
  const [col, setCol] = useState(cloInfo);
  const handleOnDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    fromCol: string,
    i: string
  ) => {
    e.dataTransfer.setData("item", i);
    e.dataTransfer.setData("column", fromCol);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>, toCol: string) => {
    const itemMoved = e.dataTransfer.getData("item");
    const fromCol = e.dataTransfer.getData("column");

    if (toCol === fromCol) return;

    const newDatafromTheColWhichItemMoved = col[fromCol].filter(
      (i) => i !== itemMoved
    );

    const newDataColWherItemDropeed = [...col[toCol], itemMoved];

    setCol((prev) => {
      return {
        ...prev,
        [fromCol]: newDatafromTheColWhichItemMoved,
        [toCol]: newDataColWherItemDropeed,
      };
    });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        padding: "1rem",
        background: "#f0f0f0",
      }}
    >
      {Object.keys(col).map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            background: "red",
            padding: "1rem",
            borderRadius: "8px",
            color: "white",
            width: "150px",
          }}
          onDrop={(e) => handleOnDrop(e, i)}
          onDragOver={(e) => e.preventDefault()}
        >
          {col[i].map((j, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "8px",
                background: "grey",
                padding: "2rem",
                cursor: "pointer",
              }}
              draggable
              onDragStart={(e) => handleOnDragStart(e, i, j)}
            >
              {j}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
