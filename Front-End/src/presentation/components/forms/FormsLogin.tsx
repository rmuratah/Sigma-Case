import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './FormsProfile.css'

const FormsLogin = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false)

    const validateEmail = (email: string) => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length < 40) {
            setEmailError(false);
        } else setEmailError(true);
    }

    return (
        <div className="form">
            <h1>Login</h1>
            <div className="inputBox">
                <label >Email: </label>
                <input
                    onChange={(e) => {
                        const newEmail = e.target.value;
                        setEmail(newEmail);
                        validateEmail(newEmail);
                    }}
                    style={{ borderColor: emailError ? "red" : "black" }}
                />
            </div>
            <button className="Submit" onClick={() => !emailError && navigate("/profile", { state: email })}>Sign in</button>
        </div>
    )
}

export default FormsLogin;

