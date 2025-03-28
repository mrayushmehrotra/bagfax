import React, { useState } from "react";

const SingleSwatchCircle = ({ activeID, item, handleClick }) => {
  const [handleAnimation, setHandleAnimation] = useState(false);

  const MyCustomHandler = (item) => {
    handleClick(item);
    setHandleAnimation(true);
    setTimeout(() => setHandleAnimation(false), 3000);
  };

  return (
    <div
      className={`
cursor-pointer w-9 h-9 p-1 rounded-full drop-shadow-xl bg-white transition ease-in hover:scale-110
${item.id === activeID ? "scale-125" : ""} ${handleAnimation ? "pointer-events-none cursor-not-allowed" : ""}
`}
      onClick={() => MyCustomHandler(item)}
    >
      <div
        style={{ backgroundColor: item.SwatchColor }}
        className="h-full w-full   rounded-full"
      ></div>
    </div>
  );
};
export default SingleSwatchCircle;
