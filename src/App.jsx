import { useState, useEffect } from 'react';
import Preview from './Preview';
import Editor from './Editor';
import './css/App.css';

function App() {
  const [count, setCount] = useState('# Project malas asal responsive');
  const [posisi, setPosisi] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setPosisi(window.innerWidth > 620);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const resizer = document.getElementById('dragMe');
    const leftSide = resizer.previousElementSibling;
    const rightSide = resizer.nextElementSibling;

    let x = 0;
    let y = 0;
    let leftWidth = 0;

    let x1 = 0
    let y1 = 0
    let rightWidth = 0;
    const mouseDownHandler = function (e) {
      if (posisi) {
        x = e.clientX;
        y = e.clientY;
        leftWidth = leftSide.getBoundingClientRect().width;
  
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      } else {
        x1 = e.clientX;
        y1 = e.clientY;
        rightWidth = leftSide.getBoundingClientRect().height;
  
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      }
    };

    const mouseMoveHandler = function (e) {
      if (posisi) {
        const dx = e.clientX - x;
        const newLeftWidth = leftWidth + dx;
        leftSide.style.width = `${newLeftWidth}px`;
      } else {
        const dx = e.clientY - y1;
        const newLeftHeight = rightWidth + dx;
        leftSide.style.height = `${newLeftHeight}px`;
      }
    };

    const mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    resizer.addEventListener('mousedown', mouseDownHandler);

    // Cleanup: remove event listener when component unmounts
    return () => {
      resizer.removeEventListener('mousedown', mouseDownHandler);
    };
  }, []);
  
  return (
    <div id='app'>
      <Editor setText={setCount} text={count}/>
      <div className="resizer" id='dragMe'>
        <div></div>
        <div></div>
        <div></div>
      </div>      
      <Preview text={count}/>
    </div>
  );
}

export default App;
