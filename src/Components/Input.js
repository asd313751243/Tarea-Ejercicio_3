import React from 'react'

const Input = (props) => (
    <div class="input-group">
        <input 
        type={props.type} aria-label={props.title} 
        class="form-control"
        title={props.title}
        onChange={props.handleChange}
        placeholder={props.title}
        required />
    </div>
)

export default Input;