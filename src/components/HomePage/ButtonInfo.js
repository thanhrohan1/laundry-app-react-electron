import React from 'react';

const ButtonInfo = ({ text, bgColor, textColor }) => {
  const customStyle = `bg-${bgColor} text-${textColor} font-bold py-3 px-16 mr-4 rounded-full button-homepage`;
  return <button className={customStyle}>{text}</button>;
};

export default ButtonInfo;
