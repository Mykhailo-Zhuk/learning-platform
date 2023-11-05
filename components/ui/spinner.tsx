import React from "react";

const Spinner = () => {
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="inline-flex space-x-2">
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Spinner;
