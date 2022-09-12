import React from 'react';
import styles from './ConfigItem.less';

function ErrorMessage({ errorMessage }) {
    return errorMessage !== "" ? <div className={styles.errorMessage}>{errorMessage}</div> : "";
}

export default ErrorMessage;
