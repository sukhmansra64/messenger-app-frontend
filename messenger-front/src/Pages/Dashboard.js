import React from 'react';

const Dashboard = () =>{
    return(
        <div className='card'>
            <div className='cardHeader'>Chatrooms</div>
            <div className='cardBody'>
                <div className='inputGroup'>
                    <label htmlFor='chatroomName'>Chatrooms</label>
                    <input type='text' name='chatroomName' id='chatroomName' placeholder='Name'/>
                </div>
                <button>Create</button>
            </div>
        </div>
    );
}

export default Dashboard;