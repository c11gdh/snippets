import React, { useRef, useEffect } from 'react';
import jsQR from 'jsqr';
import './style.css';

export default function App() {
  const videoRef = useRef();
  const timer = useRef();
  const isMounted = useRef();
  const streamTracks = useRef();
  const canvasElementRef = useRef(document.createElement('canvas'));
  const canvasRef = useRef(canvasElementRef.current.getContext('2d'));

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      useCamera();
    }
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const useCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        streamTracks.current = stream;
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          window.requestAnimationFrame(() => tick());
        };
      })
      .catch((err) => console.log(err));
  };

  const useQrCode = (imageData) => {
    let code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code && code.data) {
      console.log(code);
      streamTracks.current.getTracks().forEach((track) => {
        track.stop();
      });
      clearTimeout(timer.current);
    } else {
      console.log(timer.current);
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
    useQrCode(imageData);
  };

  return (
    <div>
      <video ref={videoRef} width="100%" height="100%" />
    </div>
  );
}
