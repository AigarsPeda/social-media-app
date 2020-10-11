import React from "react";

const CommentIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 640 589"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <g fillRule="nonzero">
        <path d="M551.472 0H87.902C39.434 0 0 39.427 0 87.903v283.695c0 48.367 39.263 87.73 87.591 87.902v128.738L272.6 459.5h278.872c48.468 0 87.903-39.434 87.903-87.902V87.903C639.375 39.427 599.94 0 551.471 0zm50.44 371.598c0 27.809-22.627 50.439-50.44 50.439H260.847L125.052 516.53v-94.494h-37.15c-27.814 0-50.44-22.63-50.44-50.44V87.904c0-27.817 22.626-50.44 50.44-50.44h463.57c27.813 0 50.438 22.623 50.438 50.44v283.695z" />
        <path d="M171.125 132.375H468.25v37.463H171.125zM171.125 212.297H468.25v37.463H171.125zM171.125 292.219H468.25v37.463H171.125z" />
      </g>
    </svg>
  );
};

export default CommentIcon;
