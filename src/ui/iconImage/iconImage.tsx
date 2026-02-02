import React, { useState } from "react";
import { AiOutlineLaptop } from "react-icons/ai";
import ResponsiveImage from "../image/image";

export const IconImage: React.FC<{
  src: string;
  alt?: string;
  withClass?: boolean;
}> = (props) => {
  const [error, setError] = useState(false);

  const errorAccurred = () => {
    setError(true);
    console.log("error occurred");
  };

  return !error ? (
    <ResponsiveImage
      link={props.src}
      name={props.alt || "icon"}
      className={props.withClass ? "home-gigi" : ""}
      width={40}
      height={40}
      style={{ objectFit: "contain" }}
      unoptimized
    />
  ) : (
    <AiOutlineLaptop size={40} />
  );
};

export default IconImage;
