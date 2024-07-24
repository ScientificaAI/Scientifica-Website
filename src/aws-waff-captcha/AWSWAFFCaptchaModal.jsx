import { useEffect } from "react";
import { createPortal } from "react-dom";
import { loadScript } from "./util";

export function AWSWAFCaptchaModal() {
  useEffect(() => loadScript());

  return createPortal(
    <div className="overlay" id="modalOverlay">
      <div className="modal" id="modal">
        <div id="captchaForm" />
      </div>
    </div>,
    document.body
  );
}
