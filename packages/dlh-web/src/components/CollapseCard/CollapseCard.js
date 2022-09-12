import React, { useState, useEffect } from 'react';
import styles from "./CollapseCard.less";

function CollapseCard({ isCollapse = true, configList, title, id ,href }) {

    const [collapse, setCollapse] = useState(isCollapse);
    const handleCollapse = () => {
        setCollapse(!collapse);
    };
    useEffect(() => {
        setCollapse(isCollapse);
    }, [isCollapse]);

    return (
        <div className={styles.cardStyle} id={id}>
            <div className={styles.cardHeader}>
                <div><a href={href}>回到顶部</a></div>
                <div className={styles.cardTitle} onClick={handleCollapse}>{title}</div>
            </div>
            <div className={`${styles.cardContent} ${!collapse ? styles.contenttHide : ''}`}>{configList}</div>
        </div>
    );
}

export default CollapseCard;
