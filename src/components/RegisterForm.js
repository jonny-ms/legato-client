import React, { useState } from "react";
import axios from "axios";


export default function RegisterForm(props) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const register = (e) => {
    e.preventDefault()
    axios(`/api/${props.userType}`, {
      method: "post",
      withCredentials: true,
      data: {
        teacher: {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password_confirmation: passwordConfirmation
        }
    }})
  };


  return(
    <form>
      <label>
        First Name:
        <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <label>
        Password Confirmation:
        <input type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required />
      </label>
      <button type="submit" onClick={(e) => register(e)}>Submit</button>
    </form>
  )
}
