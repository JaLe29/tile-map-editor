
import React, { useCallback } from 'react'
import { Modal } from 'antd'

interface IProps {
	data: any;
	isVisible: boolean;
	onClose: () => void;
	elementSize: number;
}

const ResultsModal = ({ elementSize, data, isVisible, onClose }: IProps) => {
	const getData = useCallback(() => {
		return Object.keys(data).map((key: string) => {
			const [parsedX, parsedY] = key.split('#')
			return {
				x: parseInt(parsedX, 10) * elementSize,
				y: parseInt(parsedY, 10) * elementSize,
				type: data[key],
			}
		})
	}, [data, elementSize])

	return (
		<Modal
			title='Results Modal'
			visible={isVisible}
			onOk={onClose}
			onCancel={onClose}
		>
			<pre>
				{JSON.stringify(getData(), null, 2)}
			</pre>
		</Modal>
	)
}

export default ResultsModal
