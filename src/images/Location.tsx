import React from "react";

const Location = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 342 512"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path d="M341.327 170.666C341.327 316.499 170.663 512 170.663 512S0 319.689 0 170.666C0 76.41 76.41 0 170.668 0c94.257 0 170.666 76.41 170.666 170.666h-.007zM170.664 54.98c62.03 0 112.39 50.36 112.39 112.39 0 62.029-50.36 112.39-112.39 112.39s-112.39-50.361-112.39-112.39c0-62.03 50.36-112.39 112.39-112.39z" />
    </svg>
  );
};

export default Location;
