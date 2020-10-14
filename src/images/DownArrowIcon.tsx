import React from "react";

const DownArrowIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 200 128"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M199.404 28.284L171.12 0 99.702 71.418 28.284 0 0 28.284l99.702 99.702 99.702-99.702z"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default DownArrowIcon;
