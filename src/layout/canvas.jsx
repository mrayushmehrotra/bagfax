import React from "react";
import SwatchWrapper from "./swatchWrapper";
class Canvas extends React.Component {
  render() {
    const { activeData, swatchData, handleSwatchClick } = this.props;
    return (
      <div className="w-full h-3/5 relative z-10 lg:w-1/2 lg:h-full">
        <SwatchWrapper
          activeData={activeData}
          handleSwatchClick={handleSwatchClick}
          swatchData={swatchData}
        />
      </div>
    );
  }
}

export default Canvas;
