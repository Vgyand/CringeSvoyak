import randomColor from 'randomcolor'

import Card from 'components/ui/Card/Card'
import SkeletonLoader from 'components/ui/SkeletonLoader/SkeletonLoader'

import { useGetAllPacksQuery } from 'store/packsApi'

import styles from './Content.module.scss'

const Content = () => {
	const { data = [], isLoading, isError } = useGetAllPacksQuery('')

	if (isError) return <div>An error has occurred!</div>

	return (
		<div className={styles.content}>
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<>
					{data.map((pack: any, index: number) => (
						<Card
							key={index}
							name={pack.name}
							likesCount={pack.like_count}
							downloadCount={pack.download_count}
							color={randomColor()}
						/>
					))}
				</>
			)}
		</div>
	)
}

export default Content
