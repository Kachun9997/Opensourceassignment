/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./popup/utils/getUpdatedTxt.js
/* harmony default export */ var getUpdatedTxt = (updatedAt => {
  const updateDiff = Date.now() - updatedAt;
  let updatedTxt;

  if (updateDiff > 3600000) {
    const hourDiff = Math.floor(updateDiff / 3600000);

    updatedTxt = `more than ${hourDiff} hour`;
    if (hourDiff > 1) updatedTxt += 's';
  } else {
    const minDiff = Math.floor(updateDiff / 60000);

    if (minDiff === 0) updatedTxt = 'less than a minute';else if (minDiff === 1) updatedTxt = '1 minute';else updatedTxt = `${minDiff} minutes`;
  }

  return updatedTxt;
});
// CONCATENATED MODULE: ./popup/utils/getRateLiElem.js
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ var getRateLiElem = ((currKey, currRate, updatedTxt) => {
  var _currKey$split = currKey.split('to'),
      _currKey$split2 = _slicedToArray(_currKey$split, 2);

  const fromCurr = _currKey$split2[0],
        toCurr = _currKey$split2[1];

  const rateLiElem = document.createElement('li');

  // span.curr - fromCurr to toCurr:
  const currSpanElem = document.createElement('span');
  currSpanElem.className = 'curr';
  currSpanElem.textContent = `${fromCurr} to ${toCurr}: `;
  rateLiElem.appendChild(currSpanElem);

  // strong - currRate
  const rateStrongElem = document.createElement('strong');
  rateStrongElem.textContent = currRate;
  rateLiElem.appendChild(rateStrongElem);

  rateLiElem.appendChild(document.createElement('br'));

  // span.upd - lastUpdate
  const updSpanElem = document.createElement('span');
  updSpanElem.className = 'upd';
  updSpanElem.textContent = `(updated ${updatedTxt} ago)`;
  rateLiElem.appendChild(updSpanElem);

  return rateLiElem;
});
// CONCATENATED MODULE: ./popup/index.js



const resetBtnElem = document.querySelector('#reset');
const stateBtnElem = document.querySelector('#state');
const optionsBtnElem = document.querySelector('#options');
const toCurrSpanElem = document.querySelector('#toCurr');
const ratesUlElem = document.querySelector('#rates');

let toCurrOpts;

const setState = enabled => {
  stateBtnElem.textContent = enabled ? 'Turn off' : 'Turn on';
};

const setToCurr = curr => {
  if (curr) {
    const toCurr = toCurrOpts.find(toCurrOpt => toCurrOpt.value === curr) || null;
    toCurrSpanElem.textContent = toCurr ? `${toCurr.label} (${toCurr.value})` : curr;
  } else {
    toCurrSpanElem.textContent = 'Please select a currency on the options page.';
  }
};

const refreshCurrRatesList = currRates => {
  while (ratesUlElem.firstChild) {
    ratesUlElem.removeChild(ratesUlElem.firstChild);
  }

  Object.keys(currRates).forEach(currKey => {
    const currRate = currRates[currKey];
    const updatedTxt = getUpdatedTxt(currRate.updatedAt);
    const rateLiElem = getRateLiElem(currKey, currRate.value || 'n/a', updatedTxt);

    ratesUlElem.appendChild(rateLiElem);
  });

  if (ratesUlElem.childNodes.length === 0) {
    resetBtnElem.style.display = 'none';

    const liElem = document.createElement('li');
    liElem.textContent = 'No downloaded exchange rate yet.';

    ratesUlElem.appendChild(liElem);
  } else {
    resetBtnElem.style.display = 'initial';
  }
};

browser.runtime.getBackgroundPage().then(bgWindow => {
  const toCurrOpt = bgWindow.OPTIONS.find(opt => opt.name === 'toCurr') || {};
  toCurrOpts = toCurrOpt.options || [];

  return browser.storage.local.get();
}).then(storage => {
  var _storage$preferences = storage.preferences;
  const enabled = _storage$preferences.enabled,
        toCurr = _storage$preferences.toCurr;

  const currRates = storage.currRates || {};

  setState(enabled);
  setToCurr(toCurr);
  refreshCurrRatesList(currRates);

  browser.storage.onChanged.addListener(changes => {
    if (changes.preferences) {
      var _changes$preferences = changes.preferences;
      const oldValue = _changes$preferences.oldValue,
            newValue = _changes$preferences.newValue;


      if (oldValue.enabled !== newValue.enabled) setState(newValue.enabled);
      if (oldValue.toCurr !== newValue.toCurr) setToCurr(newValue.toCurr);
    }

    if (changes.currRates) {
      refreshCurrRatesList(changes.currRates.newValue);
    }
  });
});

stateBtnElem.addEventListener('click', () => {
  browser.storage.local.get('preferences').then((_ref) => {
    let preferences = _ref.preferences;

    preferences.enabled = !preferences.enabled;

    browser.storage.local.set({ preferences });
  });
});

resetBtnElem.addEventListener('click', () => {
  browser.storage.local.set({ currRates: {} });
});

optionsBtnElem.addEventListener('click', () => {
  browser.runtime.getBackgroundPage().then(bgWindow => {
    bgWindow.openOptionsPage();
  });
});

/***/ })

/******/ });