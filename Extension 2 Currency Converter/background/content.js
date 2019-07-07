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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var patts_namespaceObject = {};
__webpack_require__.d(patts_namespaceObject, "numPatt", function() { return patts_numPatt; });
__webpack_require__.d(patts_namespaceObject, "symbPatts", function() { return patts_symbPatts; });
__webpack_require__.d(patts_namespaceObject, "currPatts", function() { return currPatts; });
__webpack_require__.d(patts_namespaceObject, "cleanSymbPatt", function() { return cleanSymbPatt; });
__webpack_require__.d(patts_namespaceObject, "wordPatt", function() { return wordPatt; });
__webpack_require__.d(patts_namespaceObject, "nonWordPatt", function() { return nonWordPatt; });

// CONCATENATED MODULE: ./content/utils/listenerHelper.js
const addListener = (listeners, cb) => {
  const newListeners = listeners.slice();
  if (newListeners.indexOf(cb) === -1) newListeners.push(cb);
  return newListeners;
};

const removeListener = (listeners, cb) => {
  if (cb) {
    const newListeners = listeners.slice();
    const cbInd = newListeners.indexOf(cb);
    if (cbInd !== -1) newListeners.splice(cbInd, 1);
    return newListeners;
  }
  return [];
};

const callListeners = function callListeners(listeners) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return listeners.forEach(cb => cb(...args));
};
// CONCATENATED MODULE: ./content/storage/preferences.js


let listeners = [];
let preferences = {};

browser.storage.local.get('preferences').then((_ref) => {
  let data = _ref.preferences;

  if (!data) return;
  preferences = data;
  callListeners(listeners, preferences);
});

browser.storage.onChanged.addListener(changes => {
  if (changes.preferences && changes.preferences.newValue) {
    preferences = changes.preferences.newValue;
    callListeners(listeners, preferences);
  }
});

const get = key => key ? preferences[key] : preferences;

const onChange = cb => {
  listeners = addListener(listeners, cb);
};

const offChange = cb => {
  listeners = removeListener(listeners, cb);
};

/* harmony default export */ var storage_preferences = ({
  get,
  onChange,
  offChange
});
// CONCATENATED MODULE: ./content/storage/currRates.js


const requests = {};
let currRates_listeners = [];
let currRates = {};

browser.storage.local.get('currRates').then((_ref) => {
  let data = _ref.currRates;

  if (!data) return;
  currRates = data;
  callListeners(currRates_listeners, currRates, true);
});

browser.storage.onChanged.addListener(changes => {
  if (changes.currRates && changes.currRates.newValue) {
    const newCurrRates = changes.currRates.newValue;
    const hasNew = Object.keys(newCurrRates).length > Object.keys(currRates).length;

    currRates = newCurrRates;
    callListeners(currRates_listeners, currRates, hasNew);
  }
});

const currRates_get = (fromCurr, toCurr) => {
  const reqKey = `${fromCurr}to${toCurr}`;
  const currRate = currRates[reqKey] ? currRates[reqKey].value : undefined;

  if (!requests[reqKey]) {
    const data = { from: fromCurr, to: toCurr };
    requests[reqKey] = true;

    browser.runtime.sendMessage({ type: 'getCurrRate', data }, () => {
      requests[reqKey] = false;
    });
  }

  return currRate;
};

const currRates_onChange = cb => {
  currRates_listeners = addListener(currRates_listeners, cb);
};

const currRates_offChange = cb => {
  currRates_listeners = removeListener(currRates_listeners, cb);
};

