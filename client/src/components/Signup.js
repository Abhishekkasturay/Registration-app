import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import signpic from '../images/signup.svg';

const Signup = () => {

    const Navigate = useNavigate();

    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });

    let name, value;

    const handleInputs = (e) => {

        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value})

        console.log(user)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;

        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });
        
        
        const data = await response.json();
        console.log(response.status);

        if(response.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }else{
            window.alert("Registered Successfully");
            console.log("Registered Successfully");

            Navigate('/login');
        }
    }

    return (
        <>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor='name'>
                                       <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" id="name" autoComplete="off" placeholder="Your Name" 
                                    value={user.name} onChange={handleInputs} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='email'>
                                       <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" name="email" id="email" autoComplete="off" placeholder="Your Email" 
                                    value={user.email} onChange={handleInputs} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='phone'>
                                       <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                    </label>
                                    <input type="number" name="phone" id="phone" autoComplete="off" placeholder="Your Number"
                                    value={user.phone} onChange={handleInputs} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='work'>
                                       <i className="zmdi zmdi-slideshow material-icons-name"></i>
                                    </label>
                                    <input type="text" name="work" id="work" autoComplete="off" placeholder="Your Profession"
                                    value={user.work} onChange={handleInputs} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='password'>
                                       <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off" placeholder="Your Password"
                                    value={user.password} onChange={handleInputs} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='cpassword'>
                                       <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off" placeholder="Confirm Your Password"
                                    value={user.cpassword} onChange={handleInputs} />
                                </div>

                                <div className="form-group form-button">
                                    <input  type="submit" name="signup" id="signup" value="Register" onClick={handleSubmit} className="form-submit" />
                                </div>
                            </form>
                        </div>
                        <div className='signup-image'>
                            <figure>
                                <img src={signpic} alt="regitration pic" />
                            </figure>
                            <NavLink to="/login" className="signup-image-link">I am Already Register</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup