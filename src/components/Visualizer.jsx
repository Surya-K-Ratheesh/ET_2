import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

export default function Visualizer({ buildingImage, designs }) {
  const [detections, setDetections] = useState([]);
  const imgRef = useRef();

  useEffect(() => {
    if (buildingImage) {
      detectOpenings();
    }
  }, [buildingImage]);

  const detectOpenings = async () => {
    try {
      // Load COCO-SSD model instead of custom graph model for simplicity
      const model = await tf.loadGraphModel('https://tfhub.dev/tensorflow/tfjs-model/ssd_mobilenet_v2/1/default/1');
      
      // Convert image to tensor
      const imgElement = imgRef.current;
      const tensor = tf.browser.fromPixels(imgElement);
      
      // Run detection
      const predictions = await model.executeAsync(tensor);
      
      // Filter for doors/windows and format results
      const formattedDetections = predictions.map(pred => ({
        class: pred.class,
        score: pred.score,
        bbox: [pred.bbox[0] * imgElement.width, 
               pred.bbox[1] * imgElement.height,
               pred.bbox[2] * imgElement.width, 
               pred.bbox[3] * imgElement.height]
      })).filter(p => ['door', 'window'].includes(p.class));
      
      setDetections(formattedDetections);
      tensor.dispose(); // Clean up memory
    } catch (error) {
      console.error("Detection failed:", error);
    }
  };

  return (
    <div className="visualizer">
      {buildingImage && (
        <div className="image-container">
          <img 
            ref={imgRef}
            src={buildingImage} 
            alt="Building" 
            crossOrigin="anonymous"
            onLoad={detectOpenings} // Trigger detection when image loads
          />
          {detections.map((det, i) => (
            <div 
              key={i}
              className="detection-box"
              style={{
                left: `${det.bbox[0]}px`,
                top: `${det.bbox[1]}px`,
                width: `${det.bbox[2]}px`,
                height: `${det.bbox[3]}px`,
                position: 'absolute',
                border: '2px solid red',
                pointerEvents: 'none'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}