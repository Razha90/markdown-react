import { useState, useEffect } from 'react';
import Preview from './Preview';
import Editor from './Editor';
import './css/App.css';
import { widthResizer,  heightResizer } from './resizerHooks';

function App() {
  const [count, setCount] = useState('# Project malas asal responsive');
  const [posisi, setPosisi] = useState();


  useEffect(() => {
    const handleResize = () => {
      setPosisi(window.innerWidth > 620);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, [posisi]);

  // useEffect(() => {
  //   if (posisi) {
  //     widthResizer();
  //   } else {
  //     heightResizer();
  //   }
  // }, [posisi]);

  useEffect(() => {
    const resizer = document.getElementById('dragMe');
    const leftSide = resizer.previousElementSibling;
    const rightSide = resizer.nextElementSibling;

    let x = 0;
    let y = 0;
    let leftWidth = 0;

    let xy = 0;
    let yx = 0;
    let leftHeight = 0;

    const mouseDownHandler = function (e) {
      if (posisi) {
        x = e.clientX;
        y = e.clientY;
        leftWidth = leftSide.getBoundingClientRect().width;

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      } else {
        xy = e.clientY;
        yx = e.clientY;
        leftHeight = leftSide.getBoundingClientRect().height;
  
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
        const dy = e.clientY - xy;
        const newLeftHeight = leftHeight + dy;
        leftSide.style.height = `${newLeftHeight}px`;
      }
    };

    const mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    resizer.addEventListener('mousedown', mouseDownHandler);

    return () => {
      resizer.removeEventListener('mousedown', mouseDownHandler);
    };
  }, [posisi]);

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
