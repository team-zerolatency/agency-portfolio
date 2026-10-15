import * as React from "react";
import { SVGProps } from "react";

export const FramerMotion = ({
  className = "size-full fill-black dark:fill-white",
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" className={className} {...props}>
    <path d="M22.684 0h84.253v42.667H64.81L22.684 0Zm0 42.667H64.81l42.127 42.666H64.81V128L22.684 85.333V42.667Z" />
  </svg>
);
