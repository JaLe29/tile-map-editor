
import React, { useState } from 'react'
import css from './home-page.scss'
import { Input } from 'antd'

const HomePage = () => {
	const [sizeX, setSizeX] = useState(960)
	const [sizeY, setSizeY] = useState(540)
	const [elementSize, setElementSize] = useState(50)
	const [isMouseDown, setMouseDown] = useState(false)
	const [data, setData] = useState<any>({})

	const x = Math.ceil(sizeX / elementSize)
	const y = Math.ceil(sizeX / elementSize)

	const handleItemChange = (activeX: number, activeY: number, force?: boolean) => {
		if (!isMouseDown && !force) return


		setData((curData: any) => {
			const c = { ...curData }
			const key = `${activeX}#${activeY}`
			if (c[key]) {
				delete c[key]
				return c
			}

			return {
				...curData,
				[key]: 1,
			}
		})
	}

	const board = new Array(y).fill(0).map((_, yIndex) => {
		return (
			<div key={yIndex}>
				{
					new Array(x).fill(0).map((zero, xIndex) => {
						return (
							<div
								key={`${xIndex}#${yIndex}`}
								className={css.tile}
								onClick={() => handleItemChange(xIndex, yIndex, true)}
								onMouseEnter={() => handleItemChange(xIndex, yIndex)}
								style={{
									background: data[`${xIndex}#${yIndex}`] === 1 ? 'red' : 'white',
								}}
							>
								{xIndex}:{yIndex}
							</div>
						)
					})

				}
			</div>
		)
	})

	return (
		<div
			className={css.homePage}
		>
			<div>
				<Input
					value={sizeX}
					addonBefore='Size X'
					onChange={(e: any) => setSizeX(e.target.value)}
				/>
				<Input
					value={sizeY}
					addonBefore='Size Y'
					onChange={(e: any) => setSizeY(e.target.value)}
				/>
				<Input
					value={elementSize}
					addonBefore='Element size'
					onChange={(e: any) => setElementSize(e.target.value)}
				/>
			</div>
			<hr />
			<div
				className={css.board}
				onMouseDown={() => setMouseDown(true)}
				onMouseUp={() => setMouseDown(false)}
			>
				{board}
			</div>
		</div>


	)
}

export default React.memo(HomePage)
