export default class AugmentedEntity {
	constructor(id) {
		this.id = id;
		this.entityEl = document.createElement(`a-entity`);
		this.entityEl.id = `${id}`;
		this.entityEl.setAttribute(`look-at`, `[camera]`);

		this.longitude = 0;
		this.latitude = 0;
		this.position = [0, 0, 0];

		this.render = this.render.bind(this);
		this.setCoordinates = this.setCoordinates.bind(this);
	}
	render() {

	}
	setCoordinates(latitude, longitude) {
		this.entityEl.setAttribute(`gps-entity-place`, `latitude: ${latitude}; longitude: ${longitude};`);
	}

	_renderSphere() {
		const sphereEl = document.createElement(`a-sphere`);
		sphereEl.setAttribute(`radius`, `0.50`);
		sphereEl.setAttribute(`color`, `red`);

		return sphereEl;
	}
}
