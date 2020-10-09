import React from "react";

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 25 20"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <g transform="matrix(-1 0 0 1 24.343 -2.172)">
        <path
          d="M24.343 9.606a3.613 3.613 0 00-5.443.376c-.998-4.468-4.98-7.81-9.75-7.81a9.967 9.967 0 00-7.072 2.929l7.071 7.07-7.071 7.071a9.972 9.972 0 007.072 2.93c4.77 0 8.752-3.343 9.75-7.812a3.608 3.608 0 005.443.377l-2.566-2.564 2.566-2.567zM9.774 7.421a1.563 1.563 0 110-3.125 1.563 1.563 0 010 3.125z"
          fillRule="nonzero"
        />
        <circle cx={4.313} cy={14.714} r={1} />
        <circle cx={1.536} cy={13.324} r={0.847} />
        <circle cx={3.313} cy={9.797} r={1} />
        <circle cx={0.688} cy={9.11} r={0.688} />
        <circle cx={5.773} cy={12.172} r={0.688} />
      </g>
    </svg>
  );
};

export default LogoIcon;
