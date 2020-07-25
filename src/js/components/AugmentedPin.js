import AugmentedEntity from "./AugmentedEntity";
import AugmentedPinImage from "@/js/components/AugmentedPinImage";

const TextInitializer = [
	[ `value`, `` ],
	[ `color`, `#FF0000` ],
	[ `scale`, `10 10 0` ],
	[ `align`, `center` ],
	[ `position`, `0 -4 0` ]
];

class AugmentedPin extends AugmentedEntity {
	constructor() {
		super();

		this.pinImage = new AugmentedPinImage;
		this.textEl = document.createElement(`a-text`);
		TextInitializer.forEach(([k, v]) => this.textEl.setAttribute(k, v));

		this.setTextValue = this.setTextValue.bind(this);
	}

	setTextValue(e) {
		this.textEl.setAttribute(`value`, `${e}`);
	}
	render() {
		super.render();
		this.entityEl.appendChild(this.pinImage.render());
		this.entityEl.appendChild(this.textEl);

		return this.entityEl;
	}
}

export default AugmentedPin;
