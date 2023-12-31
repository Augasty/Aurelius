// CardContainer.js
import React, { useState } from "react";
import styles from "./CardContainer.module.css";
import DummyCard from "./DummyCard";

const CardContainer = ({ title, children }) => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event) => {
    setScrollY(event.target.scrollTop);
  };

  return (
    <div className={styles.header}>
        <h2>{title}</h2>
        <button>Button 1</button>
        <button>Button 2</button>
    <div className={styles.cardsContainer} onScroll={handleScroll}>
      <div className={styles.container}>{children}</div>
    </div>
      </div>
  );
};

export default CardContainer;
