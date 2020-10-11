import React from "react";

const LikeIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 436 402"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M397.584 39.184C372.506 14.106 338.547 0 302.498 0c-30.825 0-60.082 10.449-84.114 29.257C194.35 10.449 165.094 0 134.27 0 98.22 0 64.262 14.106 39.184 39.184c-52.245 52.245-52.245 137.404 0 189.649L206.89 396.539c3.135 3.135 7.314 4.702 10.97 4.702 4.18 0 7.838-1.567 10.972-4.702l167.706-167.184c25.078-25.6 39.184-59.559 39.184-95.086.523-36.049-13.061-69.485-38.138-95.085z"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default LikeIcon;
