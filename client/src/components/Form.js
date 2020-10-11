import React from 'react'

const Form = ({ name, lable, type, onChange, value, error }) => {


  const errorHandle = name => {
    return (
      error.map((err, i) => {
        if (err.param === name) {
          return <li className='alert alert-danger' key={i}>{err.msg}</li>
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
        id={name}
        className='form-control'
        value={value}
        onChange={onChange}>
      </input>
      {errorHandle(name)}
    </div>
  )
}

export default Form
