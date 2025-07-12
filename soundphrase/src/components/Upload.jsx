import React from "react";

function Transcriber() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [transcribedText, setTranscribedText] = React.useState("");

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to transcribe.");
      }

      setTranscribedText(data.text);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload and Transcribe
      </button>
      <h2>Transcription:</h2>
      <p>{transcribedText}</p>
    </div>
  );
}

export default Transcriber;