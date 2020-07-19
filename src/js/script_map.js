/* global Tmapv2 */
var map;
const url = "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result"
const xhttp = new XMLHttpRequest()
var marker_s, marker_e, marker_p1, marker_p2;
var totalMarkerArr = [];
var drawInfoArr = [];
var resultdrawArr = [];

function initializeTmap(mapEl, { latitude, longitude }) {
	return map = new Tmapv2.Map(mapEl, {
		center : new Tmapv2.LatLng(latitude, longitude),
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
function drawLine(arrPoint){
	var polyline_;
	polyline_ = new Tmapv2.Polyline({
		path : arrPoint,
		strokeColor : "#006bdd",
		strokeWeight : 10,
		map : map
	})

}

document.addEventListener(`DOMContentLoaded`, function() {
	const root_dir = `${location.origin}/${location.pathname.split(`/`).slice(1, -1).join(`/`)}`;
	const center = { latitude: 37.543085, longitude: 127.076159 };
	//(root_dir)

	const mapEl = document.querySelector(`#map-container`);

	const map = initializeTmap(mapEl, center);
	map.addListener(`center_changed`, e => {
		//console.log(`center changed`);
	});

	window.setCenter = function() {
		map.setCenter(new Tmapv2.LatLng(center.latitude, center.longitude));
	};

	const marker = generateGeolocationMarker(map, center, root_dir);
	marker.create(() => {
		const x = marker.getOffset();
		//console.log({x});
	})
	var arr = [
		[127.07869313879708, 37.542262082702145],
		[127.07870424724021, 37.54232040945751],
		[127.0764877759761, 37.54254534340282],
		[127.07611559363336, 37.54233425012056],
		[127.07577120089364, 37.541617660526256],
		[127.07546012102235, 37.54151488908984],
		[127.07507681935195, 37.54162875784434]
	]
	xhttp.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200){
			alert(this.responseText)
		}
	}
	xhttp.open("POST",url,true)
	xhttp.setRequestHeader("Content-type","application/json")
	xhttp.setRequestHeader("appKey","3b93e7ea-9bb4-4402-afdb-a96aaab9fa23")
	xhttp.send(JSON.stringify({
		"appKey" : "3b93e7ea-9bb4-4402-afdb-a96aaab9fa23",
		"startX" : "126.977022",
		"startY" : "37.569758",
		"endX" : "126.997589",
		"endY" : "37.570594",
		"passList" : "126.987319,37.565778_126.983072,37.573028",
		"reqCoordType" : "WGS84GEO",
		"resCoordType" : "EPSG3857",
		"startName" : "출발지",
		"endName" : "도착지"
	}))

	var idx = 0;
	var container = []
	for (item in arr){
		var convertChange = new Tmapv2.LatLng(
			arr[idx][1],
			arr[idx][0])
		console.log(convertChange)
		container.push(convertChange)
		idx+=1
	}
	drawLine(container)


	//console.log(marker, marker.getOffset());
});
