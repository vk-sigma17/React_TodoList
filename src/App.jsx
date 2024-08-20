import React from "react";

// import FormTodo from "./component/FormTodo"
// import DisplayTodo from "./component/FormTodo";
import { useSelector, useDispatch } from "react-redux";
import { add, remove , edit, toggleCompleted} from "./slice/TodoSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare, faListCheck } from '@fortawesome/free-solid-svg-icons'

function App(){
  const [input, setInput] = React.useState('');
  const [editId, setEditid] = React.useState(null);
  const [editInput, setEditInput] = React.useState('');
  // const [isChecked, setIsChecked] = React.useState(false);

  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  function handleSubmit(e){
      e.preventDefault();
      if(editId != null){
        dispatch(edit({id: editId, text: editInput}));  // taking value from both states which is given by handleedit() on click
        setEditid(null);
        setEditInput('');
      }else{
        dispatch(add(input));
        setInput('');

      }

  }
 
  function handleRemove(id){
    dispatch(remove(id));
  }
  function handleEdit(todo){ // this func giving valuses to states of edit 
    setEditid(todo.id);
    setEditInput(todo.text)
  }
  function handleCheck(id){
    dispatch(toggleCompleted(id));
  }
 


  return (
    <div className="app">
      <h1 className="app-heading">TO-DO LIST
      <span className="heading-logo"><FontAwesomeIcon icon={faListCheck} /></span> 
      </h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input type="text" onChange={(e) => editId != null ? setEditInput(e.target.value) : setInput(e.target.value)} value={editId != null ? editInput : input}/>
        <button type="submit">{editId != null ? "Update" : "Add"}</button>
      </form>
      {todos.length > 0 && todos.map((todo) => {
        return <li key={todo.id} className="list-content">
          <div>
            <input type="checkbox" className="checkbox" checked={todo.completed} onClick={() => handleCheck(todo.id)}></input>
            <span style={{ textDecoration : todo.completed ?  'line-through' : 'none'}}>{todo.text}</span>
          </div>
          <div className="btn">

            <button className="icon" onClick={() => handleEdit(todo)}><FontAwesomeIcon icon={faPenToSquare} /></button>
            <button className="icon" onClick={() => handleRemove(todo.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
          </div>
          </li>
      })}
      {todos.length === 0 && <p>No todos</p>}
    </div>
  )
}

export default App;


