import { RouteUnit } from "@/js/components/RouteUnit";

/**
 * @param unit RouteUnit
 * @param e Object
 * @param flag boolean
 */
const set = (unit, e, flag) => {
	const {
		geometry: { coordinates },
		properties: { description, turnType, facilityType }
	} = e;

	if(flag) {
		unit.setStartCoordinates(coordinates);
	} else {
		unit.setEndCoordinates(coordinates);
		unit.turnType = turnType;
		unit.description = description;
		unit.facilityType = facilityType;
	}
};

export class Application {
	constructor() {
		this.routes = [];
		this.currentIndex = 0;

		this.reset = this.reset.bind(this);
		this.next = this.next.bind(this);
	}

	reset(features) {
		this.routes = [ ];
		this.currentIndex = 0;

		for(let i = 0; i < features.length; i++) {
			const {geometry: { coordinates, type }} = features[i];
			if(type === `LineString` && features[i - 1] && features[i + 1]) {
				const unit = new RouteUnit;
				unit.addRouteCoordinatesList(coordinates);

				set(unit, features[i - 1], true);
				set(unit, features[i + 1], false);

				this.routes.push(unit);
			}
		}
	}
	next() {
		this.currentIndex += 1;
	}

	getEntireRoutes() {
		const routes = [];
		for(let i = 0; i < this.routes.length; i++) {
			const { routesCoordinates } = this.routes[i];

			let j = i === 0 ? 0 : 1;
			for(; j < routesCoordinates.length; j++) {
				routes.push(routesCoordinates[j]);
			}
		}

		return routes;
	}
	getCurrentRoute() {
		return this.routes[this.currentIndex].routesCoordinates.slice();
	}
}
