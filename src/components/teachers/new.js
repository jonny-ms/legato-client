import React from "react";
import RegisterForm from "../RegisterForm";

const NewTeacher = () => {

  return (
    <div className="NewTeacher">
      <RegisterForm userType={"teacher"}/>
    </div>
  );
};

export default NewTeacher;
