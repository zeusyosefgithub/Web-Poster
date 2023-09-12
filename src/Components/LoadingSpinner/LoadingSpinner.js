import React from "react";
import { auth } from "../../FireBase/firebase";
import "./LoadingSpinner.css";

export default function LoadingSpinner(props) {
  return (
    <div className={props.currentUser || props.logout ? "spinner-container1" : "spinner-container"}>
      <div className="loading-spinner m-auto"></div>
      {
        props.currentUser && <div className="Loging_On">Loging in</div>
      }
      {
        props.logout && <div className="Loging_On">Loging out</div>
      }
    </div>
  );
}