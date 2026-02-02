import React, { useEffect, useState } from "react";
import { Search as SearchIconRaw } from "react-bootstrap-icons";
const Search = SearchIconRaw as any;

const SearchComponent: React.FC<{
  searching: (value: string) => void;
  searchValue: string;
}> = (props) => {
  const [showInput, setShowInput] = useState(false);

  const toggleInput = () => {
    setShowInput((prev) => {
      return !prev;
    });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.searching(e.target.value);
  };
  useEffect(() => {
    if (showInput) {
      const input: HTMLInputElement | null = document.querySelector(
        ".admin-search__input",
      );
      if (input) {
        input.focus();
      }
    }
  }, [showInput]);
  return (
    <div className="admin-search">
      <input
        value={props.searchValue}
        onChange={changeHandler}
        className={`form-control admin-search__input ${!showInput ? "hide-input" : ""}`}
        type="text"
        id="name"
      />
      {(Search as any) && (
        <Search
          onClick={toggleInput}
          color="#12c2e9"
          style={{ margin: "0 10px", cursor: "pointer" }}
          size={"30px"}
        />
      )}
    </div>
  );
};

export default SearchComponent;