/* harmony default export */ var storage_currRates = ({
  get: currRates_get,
  onChange: currRates_onChange,
  offChange: currRates_offChange
});
// CONCATENATED MODULE: ./content/utils/mutationObserver.js
/* harmony default export */ var mutationObserver = (onMutation => {
  const isDataScscc = node => /^data$/i.test(node.nodeName) && node.className === 'scscc';

  const checkMutations = mutlist => {
    mutlist.forEach(mut => {
      mut.addedNodes.forEach(addedNode => {
        if (!addedNode.parentNode || isDataScscc(addedNode) || addedNode.nodeType === 3 && isDataScscc(addedNode.parentNode)) return;

        onMutation(addedNode);
      });
    });
  };

  const observer = new MutationObserver(checkMutations);

  return {
    observe: () => observer.observe(document.body, {
      childList: true,
      subtree: true
    }),

    disconnect: () => observer.disconnect()
  };
});
// CONCATENATED MODULE: ./content/utils/style.js
const styleElem = document.createElement('style');
styleElem.textContent = 'data.scscc {\n' + '  padding: 0 2px !important;\n' + '  color: inherit !important;\n' + '  white-space: pre !important;\n' + '  border-width: 0 1px !important;\n' + '  border-style: dotted !important;\n' + '  border-color: inherit !important;\n' + '  cursor: help !important;\n' + '}\n' + 'data.scscc:hover {\n' + '  background-color: red !important;\n' + '  color: white !important;\n' + '}';

/* harmony default export */ var style = ({
  add: () => {
    if (!styleElem.parentNode) document.head.appendChild(styleElem);
  },
  remove: () => {
    if (styleElem.parentNode) styleElem.parentNode.removeChild(styleElem);
  }
});
// CONCATENATED MODULE: ./content/utils/getTextNodes.js
/* harmony default export */ var getTextNodes = (function (node, patts) {
  let ignore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['script', 'style', 'pre', 'code'];

  const textNodes = [];
  const ignoreNodes = new RegExp(`^(${ignore.join('|')})$`, 'i');
  const patt = new RegExp(patts.numPatt);

  const getChildTextNodes = n => {
    if (ignoreNodes.test(n.nodeName) || n.className === 'scscc') return;

    if (n.nodeType === 3 && patt.test(n.nodeValue)) {
      textNodes.push(n);
    } else if (n.nodeType !== 3) {
      n.childNodes.forEach(getChildTextNodes);
    }
  };

  getChildTextNodes(node);

  return textNodes;
});
// CONCATENATED MODULE: ./content/utils/patts.js
const patts_numPatt = '(((\\d{1,3}((,|\\.|\\s)\\d{3})+|(\\d+))((\\.|,)\\d{1,9})?)|(\\.\\d{1,9}))(,--)?';
const patts_symbPatts = {
  EUR: '(€|eur(os|o)?)',
  USD: '((us\\s?)?\\$|usd)',
  GBP: '(£|gbp)'
};

const currPatts = Object.keys(patts_symbPatts).reduce((patts, fromCurr) => {
  const beforePatt = new RegExp(`${patts_symbPatts[fromCurr]}\\s?${patts_numPatt}`, 'gi');
  const afterPatt = new RegExp(`${patts_numPatt}\\s?${patts_symbPatts[fromCurr]}`, 'gi');

  return patts.concat([{ from: fromCurr, patt: beforePatt }, { from: fromCurr, patt: afterPatt }]);
}, []);

const allSymbPatt = Object.keys(patts_symbPatts).reduce((patt, curr) => `${patt}|${patts_symbPatts[curr].replace(/^\((.*)\)$/, '$1')}`, '\\s|,--');
const cleanSymbPatt = new RegExp(allSymbPatt, 'gi');

