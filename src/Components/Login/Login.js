import { useState,useEffect } from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import {getUsers, putUser} from '../../Services/Users';
import '../../Styles/Login.css';
function Login(){
    let {userEmail} = useParams();
    const [users,setUsers] = useState([]);
    const [alert,setAlert] = useState(false);
    const [userUpdate,setUserUpdate] = useState({});
    const [userProfile,setUserProfile] = useState([]);
    const [userId,setUserId] = useState();
    useEffect(() => {
        if(alert&&users.length){
            console.log("inside if")
            return;
        }
        getUsers()
        .then(item => {
            setUsers(item);
            setAlert(true);
        })
    },[alert,users]) 
    useEffect(() => {       
        if(alert && Object.keys(userUpdate).length > 0){
            console.log(userId)
            console.log(userUpdate);
            putUser(userUpdate,userId).then(() => {setUserUpdate({})})
        }        
    })
    useEffect(() => {
        let userprofile = users.find(user => user.email === userEmail);
        setUserProfile(userprofile);
    },[users,userEmail])
    let navigate = useNavigate();
    const handleUpdate = (e) => {
        let updateKey = e.target.parentElement.id;
        let userid = e.target.parentElement.parentElement.id;
        let updateValue = prompt(`Update ${updateKey}?`,e.target.value);
        console.log(updateKey);
        let updatedUser = userProfile;
        console.log(userProfile);
        console.log(updatedUser);
        updatedUser[updateKey] = updateValue;
        console.log(updatedUser);
        setUserUpdate(updatedUser);
        setUserId(userid);
        setAlert(false);
    }
    return (
        <div className='cardcontainer'>
            {users.filter(user => user.email === userEmail).map((user) =>(
                <div key={user.id} id={user.id} className={user.role==="Admin"?"card mt-4 mb-5 admin":"card mt-4 mb-5 guest"}>
                    <div className={user.role==="Admin"?'titleadmin mt-3':'titleuser mt-3'}>User Detail</div>
                    <div id="name" className={user.role==="Admin"?'card d-flex flex-row justify-content-between mx-5 px-5 mt-5 mb-3 py-3 admincard':'card d-flex flex-row justify-content-between mx-5 px-5 mt-5 mb-3 py-3 guestcard'}>
                        <div className='m-0 p-0'><strong>Name</strong></div>
                        <div className='m-0 p-0'>{user.name}</div>
                        <span onClick={handleUpdate} class="glyphicon glyphicon-pencil"></span>
                    </div>
                    <div id="email" className={user.role==="Admin"?'card d-flex flex-row justify-content-between mx-5 px-5 my-3 py-3 admincard':'card d-flex flex-row justify-content-between mx-5 px-5 my-3 py-3 guestcard'}>
                        <div className='m-0 p-0'><strong>Email</strong></div>
                        <div className='m-0 p-0'>{user.email}</div>
                        <span onClick={handleUpdate} class="glyphicon glyphicon-pencil"></span>
                    </div>
                    <div id="address" className={user.role==="Admin"?'card d-flex flex-row justify-content-between mx-5 px-5 my-3 py-3 admincard':'card d-flex flex-row justify-content-between mx-5 px-5 my-3 py-3 guestcard'}>
                        <div className='m-0 p-0'><strong>Address</strong></div>
                        <div className='m-0 p-0'>{user.address}</div>
                        <span onClick={handleUpdate} class="glyphicon glyphicon-pencil"></span>
                    </div>
                    <div id="phone" className={user.role==="Admin"?'card d-flex flex-row justify-content-between mx-5 px-5 my-3 py-3 admincard':'card d-flex flex-row justify-content-between mx-5 px-5 my-3 py-3 guestcard'}>
                        <div className='m-0 p-0'><strong>Phone</strong></div>
                        <div className='m-0 p-0'>{user.phone}</div>
                        <span onClick={handleUpdate} class="glyphicon glyphicon-pencil"></span>
                    </div>
                    <div id="role" className={user.role==="Admin"?'card d-flex flex-row justify-content-between mx-5 px-5 my-3 py-3 admincard':'card d-flex flex-row justify-content-between mx-5 px-5 my-3 py-3 guestcard'}>
                        <div className='m-0 p-0'><strong>Role</strong></div>
                        <div className='m-0 p-0'>{user.role}</div>
                        <span onClick={handleUpdate} class="glyphicon glyphicon-pencil"></span>
                    </div>
                    <button className={user.role==="Admin"?"btn mx-5 px-5 my-5 adminbtn":"btn mx-5 px-5 my-5 guestbtn"} onClick={() => navigate('/')}>Logout</button>
                </div>
            ))}
        </div>
    )
}

export default Login;