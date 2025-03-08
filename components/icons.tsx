
"use client"

import React from "react"

type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  auth0: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="currentColor"
        d="M22.448 15.613c0-3.752-3.009-6.796-6.72-6.796s-6.72 3.044-6.72 6.796c0 2.808 1.681 5.208 4.064 6.284v3.992c-6.993-1.344-12.272-7.536-12.272-14.889C.8 4.959 7.136 0 15.008 0s14.208 4.991 14.208 11.001c0 7.352-5.279 13.545-12.272 14.889v-3.992c2.384-1.076 4.064-3.476 4.064-6.284h1.44z"
      />
      <path
        fill="currentColor"
        d="M12.607 22.954v9.046h4.8v-9.046z"
      />
    </svg>
  ),
}