const alphabeticChars = "A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͅͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևְ-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-ٗٙ-ٟٮ-ۓە-ۜۡ-ۭۨ-ۯۺ-ۼۿܐ-ܿݍ-ޱߊ-ߪߴߵߺࠀ-ࠗࠚ-ࠬࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࢽࣔ-ࣣࣟ-ࣰࣩ-ऻऽ-ौॎ-ॐॕ-ॣॱ-ঃঅ-ঌএঐও-নপ-রলশ-হঽ-ৄেৈোৌৎৗড়ঢ়য়-ৣৰৱৼਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਾ-ੂੇੈੋੌੑਖ਼-ੜਫ਼ੰ-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽ-ૅે-ૉોૌૐૠ-ૣૹ-ૼଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽ-ୄେୈୋୌୖୗଡ଼ଢ଼ୟ-ୣୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-ௌௐௗఀ-ఃఅ-ఌఎ-ఐఒ-నప-హఽ-ౄె-ైొ-ౌౕౖౘ-ౚౠ-ౣಀ-ಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽ-ೄೆ-ೈೊ-ೌೕೖೞೠ-ೣೱೲഀ-ഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൌൎൔ-ൗൟ-ൣൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆා-ුූෘ-ෟෲෳก-ฺเ-ๆํກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆໍໜ-ໟༀཀ-ཇཉ-ཬཱ-ཱྀྈ-ྗྙ-ྼက-ံးျ-ဿၐ-ၢၥ-ၨၮ-ႆႎႜႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፟ᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜓᜠ-ᜳᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-ឳា-ៈៗៜᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤞᤠ-ᤫᤰ-ᤸᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨛᨠ-ᩞᩡ-ᩴᪧᬀ-ᬳᬵ-ᭃᭅ-ᭋᮀ-ᮩᮬ-ᮯᮺ-ᯥᯧ-ᯱᰀ-ᰵᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳳᳵᳶᴀ-ᶿᷧ-ᷴḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⒶ-ⓩⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄮㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿪ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙴ-ꙻꙿ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠧꡀ-ꡳꢀ-ꣃꣅꣲ-ꣷꣻꣽꤊ-ꤪꤰ-ꥒꥠ-ꥼꦀ-ꦲꦴ-ꦿꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨶꩀ-ꩍꩠ-ꩶꩺꩾ-ꪾꫀꫂꫛ-ꫝꫠ-ꫯꫲ-ꫵꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯪ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";
const wordPatt = `[${alphabeticChars}]`;
const nonWordPatt = `[^${alphabeticChars}]`;
// CONCATENATED MODULE: ./content/utils/getPriceMatches.js


const getCssPseudoContent = (node, place) => {
  const style = window.getComputedStyle(node, `:${place}`);
  if (style && style.content !== 'none') {
    const contentMatch = style.content.match(/^"(.*)"$/);
    if (contentMatch && contentMatch[1]) {
      return contentMatch[1].trim();
    }
  }

  return '';
};

// check if currency symbol is in an other sibling node
const checkSiblingMatches = (textNode, toCurr, _ref) => {
  let numPatt = _ref.numPatt,
      symbPatts = _ref.symbPatts;

  const chckTxt = {};
  const matches = {};
  const txt = textNode.nodeValue;

  const match = txt.match(new RegExp(numPatt, 'g'));
  if (match.length !== 1 || match[0] !== txt.trim()) return matches;

  const prevSibling = textNode.previousSibling;
  const parentPrevSibling = textNode.parentNode.previousSibling;
  const parentPrevElemSibling = textNode.parentNode.previousElementSibling;
  // check previous sibling of
  if (prevSibling && prevSibling.lastChild && prevSibling.lastChild.nodeType === 3) {
    // this node -> check sibling's last child
    chckTxt.prev = prevSibling.lastChild.nodeValue.trim();
  } else if (parentPrevSibling) {
    // parent node
    if (parentPrevSibling.nodeType === 3) {
      // if text node
      chckTxt.prev = parentPrevSibling.nodeValue.trim();
    } else if (parentPrevSibling.lastChild && parentPrevSibling.lastChild.nodeType === 3) {
      // if not text node -> check last child
      chckTxt.prev = parentPrevSibling.lastChild.nodeValue.trim();
    }
  }
  if (!chckTxt.prev && parentPrevElemSibling && parentPrevElemSibling.lastChild && parentPrevElemSibling.lastChild.nodeType === 3) {
    chckTxt.prev = parentPrevElemSibling.lastChild.nodeValue.trim();
  }

  const nextSibling = textNode.nextSibling;

  const parentNextSibling = textNode.parentNode.nextSibling;
  const parentNextElemSibling = textNode.parentNode.nextElementSibling;
  // check next sibling of
  if (nextSibling && nextSibling.firstChild && nextSibling.firstChild.nodeType === 3) {
    // this node -> check sibling's first child
    chckTxt.next = nextSibling.firstChild.nodeValue.trim();
  } else if (parentNextSibling) {
    // parent node
    if (parentNextSibling.nodeType === 3) {
      // if text node
      chckTxt.next = parentNextSibling.nodeValue.trim();
    } else if (parentNextSibling.firstChild && parentNextSibling.firstChild.nodeType === 3) {
      // if not text node -> check first child
      chckTxt.next = parentNextSibling.firstChild.nodeValue.trim();
    }
  }
  if (!chckTxt.next && parentNextElemSibling && parentNextElemSibling.firstChild && parentNextElemSibling.firstChild.nodeType === 3) {
    chckTxt.next = parentNextElemSibling.firstChild.nodeValue.trim();
  }

  chckTxt.before = getCssPseudoContent(textNode.parentNode, 'before');
  chckTxt.after = getCssPseudoContent(textNode.parentNode, 'after');

  Object.keys(chckTxt).forEach(pos => {
    if (!chckTxt[pos]) return;

    Object.keys(symbPatts).forEach(fromCurr => {
      if (fromCurr === toCurr) return;

      let symbPattStr = symbPatts[fromCurr];
      if (pos === 'prev') symbPattStr = `${nonWordPatt}?${symbPattStr}$`;else if (pos === 'next') symbPattStr = `^${symbPattStr}${nonWordPatt}?`;else symbPattStr = `^${symbPattStr}$`;

      const symbPatt = new RegExp(symbPattStr, 'i');

      if (symbPatt.test(chckTxt[pos])) {
        matches[fromCurr] = match;
      }
    });
  });

  return matches;
};

