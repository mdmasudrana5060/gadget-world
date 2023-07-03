import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../Hooks/useToken';




const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn ,googleSignIn} = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const[gLogin,setGlogin]=useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const [token] = useToken(loginEmail);
    const [Gtoken] = useToken(gLogin);
   
    const from = location.state?.from?.pathname || '/';
    if (token|| Gtoken) {
        navigate(from, { replace: true });

    }


    // login data 
    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {

                const user = result.user

                setLoginEmail(user.email);

            })
            .catch(error => {
                console.log(error);
                setLoginError(error.message);
            });
    }
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result=>{
            const user=result.user;
            setGlogin(user.email)
        })
        .catch(error=>{
            console.log(error.message)
        })

    }

    return (
        <div className='h-[800px] flex justify-center mt-40'>
            <div className='w-96 p-7'>
                <h2 className='text-xl font-bold text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>


                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>

                        </label>
                        <input type="email" {...register("email", { required: "Email Address is required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}

                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>

                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password did not match" }
                        })} className="input input-bordered w-full max-w-xs" />


                        <label className="label">
                            <span className="label-text">Forget Password ?</span>

                        </label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}


                    </div>

                    <input type="submit" className='btn btn-accent mt-4 w-full max-w-xs ' value="Login" />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
                <p>New to Doctors Portal ? <Link to="/signup" className='text-secondary'>Create New Account</Link> </p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full font-bold'>Continue With Google</button>


            </div>

        </div>
    );
};

export default Login;