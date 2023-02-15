import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "semantic-ui-react";


export default function NewUser() {

    const navigate = useNavigate()

    //states used for the form
    const [nameInput, setNameInput] = useState("")
    const [usernameInput, setUsernameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("")


    //handles creating a new user when the from is submitted
    function handleCreateAcount(){
        console.log("new user: ", nameInput, usernameInput, emailInput, passwordInput, confirmPasswordInput)
    }


    return(
        <div className="form-div-create-acount">
            <Form className="create-acount-form" onSubmit={(e) => {
                e.preventDefault()
                handleCreateAcount()
            }}>
            <h3>Please Make an Account</h3> 
            <Form.Input fluid placeholder="Name" onChange={(e) => setNameInput(e.target.value)}/>
            <Form.Input fluid placeholder="User Name" onChange={(e) => setUsernameInput(e.target.value)}/>
            <Form.Input fluid placeholder="Email" onChange={(e) => setEmailInput(e.target.value)}/>
            <Form.Input fluid type="password" placeholder="Password" onChange={(e) => setPasswordInput(e.target.value)}/>
            <Form.Input fluid type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPasswordInput(e.target.value)}/>
            <Form.Button type="submit">Create an Acount</Form.Button>
            <br/>
            </Form> 
            <button className="exit-form" onClick={() => navigate('/')}>Back</button>
        </div>        
    )
}

