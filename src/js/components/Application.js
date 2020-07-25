import { RouteUnit } from "@/js/components/RouteUnit";

export class Application {
	constructor() {
		this.routes = [];
		this.currentIndex = 0;

		this.reset = this.reset.bind(this);
		this.next = this.next.bind(this);
	}

	reset(features) {
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

	}
}
