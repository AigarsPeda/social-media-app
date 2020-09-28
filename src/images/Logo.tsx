import React from "react";

const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 491 491"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M245.333 0C109.839 0 0 109.839 0 245.333s109.839 245.333 245.333 245.333 245.333-109.839 245.333-245.333C490.514 109.903 380.764.153 245.333 0z"
        fill="#0b1e59"
        fillRule="nonzero"
        id="logo"
      />
      <path
        d="M317.867 221.867l-19.2 19.2V117.333c0-29.455-23.878-53.333-53.333-53.333S192 87.878 192 117.333v123.584l-19.2-19.2c-19.139-18.289-49.277-18.289-68.416 0-18.889 18.894-18.889 49.522 0 68.416l118.251 118.251c12.496 12.492 32.752 12.492 45.248 0l118.251-118.251c18.889-18.894 18.889-49.522 0-68.416-19.159-18.152-49.188-18.086-68.267.15z"
        fill="#fafafa"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default Logo;
