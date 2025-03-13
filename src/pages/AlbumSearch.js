import { React, useState } from "react";

const AlbumSearch = () => {
  const [filterString, setFilterString] = useState("animal");
  const onSearchEnter = (e) => {
    console.log(e);
    if (e.key === "Enter") {
      setFilterString(e.target.value);
    }
  };
  return (
    <div className="container">
      <div>
        <label htmlFor="filter">搜尋</label>
        <input
          type="text"
          id="filter"
          className="form-control"
          defaultValue={filterString}
          onKeyPress={onSearchEnter}
        />
      </div>
    </div>
  );
};

export default AlbumSearch;
