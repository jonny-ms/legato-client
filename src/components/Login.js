import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios(`/api/login`, {
      method: "post",
      withCredentials: true,
      data: {
      email,
      password
    }}).then((resp) => {
      if(resp.data.status === 401) {
        alert("Nice try!")
      }
    }).then(() => {
      // Bring me somewhere or render stuff
    })
  }

  return(
    <form>
      <label>
        Email:
        <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button type="submit" onClick={(e) => login(e)}>Login</button>
    </form>
  )
  
}