// check if there is any pattern match in a text node and return the matches
/* harmony default export */ var getPriceMatches = ((textNodes, toCurr, patts) => {
  const priceMatches = [];
  const currPatts = patts.currPatts;


  textNodes.forEach(textNode => {
    const txt = textNode.nodeValue;
    const matches = {};

    currPatts.forEach(currPatt => {
      if (currPatt.from === toCurr) return;

      const match = txt.match(currPatt.patt);
      if (match) {
        matches[currPatt.from] = (matches[currPatt.from] || []).concat(match);
      }
    });

    if (Object.keys(matches).length) {
      priceMatches.push({
        node: textNode,
        matches
      });
    } else {
      const specMatches = checkSiblingMatches(textNode, toCurr, patts);

      if (Object.keys(specMatches).length) {
        priceMatches.push({
          node: textNode,
          matches: specMatches
        });
      }
    }
  });

  return priceMatches;
});
// CONCATENATED MODULE: ./content/utils/getDataNode.js
/* harmony default export */ var getDataNode = ((curr, origTxt, origVal, formattedVal) => {
  const dataNode = document.createElement('data');

  dataNode.className = 'scscc';
  dataNode.dataset.curr = curr;
  dataNode.title = origTxt;
  dataNode.value = origVal;
  dataNode.textContent = formattedVal;

  return dataNode;
});
// CONCATENATED MODULE: ./content/utils/priceUtils.js


