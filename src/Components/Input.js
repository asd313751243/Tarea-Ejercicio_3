import React from 'react'

const Input = (props) => (
    <div class="input-group">
        <input 
        type={props.type} aria-label={props.title} 
        className="form-control"
        title={props.title}
        onChange={props.handleChange}
        placeholder={props.title}
        value={props.data}
        required />
    </div>
)

export default Input;