import React from "react";

type SpinnerProps = {
  drawer?: boolean;
};

const Spinner = ({ drawer }: SpinnerProps) => {
  return (
    <div className={`flex ${drawer ? "h-[20vh]" : "h-[80vh]"} items-center justify-center w-full`}>
      <div className="inline-flex space-x-2">
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Spinner;
