declare module '*.scss' {
	const content: { [className: string]: string }
	export default content
}

declare interface IPoint {
	x: number;
	y: number;
}
