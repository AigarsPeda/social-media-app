import * as React from "react";

const NotificationIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 512 512"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <g fillRule="nonzero">
        <path d="M196 512c36.219 0 66.522-25.808 73.491-60H391v-23.787c0-17.687-6.888-34.314-19.394-46.82-6.84-6.84-10.606-15.933-10.606-25.606v-86.643c4.967.565 9.97.856 15 .856 74.99 0 136-60.561 136-135S450.99 0 376 0c-41.641 0-78.935 18.955-103.719 48.686A164.324 164.324 0 00211 30.703V0h-30v30.681C96.471 38.243 30 109.045 30 195v160.787c0 9.673-3.767 18.767-10.606 25.606C6.888 393.899 0 410.527 0 428.213V452h122.509c6.969 34.192 37.272 60 73.491 60zm0-30c-19.555 0-36.228-12.541-42.42-30.01h84.839C232.228 469.459 215.555 482 196 482zM376 30c58.448 0 106 47.103 106 105s-47.552 105-106 105c-26.356 0-44.062-10.143-47.103-11.186L301 235.788v-27.806c-1.595-2.535-30-28.262-30-72.982 0-57.897 47.103-105 105-105zM40.606 402.607C53.112 390.101 60 373.473 60 355.787V195c0-74.439 61.009-135 136-135 20.831 0 41.196 4.762 59.656 13.864C246.289 92.23 241 113.008 241 135c0 30.318 10.615 59.952 30 84.066v55.146l55.327-13.832a137.62 137.62 0 004.673 1.758v93.649c0 17.687 6.888 34.314 19.394 46.82 5.352 5.352 8.822 12.084 10.079 19.393H30.528c1.256-7.31 4.727-14.042 10.078-19.393z" />
        <path d="M301 120h30v30h-30zM361 120h30v30h-30zM421 120h30v30h-30z" />
      </g>
    </svg>
  );
};

export default NotificationIcon;
