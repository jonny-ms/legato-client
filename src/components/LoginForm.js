import React, { useState } from "react";

export function LoginForm(props) {

  render(
  <form>
  <label>
    First Name:
    <input type="text" name="first_name" />
  </label>
  <label>
    Last Name:
    <input type="text" name="last_name" />
  </label>
  <label>
    Email:
    <input type="text" name="email" />
  </label>
  <label>
    Password:
    <input type="text" name="password" />
  </label>
  <label>
    Password Confirmation:
    <input type="text" name="password_confirmation" />
  </label>
  <input type="submit" value="Submit" />
</form>
  )
}