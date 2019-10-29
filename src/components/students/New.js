import React from "react";
import RegisterForm from "../RegisterForm";

const NewStudent = () => {

  return (
    <div className="NewStudent">
      <p>New Students</p>
      <div>This is the new students form</div>
      <RegisterForm userType={"student"}/>
    </div>
  );
};

export default NewStudent;
