import React, { useContext, useState } from 'react';
import loginpic from '../images/login.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {
    
    const {state, dispatch} = useContext(UserContext);

    const Navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        
        });

        const data = await response.json();
        console.log(response.status);

        console.log(data.jwtToken);

        if(response.status === 400 || !data){
            window.alert("Invalid Credentials");
        }else{

            dispatch({ type: "USER", payload: true })
            window.alert("Login Successfully");
            localStorage.setItem("jwtToken", data.jwtToken);

            Navigate('/home');
        }
    }

    return (
        <>
            <section className="signin">
                <div className="container mt-5">
                    <div className="signin-content">
                        <div className='signin-image'>
                            <figure>
                                <img src={loginpic} alt="regitration pic" />
                            </figure>
                            <NavLink to="/signup" className="signin-image-link">Create an Account</NavLink>
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method='POST' className="register-form" id="register-form">

                                <div className="form-group">
                                    <label htmlFor='email'>
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" name="email" id="email" autoComplete="off" placeholder="Your Email"
                                      value={email} onChange={(e)=> {setEmail(e.target.value)}} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='password'>
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off" placeholder="Your Password"
                                     value={password} onChange={(e)=> {setPassword(e.target.value)}} />
                                </div>

                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" value="Log In" onClick={handleSubmit} className="form-submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login