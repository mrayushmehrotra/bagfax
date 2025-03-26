import React from "react";

const SingleSwatchCircle = ({ activeID, item, handleClick }) => {
  console.log(item);

  return (
    <div
      className={`
cursor-pointer w-9 h-9 p-1 rounded-full drop-shadow-xl bg-white transition ease-in hover:scale-110
${item.id === activeID ? "scale-125" : ""}
`}
      onClick={() => handleClick(item)}
    >
      <div
        style={{ backgroundColor: item.SwatchColor }}
        className="h-full w-full   rounded-full"
      ></div>
    </div>
  );
};
export default SingleSwatchCircle;
