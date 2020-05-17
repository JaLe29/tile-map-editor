
import React, { useEffect, useState } from 'react'
import { Input, Modal, Button } from 'antd'

interface ITile {
	image: string;
}

interface IProps {
	data: { [code: string]: ITile };
	isVisible: boolean;
	onClose: () => void;
	onSave: (data: any) => void;
}

const TilesModal = ({ onSave, data, isVisible, onClose }: IProps) => {
	const [newKeyValue, setNewKeyValue] = useState('')
	const [newImageValue, setNewImageValue] = useState('')

	const [componentTilesData, setCompoonentTilesData] = useState<{ [code: string]: ITile }>({})

	useEffect(() => setCompoonentTilesData(data), [data])

	const handleAddClicked = () => {
		const dataCopy = { ...componentTilesData }
		dataCopy[newKeyValue] = { image: newImageValue }

		setNewImageValue('')
		setNewKeyValue('')

		setCompoonentTilesData(dataCopy)
	}

	const handleRemoveTileClicked = (key: string) => {
		const dataCopy = { ...componentTilesData }
		delete dataCopy[key]

		setCompoonentTilesData(dataCopy)
	}

	return (
		<Modal
			title='Tiles Modal'
			visible={isVisible}
			onOk={() => onSave(componentTilesData)}
			onCancel={onClose}
		>
			{Object.keys(componentTilesData).map((keyTile: string) => {
				return (
					<div key={keyTile}>
						{keyTile}: <img src={componentTilesData[keyTile].image} alt={keyTile} width={50} height={50} />
						<Button type='primary' onClick={() => handleRemoveTileClicked(keyTile)}>
							Remove
						</Button>
					</div>
				)
			})}
			<hr />
			<Input
				value={newKeyValue}
				addonBefore='Key'
				onChange={(e: any) => setNewKeyValue(e.target.value)}
			/>
			<Input
				value={newImageValue}
				addonBefore='Image'
				onChange={(e: any) => setNewImageValue(e.target.value)}
			/>
			<Button type='primary' onClick={handleAddClicked}>
				Add
			</Button>
		</Modal>
	)
}

export default TilesModal
