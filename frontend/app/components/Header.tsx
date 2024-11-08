import { Itim } from "next/font/google";
import React from "react";

export const font = Itim({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  weight: ["400"],
});

const Header = () => {
  return (
    <div
      className={`${font.className} text-[36px] md:text-[48px] text-accent py-2 px-6`}
    >
      SnapTree
    </div>
  );
};

export default Header;
