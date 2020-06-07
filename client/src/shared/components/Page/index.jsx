import React from 'react';

import styles from './styles.scss';

const Page = ({ children }) => {
	return <div className={styles.page}>{children}</div>;
};

export default Page;
