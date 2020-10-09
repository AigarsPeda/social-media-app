import React from "react";

const Plus = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 512 512"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M437.02 74.98C388.668 26.629 324.379 0 256 0S123.332 26.629 74.98 74.98C26.629 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.371 187.621 512 256 512s132.668-26.629 181.02-74.98C485.371 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM256 472c-119.102 0-216-96.898-216-216S136.898 40 256 40s216 96.898 216 216-96.898 216-216 216zm20-236.02h90v40h-90v90h-40v-90h-90v-40h90v-90h40v90z"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default Plus;
