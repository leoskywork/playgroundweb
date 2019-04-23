
// eslint-disable-next-line no-unused-vars
function main () {
	init();
	test();

	function test () {
		// const abc = Date.now()
		// console.log('object :', object);
		// let a = 'a test string';
	}

	function init () {
		// get live time locally first
		updateUILiveTime(getLiveTimeLocally());
		const onSuccess = (responseText) => updateUILiveTime(parseInt(responseText));
		getLiveTime(onSuccess);
		getLiveTimeTimer(30 * 60, onSuccess);
	}

	function getLiveTimeLocally () {
		const now = Date.now();
		const liveDate = new Date('2018-12-10');
		const days = Math.ceil((now - liveDate) / 1000 / 60 / 60 / 24);
		return days;
	}

	function getLiveTimeTimer (durationSeconds, onSuccess) {
		setTimeout(function () {
			getLiveTime(onSuccess);
			getLiveTimeTimer(durationSeconds, onSuccess);
		}, durationSeconds * 1000);
	}

	function getLiveTime (onSuccess) {
		let xmlhttp;
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			// eslint-disable-next-line no-undef
			xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
		}

		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
				onSuccess(xmlhttp.responseText);
			}
		};

		xmlhttp.open('GET', '/api/app/age', true);
		xmlhttp.send();
	}

	function updateUILiveTime (liveTime) {
		if (Number.isInteger(liveTime)) {
			document.getElementById('website-live-time').innerHTML = liveTime + ' days';
		}
	}
}
