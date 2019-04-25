// import { Utility, Constant } from './tool.js';

function main () {
    initFooter();
    initCards();
	test();

	function test () {
		// const abc = Date.now()
		// console.log('object :', object);
		// let a = 'a test string';
		//console.log(new Utility());
        // console.log(`live ${Constant.liveDate} - ${Constant.expireDate}`);
    }
    
    function initCards () {
        let liveDays = getLiveTimeLocally();
        let remainingDays = getRemainingTimeLocally();
        let livePercent = remainingDays > 0 ? Math.round(liveDays/(liveDays+remainingDays)*100)/100 : 1;
        document.getElementById('card-live-days').innerText = liveDays.toString();
        document.getElementById('card-remaining-days').innerText = remainingDays.toString();
        document.getElementById('card-live-percent').innerText = `, ${(livePercent*100)}% spent`;

        setTimeout(() => {
            initCards();
        }, 10 * 60 * 1000);
    }

	function initFooter () {
		// get live time locally first
		updateUIFooterLiveTime(getLiveTimeLocally());
		const onSuccess = (responseText) => updateUIFooterLiveTime(parseInt(responseText));
		getLiveTime(onSuccess);
		getLiveTimeTimer(30 * 60, onSuccess);
	}

	function getLiveTimeLocally () {
		const now = Date.now();
		const liveDate = new Date('2018-12-10');
		const days = Math.ceil((now - liveDate) / 1000 / 60 / 60 / 24);
		return days;
    }
    
    function getRemainingTimeLocally () {
        const now = Date.now();
        const expireDate = new Date('2021-11-27');
        return Math.ceil((expireDate - now) / 1000 / 60 / 60 / 24);
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

	function updateUIFooterLiveTime (liveTime) {
		if (Number.isInteger(liveTime)) {
			document.getElementById('website-live-time').innerHTML = liveTime + ' days';
		}
	}
}


// function ClassA(){
//     this.name = 'hello';
// }

// function sayHello(){
//     console.log('sayHello function');
//     //title = 'leo test';
// }