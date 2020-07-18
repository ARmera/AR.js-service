/* global Tmapv2 */

function initializeTmap(mapEl, { latitude, longitude }) {
	return new Tmapv2.Map(mapEl, {
		center : new Tmapv2.LatLng(latitude, longitude),
		width : `100%`,
		height : `100%`,
		zoom : 17,
		zoomControl : false,
		scrollwheel : false
	});
}
function generateGeolocationMarker(map, { latitude, longitude }, dir) {
	const P = 42;
	const icon = `${dir}/images/position.svg`;
	const position = new Tmapv2.LatLng(latitude, longitude);
	const iconSize = new Tmapv2.Size(P, P);
	const offset = new Tmapv2.Point(P/2, P/2);

	return new Tmapv2.Marker({ position, icon, map, iconSize, offset });
}

document.addEventListener(`DOMContentLoaded`, function() {
	const root_dir = `${location.origin}/${location.pathname.split(`/`).slice(1, -1).join(`/`)}`;
	const center = { latitude: 37.543085, longitude: 127.076159 };

	const mapEl = document.querySelector(`#map-container`);

	const map = initializeTmap(mapEl, center);
	map.addListener(`center_changed`, e => {
		console.log(`center changed`);
	});

	window.setCenter = function() {
		map.setCenter(new Tmapv2.LatLng(center.latitude, center.longitude));
	};

	const marker = generateGeolocationMarker(map, center, root_dir);
	marker.create(() => {
		const x = marker.getOffset();
		console.log({x});
	});
	console.log(marker, marker.getOffset());
});
