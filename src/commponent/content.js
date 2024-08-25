import React, { useRef, useEffect, useState } from "react";

export default function Content(props) {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [textFields, setTextFields] = useState([
    { text: "Top Text", position: { x: 50, y: 10 }, id: 1 },
  ]);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  let bodyback = props.mode
    ? "background: white "
    : "background: rgb(35 31 31)";
  document.body.style = bodyback;

  let backcolors = props.mode
    ? " linear-gradient(to right, #672280 1.18%, #A626D3 100%)"
    : "linear-gradient(to right, #060407 , #5a276c ,#060407 100%)";
  let backStyle = {
    backgroundImage: backcolors,
  };

  const [memeImage, setMemeImage] = useState("https://i.imgflip.com/392xtu.jpg");
  const [allMemeImages, setAllMemeImages] = useState([]);

  useEffect(() => {
    async function getMemeImages() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemeImages(data.data.memes);
    }
    getMemeImages();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      const scale = Math.min(canvasSize.width / img.width, canvasSize.height / img.height);
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      drawText();
    };
    img.src = memeImage;
  }, [memeImage, canvasSize, textFields]);

  function drawText() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.font = `${Math.floor(canvas.width / 20)}px Impact`;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(canvas.width / 20) / 15;
    ctx.textAlign = "center";

    textFields.forEach(({ text, position }) => {
      ctx.fillText(
        text,
        canvas.width * position.x / 100,
        canvas.height * position.y / 100
      );
      ctx.strokeText(
        text,
        canvas.width * position.x / 100,
        canvas.height * position.y / 100
      );
    });
  }

  function getMeme() {
    const randomIndex = Math.floor(Math.random() * allMemeImages.length);
    setMemeImage(allMemeImages[randomIndex].url);
  }

  function handleMouseDown(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const selectedField = textFields.find(({ position }) => {
      const textX = (canvas.width * position.x) / 100;
      const textY = (canvas.height * position.y) / 100;
      return (
        x >= textX - 50 &&
        x <= textX + 50 &&
        y >= textY - 20 &&
        y <= textY + 20
      );
    });

    if (selectedField) {
      setSelectedTextId(selectedField.id);
      setDragOffset({
        x: x - (canvas.width * selectedField.position.x) / 100,
        y: y - (canvas.height * selectedField.position.y) / 100
      });
    }
  }

  function handleMouseMove(event) {
    if (selectedTextId === null) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setTextFields((prevFields) =>
      prevFields.map((field) =>
        field.id === selectedTextId
          ? {
              ...field,
              position: {
                x: ((x - dragOffset.x) / canvas.width) * 100,
                y: ((y - dragOffset.y) / canvas.height) * 100,
              },
            }
          : field
      )
    );
  }

  function handleMouseUp() {
    setSelectedTextId(null);
  }

  function handleTextChange(event, id) {
    const { value } = event.target;
    setTextFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, text: value } : field
      )
    );
  }

  function addTextField() {
    setTextFields((prevFields) => [
      ...prevFields,
      { text: "New Text", position: { x: 50, y: 50 }, id: Date.now() },
    ]);
  }

  function deleteTextField(id) {
    setTextFields((prevFields) => prevFields.filter((field) => field.id !== id));
  }

  function downloadMeme() {
    const canvas = canvasRef.current;
    const imageType = "image/png"; // Use "image/jpeg" for JPG
    const image = canvas.toDataURL(imageType);

    const link = document.createElement("a");
    link.href = image;
    link.download = "meme.png"; // Use "meme.jpg" for JPG
    link.click();
  }

  return (
    <div className="Content">
      <div className="Form">
        {textFields.map(({ id, text }) => (
          <div key={id} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={text}
              onChange={(event) => handleTextChange(event, id)}
              placeholder="Text"
            />
            <button onClick={() => deleteTextField(id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </div>
        ))}
        <button onClick={addTextField} style={backStyle}>
          Add Text
        </button>
        <button onClick={getMeme} style={backStyle}>
          Get Meme Img
        </button>
        <button onClick={downloadMeme} style={backStyle}>
          Download Meme
        </button>
      </div>
      <canvas
        ref={canvasRef}
        style={{ maxWidth: "100%", height: "auto" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}
