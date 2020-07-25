import turnType from "../datasets/turnType";

class AugmentedPinImage {
	constructor(turnType) {
		this.turnType = 0;
		this.imageEl = document.createElement(`a-image`);

		this.render = this.render.bind(this);
		this.setTurnType = this.setTurnType.bind(this);
		this.getTurnType = this.getTurnType.bind(this);

		this.setTurnType(turnType);
	}
	setTurnType(turnType) {
		if([11,12,13,14,16,17,18,19].includes(turnType)) {
			this.turnType = +turnType;
			this.imageEl.setAttribute(`src`, `#turn-icon-${this.turnType}`);
		}
	}
	getTurnType() {
		return this.turnType;
	}
	render() {
		this.imageEl.setAttribute(`src`, `#turn-icon-${this.turnType}`);
		this.imageEl.setAttribute(`width`, `4`);
		this.imageEl.setAttribute(`height`, `4`);

		return this.imageEl;
	}
};

AugmentedPinImage.prepareAssets = function(element) {
	const sceneEl = element || document.querySelector(`a-scene[embedded]`);
	const assetsEl = document.createElement(`a-assets`);
	[0, ...Object.keys(turnType)].forEach(key => {
		const imgEl = document.createElement(`img`);
		imgEl.id = `turn-icon-${key}`;
		imgEl.src = `./images/pin_icon/${key}.svg`;
		// imgEl.src = `./images/pin_icon/0.png`;
		imgEl.title = `${turnType[key]}`;
		// imgEl.style.cssText = `width: 72px; height: 72px;`;

		assetsEl.appendChild(imgEl);
	});

	sceneEl.appendChild(assetsEl);
};

export default AugmentedPinImage;
