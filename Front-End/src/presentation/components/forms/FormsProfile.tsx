import { useEffect, useState } from 'react';
import './FormsProfile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props {
  emailError?: boolean;
  email: string
}

type UserData = {

  user: {
    firstname: string,
    email: string,
  }
  permissions: string[]

};

const FormsProfile = ({ email }: Props) => {

  const [userData, setUserData] = useState<UserData>({
    user: {
      firstname: '',
      email: '',
    },
    permissions: [],
  });

  //Fetching the userData
  useEffect(() => {
    axios.get(`http://localhost:3001/users/${email}`)
      .then(response => response.data[0] !== undefined && setUserData(response.data[0].UserData))
  }, [email])

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [firstNameError, setFirstNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  // Function to edit User
  const editUser = async (firstname: string, emailEdit: string) => {
    await axios.put(`http://localhost:3001/users/${email}`,
      {
        firstname,
        emailEdit
      }
    )
    window.location.reload();
  }

  //Setting the FirstName and the email
  useEffect(() => {
    setFirstName(userData.user.firstname);
    setEmailEdit(userData.user.email);
  }, [userData]);

  // Function to validate the FirstName
  const validateFirstName = (firstName: string) => {
    if (/^[a-zA-Z]*$/.test(firstName) && firstName.length <= 15) {
      setFirstNameError(false);
    } else setFirstNameError(true);
  }

  // Function to validade the Email
  const validateEmail = (email: string) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length < 40) {
      setEmailError(false);
    } else setEmailError(true);
  }

  if (!userData) {
    <h1>Loading...</h1>
  }

  return (
    userData.permissions.length != 0 ?
      <div className='mainDiv'>
        <button className='backbtn' onClick={() => navigate("/")}>Home</button>
        <div className="form">
          <h1>Profile</h1>
          <div className="inputBox">
            {userData.permissions.includes("user:profile:firstname:view") || userData.permissions.includes("user:profile:view")
              || userData.permissions.includes("user:profile:edit") || userData.permissions.includes("user:profile:firstname:edit")
              ?
              <>
                <label>First Name: </label>
                <input
                  style={{ borderColor: firstNameError ? "red" : "black" }}
                  onChange={(e) => {
                    const newFirstName = e.target.value;
                    setFirstName(newFirstName);
                    validateFirstName(newFirstName);
                  }}
                  value={firstName}
                  readOnly={userData.permissions.includes("user:profile:firstname:edit") || userData.permissions.includes("user:profile:edit") ? false : true}
                />
              </>
              : undefined}
          </div>
          <div className="inputBox">
            {userData.permissions.includes("user:profile:email:view") || userData.permissions.includes("user:profile:view")
              || userData.permissions.includes("user:profile:edit") || userData.permissions.includes("user:profile:email:edit")
              ?
              <>
                <label>Email: </label>
                <input
                  style={{ borderColor: emailError ? "red" : "black" }} value={emailEdit}
                  onChange={(e) => {
                    const newEmail = e.target.value;
                    setEmailEdit(newEmail);
                    validateEmail(newEmail);
                  }}
                  readOnly={userData.permissions.includes("user:profile:email:edit") || userData.permissions.includes("user:profile:edit") ? false : true}
                />
              </>
              : undefined}
          </div>
          {userData.permissions.includes("user:profile:firstname:edit") || userData.permissions.includes("user:profile:email:edit") || userData.permissions.includes("user:profile:edit") ?
            <button className="Submit" onClick={() => firstNameError === false && emailError === false && editUser(firstName, emailEdit)}>Save</button>
            : undefined}
        </div>
      </div>
      : <>
        <button className='backbtn' onClick={() => navigate("/")}>Home</button>
        <h1 style={{ color: "black", fontSize: "5rem" }}>User does not exist</h1>
      </>

  )
}

export default FormsProfile;
