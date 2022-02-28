import React from "react";

const FilterButton = (props) => {
  return (
    <button
      type="button"
      className="btn filter-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      {props.name}
    </button>
  );
};

export default FilterButton;
