import * as React from "react";
import { SVGProps, useId } from "react";

export const Kotlin = ({ className = "size-full", ...props }: SVGProps<SVGSVGElement>) => {
  const reactId = useId().replace(/:/g, "");
  const baseId = props.id || reactId;
  const grad1 = `kotlin-grad-1-${baseId}`;
  const grad2 = `kotlin-grad-2-${baseId}`;
  const grad3 = `kotlin-grad-3-${baseId}`;

  return (
    <svg viewBox="0 0 256 256" className={className} preserveAspectRatio="xMidYMid" {...props}>
      <defs>
        <linearGradient x1="26.599%" y1="146.559136%" x2="73.8446667%" y2="52.3813953%" id={grad1}>
          <stop stopColor="#0095D5" offset="9.677%" />
          <stop stopColor="#238AD9" offset="30.07%" />
          <stop stopColor="#557BDE" offset="62.11%" />
          <stop stopColor="#7472E2" offset="86.43%" />
          <stop stopColor="#806EE3" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="13.9840532%"
          y1="37.1049231%"
          x2="68.682392%"
          y2="-13.5538462%"
          id={grad2}
        >
          <stop stopColor="#0095D5" offset="11.83%" />
          <stop stopColor="#3C83DC" offset="41.78%" />
          <stop stopColor="#6D74E1" offset="69.62%" />
          <stop stopColor="#806EE3" offset="83.33%" />
        </linearGradient>
        <linearGradient
          x1="-16.8361667%"
          y1="91.9396667%"
          x2="76.2191667%"
          y2="-1.11566667%"
          id={grad3}
        >
          <stop stopColor="#C757BC" offset="10.75%" />
          <stop stopColor="#D0609A" offset="21.38%" />
          <stop stopColor="#E1725C" offset="42.54%" />
          <stop stopColor="#EE7E2F" offset="60.48%" />
          <stop stopColor="#F58613" offset="74.3%" />
          <stop stopColor="#F88909" offset="82.32%" />
        </linearGradient>
      </defs>
      <g>
        <polygon fill={`url(#${grad1})`} points="0 256 128.426667 127.573333 256 256" />
        <polygon fill={`url(#${grad2})`} points="0 0 128.426667 0 0 138.666667" />
        <polygon
          fill={`url(#${grad3})`}
          points="128.426667 0 0 135.253333 0 256 128.426667 127.573333 256 0"
        />
      </g>
    </svg>
  );
};

export { Kotlin as KotlinIcon };
