import PinImage from "./components/PinImage";

function getPosition(){
	return new Promise(resolve => {
		if(`geolocation` in window.navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				resolve({ latitude, longitude });
			});

			return;
		}

		resolve({ });
	});
}
function calcDistance(position1, position2) {
	const { latitude: lat1, longitude: lon1 } = position1;
	const { latitude: lat2, longitude: lon2 } = position2;

	const R = 6371e3; // metres
	const φ1 = lat1 * Math.PI/180; // φ, λ in radians
	const φ2 = lat2 * Math.PI/180;
	const Δφ = (lat2-lat1) * Math.PI/180;
	const Δλ = (lon2-lon1) * Math.PI/180;

	const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
		Math.cos(φ1) * Math.cos(φ2) *
		Math.sin(Δλ/2) * Math.sin(Δλ/2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	return Math.floor(Math.abs(R * c)); // in metres
}

document.addEventListener(`DOMContentLoaded`, function() {
	const sceneEl = document.querySelector(`a-scene[embedded]`);
	PinImage.prepareAssets(sceneEl);

	// const pin_position = { latitude: 37.541603, longitude: 127.078775 };
	// const pin_position = { latitude: 37.542488, longitude: 127.078056 };
	const pin_position = { latitude: 37.542292, longitude: 127.076093 };
	const entityEl = document.createElement(`a-entity`);
	entityEl.id = `m1`;
	entityEl.setAttribute(`gps-entity-place`, `latitude: ${pin_position.latitude}; longitude: ${pin_position.longitude};`);
	entityEl.setAttribute(`look-at`, `[camera]`);

	const pin = new PinImage(13);

	const textEl = document.createElement(`a-text`);
	textEl.setAttribute(`value`, `300m`);
	textEl.setAttribute(`color`, `#FF0000`);
	textEl.setAttribute(`scale`, `10 10 1`);

	window.navigator.geolocation.watchPosition(position => {
		const d = calcDistance(position.coords, pin_position);
		textEl.setAttribute(`value`, `${d}m`);
	});

	entityEl.appendChild(pin.render());
	entityEl.appendChild(textEl);
	sceneEl.appendChild(entityEl);
});
