import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop:React.FC<{children: any}> = (props) => {
  const location = useLocation();
  useEffect(() => {

    let behavior: any = "instant"
    window.scrollTo({top: 0,left: 0, behavior: behavior});
  }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;