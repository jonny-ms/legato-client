import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";
import "./index.css";

// axios.defaults.baseURL = "http://172.46.1.121:3001";
// axios.defaults.baseURL = "http://172.46.1.122:3001";
axios.defaults.baseURL = "http://localhost:3001";
// axios.defaults.baseURL = "http://192.168.2.32:3001";

ReactDOM.render(<App />, document.getElementById("root"));
