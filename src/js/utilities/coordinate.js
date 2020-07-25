export const convert = {
	/**
	 * { latitude: 14145975, longitude: 4515203 } => {latitude: 37.54397094044265, longitude: 127.07545551272648}
	 *
	 * @param latitude
	 * @param longitude
	 * @returns {{latitude: number, longitude: number}}
	 * @constructor
	 */
	EPSG3857ToWGS84GEO: ({latitude, longitude}) => {
		const a = 6378137;
		const A = 3.141592653589793;
		const g = 3.141592653589793 / 2;
		const n = 180 / A;
		const o = 6356752.3142 / a;
		const l = Math.sqrt(1 - o * o);
		const m = .5 * l;
		const c = Math.exp((longitude - longitude * 2) / a);

		let p = g - 2 * Math.atan(c);
		let h = 1;
		let v = 0;

		while(Math.abs(h) > 1e-9 && v < 15) {
			const u = l * Math.sin(p);
			h = g - 2 * Math.atan(c * Math.pow(1 - u / 1 + u, m)) - p;
			p = p + h;
			v = v + 1
		}

		return {
			latitude: n * p,
			longitude: latitude * n / a
		};
	},
	WGS84GEOToEPSG3857: ({ latitude, longitude }) => {
		const c = longitude;
		const A = (() => {
			if(latitude > 89.5) return 89.5;
			else if (latitude < -89.5) return -89.5;

			return latitude;
		})();

		const a = 6378137;
		const i = 6356752.3142;
		const m = 3.141592653589793;
		const s = m / 180;

		const r = Math.sqrt(1 - Math.pow(i / a, 2));
		const l = A * s;
		const h = r * Math.sin(l);
		const k = Math.pow(1 - h / 1 + h, .5 * r);

		return {
			latitude: a * (c * s),
			longitude: 0 - a * Math.log(Math.tan(.5 * (m * .5 - l)) / k)
		};
	}
};

