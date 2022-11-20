import React, { useState,useRef } from 'react';
import M from 'materialize-css';

function TodoForm(props) {
    
    const [input, setInput] = useState('');

    const inputRef = useRef(null);

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: props.edit?props.edit.id:Math.floor(Math.random() * 10000),
            name:input,
            completed:false
        });

        setInput('');
    };

    return (

        <form className="todo-form" onSubmit={handleSubmit}>

            {props.edit ?
            (<><div className="input-field">
                    <input type="text"
                    id="edit-todo"
                    value={input} name="text" 
                    className="todo-input" 
                    onChange={handleChange} 
                    ref={inputRef}/>
                    <label htmlFor="edit-todo">{props.edit.name}</label>
                    <button type="submit" className="invisible">
                        <a className="btn-floating btn-medium waves-effect waves-light deep-purple lighten-2">
                            <i className="material-icons">system_update_alt</i>
                        </a>
                    </button>
                </div>
                </>):
            (<><div className="input-field">
                    <input type="text"
                    id="add-todo"
                    value={input} name="text" 
                    className="todo-input" 
                    onChange={handleChange} 
                    ref={inputRef}/>
                    <label htmlFor="add-todo">Insert to-do item</label>
                    <button className="btn waves-effect waves-light deep-purple lighten-2 add-button" type="submit" name="action">
                        Add to-do<i className="material-icons right">add</i>
                    </button>
                </div></>)}
                
        </form>


    
    )
}

export default TodoForm