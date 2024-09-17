import React, { useState, useEffect } from 'react';

function WindowResizeComponent() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      // useEffect to handle window resize
  useEffect(() => {
    // Function to update window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (

   <div className="p-4">
      <h2 className="text-xl font-bold">Window Resize Listener</h2>
      <p>Current Window Width: {windowSize.width}px</p>
      <p>Current Window Height:{windowSize.height}px</p>
    </div>

  )
}

export default WindowResizeComponent