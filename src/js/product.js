import { sendMessageToChild as sendMessage } from "./components/Messaging";

const EVENT_LISTENER = {

};

document.addEventListener(`DOMContentLoaded`, function() {
	const arEl = document.querySelector(`#ar-frame`);
	const mapEl = document.querySelector(`#map-frame`);

	window.addEventListener(`message`, function(e) {
		const { data } = e;
		const { name, options } = data;

		if(
			name in EVENT_LISTENER &&
			typeof EVENT_LISTENER[name] === `function`
		) {
			EVENT_LISTENER[name](options, { arEl, mapEl });
		}
	});
});
