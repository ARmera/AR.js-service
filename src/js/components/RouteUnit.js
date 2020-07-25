import turnType from "@/js/datasets/turnType";

export class RouteUnit {
	constructor() {
		this.routesCoordinates = [];
		this.description = ``;
		this._turnType = 0;
		this._facilityType = 0;
		this._startLatitude = 0;
		this._startLongitude = 0;
		this._endLatitude = 0;
		this._endLongitude = 0;
	}

	get turnType() {
		return this._turnType;
	}
	set turnType(e) {
		if(Object.keys(turnType).includes(`${e}`))
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
	setEndCoordinates([ latitude, longitude ]) {
		this.endCoordinates = { latitude, longitude };
	}
	addRouteCoordinatesList(e) {
		e.forEach(([ latitude, longitude ]) => {
			this.routesCoordinates.push({ latitude, longitude });
		});
	}
}
