import React, { useState, useEffect } from "react";
import axios from "axios";
import "./todo.css";
import { baseUrl } from "../constants/Constants";

export default function Todo() {
  const [task, setTask] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(0);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    axios.get(baseUrl + "todo/all").then((res) => {
      setTask(res.data.todoList);
      setProgress(false);
    });
  }, [shouldRefresh]);

  const addTodo = (e) => {
    e.preventDefault();
    setProgress(true);
    const item = document.getElementById("item").value;
    axios.post(baseUrl + "todo", { item }).then((res) => {
      if (res.data.ok === 1) {
        setShouldRefresh(shouldRefresh + 1);
        document.getElementById("item").value = "";
      }
    });
  };

  const deleteTodo = (id) => {
    setProgress(true);
    axios
      .delete(baseUrl + "todo/" + id)
      .then((res) => {
        if (res.data.result.ok === 1) {
          setShouldRefresh(shouldRefresh + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  const checkItem = (id, status) => {
    setProgress(true);
    axios
      .patch(baseUrl + "todo/" + id, [
        { propName: "isComplete", value: status },
      ])
      .then((res) => {
        if (res.data.result.ok === 1) {
          setShouldRefresh(shouldRefresh + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  const showCanEdit = (id) => {
    document.getElementById("cannotEdit" + id).style.display = "none";
    document.getElementById("canEdit" + id).style.display = "flex";
  };

  const saveEdit = (id, e) => {
    e.preventDefault();
    const value = document.getElementById("editedValue" + id).value;
    axios
      .patch(baseUrl + "todo/" + id, [{ propName: "item", value }])
      .then((res) => {
        if (res.data.result.ok === 1) {
          document.getElementById("cannotEdit" + id).style.display = "flex";
          document.getElementById("canEdit" + id).style.display = "none";
          setShouldRefresh(shouldRefresh + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  const todo_jsx = [];

  for (var i = 0; i < task.length; i++) {
    const item = task[i];
    if (item.isComplete) {
      todo_jsx.push(
        <div key={i} className="itemArea toDoItem">
          <span className="taskComplete">{item.item}</span>
          <div className="itemActions">
            <button
              className="unCheckBtn"
              onClick={checkItem.bind(this, item._id, false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <button
              className="deleteBtn"
              onClick={deleteTodo.bind(this, item._id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      );
    } else {
      todo_jsx.push(
        <div key={i} className="toDoItem">
          <div id={"cannotEdit" + item._id} className="itemArea">
            <span className="taskInComplete">{item.item}</span>
            <div className="itemActions">
              <button
                className="checkBtn"
                onClick={checkItem.bind(this, item._id, true)}
              >
                <i className="fas fa-check"></i>
              </button>
              <button
                className="editBtn"
                onClick={showCanEdit.bind(this, item._id)}
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button
                className="deleteBtn"
                onClick={deleteTodo.bind(this, item._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>

          <form
            className="editForm"
            id={"canEdit" + item._id}
            onSubmit={saveEdit.bind(this, item._id)}
            style={{ display: "none" }}
          >
            <input
              type="text"
              defaultValue={item.item}
              id={"editedValue" + item._id}
            />
            <input type="submit" value="Save" />
          </form>
        </div>
      );
    }
  }

  // return (
  //   <div className="container" id="todoContainer">
  //     <section id="addTodo">
  //       {!progress ? (
  //         <div
  //           className="spinner-border "
  //           id="loginSpin"
  //           role="status"
  //           style={{ visibility: "hidden" }}
  //         >
  //           <span className="sr-only">Loading...</span>
  //         </div>
  //       ) : (
  //         <div className="spinner-border " id="loginSpin" role="status">
  //           <span className="sr-only">Loading...</span>
  //         </div>
  //       )}
  //       <h3>Add a Task</h3>
  //       <form onSubmit={addTodo}>
  //         <input type="text" id="item" />
  //         <input type="submit" value="Add" />
  //       </form>
  //     </section>
  //     <section>{todo_jsx}</section>
  //   </div>
  // );
  return <p>Site access has been disabled</p>;
}
