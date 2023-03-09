import React from "react";
import { useState } from "react";
import { AiFillCloseSquare, AiFillEdit } from "react-icons/ai";

function App() {
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (list !== "") {
      setList((prev) => [
        ...prev,
        {
          id: list.length + 1,
          text: value,
        },
      ]);
    }
    if (list && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editing) {
            return { ...item, text: value };
          }
          return item;
        })
      );
    }

    setValue("");
    setEditing(null);
    setIsEditing(false);
  };

  function handleDelete(id) {
    const removeItem = list.filter((item) => {
      return item.id !== id;
    });
    setList(removeItem);
  }

  const editHandle = (id) => {
    setIsEditing(true);
    let edit = list.find((item) => {
      return item.id === id;
    });
    setValue(edit.text);
    setEditing(id);
  };

  //   console.log(value);
  return (
    <section>
      <div className="section-center">
        <h2>TodoList</h2>
      </div>
      <div className="todo">
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {isEditing ? <button>Edit</button> : <button>Submit</button>}
        </form>
      </div>
      <div className="todo-list">
        <ul>
          {list.map((item) => {
            return (
              <li key={item.id}>
                {item.text}
                <button className="left" onClick={() => editHandle(item.id)}>
                  <AiFillEdit />
                </button>
                <button className="right" onClick={() => handleDelete(item.id)}>
                  <AiFillCloseSquare />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {list.length > 0 ? (
        <button className="btn" type="button" onClick={() => setList([])}>
          Clear
        </button>
      ) : null}
    </section>
  );
}

export default App;
