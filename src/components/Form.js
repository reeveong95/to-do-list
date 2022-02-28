import React, { useState } from "react";

const Form = (props) => {
  const [name, setName] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    setIsEmpty(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      props.onAddTask(name);
      setName("");
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className={`input input__lg ${isEmpty ? "invalid" : ""}`}
        name="text"
        value={name}
        maxLength="40"
        autoComplete="off"
        onChange={nameChangeHandler}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
};

export default Form;
