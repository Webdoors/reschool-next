import React from "react";
const ShowIf: React.FC<{ children: React.ReactNode; if?: any }> = (props) => {
  return props.if ? <>{props.children}</> : null;
};

export default ShowIf;
