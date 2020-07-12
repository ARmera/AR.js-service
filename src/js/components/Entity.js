import PinImage from "./PinImage";

export class Entity {
	constructor() {
		this.entityEl = document.createElement(`a-entity`);
		this.pinImage = new PinImage;
		this.longtitude = 0;
		this.latitude = 0;
		this.position = [0, 0, 0];
	}

	render() {

	}
	_renderSphere() {
		const sphereEl = document.createElement(`a-sphere`);
		sphereEl.setAttribute(`radius`, `0.50`);
		sphereEl.setAttribute(`color`, `red`);

		return sphereEl;
	}
}
