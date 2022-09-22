import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import reducer from "./Store/reducer";
import { Provider } from "react-redux";

const olddata=JSON.parse(localStorage.getItem("Puranadata"));
const storage = createStore(reducer,olddata==null?undefined:olddata);

console.log('Mera Old Data',olddata)

storage.subscribe(()=>{
  console.log("Mene sun liya",storage.getState())
  localStorage.setItem("Puranadata",JSON.stringify(storage.getState()))
})

const reference = ReactDOM.createRoot(document.getElementById("root"));
// document.getElementById('root') => 2000
// ReactDOM.createRoot(2000) =>100
reference.render(
  <React.StrictMode>
    <Provider store={storage}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
