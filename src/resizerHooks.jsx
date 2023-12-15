import { useEffect } from 'react';

const widthResizer = () => {
    useEffect(() => {
        const resizer = document.getElementById('dragMe');
        const leftSide = resizer.previousElementSibling;
        const rightSide = resizer.nextElementSibling;
    
        let x = 0;
        let y = 0;
        let leftWidth = 0;
    
        const mouseDownHandler = function (e) {
            x = e.clientX;
            y = e.clientY;
            leftWidth = leftSide.getBoundingClientRect().width;
      
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
          
        };
    
        const mouseMoveHandler = function (e) {
            const dx = e.clientX - x;
            const newLeftWidth = leftWidth + dx;
            leftSide.style.width = `${newLeftWidth}px`;
          
        };
    
        const mouseUpHandler = function () {
          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
        };
    
        resizer.addEventListener('mousedown', mouseDownHandler);
    
        return () => {
          resizer.removeEventListener('mousedown', mouseDownHandler);
        };
      }, []);
}

function heightResizer () {
    useEffect(() => {
        const resizer = document.getElementById('dragMe');
        const leftSide = resizer.previousElementSibling;
        const rightSide = resizer.nextElementSibling;
    
        let x = 0;
        let y = 0;
        let leftHeight = 0;
    
        const mouseDownHandler = function (e) {
            x = e.clientY;
            y = e.clientY;
            leftHeight = leftSide.getBoundingClientRect().height;
      
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
          
        };
    
        const mouseMoveHandler = function (e) {
            const dx = e.clientY - x;
            const newLeftHeight = leftHeight + dx;
            leftSide.style.height = `${newLeftHeight}px`;
          
        };
    
        const mouseUpHandler = function () {
          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
        };
    
        resizer.addEventListener('mousedown', mouseDownHandler);
    
        return () => {
          resizer.removeEventListener('mousedown', mouseDownHandler);
        };
      }, []);
}

export {widthResizer, heightResizer};