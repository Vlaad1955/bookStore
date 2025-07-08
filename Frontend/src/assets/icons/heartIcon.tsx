import React from "react";

type HeartIconProps = {
  className?: string;
  onClick?: () => void;
};

const HeartIcon: React.FC<HeartIconProps> = ({ className, onClick }) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    fill="red"
    stroke="red"
    strokeWidth="4"
    strokeMiterlimit="10"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="30"
    height="30"
    className={className}
    onClick={onClick}
  >
    <path d="M32 56s-3.1-2.4-7.1-5.9C19.6 44.9 10 36.1 10 24.6 10 17.7 15.7 12 22.6 12c4.1 0 8 2.2 10.4 5.7C35.4 14.2 39.3 12 43.4 12 50.3 12 56 17.7 56 24.6c0 11.5-9.6 20.3-14.9 25.5C35.1 53.6 32 56 32 56z" />
  </svg>
);

export default HeartIcon;
