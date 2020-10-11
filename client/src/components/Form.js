import React from 'react'
import './Form.css'

const Form = ({ name, lable, type, onChange, value, error }) => {

  const errorHandle = name => {
    return (
      error.map((err, i) => {
        if (err.param === name) {
          return <li className='alert_custom' key={i}>{err.msg}</li>
        }
      })
    )
  }

  return (
    <div className='form-group'>
      <label className="text-muted">{lable}</label>
      <input
        name={name}
        type={type}
        className='form-control'
        value={value}
        onChange={onChange}>
      </input>
      {error && error.some(e => e.param === name) ? <div className="alert alert-danger">{errorHandle(name)}</div> : ''}

    </div>
  )
}

export default Form
