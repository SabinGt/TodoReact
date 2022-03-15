import { useEffect, useState } from 'react';
import './App.css';

//local storage bata data leko
const getLocalItems = ()=>{
  let list = localStorage.getItem('itemList');
  if(list){
    return JSON.parse(list)
  }else{
    return []
  }

}

function App() {
  //js function and varibale define garney thau

  //useState to define the container and the function 
  const [input, setInput] = useState('')
  //state to store all todo array use gareko 
  const [todos, setTodos] = useState(getLocalItems())
  //for toogle button 
  const [tooglesubmit, setToogleSubmit] = useState(true)
  //for Update item 
  const [editItem, setEditItem] = useState(null)

  //functions
  const textInputHandler = (event) => {
    // console.log(event.target.value);
    setInput(event.target.value);
  }
  const submitTodoHandler = (e) => {


    //page refresh nagarna ko lai
    e.preventDefault();
    if(!input){
      alert('task ko name halnu hos');
    }else if(input && !tooglesubmit){
      setTodos(todos.map((newItems)=>{
        //todos ko edit garney id match bhako text field lai overwrite gareko 
        if(newItems.id===editItem){
          return {...newItems,text:input}
        }
        return newItems
      })
    
      )
      //input field khali banauna 
      setInput("")
      //if true huda add garxa ani false huda edit garxa so edit paxi true banako
      setToogleSubmit(true)
      //same id ko edit hos bhanera 
      setEditItem(null)

    }else{
    setTodos([
      //use of spread operator in state existing todo ma append gardai janxa 
      ...todos,
      { text: input, completed: false, id: Math.random() * 1000 }
    ]);
    setInput("");
  }
}

  const deleteInput = (id) => {
    const updatedList = todos.filter((newList) => {
      return newList.id !== id
    })
    setTodos(updatedList)
  }

  const removeAll = (e)=>{
    e.preventDefault();
    setTodos([]); 

  }
  const editInput = (id) =>{
    const editItem = todos.find((newItems)=>{
      return newItems.id === id;
    })
    console.log(editItem)
    setInput(editItem.text);
    setToogleSubmit(false)
    setEditItem(id)
  }

  useEffect (()=>{
    localStorage.setItem('itemList',JSON.stringify(todos));

  },[todos])

  return (
    <div className="App">
      <header>
        <h1> ToDo List</h1>
        {/* input ma value aako xa ke nai check gareko */}
        {/* <h2>{input}</h2> */}
      </header>
      {/* Form component ma function as a argument pass gareko  */}
      <form>
        <input type="text" value={input} onChange={textInputHandler} className="todo-input" />
        {/* yo chai toogle value true huda add ani false huda edit dekhauna ternary operator lagako */}
        {tooglesubmit?<button className="todo-button" onClick={submitTodoHandler} type="submit">
          <i title='Add Item' className="fas fa-plus-square"></i>
        </button>:<button className="todo-button" onClick={submitTodoHandler} type="submit">
          <i title="UpdateItem" className="fas fa-edit"></i>
        </button>}
        
        <div className="select">
          <select name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>

      <div className="todo-container">{todos.map((curElem) => {
        return (


          <ul className="todo-list">
            <div className='todo'>
              <li className='todo-item'>{curElem.text}</li>
              <button onClick={()=>{editInput(curElem.id)}} className='complete-btn'>
                <i className='fas fa-edit'></i>
              </button>
              <button onClick={() => { deleteInput(curElem.id) }} className='trash-btn'>
                <i className='fas fa-trash'>
                </i>
              </button><br /><br />

            </div>
          </ul>


        )
      }

      )
      }
      </div>
      <button onClick={removeAll} type="submit">Remove All</button>


    </div>
  );
}

export default App;
