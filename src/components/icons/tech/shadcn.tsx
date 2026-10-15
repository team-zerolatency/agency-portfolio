import * as React from "react";
import { SVGProps } from "react";

export const Shadcn = ({
  className = "size-full text-black dark:text-white",
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className} {...props}>
    <path fill="none" d="M0 0h256v256H0z" />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="m208 128-80 80M192 40 40 192"
    />
  </svg>
);
