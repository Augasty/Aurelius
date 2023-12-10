import { addDoc, collection } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../firebase";

const Tesct = () => {

  useEffect(() => {
    const unloadCallback = async(event) => {
      event.preventDefault();
      collection(db, "groups", "g6jWTYsiUHGtaZd44yBt", "taskList"),
      {
        backtest: "working",
      }
    };
  
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);


  return <div>My Component</div>;
};

export default Tesct;
