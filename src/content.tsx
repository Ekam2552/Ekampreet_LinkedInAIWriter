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

    const handleBlur = () => {
      setFocused(false);
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const inputBox = document.querySelector(".msg-form__contenteditable");
          if (inputBox) {
            inputBox.addEventListener("focus", handleFocus);
            inputBox.addEventListener("blur", handleBlur);
            observer.disconnect(); // Stop observing once the element is found
          }
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      const inputBox = document.querySelector(".msg-form__contenteditable");
      if (inputBox) {
        inputBox.removeEventListener("focus", handleFocus);
        inputBox.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  return <>{focused && <AIButton />}</>;
};

export default PlasmoOverlay;
