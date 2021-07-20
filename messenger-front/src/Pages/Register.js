import React from 'react';

const Register = () =>{
    return(
        <div className='card'>
            <div className='cardHeader'>Register</div>
            <div className='cardBody'>
                <div className='inputGroup'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' id='name' placeholder='Johnny Appleseed'/>
                </div>
                <div className='inputGroup'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' placeholder='example@example.com'/>
                </div>
                <div className='inputGroup'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' placeholder='Password'/>
                </div>
                <button>Register</button>
            </div>
        </div>
    );
}

export default Register;