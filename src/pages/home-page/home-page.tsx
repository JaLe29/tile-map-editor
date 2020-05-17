
import React, { useState } from 'react'
import css from './home-page.scss'
import { Input, notification, Popconfirm, Button } from 'antd'
import ResultsModal from './results-modal'
import TilesModal from './tiles-modal'

const HomePage = () => {
	const [sizeX, setSizeX] = useState(540)
	const [sizeY, setSizeY] = useState(960)
	const [elementSize, setElementSize] = useState(50)
	const [isMouseDown, setMouseDown] = useState(false)
	const [data, setData] = useState<any>({})

	const [tilesData, setTilesData] = useState<any>({})
	const [isResultsModalVisible, setResultsModalVisible] = useState(false)
	const [isTilesModalVisible, setTilesModalVisible] = useState(false)
	const [activeTileKey, setActiveTileKey] = useState('')

	const x = Math.ceil(sizeX / elementSize)
	const y = Math.ceil(sizeY / elementSize)

	const handleResetClicked = () => setData({})

	const handleSaveClicked = () => {
		const payload = {
			sizeX,
			sizeY,
			elementSize,
			data,
			tilesData,
		}
		localStorage.setItem('projectData', JSON.stringify(payload))

		notification.success({
			message: 'Saving...',
		})
	}

	const handleLoadClicked = () => {
		const loadedProjectData = localStorage.getItem('projectData')
		if (!loadedProjectData) return
		const projectDataObj = JSON.parse(loadedProjectData)

		console.log(projectDataObj.sizeX)

		setSizeX(projectDataObj.sizeX)
		setSizeY(projectDataObj.sizeY)

		setElementSize(projectDataObj.elementSize)
		setData(projectDataObj.data)
		setTilesData(projectDataObj.tilesData)
		notification.success({
			message: 'Loading...',
		})
	}

	const handleItemChange = (activeX: number, activeY: number, force?: boolean) => {
		if (!activeTileKey) return

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
				[key]: activeTileKey,
			}
		})
	}

	const handleGenerateClicked = () => {
		setResultsModalVisible(true)
	}

	const board = new Array(x).fill(0).map((_, xIndex) => {
		return (
			<div key={xIndex}>
				{
					new Array(y).fill(0).map((zero, yIndex) => {
						const dataExist = tilesData[data[`${xIndex}#${yIndex}`]]

						return (
							<div
								key={`${xIndex}#${yIndex}`}
								className={css.tile}
								// onClick={() => handleItemChange(xIndex, yIndex, true)}
								onMouseEnter={() => handleItemChange(xIndex, yIndex)}
								onMouseDown={() => {
									setMouseDown(true)
									handleItemChange(xIndex, yIndex, true)
								}}
								style={{ border: '1px solid black' }}
							>
								{
									dataExist
										? <img src={tilesData[data[`${xIndex}#${yIndex}`]].image} alt={data[`${xIndex}#${yIndex}`]} />
										: data[`${xIndex}#${yIndex}`] ? 'Err' : ''
								}

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
				<Button type='primary' onClick={() => setTilesModalVisible(true)}>
					Tiles Settings
				</Button>
				<Button type='primary' onClick={handleGenerateClicked}>
					Generate
				</Button>
				<br />
				<Button type='primary' onClick={handleSaveClicked}>
					Save
				</Button>
				<Button type='primary' onClick={handleLoadClicked}>
					Load
				</Button>
				<br />
				<Popconfirm
					title='Are you sure reset this map?'
					onConfirm={handleResetClicked}
					okText='Yes'
					cancelText='No'
				>
					<Button>
						Reset
					</Button>
				</Popconfirm>
				<hr />
				<div className={css.tileSelector}>
					{Object.keys(tilesData).map((tileKey: string) => (
						<img
							className={tileKey === activeTileKey ? css.activeImg : undefined}
							key={tileKey}
							src={tilesData[tileKey].image}
							alt={tileKey}
							onClick={() => setActiveTileKey(tileKey)}
						/>
					))}
				</div>
			</div>
			<hr />
			<div
				className={css.board}
				onMouseUp={() => setMouseDown(false)}
			>
				{board}
			</div>
			<ResultsModal
				isVisible={isResultsModalVisible}
				onClose={() => setResultsModalVisible(false)}
				data={data}
				elementSize={elementSize}
			/>
			<TilesModal
				isVisible={isTilesModalVisible}
				onClose={() => setTilesModalVisible(false)}
				data={tilesData}
				onSave={(d: any) => { setTilesData(d); setTilesModalVisible(false) }}
			/>
		</div>


	)
}

export default React.memo(HomePage)
