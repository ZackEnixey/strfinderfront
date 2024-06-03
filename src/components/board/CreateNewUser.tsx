import React from 'react';
import axios from 'axios';

interface CreateNewUserProps {}

const CreateNewUser: React.FC<CreateNewUserProps> = () => {

  const sendPost = async (userData: any) => {
    console.log(userData);

    const testData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        isActive: true,
        gameCodes: ['ABC123', 'DEF456', 'GHI789']
    }

    axios.post(`http://localhost:3001/users`, testData)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  };


  return (
    <div>
        <button onClick={sendPost}>CREATE</button>
    </div>
  );
};

export default CreateNewUser;
