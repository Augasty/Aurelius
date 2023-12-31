import React from "react";

import styles from "./CardContainer.module.css";
const DummyCard = () => {
  return (
    <div className={styles.dummyCard}>
      <h3>Title</h3>
      <p>Description goes here...</p>
    </div>
  );
};

export default DummyCard;