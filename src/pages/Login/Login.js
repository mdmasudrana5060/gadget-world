import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../Hooks/useToken';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState([]);
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(result);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const handleLogin = data => {
        setLoginError('')
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                setLoginUserEmail(data.email)
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoginError(errorMessage)
            })
    }






    return (
        <div className='flex h-full mt-10 justify-center items-center '>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>

                            </label>
                            <input
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'email is required',
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'provide a valid email'
                                    }
                                })}
                                type="email" placeholder="Enter your email"
                                className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt">{errors.email.message}</span>}



                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>

                            </label>
                            <input
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'password is required',
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 character or longer'
                                    }
                                })}
                                type="password" placeholder="Enter your password"
                                className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                                {loginError && <p className='text-red-600'>{loginError}</p>}



                            </label>
                        </div>


                        <input className='btn  w-full max-w-xs"' type="submit" value='login' />
                    </form>
                    <p><small>New to Gadget World? <Link className='text-accent' to='/signup'>Create New Account.</Link></small></p>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleSignIn} className="btn btn-outline" > Continue with google</button >

                </div >
            </div >
        </div >

    );
};

export default Login;