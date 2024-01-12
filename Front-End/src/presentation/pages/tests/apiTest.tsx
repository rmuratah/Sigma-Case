import axios from "axios"
import { useState } from "react"
import './apiTest.css'

type UserData = {

    user: {
        firstname: string,
        email: string,
    }
    permissions: string[]

};

const ApiTest = () => {

    const [statusCase1, setStatusCase1] = useState(false)
    const [statusCase2, setStatusCase2] = useState(false)
    const [statusCase3, setStatusCase3] = useState(false)
    const [statusCase4, setStatusCase4] = useState(false)
    const [statusCase5, setStatusCase5] = useState(false)

    const [userCase1, setUserCase1] = useState<UserData>({
        user: {
            firstname: '',
            email: '',
        },
        permissions: [],
    });
    const [userCase2, setUserCase2] = useState<UserData>({
        user: {
            firstname: '',
            email: '',
        },
        permissions: [],
    });
    const [userCase3, setUserCase3] = useState<UserData>({
        user: {
            firstname: '',
            email: '',
        },
        permissions: [],
    });
    const [userCase4, setUserCase4] = useState<UserData>({
        user: {
            firstname: '',
            email: '',
        },
        permissions: [],
    });

    console.log(userCase1)
    console.log(userCase2)
    console.log(userCase3)
    console.log(userCase4)

    //Test Case 1
    const case1 = () => {
        axios.get(`http://localhost:3001/users/joao.silva@email.com`)
            .then(response => {
                if (response.data[0].UserData.permissions.includes("user:profile:email:view") && response.data[0].UserData.permissions.includes("user:profile:firstname:view") && response.data[0].UserData.permissions.includes("user:profile:view")) {
                    setStatusCase1(true)
                    setUserCase1(response.data[0].UserData)
                } else setStatusCase1(false);
            });
    };

    //Test Case 2
    const case2 = () => {
        axios.get(`http://localhost:3001/users/maria.gomes@hotmail.com`)
            .then(response => {
                if (response.data[0].UserData.permissions.includes("user:profile:view") && response.data[0].UserData.permissions.includes("user:profile:email:view") && response.data[0].UserData.permissions.includes("user:profile:firstname:edit")) {
                    setStatusCase2(true)
                    setUserCase2(response.data[0].UserData)
                } else setStatusCase2(false);
            });
    }

    //Test Case 3
    const case3 = () => {
        axios.get(`http://localhost:3001/users/pedro_1985@gmail.com`)
            .then(response => {
                if (response.data[0].UserData.permissions.includes("user:profile:view") && response.data[0].UserData.permissions.includes("user:profile:firstname:view") && response.data[0].UserData.permissions.includes("user:profile:email:edit")) {
                    setStatusCase3(true)
                    setUserCase3(response.data[0].UserData)
                } else setStatusCase3(false);
            });
    }

    //Test Case 4
    const case4 = () => {
        axios.get(`http://localhost:3001/users/ana.pereira@yahoo.com`)
            .then(response => {
                if (response.data[0].UserData.permissions.includes("user:profile:firstname:edit") && response.data[0].UserData.permissions.includes("user:profile:email:edit") && response.data[0].UserData.permissions.includes("user:profile:edit")) {
                    setStatusCase4(true)
                    setUserCase4(response.data[0].UserData)
                } else setStatusCase4(false);
            });
    }

    //Test Case 5
    const case5 = () => {
        axios.get(`http://localhost:3001/users/erro@erro.com`)
            .then(response => {
                if (response.data[0] === undefined) {
                    setStatusCase5(true)
                } else setStatusCase5(false);
            });
    }

    return (
        <div>
            <h1>Case 1: Status: {statusCase1 ? "OK" : "Error"}</h1>
            <h3>joao  should have the permissions: user:profile:email:view, user:profile:firstname:view, user:profile:view</h3>
            <button className="testBtn" onClick={() => case1()}>Test</button>
            <h1>Case 2: Status: {statusCase2 ? "OK" : "Error"}</h1>
            <h3>maria should have the permissions: user:profile:view, user:profile:firstname:view, user:profile:firstname:edit</h3>
            <button className="testBtn" onClick={() => case2()}>Test</button>
            <h1>Case 3: Status: {statusCase3 ? "OK" : "Error"}</h1>
            <h3>pedro should have the permissions: user:profile:view, user:profile:firstname:view, user:profile:email:edit</h3>
            <button className="testBtn" onClick={() => case3()}>Test</button>
            <h1>Case 4: Status: {statusCase4 ? "OK" : "Error"}</h1>
            <h3>ana should have the permissions: user:profile:firstname:edit, user:profile:email:edit, user:profile:edit</h3>
            <button className="testBtn" onClick={() => case4()}>Test</button>
            <h1>Case 5: Status: {statusCase5 ? "OK" : "Error"}</h1>
            <button className="testBtn" onClick={() => case5()}>Test</button>
        </div>
    );
};


export default ApiTest