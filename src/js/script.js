import AugmentedPinImage from "./components/AugmentedPinImage";
import AugmentedPin from "@/js/components/AugmentedPin";

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
	AugmentedPinImage.prepareAssets(sceneEl);

	// const pin_position = { latitude: 37.541603, longitude: 127.078775 };
	// const pin_position = { latitude: 37.542488, longitude: 127.078056 };
	const pin_position = { latitude: 37.542292, longitude: 127.076093 };

	const ex = new AugmentedPin(`m1`);
	ex.setCoordinates(pin_position.latitude, pin_position.longitude);
	ex.pinImage.setTurnType(12);

	window.navigator.geolocation.watchPosition(position => {
		const d = calcDistance(position.coords, pin_position);
		ex.setTextValue(`${d}m`);
	});
	setTimeout(() => {
		ex.pinImage.setTurnType(18);
	}, 3000);

	sceneEl.appendChild(ex.render());
});
