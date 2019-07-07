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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./options/utils/getOptionRowElem.js
/* harmony default export */ var getOptionRowElem = ((option, value, onChange) => {
  const rowElem = document.createElement('div');
  rowElem.className = 'row';

  const labelColElem = document.createElement('div');
  labelColElem.className = 'col';
  const labelElem = document.createElement('label');
  labelElem.htmlFor = `option-${option.name}`;
  labelElem.textContent = option.title;

  labelColElem.appendChild(labelElem);
  rowElem.appendChild(labelColElem);

  const optionColElem = document.createElement('div');
  optionColElem.className = 'col';

  let optionElem;
  if (option.type === 'string') {
    optionElem = document.createElement('input');
    optionElem.type = 'text';
    optionElem.name = option.name;
    optionElem.value = value || '';

    optionElem.addEventListener('input', onChange);
  } else if (option.type === 'bool') {
    optionElem = document.createElement('input');
    optionElem.type = 'checkbox';
    optionElem.name = option.name;
    if (value === true) optionElem.checked = true;

    optionElem.addEventListener('change', onChange);
  } else if (option.type === 'radio') {
    optionElem = document.createElement('div');

    option.options.forEach(opt => {
      const optLabelElem = document.createElement('label');

      const radioElem = document.createElement('input');
      radioElem.type = 'radio';
      radioElem.name = option.name;
      radioElem.value = opt.value;
      if (value === opt.value) radioElem.setAttribute('checked', '');

      radioElem.addEventListener('change', onChange);

      optLabelElem.appendChild(radioElem);
      optLabelElem.appendChild(document.createTextNode(opt.label));
      optionElem.appendChild(optLabelElem);
    });
  } else if (option.type === 'menulist') {
    optionElem = document.createElement('select');
    optionElem.name = option.name;

    option.options.forEach(opt => {
      const optElem = document.createElement('option');
      optElem.value = opt.value;
      optElem.textContent = opt.label;
      if (value === opt.value) optElem.setAttribute('selected', '');

      optionElem.appendChild(optElem);
    });

    optionElem.addEventListener('change', onChange);
  }

  if (optionElem) {
    optionElem.id = `option-${option.name}`;

    optionColElem.appendChild(optionElem);
    rowElem.appendChild(optionColElem);
  }

  return rowElem;
});
// CONCATENATED MODULE: ./options/utils/getButtonRowElem.js
/* harmony default export */ var getButtonRowElem = ((text, onClick) => {
  const rowElem = document.createElement('div');
  rowElem.className = 'row';

  const emplyColElem = document.createElement('div');
  emplyColElem.className = 'col';
  rowElem.appendChild(emplyColElem);

  const buttonColElem = document.createElement('div');
  buttonColElem.className = 'col';

  const buttonElem = document.createElement('button');
  buttonElem.textContent = text;
  buttonElem.addEventListener('click', onClick);

  buttonColElem.appendChild(buttonElem);
  rowElem.appendChild(buttonColElem);

  return rowElem;
});
// CONCATENATED MODULE: ./options/utils/getChangedPrefs.js
/* harmony default export */ var getChangedPrefs = (target => {
  const prefName = target.name;
  const prefValue = target.type === 'checkbox' ? target.checked : target.value;
  const changedPrefs = {};
  changedPrefs[prefName] = prefValue;

  // change the symbol on currency change
  if (prefName === 'toCurr') {
    changedPrefs.symbol = prefValue;
  }

  // if a space inserted before the symbol, remove it, and set symbSep to true
  if (prefName === 'symbol' && (prefValue.charAt(0) === ' ' || prefValue.charAt(prefValue.length - 1) === ' ')) {
    const symbSepElem = document.getElementById('option-symbSep');
    if (!symbSepElem.checked) changedPrefs.symbSep = true;

    target.value = prefValue.trim();
    delete changedPrefs.symbol;
  }

  // don't const to set the same thousand and decimal separator
  if (prefName === 'sepTho' && [',', '.'].indexOf(prefValue) !== -1) {
    const sepDecElem = document.getElementById('option-sepDec');
    if (sepDecElem.value === prefValue) {
      changedPrefs.sepDec = prefValue === ',' ? '.' : ',';
    }
  } else if (prefName === 'sepDec') {
    const sepThoElem = document.getElementById('option-sepTho');
    if (sepThoElem.value === prefValue) {
      changedPrefs.sepTho = prefValue === ',' ? '.' : ',';
    }
  }

  return changedPrefs;
});
// CONCATENATED MODULE: ./options/index.js
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();





const onChange = (_ref) => {
  let target = _ref.target;

  const changedPrefs = getChangedPrefs(target);

  if (Object.keys(changedPrefs).length) {
    browser.storage.local.get('preferences').then(storage => {
      browser.storage.local.set({ preferences: Object.assign({}, storage.preferences, changedPrefs) });
    });
  }
};

const onReset = () => {
  browser.storage.local.set({ currRates: {} });
};

const buildOptionsForm = (options, preferences) => {
  const optionsElem = document.getElementById('options');

  options.forEach(option => {
    const value = preferences[option.name];
    const optionRowElem = getOptionRowElem(option, value, onChange);

    optionsElem.appendChild(optionRowElem);
  });

  const buttonRowElem = getButtonRowElem('Reset exchange rates', onReset);

  optionsElem.appendChild(buttonRowElem);
};

const refreshOptionsForm = changedPrefs => {
  Object.keys(changedPrefs).forEach(prefName => {
    const optionElem = document.querySelector(`[name="${prefName}"]`);

    if (optionElem) {
      if (optionElem.type === 'radio') {
        const radioElem = document.querySelector(`[name="${prefName}"][value="${changedPrefs[prefName]}"]`);
        if (radioElem) radioElem.checked = true;
      } else if (optionElem.type === 'checkbox') {
        optionElem.checked = changedPrefs[prefName];
      } else {
        optionElem.value = changedPrefs[prefName];
      }
    }
  });
};

Promise.all([browser.runtime.getBackgroundPage(), browser.storage.local.get('preferences')]).then((_ref2) => {
  var _ref3 = _slicedToArray(_ref2, 2);

  let bgWindow = _ref3[0],
      storage = _ref3[1];

  buildOptionsForm(bgWindow.OPTIONS, storage.preferences);

  browser.storage.onChanged.addListener(changes => {
    if (changes.preferences) {
      const oldPrefs = changes.preferences.oldValue;
      const newPrefs = changes.preferences.newValue;
      const changedPrefs = {};

      Object.keys(changes.preferences.newValue).forEach(prefKey => {
        if (oldPrefs[prefKey] !== newPrefs[prefKey]) changedPrefs[prefKey] = newPrefs[prefKey];
      });

      if (Object.keys(changedPrefs).length) refreshOptionsForm(changedPrefs);
    }
  });
});

/***/ })

/******/ });