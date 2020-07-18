export const sendMessageToChild = (iframeEl, { name, options }) => {
	if(typeof iframeEl === `object` || `contentWindow` in iframeEl) {
		iframeEl.contentWindow.postMessage({ name, options }, `*`);
	}
};
export const sendMessageToParent = ({ name, options }) => {
	if(`parent` in window) {
		window.parent.postMessage({ name, options }, `*`);
	}
};