const alphabeticPatt = new RegExp(wordPatt);
const alphaNumericPatt = new RegExp(wordPatt.replace(/^\[/, '[0-9'));

const checkPriceSpecCases = (txt, match) => {
  const charind = txt.indexOf(match);

  const bChar = txt.charAt(charind - 1);
  const aChar = txt.charAt(charind + match.length);

  // in case text is like: somestring1 234 $
  // if there is a word character before it
  if (/^\d/.test(match) && alphabeticPatt.test(bChar)) {
    if (/^\d+\s+\d/.test(match)) return match.replace(/^\d+\s+/, ''); // convert only 234 $
    return null;
  }

  if (alphaNumericPatt.test(bChar) || alphaNumericPatt.test(aChar)) return null;

  return match;
};

const cleanPrice = price => {
  // remove currency symbols and spaces
  let cleanedPrice = price.replace(cleanSymbPatt, '');

  // if no decimal separator
  // remove possible "." or "," thousand separators
  if (!/(\.|,)\d{1,2}$/.test(cleanedPrice)) cleanedPrice = cleanedPrice.replace(/\.|,/g, '');
  // if decimal separator is "."
  // remove possible "," thousand separators
  else if (/\.\d{1,2}$/.test(cleanedPrice)) cleanedPrice = cleanedPrice.replace(/,/g, '');
    // if decimal separptor is ","
    else {
        // remove possible "." thousand separators
        cleanedPrice = cleanedPrice.replace(/\./g, '');
        // replace dec separator to "."
        cleanedPrice = cleanedPrice.replace(/,/g, '.');
      }

  return cleanedPrice;
};

const formatPrice = (price, preferences) => {
  // set rounding
  let formattedPrice = preferences.round ? price.toFixed(0) : price.toFixed(2);

  // set decimal separator
  if (preferences.sepDec !== '.') formattedPrice = formattedPrice.replace('.', preferences.sepDec);

  // set thousand separator
  if (preferences.sepTho !== '') {
    for (let i = (preferences.round ? formattedPrice.length : formattedPrice.indexOf(preferences.sepDec)) - 3; i > 0; i -= 3) {
      formattedPrice = formattedPrice.slice(0, i) + preferences.sepTho + formattedPrice.slice(i);
    }
  }

  // add symbol
  if (preferences.symbPos === 'a') {
    formattedPrice = formattedPrice + (preferences.symbSep ? ' ' : '') + preferences.symbol;
  } else {
    formattedPrice = preferences.symbol + (preferences.symbSep ? ' ' : '') + formattedPrice;
  }

  return formattedPrice;
};
// CONCATENATED MODULE: ./content/replacePrices.js








// find and convert the prices in the text, and return them as data nodes
const getDataNodes = (node, matches) => {
  const txt = node.nodeValue;
  const dataNodes = [];

  Object.keys(matches).forEach(fromCurr => {
    const currRate = storage_currRates.get(fromCurr, storage_preferences.get('toCurr'));
    if (!currRate) return;

    matches[fromCurr].forEach(match => {
      let origTxt;
      if (txt.trim() !== match) {
        origTxt = checkPriceSpecCases(txt, match, fromCurr);
      } else {
        origTxt = match;
      }
      if (!origTxt) return;

      const origVal = cleanPrice(origTxt);
      const formattedVal = formatPrice(parseFloat(origVal) * currRate, storage_preferences.get());

      dataNodes.push(getDataNode(fromCurr, origTxt, origVal, formattedVal));
    });
  });

  return dataNodes;
};

// replace the prices in the text node with the converted data nodes
const replaceText = (_ref) => {
  let node = _ref.node,
      matches = _ref.matches;

  const dataNodes = getDataNodes(node, matches);
  if (!dataNodes.length) return;

  const parentNode = node.parentNode;


  const tmpDivElem = document.createElement('div');
  tmpDivElem.appendChild(node.cloneNode());

  dataNodes.forEach(dataNode => {
    const replTxt = dataNode.title;
    let replaced = false;

    tmpDivElem.childNodes.forEach(childNode => {
      if (replaced || childNode.nodeType !== 3) return;

      const nodeTxt = childNode.nodeValue;
      const matchInd = nodeTxt.indexOf(replTxt);

      if (matchInd === -1) return;

      let tmpTxt;
      let tmpTxtNode;
      const replDivElem = document.createElement('div');

      if (matchInd > 0) {
        tmpTxt = nodeTxt.slice(0, matchInd);
        tmpTxtNode = document.createTextNode(tmpTxt);
        replDivElem.appendChild(tmpTxtNode);
      }

      replDivElem.appendChild(dataNode);

      if (matchInd + replTxt.length < nodeTxt.length) {
        tmpTxt = nodeTxt.slice(matchInd + replTxt.length);
        tmpTxtNode = document.createTextNode(tmpTxt);
        replDivElem.appendChild(tmpTxtNode);
      }

      while (replDivElem.firstChild) {
        tmpDivElem.insertBefore(replDivElem.firstChild, childNode);
      }
      tmpDivElem.removeChild(childNode);

      replaced = true;
    });
  });

  while (tmpDivElem.firstChild) {
    parentNode.insertBefore(tmpDivElem.firstChild, node);
  }
  parentNode.removeChild(node);
};

/* harmony default export */ var replacePrices = (function () {
  let elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

  const textNodes = getTextNodes(elem, patts_namespaceObject);
  if (!textNodes.length) return;

  const priceMatches = getPriceMatches(textNodes, storage_preferences.get('toCurr'), patts_namespaceObject);
  if (!priceMatches.length) return;

  priceMatches.forEach(replaceText);
});
// CONCATENATED MODULE: ./content/refreshPrices.js




/* harmony default export */ var refreshPrices = (() => {
  const dataNodes = document.querySelectorAll('data.scscc');

  dataNodes.forEach(dataNode => {
    const fromCurr = dataNode.dataset.curr;
    const currRate = storage_currRates.get(fromCurr, storage_preferences.get('toCurr'));
    let replTxtNode;

    if (fromCurr === storage_preferences.get('toCurr') || !currRate) {
      replTxtNode = document.createTextNode(dataNode.title);
      dataNode.parentNode.replaceChild(replTxtNode, dataNode);
    } else {
      const newPrice = parseFloat(dataNode.value) * currRate;
      const replTxt = formatPrice(newPrice, storage_preferences.get());

      if (dataNode.textContent !== newPrice) {
        replTxtNode = document.createTextNode(replTxt);
        dataNode.replaceChild(replTxtNode, dataNode.firstChild);
      }
    }
  });
});
// CONCATENATED MODULE: ./content/resetPrices.js
/* harmony default export */ var resetPrices = (() => {
  const dataNodes = document.querySelectorAll('data.scscc');

  dataNodes.forEach(dataNode => {
    const replTxtNode = document.createTextNode(dataNode.title);
    dataNode.parentNode.replaceChild(replTxtNode, dataNode);
  });
});
// CONCATENATED MODULE: ./content/index.js








let started = false;
let paused = false;
const lastChanges = {};
const observer = mutationObserver(replacePrices);

const start = () => {
  if (started) return;
  started = true;

  observer.observe();

  if (storage_preferences.get('style')) style.add();

  replacePrices();
};

const stop = () => {
  if (!started) return;
  started = false;

  observer.disconnect();

  style.remove();

  resetPrices();
};

const refresh = () => {
  if (!document.hidden) refreshPrices();
};

const onPreferencesChange = newPrefs => {
  if (paused) {
    lastChanges.preferences = [newPrefs];
    return;
  }

  if (!newPrefs.enabled || !newPrefs.toCurr) {
    stop();
    return;
  }

  if (started) {
    if (newPrefs.style) style.add();else style.remove();

    refresh();
  } else start();
};
storage_preferences.onChange(onPreferencesChange);

const onCurrRatesChange = (newCurrRates, hasNew) => {
  if (!started) return;

  if (paused) {
    lastChanges.currRates = [newCurrRates, hasNew];
    return;
  }

  refresh();
  if (hasNew) replacePrices();
};
storage_currRates.onChange(onCurrRatesChange);

const pause = () => {
  if (paused) return;
  paused = true;

  if (!started) return;

  observer.disconnect();
};

const resume = () => {
  if (!paused) return;
  paused = false;

  if (lastChanges.preferences) {
    onPreferencesChange(...lastChanges.preferences);
    delete lastChanges.preferences;
  }

  if (!started) {
    delete lastChanges.currRates;
    return;
  }

  observer.observe();

  if (lastChanges.currRates) {
    onCurrRatesChange(...lastChanges.currRates);
    delete lastChanges.currRates;
  }
};

document.addEventListener('visibilitychange', () => {
  if (document.hidden) pause();else resume();
});

/***/ })
/******/ ]);