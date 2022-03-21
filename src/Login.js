import { Link , useNavigate} from 'react-router-dom'
import React, { useState } from 'react'
import "./Login.css"
import { auth } from "./firebase";

function Login() {
    const nav = useNavigate();
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const signIn = e => {
        e.preventDefault();
        //some firebase login

        auth.signInWithEmailAndPassword(email,password)
            .then((auth) => {
                console.log(auth);
                if(auth) {
                    nav('/')
                }
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault()

        //some firebase register
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth);
                if(auth) {
                    nav('/')
                }
            })
            .catch(error => alert(error.message))
            
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img className='login__logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt=''/>
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

                    <button className='login__signInButton' onClick={signIn} type='submit'>Sign-in</button>
                </form>

                <p>By signing-in you agree to a bunch of illegal stuff that we can exploit</p>

                <button className='login__registerButton' onClick={register}>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login