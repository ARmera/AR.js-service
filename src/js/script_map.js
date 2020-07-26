/* global Tmapv2 */

import { Application } from "@/js/components/Application";
import DUMMY from "./test_data/route_response";
import { convert } from "./utilities/coordinate";

function initializeTmap(mapEl, center) {
	return new Tmapv2.Map(mapEl, {
		center,
		width : `100%`,
		height : `100%`,
		zoom : 17,
		httpsMode: true,
		zoomControl : false,
		scrollwheel : false
	});
}
function generateGeolocationMarker(map, { latitude, longitude }, dir) {
	const P = 34;
	const icon = `${dir}/images/position.svg`;
	const position = new Tmapv2.LatLng(latitude, longitude);
	const iconSize = new Tmapv2.Size(P, P);
	const offset = new Tmapv2.Point(P/2, P/2);

	return new Tmapv2.Marker({ position, icon, map, iconSize, offset });
}
function generateEntireRoutePolyline(map, p) {
	const path = p
		.map(e => convert.EPSG3857ToWGS84GEO(e))
		.map(({latitude, longitude}) => new Tmapv2.LatLng(latitude, longitude));

	return new Tmapv2.Polyline({
		map, path,
		strokeWeight: 6,
		strokeOpacity: 0.38,
		strokeStyle: `solid`,
		strokeColor: `#f25e42`
	});
}
function generateCurrentRoutePolyline(map, p) {
	const path = p
		.map(e => convert.EPSG3857ToWGS84GEO(e))
		.map(({latitude, longitude}) => new Tmapv2.LatLng(latitude, longitude));

	return new Tmapv2.Polyline({
		map, path,
		strokeWeight: 6,
		strokeStyle: `solid`,
		strokeColor: `#f25e42`
	});
}

document.addEventListener(`DOMContentLoaded`, function() {
	const root_dir = `${location.origin}/${location.pathname.split(`/`).slice(1, -1).join(`/`)}`;
	const center = { latitude: 37.543085, longitude: 127.076159 };

	const mapEl = document.querySelector(`#map-container`);


	const c = new Tmapv2.LatLng(center.latitude, center.longitude);
	const map = initializeTmap(mapEl, c);
	// map.addListener(`center_changed`, e => {
	// 	console.log(`center changed`);
	// });
	//
	// window.setCenter = function() {
	// 	map.setCenter(new Tmapv2.LatLng(center.latitude, center.longitude));
	// };

	const marker = generateGeolocationMarker(map, center, root_dir);
	marker.create(() => {
		const x = marker.getOffset();
		// console.log({x});
	});
	// console.log(marker, marker.getOffset());

	const app = new Application;
	app.reset(DUMMY.features);

	const entirePolyline = generateEntireRoutePolyline(map, app.getEntireRoutes());
	const currentPolyline = generateCurrentRoutePolyline(map, app.getCurrentRoute());

	const updateMapCenter = ({ coords: { latitude, longitude } }) => {
		const pos = new Tmapv2.LatLng(+latitude, +longitude);
		marker.setPosition(pos);
		map.setCenter(pos);
	};
	navigator.geolocation.getCurrentPosition(updateMapCenter);
	navigator.geolocation.watchPosition(updateMapCenter);
});
