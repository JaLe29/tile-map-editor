
import React, { useState } from 'react'
import css from './home-page.scss'
import { Input } from 'antd'

const HomePage = () => {
	const [sizeX, setSizeX] = useState(960)
	const [sizeY, setSizeY] = useState(540)
	console.log('a')

	return (
		<div
			className={css.homePage}
		>
			<div>
				<Input
					value={sizeX}
					addonBefore='Size X'
					placeholder='Basic usage'
					onChange={(e: any) => setSizeX(e.target.value)}
				/>
				<Input
					value={sizeY}
					addonBefore='Size Y'
					placeholder='Basic usage'
					onChange={(e: any) => setSizeY(e.target.value)}
				/>
			</div>
			<hr />
		</div>


	)
}

export default React.memo(HomePage)
