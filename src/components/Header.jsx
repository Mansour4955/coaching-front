import React from "react";

const Header = () => {
  return (
    <div className="bg-white px-4 py-3 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] flex justify-between items-center">
      <div className="flex gap-2">
        <h1>logo</h1>
        <div className="flex">
          <input type="text" className="border" />
          <h1>Icon</h1>
        </div>
      </div>
      <div className="flex gap-3">
        <h1>icon1</h1>
        <h1>icon2</h1>
        <h1>icon3</h1>
        <h1>icon4</h1>
        <h1>icon5</h1>
        <div className="flex gap-1">
            
            <h1>Icon6</h1>
            <p>John</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
