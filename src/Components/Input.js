import React from 'react'

const Input = (props) => (
    <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text">{props.title}</span>
        </div>
        <input 
        type="text" aria-label={props.title} 
        class="form-control"
        title={props.title}
        onChange={props.handleChange} />
    </div>
)

export default Input;