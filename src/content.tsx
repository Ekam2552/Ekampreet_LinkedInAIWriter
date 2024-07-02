import { useState, useEffect } from "react";
import cssText from "data-text:~style.css";
import type { PlasmoCSConfig } from "plasmo";

import { AIButton } from "./features/AIButton";

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"],
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay = () => {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    console.log("PlasmoOverlay component mounted");

    const handleFocus = () => {
      setFocused(true);
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const inputBox = document.querySelector(".msg-form__contenteditable");
          if (inputBox) {
            inputBox.addEventListener("focus", handleFocus);
          } else {
            // Remove event listeners if the input element is no longer present
            const existingInputBox = document.querySelector(
              ".msg-form__contenteditable"
            );
            if (existingInputBox) {
              existingInputBox.removeEventListener("focus", handleFocus);
            }
          }
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return <>{focused && <AIButton />}</>;
};

export default PlasmoOverlay;
