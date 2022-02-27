import React, { useState } from "react";

const Form = (props) => {
  const [name, setName] = useState("");

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      props.onAddTask(name);
      setName("");
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
        className="input input__lg"
        name="text"
        value={name}
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
