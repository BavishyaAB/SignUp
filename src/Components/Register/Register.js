import {useState} from 'react';
import {useNavigate } from 'react-router-dom';
import {postUser} from '../../Services/Users';
import  '../../Styles/Regstyles.css';
function Register(){
    let navigate = useNavigate();
    const [userInput,setUserInput] = useState({
        name:'',
        email:'',
        password:'',
        address:'',
        phone:'',
        role:''
    })
    const handleChange = (e) => {
        setUserInput(prevUserInput => {
            return {
                ...prevUserInput,
                [e.target.name]:e.target.value
            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let mail = userInput.email;
        postUser(userInput)
        .then(() => {
            setUserInput({
                name:'',
                email:'',
                password:'',
                address:'',
                phone:'',
                role:''
            })
        })
        console.log(mail);
        navigate(`/userDetail/${mail}`)
    }
    return (
        <div className='form-container'>
            <form className="regform card py-4 px-5" onSubmit={handleSubmit}>
                <p className='title'>Register or Login</p>
                <div className='mb-1'>
                    <label className='form-label'>Name</label>
                    <input type="text" className="form-control" name="name" value={userInput.name} onChange={handleChange}/>
                </div>
                <div className='mb-1'>
                    <label className='form-label'>Email</label>
                    <input type="email" className="form-control" name="email" value={userInput.email} onChange={handleChange}/>
                </div>
                <div className='mb-1'>
                    <label className='form-label'>Password</label>
                    <input type="password" className="form-control" name="password" value={userInput.password} onChange={handleChange}/>
                </div>
                <div className='mb-1'>
                    <label className='form-label'>Address</label>
                    <textarea name="address" className="form-control" value={userInput.address} rows="2" onChange={handleChange}/>
                </div>
                <div className='mt-1'>
                    <label className='form-label'>Phone</label>
                    <input type="text" className="form-control" name="phone" value={userInput.phone} onChange={handleChange}/><br/>
                </div>
                <div className='mt-1'>
                    <label className='form-label'>Role</label>
                    <input type="text" className="form-control" name="role" value={userInput.role} onChange={handleChange}/><br/>
                </div>
                <button className="btn regbtn mb-2" type="submit">SignIn/SignUp</button>
            </form>
        </div>
    )
}

export default Register;