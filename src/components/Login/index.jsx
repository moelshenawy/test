import React, { useState } from 'react'
import "./index.css"

const Login = () => {


  return (
    <div className='container'>

      <form className='form_conainer' >
        <div className="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" />
          <small id="emailHelp" className="form-text text-primary">No need to enter username,passwords <span className='text-danger'>

            just hit Login
          </span> </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          <small id="emailHelp" className="form-text text-primary">No need to enter username,passwords <span className='text-danger'>

            just hit Login
          </span> </small>
        </div>

        <a href={'/tasks'} className="btn btn-primary">Login</a>
      </form>

    </div>
  )
}

export default Login