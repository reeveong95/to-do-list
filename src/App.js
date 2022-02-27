import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import ToDoList from "./components/ToDoList";

const filterMap = {
  All: () => true,
  Active: (task) => !task.isCompleted,
  Completed: (task) => task.isCompleted,
};

const filterNames = Object.keys(filterMap);

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("toDoList"));

    if (data) {
      setTasks(data);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("toDoList", JSON.stringify(tasks));
  }, [tasks]);

  // Adding New Task
  const addTaskHandler = (name) => {
    const newTask = { id: "todo-" + nanoid(), name: name, isCompleted: false };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.push(newTask);
      return updatedTasks;
    });
  };

  // Toggle Completion of Task
  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Delete a Task
  const deleteTaskHandler = (id) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  };

  // Edit a Task
  const editTaskHandler = (id, newName) => {
    const editedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTasks);
  };

  // Mapping Out Filters
  const filterList = filterNames.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // Set Content Based on Task List Length
  let content = (
    <p style={{ textAlign: "center" }}>No tasks found. Maybe add one?</p>
  );

  if (tasks.length > 0) {
    content = (
      <ToDoList
        tasks={tasks}
        filterMap={filterMap}
        filter={filter}
        toggleTaskCompleted={toggleTaskCompleted}
        onDeleteTask={deleteTaskHandler}
        onEditTask={editTaskHandler}
      />
    );
  }

  return (
    <div className="todoapp stack-large">
      <h1>To Do List</h1>
      <Form onAddTask={addTaskHandler} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      {content}
    </div>
  );
};

export default App;
