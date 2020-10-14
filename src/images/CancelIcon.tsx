import React from "react";

const CancelIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 342 342"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path d="M0 311.473L311.541.02l30.166 30.174L30.166 341.647z" />
      <path d="M.054 30.174L30.219 0l311.542 311.453-30.166 30.174z" />
    </svg>
  );
};

export default CancelIcon;
