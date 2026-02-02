// LanguageSwitcher.tsx

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import teo from "../../img/teo.png";
import enlang from "../../img/en.svg";
import kalang from "../../img/ka.svg";
import ResponsiveImage from "../../ui/image/image";
import { useRouter } from "next/navigation";
const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [curlang, setCurLang] = useState<any>(null);
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    //console.log(i18n.language);
    document.body.setAttribute("lang", i18n.language);
    // history.push(`/${language}`);
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/[^\/]+/, `/${language}`);
    router.push(newPath);
  };
  useEffect(() => {
    setCurLang(i18n.language); // Toggle the state to force re-rendering
    document.body.setAttribute("lang", i18n.language);
  }, [i18n.language]);
  return (
    <div className="language-switcher mt-1">
      {curlang === "en" ? (
        <a
          style={{ cursor: "pointer" }}
          className="mt-2"
          onClick={() => changeLanguage("ka")}
        >
          <ResponsiveImage
            width={24}
            height={24}
            unoptimized
            style={{
              border: "solid 1px #454545",
              borderRadius: "30px",
            }}
            name="kalang"
            link={enlang}
          />
        </a>
      ) : (
        <a
          style={{ cursor: "pointer" }}
          className="mt-2"
          onClick={() => changeLanguage("en")}
        >
          <ResponsiveImage
            width={24}
            height={24}
            unoptimized
            style={{
              border: "solid 1px #454545",
              borderRadius: "30px",
            }}
            name="enlang"
            link={kalang}
          />
        </a>
      )}
      {/* Add more buttons for other languages if needed */}
    </div>
  );
};

export default LanguageSwitcher;
