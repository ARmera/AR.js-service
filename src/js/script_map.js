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
function generatePolyLine(map){
	const pos_list = [
		[127.07869313879708, 37.542262082702145],
		[127.07870424724021, 37.54232040945751],
		[127.0764877759761, 37.54254534340282],
		[127.07611559363336, 37.54233425012056],
		[127.07577120089364, 37.541617660526256],
		[127.07546012102235, 37.54151488908984],
		[127.07507681935195, 37.54162875784434]
	]
	const pos_list_len = pos_list.length;
	const pos_array = [];

	for(let i=0;i<pos_list_len;i++){
		pos_array.push(new Tmapv2.Geometry.Point(pos_list[i][0],pos_list[i][1]).transform("EPSG:4326", "EPSG:3857"));
	}
	var lineString = new Tmapv2.Geometry.LineString(pos_array);
	var style_bold = {strokeWidth: 6}; // 선 굵기 지정
	var mLineFeature = new Tmapv2.Feature.Vector(lineString, null, style_bold); // 백터 생성

	var vectorLayer = new Tmapv2.Layer.Vector("vectorLayerID"); // 백터 레이어 생성
	map.addLayer(vectorLayer); // 지도에 백터 레이어 추가

	vectorLayer.addFeatures([mLineFeature]); // 백터를 백터 레이어에 추가
		/*
		var lineString = new Tmap.Geometry.LineString(pointList); // 라인 스트링 생성
		var style_bold = {strokeWidth: 6}; // 선 굵기 지정
		var mLineFeature = new Tmap.Feature.Vector(lineString, null, style_bold); // 백터 생성

		var vectorLayer = new Tmap.Layer.Vector("vectorLayerID"); // 백터 레이어 생성
		map.addLayer(vectorLayer); // 지도에 백터 레이어 추가

		vectorLayer.addFeatures([mLineFeature]); // 백터를 백터 레이어에 추가
		 */
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
