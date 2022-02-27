import React from "react";
import Todo from "./Todo";

const ToDoList = (props) => {
  const taskList = props.tasks
    .filter(props.filterMap[props.filter])
    .map((task) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        isCompleted={task.isCompleted}
        toggleTaskCompleted={props.toggleTaskCompleted}
        onDeleteTask={props.onDeleteTask}
        onEditTask={props.onEditTask}
      />
    ));

  return <ul className="todo-list stack-large stack-exception">{taskList}</ul>;
};

export default ToDoList;
