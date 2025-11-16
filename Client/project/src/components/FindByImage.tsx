import { useState, useRef } from 'react';
import '../styling/home.css';

const FindByImage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
      setIsCapturing(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCapturing(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setImagePreview(imageData);
        stopCamera();
      }
    }
  };

  const handleSearch = () => {
    if (imagePreview) {
      // In a real app, this would send the image to a backend for processing
      alert('Searching for similar items... This feature will be available soon!');
      // You can implement the actual search logic here
    }
  };

  const handleClose = () => {
    stopCamera();
    setImagePreview(null);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        className="find-by-image-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Find by Image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        Find Clothes
      </button>

      {isOpen && (
        <div className="find-image-modal-overlay" onClick={handleClose}>
          <div className="find-image-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleClose}>×</button>
            <h2 className="modal-title">Find Similar Items</h2>
            <p className="modal-subtitle">Upload an image or take a photo to find similar fashion items</p>

            {!imagePreview ? (
              <div className="image-upload-section">
                {!isCapturing ? (
                  <>
                    <div className="upload-options">
                      <button onClick={startCamera} className="camera-btn">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                          <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        Take Photo
                      </button>
                      <button onClick={() => fileInputRef.current?.click()} className="upload-btn">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        Upload Image
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                    />
                  </>
                ) : (
                  <div className="camera-preview">
                    <video ref={videoRef} autoPlay playsInline className="camera-video"></video>
                    <div className="camera-controls">
                      <button onClick={stopCamera} className="cancel-camera-btn">Cancel</button>
                      <button onClick={capturePhoto} className="capture-btn">
                        <span className="capture-circle"></span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="image-preview-section">
                <img src={imagePreview} alt="Preview" className="preview-image" />
                <div className="preview-actions">
                  <button onClick={() => { setImagePreview(null); stopCamera(); }} className="change-image-btn">
                    Change Image
                  </button>
                  <button onClick={handleSearch} className="search-image-btn">
                    Search Similar Items
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FindByImage;

