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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./background/options.js
/* harmony default export */ var options = ([{
  title: 'Convert to',
  name: 'toCurr',
  type: 'menulist',
  value: '',
  options: [{ value: '', label: 'Please select a currency' }, { value: 'AFA', label: 'Afghan Afghani (1927–2002)' }, { value: 'ALL', label: 'Albanian Lek' }, { value: 'DZD', label: 'Algerian Dinar' }, { value: 'AOA', label: 'Angolan Kwanza' }, { value: 'ARS', label: 'Argentine Peso' }, { value: 'AMD', label: 'Armenian Dram' }, { value: 'AWG', label: 'Aruban Florin' }, { value: 'AUD', label: 'Australian Dollar' }, { value: 'AZN', label: 'Azerbaijani Manat' }, { value: 'BSD', label: 'Bahamian Dollar' }, { value: 'BHD', label: 'Bahraini Dinar' }, { value: 'BDT', label: 'Bangladeshi Taka' }, { value: 'BBD', label: 'Barbadian Dollar' }, { value: 'BYR', label: 'Belarusian Ruble (2000–2016)' }, { value: 'BEF', label: 'Belgian Franc' }, { value: 'BZD', label: 'Belize Dollar' }, { value: 'BMD', label: 'Bermudan Dollar' }, { value: 'BTN', label: 'Bhutanese Ngultrum' }, { value: 'BTC', label: 'Bitcoin' }, { value: 'BOB', label: 'Bolivian Boliviano' }, { value: 'BAM', label: 'Bosnia-Herzegovina Convertible Mark' }, { value: 'BWP', label: 'Botswanan Pula' }, { value: 'BRL', label: 'Brazilian Real' }, { value: 'GBP', label: 'British Pound' }, { value: 'BND', label: 'Brunei Dollar' }, { value: 'BGN', label: 'Bulgarian Lev' }, { value: 'BIF', label: 'Burundian Franc' }, { value: 'KHR', label: 'Cambodian Riel' }, { value: 'CAD', label: 'Canadian Dollar' }, { value: 'CVE', label: 'Cape Verdean Escudo' }, { value: 'KYD', label: 'Cayman Islands Dollar' }, { value: 'XAF', label: 'Central African CFA Franc' }, { value: 'XPF', label: 'CFP Franc' }, { value: 'CLP', label: 'Chilean Peso' }, { value: 'CNY', label: 'Chinese Yuan' }, { value: 'COP', label: 'Colombian Peso' }, { value: 'KMF', label: 'Comorian Franc' }, { value: 'CDF', label: 'Congolese Franc' }, { value: 'CRC', label: 'Costa Rican Colón' }, { value: 'HRK', label: 'Croatian Kuna' }, { value: 'CUC', label: 'Cuban Convertible Peso' }, { value: 'CZK', label: 'Czech Koruna' }, { value: 'DKK', label: 'Danish Krone' }, { value: 'DJF', label: 'Djiboutian Franc' }, { value: 'DOP', label: 'Dominican Peso' }, { value: 'XCD', label: 'East Caribbean Dollar' }, { value: 'EGP', label: 'Egyptian Pound' }, { value: 'ERN', label: 'Eritrean Nakfa' }, { value: 'EEK', label: 'Estonian Kroon' }, { value: 'ETB', label: 'Ethiopian Birr' }, { value: 'EUR', label: 'Euro' }, { value: 'FKP', label: 'Falkland Islands Pound' }, { value: 'FJD', label: 'Fijian Dollar' }, { value: 'GMD', label: 'Gambian Dalasi' }, { value: 'GEL', label: 'Georgian Lari' }, { value: 'DEM', label: 'German Mark' }, { value: 'GHS', label: 'Ghanaian Cedi' }, { value: 'GIP', label: 'Gibraltar Pound' }, { value: 'GRD', label: 'Greek Drachma' }, { value: 'GTQ', label: 'Guatemalan Quetzal' }, { value: 'GNF', label: 'Guinean Franc' }, { value: 'GYD', label: 'Guyanaese Dollar' }, { value: 'HTG', label: 'Haitian Gourde' }, { value: 'HNL', label: 'Honduran Lempira' }, { value: 'HKD', label: 'Hong Kong Dollar' }, { value: 'HUF', label: 'Hungarian Forint' }, { value: 'ISK', label: 'Icelandic Króna' }, { value: 'INR', label: 'Indian Rupee' }, { value: 'IDR', label: 'Indonesian Rupiah' }, { value: 'IRR', label: 'Iranian Rial' }, { value: 'IQD', label: 'Iraqi Dinar' }, { value: 'ILS', label: 'Israeli New Shekel' }, { value: 'ITL', label: 'Italian Lira' }, { value: 'JMD', label: 'Jamaican Dollar' }, { value: 'JPY', label: 'Japanese Yen' }, { value: 'JOD', label: 'Jordanian Dinar' }, { value: 'KZT', label: 'Kazakhstani Tenge' }, { value: 'KES', label: 'Kenyan Shilling' }, { value: 'KWD', label: 'Kuwaiti Dinar' }, { value: 'KGS', label: 'Kyrgystani Som' }, { value: 'LAK', label: 'Laotian Kip' }, { value: 'LVL', label: 'Latvian Lats' }, { value: 'LBP', label: 'Lebanese Pound' }, { value: 'LSL', label: 'Lesotho Loti' }, { value: 'LRD', label: 'Liberian Dollar' }, { value: 'LYD', label: 'Libyan Dinar' }, { value: 'LTL', label: 'Lithuanian Litas' }, { value: 'MOP', label: 'Macanese Pataca' }, { value: 'MKD', label: 'Macedonian Denar' }, { value: 'MGA', label: 'Malagasy Ariary' }, { value: 'MWK', label: 'Malawian Kwacha' }, { value: 'MYR', label: 'Malaysian Ringgit' }, { value: 'MVR', label: 'Maldivian Rufiyaa' }, { value: 'MRO', label: 'Mauritanian Ouguiya' }, { value: 'MUR', label: 'Mauritian Rupee' }, { value: 'MXN', label: 'Mexican Peso' }, { value: 'MDL', label: 'Moldovan Leu' }, { value: 'MNT', label: 'Mongolian Tugrik' }, { value: 'MAD', label: 'Moroccan Dirham' }, { value: 'MZM', label: 'Mozambican Metical (1980–2006)' }, { value: 'MMK', label: 'Myanmar Kyat' }, { value: 'NAD', label: 'Namibian Dollar' }, { value: 'NPR', label: 'Nepalese Rupee' }, { value: 'ANG', label: 'Netherlands Antillean Guilder' }, { value: 'TWD', label: 'New Taiwan Dollar' }, { value: 'NZD', label: 'New Zealand Dollar' }, { value: 'NIO', label: 'Nicaraguan Córdoba' }, { value: 'NGN', label: 'Nigerian Naira' }, { value: 'KPW', label: 'North Korean Won' }, { value: 'NOK', label: 'Norwegian Krone' }, { value: 'OMR', label: 'Omani Rial' }, { value: 'PKR', label: 'Pakistani Rupee' }, { value: 'PAB', label: 'Panamanian Balboa' }, { value: 'PGK', label: 'Papua New Guinean Kina' }, { value: 'PYG', label: 'Paraguayan Guarani' }, { value: 'PEN', label: 'Peruvian Sol' }, { value: 'PHP', label: 'Philippine Peso' }, { value: 'PLN', label: 'Polish Zloty' }, { value: 'QAR', label: 'Qatari Rial' }, { value: 'RON', label: 'Romanian Leu' }, { value: 'RUB', label: 'Russian Ruble' }, { value: 'RWF', label: 'Rwandan Franc' }, { value: 'SVC', label: 'Salvadoran Colón' }, { value: 'WST', label: 'Samoan Tala' }, { value: 'SAR', label: 'Saudi Riyal' }, { value: 'RSD', label: 'Serbian Dinar' }, { value: 'SCR', label: 'Seychellois Rupee' }, { value: 'SLL', label: 'Sierra Leonean Leone' }, { value: 'SGD', label: 'Singapore Dollar' }, { value: 'SKK', label: 'Slovak Koruna' }, { value: 'SBD', label: 'Solomon Islands Dollar' }, { value: 'SOS', label: 'Somali Shilling' }, { value: 'ZAR', label: 'South African Rand' }, { value: 'KRW', label: 'South Korean Won' }, { value: 'XDR', label: 'Special Drawing Rights' }, { value: 'LKR', label: 'Sri Lankan Rupee' }, { value: 'SHP', label: 'St. Helena Pound' }, { value: 'SDG', label: 'Sudanese Pound' }, { value: 'SRD', label: 'Surinamese Dollar' }, { value: 'SZL', label: 'Swazi Lilangeni' }, { value: 'SEK', label: 'Swedish Krona' }, { value: 'CHF', label: 'Swiss Franc' }, { value: 'SYP', label: 'Syrian Pound' }, { value: 'STD', label: 'São Tomé &amp; Príncipe Dobra' }, { value: 'TJS', label: 'Tajikistani Somoni' }, { value: 'TZS', label: 'Tanzanian Shilling' }, { value: 'THB', label: 'Thai Baht' }, { value: 'TOP', label: 'Tongan Paʻanga' }, { value: 'TTD', label: 'Trinidad &amp; Tobago Dollar' }, { value: 'TND', label: 'Tunisian Dinar' }, { value: 'TRY', label: 'Turkish Lira' }, { value: 'TMT', label: 'Turkmenistani Manat' }, { value: 'UGX', label: 'Ugandan Shilling' }, { value: 'UAH', label: 'Ukrainian Hryvnia' }, { value: 'AED', label: 'United Arab Emirates Dirham' }, { value: 'UYU', label: 'Uruguayan Peso' }, { value: 'USD', label: 'US Dollar' }, { value: 'UZS', label: 'Uzbekistani Som' }, { value: 'VUV', label: 'Vanuatu Vatu' }, { value: 'VEF', label: 'Venezuelan Bolívar' }, { value: 'VND', label: 'Vietnamese Dong' }, { value: 'XOF', label: 'West African CFA Franc' }, { value: 'YER', label: 'Yemeni Rial' }, { value: 'ZMK', label: 'Zambian Kwacha (1968–2012)' }]
}, {
  title: 'Round price',
  name: 'round',
  type: 'bool',
  value: true
}, {
  title: 'Currency symbol',
  name: 'symbol',
  type: 'string',
  value: ''
}, {
  title: 'Symbol position',
  name: 'symbPos',
  type: 'radio',
  value: 'a',
  options: [{
    value: 'b',
    label: 'before'
  }, {
    value: 'a',
    label: 'after'
  }]
}, {
  title: 'Separate symbol from price',
  name: 'symbSep',
  type: 'bool',
  value: true
}, {
  title: 'Thousand separator',
  name: 'sepTho',
  type: 'menulist',
  value: ' ',
  options: [{
    value: '',
    label: 'none'
  }, {
    value: ' ',
    label: 'space'
  }, {
    value: ',',
    label: ','
  }, {
    value: '.',
    label: '.'
  }]
}, {
  title: 'Decimal separator',
  name: 'sepDec',
  type: 'menulist',
  value: ',',
  options: [{
    value: ',',
    label: ','
  }, {
    value: '.',
    label: '.'
  }]
}, {
  title: 'Add custom style to converted prices',
  name: 'style',
  type: 'bool',
  value: true
}, {
  title: 'Show exchange rate update notifications',
  name: 'noti',
  type: 'bool',
  value: true
}]);
// CONCATENATED MODULE: ./background/utils/getCurrRate.js
const requests = {};

