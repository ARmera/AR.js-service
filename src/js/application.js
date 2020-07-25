/**
 *	2020.07.25
 *	웹뷰 어플리케이션에서 경로 정보를 네이티브 메세지로 받았을 때 이를 하위 iframe에게 전달하기 앞서
 *	데이터를 가공하고 편집, 저장한 뒤 사용자 GPS 상태에 따라 갱신하는 기능을 담당하는 컴포넌트를 개발한다.
 */

import DUMMY from "./test_data/route_response";
import { convert } from "./utilities/coordinate";
import turnType from "./datasets/turnType";

class RouteUnit {
	constructor() {
		this.routesCoordinates = [];
		this.description = ``;
		this._turnType = 0;
		this._facilityType = 0;
		this._startLatitude = 0;
		this._startLongitude = 0;
		this._endLatitude = 0;
		this._endLongitude = 0;

		this.setStartCoordinates = this.setStartCoordinates.bind(this);
		this.setDestinationCoordinates = this.setDestinationCoordinates.bind(this);
		this.addRouteCoordinatesList = this.addRouteCoordinatesList.bind(this);
	}

	get turnType() {
		return this._turnType;
	}
	set turnType(e) {
		if(Object.keys(turnType).includes(e))
			this._turnType = +e;
	}
	get facilityType() {
		return +this._facilityType;
	}
	set facilityType(e) {
		this._facilityType = +e;
	}
	get startCoordinates() {
		return {
			latitude: this._startLatitude,
			longitude: this._startLongitude
		};
	}
	set startCoordinates({ latitude, longitude }) {
		if(latitude && longitude) {
			this._startLatitude = latitude;
			this._startLongitude = longitude;
		}
	}
	get endCoordinates() {
		return {
			latitude: this._startLatitude,
			longitude: this._startLongitude
		};
	}
	set endCoordinates({ latitude, longitude }) {
		if(latitude && longitude) {
			this._endLatitude = latitude;
			this._endLongitude = longitude;
		}
	}

	setStartCoordinates([ latitude, longitude ]) {
		this.startCoordinates = { latitude, longitude };
	}
	setDestinationCoordinates([ latitude, longitude ]) {
		this.endCoordinates = { latitude, longitude };
	}
	addRouteCoordinatesList(e) {
		e.forEach(([ latitude, longitude ]) => {
			this.routesCoordinates.push({ latitude, longitude });
		});
	}
}
class Application {
	constructor() {
		this.routes = [];
		this.currentIndex = 0;

		this.reset = this.reset.bind(this);
		this.next = this.next.bind(this);
	}

	reset(features) {
		this.routes = [ new RouteUnit, ];
		this.currentIndex = 0;

		for(const e of features) {
			const { geometry, properties } = e;
			const { coordinates, type } = geometry;
			if(type === `Point`) {

			} else if(type === `LineString`) {

			}
		}
	}
	next() {

	}
}

(function() {
	const { features } = DUMMY;

	const e = { latitude: 14145975, longitude: 4515203 };
	console.log(features);
})();
