import React from 'react';
import './HorizontalLine.styles.css';

const HorizontalLine = ({ color, height }) => {
  const style = {
    backgroundColor: color,
    height: `${height}px`,
    width: '85%', // or any desired width value
    margin: '10px auto', // center align the line
  };

  return <div className='horizontal-line' style={style} />;
};

export default HorizontalLine;