const patterns = [/id=['"]?exchange_rate['"]?[^>]*value=['"]?(\d+\.\d+)['"]?/i, /id=['"]?knowledge-currency__tgt-input['"]?[^>]*value=['"]?(\d+\.\d+)['"]?/i];

const getTxtMatch = txt => patterns.reduce((txtMatch, pattern) => {
  if (txtMatch) return txtMatch;

  const match = txt.match(pattern);
  if (match && match[1]) return match[1];
  return '';
}, '');

// on getCurrRate request complete
const reqComplete = (request, currRates, reqKey) => {
  const currRate = currRates[reqKey] ? Object.assign({}, currRates[reqKey]) : {};

  if (request && request.status === 200) {
    currRate.updatedAt = Date.now();

    const txtMatch = getTxtMatch(request.responseText);
    const newValue = parseFloat(txtMatch);

    if (!Number.isNaN(newValue)) {
      currRate.value = newValue;
    } else if (!currRate.value) {
      // will try again if requested after 10 minues
      currRate.updatedAt = Date.now() - 3000000;
    }
  } else {
    // will try again if requested after 10 minues
    currRate.updatedAt = Date.now() - 3000000;
  }

  return currRate;
};

/* harmony default export */ var getCurrRate = ((currRates, fromCurr, toCurr) => {
  const reqKey = `${fromCurr}to${toCurr}`;

  if (!requests[reqKey]) {
    // if last update was within an hour, resolve
    if (currRates[reqKey] && currRates[reqKey].updatedAt && Date.now() - currRates[reqKey].updatedAt < 3600000) {
      return Promise.resolve(currRates[reqKey]);
    }

    requests[reqKey] = new Promise(resolve => {
      // console.log(`SCsCC - get ${fromCurr} to ${toCurr}`);
      const req = new XMLHttpRequest();

      const onEnd = function listener(event) {
        const request = event ? event.target : null;
        const currRate = reqComplete(request, currRates, reqKey);

        resolve(currRate);
        requests[reqKey] = undefined;
      };

      req.addEventListener('load', onEnd);
      req.addEventListener('error', onEnd);

      req.open('GET', `https://www.google.com/search?q=1+${fromCurr}+to+${toCurr}&hl=en`, true);
      req.setRequestHeader('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0'); // to request desktop site
      req.send();
    });
  }

  return requests[reqKey];
});
// CONCATENATED MODULE: ./background/utils/showNotification.js
const manifest = browser.runtime.getManifest();

// show notification about exchange rate updates if enabled in preferences
/* harmony default export */ var showNotification = ((fromCurr, toCurr, oldValue, newValue) => {
  if (oldValue === newValue) return;

  const opts = {
    type: 'basic',
    title: manifest.name,
    iconUrl: browser.runtime.getURL(manifest.icons[48])
  };

  if (oldValue) {
    // on update
    opts.message = `${fromCurr} to ${toCurr} exchange rate updated:\n${oldValue} → ${newValue}`;
  } else {
    // on frist get
    opts.message = `${fromCurr} to ${toCurr} exchange rate got:\n${newValue}`;
  }

  browser.notifications.create(opts);
});
// CONCATENATED MODULE: ./background/index.js




const icons = {
  enabled: {
    16: browser.runtime.getURL('icons/icon16.png'),
    32: browser.runtime.getURL('icons/icon32.png'),
    48: browser.runtime.getURL('icons/icon48.png')
  },
  disabled: {
    16: browser.runtime.getURL('icons/icon16_off.png'),
    32: browser.runtime.getURL('icons/icon32_off.png'),
    48: browser.runtime.getURL('icons/icon48_off.png')
  }
};

let preferences = { enabled: true };
let currRates = {};

// set default preferences
window.OPTIONS = options;
options.forEach(option => {
  preferences[option.name] = option.value;
});

const onError = error => {
  console.error('SCsCC - error:', error.message);
};

const openTab = path => {
  const url = browser.runtime.getURL(path);
  const notFoundErr = 'no opened tab found';

  return browser.tabs.query({}).then(tabs => tabs.reduce((oTab, tab) => !oTab && tab.url === url ? tab : oTab, false)).then(oTab => {
    if (!oTab) throw new Error(notFoundErr);
    return browser.tabs.update(oTab.id, { active: true });
  }).catch(err => {
    if (err.message !== notFoundErr) onError(err);

    return browser.tabs.create({
      active: true,
      url
    });
  }).catch(onError);
};

const openOptionsTab = () => openTab('options/options.html');

const openPopupTab = () => openTab('popup/popup.html');

window.openOptionsPage = () => browser.runtime.openOptionsPage().catch(err => {
  onError(err);

  openOptionsTab();
});

// get storage
browser.storage.local.get().then(storage => {
  const newStorage = {};

  if (storage.preferences && Object.keys(storage.preferences).length === Object.keys(preferences).length) {
    preferences = storage.preferences;
  } else {
    preferences = Object.assign({}, preferences, storage.preferences || {});
    newStorage.preferences = preferences;
  }

  if (storage.currRates) {
    const newCurrRates = {};

    Object.keys(storage.currRates).forEach(key => {
      const currRare = storage.currRates[key];
      if (Date.now() - currRare.updatedAt < 86400000) {
        newCurrRates[key] = currRare;
      }
    });

    if (Object.keys(storage.currRates).length !== Object.keys(newCurrRates).length) {
      currRates = newCurrRates;
      newStorage.currRates = newCurrRates;
    } else {
      currRates = storage.currRates;
    }
  } else {
    newStorage.currRates = {};
  }

  if (Object.keys(newStorage).length) browser.storage.local.set(newStorage);

  if (!preferences.toCurr) window.openOptionsPage();

  if (browser.browserAction.setIcon) browser.browserAction.setIcon({ path: preferences.enabled ? icons.enabled : icons.disabled });
  browser.browserAction.onClicked.addListener(openPopupTab);
}).catch(onError);

browser.storage.onChanged.addListener(changes => {
  if (changes.preferences && changes.preferences.newValue) {
    const newPrefs = changes.preferences.newValue;
    if (browser.browserAction.setIcon && newPrefs.enabled !== preferences.enabled) browser.browserAction.setIcon({ path: newPrefs.enabled ? icons.enabled : icons.disabled });

    preferences = newPrefs;
  }
  if (changes.currRates && changes.currRates.newValue) {
    currRates = changes.currRates.newValue;
  }
});

const checkCurrRate = (currRate, fromCurr, toCurr) => {
  const reqKey = `${fromCurr}to${toCurr}`;

  if (!currRates[reqKey] || currRates[reqKey].value !== currRate.value || currRates[reqKey].updatedAt !== currRate.updatedAt) {
    if (preferences.noti && currRate.value) {
      const oldValue = currRates[reqKey] && currRates[reqKey].value || null;
      showNotification(fromCurr, toCurr, oldValue, currRate.value);
    }

    const newCurrRates = Object.assign({}, currRates, { [reqKey]: currRate });
    browser.storage.local.set({ currRates: newCurrRates });
  }
};

browser.runtime.onMessage.addListener((_ref) => {
  let type = _ref.type,
      data = _ref.data;

  if (type === 'getCurrRate') {
    const fromCurr = data.from,
          toCurr = data.to;


    return getCurrRate(currRates, fromCurr, toCurr).then(currRate => {
      checkCurrRate(currRate, fromCurr, toCurr);
      return currRate;
    });
  }

  return false;
});

/***/ })
/******/ ]);