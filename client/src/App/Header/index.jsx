import React from 'react';

import styles from './styles.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.title}>speedtest</div>
				<div className={styles.links}>
					<a href="https://github.com/kitsunekyo/internet-speed-log/">github</a>
				</div>
			</div>
		</header>
	);
};

export default Header;
