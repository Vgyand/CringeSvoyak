import React from 'react'

import Filter from 'components/Filter/Filter'
import Logo from 'components/Logo/Logo'

import styles from './AdminPanel.module.scss'

const AdminPanel = () => {
	return (
		<div className="mx-auto max-w-5xl container">
			<div className={styles.wrapper}>
				<div className={styles.logo}>
					<Logo />
				</div>
				<div className={styles.content}>Content</div>
				<div className={styles.filter}>
					<Filter />
				</div>
			</div>
		</div>
	)
}

export default AdminPanel
