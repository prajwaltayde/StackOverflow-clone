import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './Auth.css'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth'

const Auth = () => {

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!email || !password){
      alert('Enter email and password')
    }
    else if(isSignup){
      if(!name){
        alert('Enter a name to continue')
      }
      dispatch(signup({name, email, password}, navigate))
    }else{
      dispatch(login({email, password}, navigate))
    }
  }

  const handleSwitch = () =>{
    setIsSignup(!isSignup)
  }

  return (
    <section className='auth-section'>
      { isSignup && <AboutAuth/>}
      <div className='auth-div1'>
        { !isSignup && <img src={icon} alt='SatckOverflow' className='logo'/>}
        <form onSubmit={handleSubmit}>

          {
            isSignup && (
              <label htmlFor='name'>
                <h4>Display Name</h4>
                <input type='text' id='name' name='name' onChange={(e)=>setName(e.target.value)}/>
              </label>
            )
          }

          <label htmlFor='email'>
              <h4>Email</h4>
              <input id='email' type='email' name='email' onChange={(e)=>setEmail(e.target.value)}/>
          </label>
          <label htmlFor='password'>
            <div className='psw-div'>
              <h4>Password</h4>
              { !isSignup && <p style={{color:'#007ac6', fontSize:'13px'}}>forgot password?</p> }
            </div>
              <input id='password' type='password' name='password' onChange={(e)=>setPassword(e.target.value)}/>
          {
            isSignup && <p style={{color:'#666767', fontSize:'13px'}}>Password must contain atleast eight <br/> characters, including 1 letter and 1 <br/>number.</p>
          }
          </label>
          {
            isSignup && (
              <label htmlFor='check'>
                <input type='checkbox' id='check'/>
                <p style={{fontSize:'13px'}}>Opt-in to receive occasional <br/>product updates, user research invitations, <br/>company announcements and digests.</p>
              </label>
            )
          }
          <button type='submit' className='auth-btn'>{ isSignup? 'Sign up': 'Log in'}</button>
          {
            isSignup && (
              <p style={{color:'#666767', fontSize:'13px'}}>By clicking <span style={{color:'#007ac6'}}>"Sign up"</span>, you agree to our 
              <span style={{color:'#007ac6'}}> trems of <br/>service</span>, 
              <span style={{color:'#007ac6'}}> privacy policy</span> and 
              <span style={{color:'#007ac6'}}> cookie policy</span>.</p>
            )
          }
        </form>
          <p>
            { isSignup? 'Already have an account?' : "Don't have an account?"}
            <button type='button' onClick={handleSwitch} className='switch-btn'>{ isSignup? 'Log in':'Sign up'}</button>
          </p>
      </div>
    </section>
  )
}

export default Auth