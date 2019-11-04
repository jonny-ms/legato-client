import React from "react";
import RegisterForm from "../RegisterForm";

const NewStudent = () => {

  return (
    <div className="NewStudent">
      <RegisterForm userType={"student"}/>
    </div>
  );
};

export default NewStudent;
