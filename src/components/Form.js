import React from 'react'

//uta app.js bata pass gareko argument as props aayo ani teslai
//props.uta pass gareko name garera access gareko
const Form = (props) => {
  //yesma js ko variable and function define garna payinxa
  const textInputHandler = (event)=>{
    // console.log(event.target.value);
    props.setInput(event.target.value);
  }
  const submitTodoHandler = (e)=> {
    
   
    //page refresh nagarna ko lai
    e.preventDefault();
    props.setTodos([
      //use of spread operator in state existing todo ma append gardai janxa 
      ...props.todos,
      {text:props.input, completed: false, id: Math.random()*1000}
    ]);
    props.setInput("");
    
  };
    return (
        <form>
      <input type="text" value={props.input} onChange={textInputHandler} className="todo-input" />
      <button className="todo-button" onClick={submitTodoHandler} type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>

    );
};
export default Form;


