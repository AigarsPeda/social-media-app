import React from "react";

const Calendar = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 32 34"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M26.91 2H26V1a1 1 0 10-2 0v1h-7V1a1 1 0 10-2 0v1H8V1a1 1 0 10-2 0v1h-.91A5.095 5.095 0 000 7.09v21.82A5.095 5.095 0 005.09 34h21.82A5.095 5.095 0 0032 28.91V7.09A5.095 5.095 0 0026.91 2zM30 28.91A3.094 3.094 0 0126.91 32H5.09A3.093 3.093 0 012 28.91V12h28v16.91zM30 10H2V7.09A3.093 3.093 0 015.09 4H6v3a1 1 0 102 0V4h7v3a1 1 0 102 0V4h7v3a1 1 0 102 0V4h.91A3.094 3.094 0 0130 7.09V10z"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default Calendar;
