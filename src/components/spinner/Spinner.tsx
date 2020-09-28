import React from "react";

const Spinner = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="spinner-svg"
      width={65}
      height={65}
      viewBox="0 0 66 66"
      {...props}
    >
      <circle className="path" fill="none" cx={33} cy={33} r={30} />
    </svg>
  );
};

export default Spinner;
