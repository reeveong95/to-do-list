import React, { useState, useRef, useEffect } from "react";

const Todo = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const editChangeHandler = (e) => {
    setNewName(e.target.value);
    setIsEmpty(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (newName.trim() !== "") {
      props.onEditTask(props.id, newName);
      setNewName("");
      setIsEditing(false);
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  const editingTemplate = (
    <form className="box-small" onSubmit={submitHandler}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          ref={editFieldRef}
          id={props.id}
          className={`todo-text ${isEmpty ? "invalid" : ""}`}
          type="text"
          maxLength="40"
          onChange={editChangeHandler}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="box-small">
      <div className="checkbox">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.isCompleted}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          ref={editButtonRef}
          type="button"
          className="btn"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.onDeleteTask(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
};

export default Todo;
