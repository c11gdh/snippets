import React, { useRef, useEffect } from "react";
import jsQR from "jsqr";

export default function App() {
  const videoRef = useRef();
  const timer = useRef();
  const canvasElementRef = useRef(document.createElement("canvas"));
  const canvasRef = useRef(
    canvasElementRef.current.getContext("2d", { willReadFrequently: true })
  );

  useEffect(() => {
    getCamera();
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const getCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          window.requestAnimationFrame(() => tick());
        };
      })
      .catch((err) => console.log(err));
  };

  const getQrcode = (imageData) => {
    let code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code && code.data) {
      console.log(code);
      closeCamera();
      clearTimeout(timer.current);
    } else {
      //   console.log(timer.current);
      // timer.current = window.requestAnimationFrame(() => tick());
      timer.current = setTimeout(tick, 1e3);
    }
  };

  const tick = () => {
    canvasElementRef.current.height = videoRef.current.videoHeight;
    canvasElementRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.drawImage(
      videoRef.current,
      0,
      0,
      canvasElementRef.current.width,
      canvasElementRef.current.height
    );
    var imageData = canvasRef.current.getImageData(
      0,
      0,
      canvasElementRef.current.width,
      canvasElementRef.current.height
    );
    getQrcode(imageData);
  };

  const closeCamera = () => {
    const { srcObject } = videoRef.current;
    srcObject.getTracks().forEach((track) => {
      track.stop();
      //   videoRef.current.srcObject = null;
    });
  };

  return (
    <div style={{ background: "#000" }}>
      <video ref={videoRef} style={{ width: "100vw", height: "100vh" }} />
    </div>
  );
}
