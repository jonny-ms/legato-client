import React from "react";
import RegisterForm from "../RegisterForm";

const NewTeacher = () => {


  return (    
    <div className="NewTeacher">
      <p>New Teacher</p>
      <div>This is the new teacher form</div>
      <RegisterForm userType={"teachers"}/>
    </div>
  );
};

export default NewTeacher;
