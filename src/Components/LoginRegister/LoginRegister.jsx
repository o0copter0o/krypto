import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock, FaImage } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsPersonVcardFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const LoginRegister = () => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const [action, setAction] = useState('');

    const registerLink = () => {
        setAction(' active');
        document.getElementById('register').reset();
        console.log(action);
        console.log('regis');
    }

    const loginLink = () => {
        setAction('');
        document.getElementById('login').reset();
        console.log(action);
        console.log('login');
    }

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "username": inputs.loginUsername,
            "password": inputs.loginPassword,
            "expiresIn": 600000
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        fetch("https://www.melivecode.com/api/login", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'ok') {
                    MySwal.fire({
                        title: <p>{result.message}</p>,
                        icon: 'success'
                    }).then(() => {
                        localStorage.setItem('token', result.accessToken);
                        navigate("/listOwner");
                    })
                } else {
                    MySwal.fire({
                        title: <p>{result.message}</p>,
                        icon: 'error'
                    })
                }
            })
            .catch((error) => {
                console.error(error)
            });
    }

    const handleSubmitRegister = (event) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "fname": inputs.registerFirstname,
            "lname": inputs.registerSurname,
            "username": inputs.registerUsername,
            "password": inputs.registerPassword,
            "email": inputs.registerEmail,
            "avatar": inputs.registerAvatar
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://www.melivecode.com/api/users/create", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'ok') {
                    MySwal.fire({
                        title: <p>{result.message}</p>,
                        icon: 'success'
                    }).then(() => {
                        navigate("/");
                        loginLink();
                    })
                } else {
                    MySwal.fire({
                        title: <p>{result.message}</p>,
                        icon: 'error'
                    })
                }
            })
            .catch((error) => {
                console.error(error)
            });
    }

    return (
        <div className={`wrapper${action}`}>
            <div className='form-box login'>
                <form onSubmit={handleSubmit} id='login'>
                    <h1>Login</h1>

                    <div className='input-box'>
                        <input type='text' placeholder='Username' id='loginUsername' name='loginUsername' value={inputs.loginUsername || ""} onChange={handleChange} required />
                        <FaUser className='icon' />
                    </div>

                    <div className='input-box'>
                        <input type='password' placeholder='Password' id='loginPassword' name='loginPassword' value={inputs.loginPassword || ""} onChange={handleChange} required />
                        <FaLock className='icon' />
                    </div>

                    <div className='remember-forget'>
                        <label> <input type='checkbox' id='logincheckbox' /> Remember me </label>
                        <a href='#'>Forget Password ?</a>
                    </div>

                    <button type='submit'>Login</button>

                    <div className='register-link'>
                        <p>
                            Don't have an account ? <a href='#' onClick={registerLink}>Register</a>
                        </p>
                    </div>
                </form>
            </div>

            <div className='form-box register'>
                <form onSubmit={handleSubmitRegister} id='register'>
                    <h1>Register</h1>

                    <div className='input-box'>
                        <input type='text' placeholder='Firstname' id='registerFirstname' name='registerFirstname' value={inputs.registerFirstname || ""} onChange={handleChange} required />
                        <BsPersonVcardFill className='icon' />
                    </div>

                    <div className='input-box'>
                        <input type='text' placeholder='Surname' id='registerSurname' name='registerSurname' value={inputs.registerSurname || ""} onChange={handleChange} required />
                        <BsPersonVcardFill className='icon' />
                    </div>

                    <div className='input-box'>
                        <input type='text' placeholder='Email' id='registerEmail' name='registerEmail' value={inputs.registerEmail || ""} onChange={handleChange} required />
                        <MdEmail className='icon' />
                    </div>

                    <div className='input-box'>
                        <input type='text' placeholder='Username' id='registerUsername' name='registerUsername' value={inputs.registerUsername || ""} onChange={handleChange} required />
                        <FaUser className='icon' />
                    </div>

                    <div className='input-box'>
                        <input type='Password' placeholder='Password' id='registerPassword' name='registerPassword' value={inputs.registerPassword || ""} onChange={handleChange} required />
                        <FaLock className='icon' />
                    </div>

                    <div className='input-box'>
                        <input type='text' placeholder='Avatar' id='registerAvatar' name='registerAvatar' value={inputs.registerAvatar || ""} onChange={handleChange} required />
                        <FaImage className='icon' />
                    </div>

                    <div className='remember-forget'>
                        <label> <input type='checkbox' id='registercheckbox' /> I argee to the terms & consitions </label>
                    </div>

                    <button type='submit'>Register</button>

                    <div className='register-link'>
                        <p>
                            Already have an account ? <a href='#' onClick={loginLink}>login</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginRegister