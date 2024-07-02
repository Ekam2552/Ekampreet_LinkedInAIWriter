import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [showModal, setShowModal] = useState(isOpen);
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  const handleGenerate = () => {
    setBotResponse(
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    );
  };

  const handleClick = () => {
    const inputBox = document.querySelector(".msg-form__contenteditable");

    if (inputBox) {
      inputBox.innerHTML = "";
      const p = document.createElement("p");
      p.textContent = botResponse;
      inputBox.appendChild(p);
    }

    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center ${
        showModal ? "" : "hidden"
      }`}
      onClick={handleClose}
    >
      <div
        className="fixed inset-0 z-10 flex items-center justify-center p-2"
        style={{ width: "800px", height: "220px", margin: "auto" }}
      >
        <div
          className="bg-white rounded p-4 shadow-lg flex flex-col"
          style={{ width: "100%", height: "100%" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-gray-200 text-gray-400 font-bold text-lg rounded p-2 ml-auto"
            style={{
              maxWidth: "300px",
              display: botResponse ? "block" : "none",
            }}
          >
            <p>{userInput}</p>
          </div>
          <div
            className="flex flex-col-reverse mt-4 mb-4"
            style={{ width: "100%" }}
          >
            {botResponse && (
              <div
                className="bg-blue-200 text-blue-400 text-lg font-bold rounded p-2"
                style={{ maxWidth: "300px", marginTop: "1rem" }}
              >
                <p>{botResponse}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-end w-full">
            <input
              className="border border-gray-300 rounded p-2 mr-2 w-full h-14"
              placeholder="Your Prompt"
              onChange={(e) => setUserInput(e.target.value)}
              style={{ fontSize: "1.2rem" }}
            />
            <div className="flex flex-row items-center justify-end w-full mt-4">
              {botResponse && (
                <button
                  className=" text-gray-600 border border-gray-600 font-bold rounded px-4 py-2 mr-2"
                  onClick={handleClick}
                  style={{ fontSize: "1.2rem" }}
                >
                  Insert
                </button>
              )}
              <button
                className="bg-blue-500 text-white rounded font-bold px-4 py-2 ml-2"
                onClick={handleGenerate}
                style={{ fontSize: "1.2rem" }}
              >
                {botResponse ? "Regenerate" : "Generate"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
