(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["NepaliCalendarReact"] = factory(require("react"), require("prop-types"));
	else
		root["NepaliCalendarReact"] = factory(root["react"], root["prop-types"]);
})(this, (__WEBPACK_EXTERNAL_MODULE__155__, __WEBPACK_EXTERNAL_MODULE__949__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 72:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 113:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 155:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__155__;

/***/ }),

/***/ 314:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 540:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 601:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 659:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 769:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `*,
*::before,
*::after {
  box-sizing: border-box;
}

.nepali-calendar-container {
  position: relative;
  font-family: "Mukta", "Noto Sans Devanagari", sans-serif;
  width: 100%;
  /* max-width: 320px; */
  color: #333;
}

.nepali-calendar-input-wrapper {
  position: relative;
  margin-bottom: 5px;
}

.nepali-calendar-input {
  width: 100%;
  padding: 10px 15px;
  padding-right: 35px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  font-family: inherit;
}

.nepali-calendar-input:focus {
  outline: none;
  border-color: var(--calendar-color, #4f46e5);
  box-shadow: 0 0 0 3px var(--calendar-color-light, rgba(79, 70, 229, 0.2));
}

.nepali-calendar-input.disabled {
  background-color: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.nepali-calendar-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
}
.nepali-calendar-icon > svg {
  width: 30px;
  height: 30px;
}

.nepali-calendar-popup {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  z-index: 50;
  width: 100%;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Calendar Header */
.nepali-calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  background-color: var(--calendar-color, #4f46e5);
  color: white;
}

.nepali-calendar-nav-button {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nepali-calendar-nav-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nepali-calendar-month-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nepali-calendar-year-select {
  padding: 5px 8px;
  border: none;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: white;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
}

.nepali-calendar-year-select option {
  color: #111;
}

.nepali-calendar-year-select:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.3);
}

.nepali-calendar-month-name {
  font-weight: 600;
  font-size: 15px;
  min-width: 70px;
  text-align: center;
}

/* Calendar Grid */
.nepali-calendar-grid {
  padding: 10px;
}

.nepali-calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
  text-align: center;
}

.nepali-calendar-weekday {
  font-size: 13px;
  font-weight: 600;
  color: var(--calendar-color, #4f46e5);
  padding: 5px 0;
}

.nepali-calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.nepali-calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.nepali-calendar-day:hover {
  background-color: #f3f4f6;
}

.nepali-calendar-day.selected {
  background-color: var(--calendar-color, #4f46e5);
  color: white;
  font-weight: 600;
}

.nepali-calendar-day.today {
  background-color: var(--calendar-color-light, #e0e7ff);
  color: var(--calendar-color, #4f46e5);
  font-weight: 600;
}

.nepali-calendar-day.disabled {
  color: #d1d5db;
  cursor: not-allowed;
  background: none;
}

.nepali-calendar-day.disabled:hover {
  background: none;
}

/* Calendar Footer */
.nepali-calendar-footer {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.nepali-calendar-today-button,
.nepali-calendar-close-button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: none;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nepali-calendar-today-button {
  color: var(--calendar-color, #4f46e5);
  font-weight: 500;
}

.nepali-calendar-today-button:hover {
  background-color: var(--calendar-color-light, #e0e7ff);
}

.nepali-calendar-today-button:disabled {
  color: #9ca3af;
  cursor: not-allowed;
  background: none;
}

.nepali-calendar-close-button {
  color: #6b7280;
}

.nepali-calendar-close-button:hover {
  background-color: #e5e7eb;
}

/* Responsive Adjustments */
@media (max-width: 400px) {
  .nepali-calendar-popup {
    width: 100%;
    min-width: 280px;
  }
}

.nepali-calendar-container {
  position: relative;
  display: inline-block;
}

.nepali-calendar-popup {
  width: 300px; /* Adjust as needed */
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-top: 5px;
}

/* For positioning above */
.nepali-calendar-popup.above {
  bottom: 100%;
  top: auto;
  margin-bottom: 5px;
  margin-top: 0;
}

.nepali-calendar-input::placeholder {
  color: var(--placeholder-color);
  opacity: 1; /* Fix for Firefox */
  transition: color 0.2s ease;
}

/* For disabled state */
.nepali-calendar-input.disabled::placeholder {
  opacity: 0.5;
}
/* Placeholder styling */
.nepali-calendar-input::placeholder {
  color: var(--placeholder-color) !important;
  opacity: 1 !important; /* Required for Firefox */
}

/* Fallback for older browsers */
.nepali-calendar-input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: var(--placeholder-color);
}
.nepali-calendar-input::-moz-placeholder {
  /* Firefox 19+ */
  color: var(--placeholder-color);
  opacity: 1;
}
.nepali-calendar-input:-ms-input-placeholder {
  /* IE 10+ */
  color: var(--placeholder-color);
}
.nepali-calendar-input:-moz-placeholder {
  /* Firefox 18- */
  color: var(--placeholder-color);
  opacity: 1;
}

.nepali-calendar-input ::placeholder {
  font-weight: bold;
  opacity: 0.5;
  color: red;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 825:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 949:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__949__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  convertADtoBS: () => (/* reexport */ convertADtoBS),
  convertBStoAD: () => (/* reexport */ convertBStoAD),
  convertBStoJS: () => (/* reexport */ convertBStoJS),
  convertJStoBS: () => (/* reexport */ convertJStoBS),
  dateConverter: () => (/* reexport */ dateConverter),
  "default": () => (/* binding */ src),
  toNepaliDateString: () => (/* reexport */ toNepaliDateString),
  toNepaliNumber: () => (/* reexport */ toNepaliNumber)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(155);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(949);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./styles/nepalicalender.css
var nepalicalender = __webpack_require__(769);
;// ./styles/nepalicalender.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(nepalicalender/* default */.A, options);




       /* harmony default export */ const styles_nepalicalender = (nepalicalender/* default */.A && nepalicalender/* default */.A.locals ? nepalicalender/* default */.A.locals : undefined);

;// ./src/data/NepaliDates.json
const NepaliDates_namespaceObject = /*#__PURE__*/JSON.parse('{"2050":{"months":[{"name":"बैशाख","days":31,"start":"1993-04-13"},{"name":"जेठ","days":32,"start":"1993-05-14"},{"name":"असार","days":31,"start":"1993-06-15"},{"name":"श्रावण","days":32,"start":"1993-07-16"},{"name":"भदौ","days":31,"start":"1993-08-17"},{"name":"असोज","days":30,"start":"1993-09-17"},{"name":"कार्तिक","days":30,"start":"1993-10-17"},{"name":"मंसिर","days":30,"start":"1993-11-16"},{"name":"पुष","days":29,"start":"1993-12-16"},{"name":"माघ","days":30,"start":"1994-01-14"},{"name":"फाल्गुन","days":29,"start":"1994-02-13"},{"name":"चैत्र","days":31,"start":"1994-03-14"}]},"2051":{"months":[{"name":"बैशाख","days":31,"start":"1994-04-14"},{"name":"जेठ","days":31,"start":"1994-05-15"},{"name":"असार","days":31,"start":"1994-06-15"},{"name":"श्रावण","days":32,"start":"1994-07-16"},{"name":"भदौ","days":31,"start":"1994-08-17"},{"name":"असोज","days":31,"start":"1994-09-17"},{"name":"कार्तिक","days":30,"start":"1994-10-18"},{"name":"मंसिर","days":29,"start":"1994-11-17"},{"name":"पुष","days":30,"start":"1994-12-16"},{"name":"माघ","days":29,"start":"1995-01-15"},{"name":"फाल्गुन","days":30,"start":"1995-02-13"},{"name":"चैत्र","days":30,"start":"1995-03-15"}]},"2052":{"months":[{"name":"बैशाख","days":31,"start":"1995-04-14"},{"name":"जेठ","days":31,"start":"1995-05-15"},{"name":"असार","days":32,"start":"1995-06-15"},{"name":"श्रावण","days":31,"start":"1995-07-17"},{"name":"भदौ","days":31,"start":"1995-08-17"},{"name":"असोज","days":31,"start":"1995-09-17"},{"name":"कार्तिक","days":30,"start":"1995-10-18"},{"name":"मंसिर","days":29,"start":"1995-11-17"},{"name":"पुष","days":30,"start":"1995-12-16"},{"name":"माघ","days":29,"start":"1996-01-15"},{"name":"फाल्गुन","days":30,"start":"1996-02-13"},{"name":"चैत्र","days":30,"start":"1996-03-14"}]},"2053":{"months":[{"name":"बैशाख","days":31,"start":"1996-04-13"},{"name":"जेठ","days":32,"start":"1996-05-14"},{"name":"असार","days":31,"start":"1996-06-15"},{"name":"श्रावण","days":32,"start":"1996-07-16"},{"name":"भदौ","days":31,"start":"1996-08-17"},{"name":"असोज","days":30,"start":"1996-09-17"},{"name":"कार्तिक","days":30,"start":"1996-10-17"},{"name":"मंसिर","days":30,"start":"1996-11-16"},{"name":"पुष","days":29,"start":"1996-12-16"},{"name":"माघ","days":29,"start":"1997-01-14"},{"name":"फाल्गुन","days":30,"start":"1997-02-12"},{"name":"चैत्र","days":30,"start":"1997-03-14"}]},"2054":{"months":[{"name":"बैशाख","days":31,"start":"1997-04-13"},{"name":"जेठ","days":32,"start":"1997-05-14"},{"name":"असार","days":31,"start":"1997-06-15"},{"name":"श्रावण","days":32,"start":"1997-07-16"},{"name":"भदौ","days":31,"start":"1997-08-17"},{"name":"असोज","days":30,"start":"1997-09-17"},{"name":"कार्तिक","days":30,"start":"1997-10-17"},{"name":"मंसिर","days":30,"start":"1997-11-16"},{"name":"पुष","days":29,"start":"1997-12-16"},{"name":"माघ","days":30,"start":"1998-01-14"},{"name":"फाल्गुन","days":29,"start":"1998-02-13"},{"name":"चैत्र","days":31,"start":"1998-03-14"}]},"2055":{"months":[{"name":"बैशाख","days":31,"start":"1998-04-14"},{"name":"जेठ","days":31,"start":"1998-05-15"},{"name":"असार","days":32,"start":"1998-06-15"},{"name":"श्रावण","days":31,"start":"1998-07-17"},{"name":"भदौ","days":31,"start":"1998-08-17"},{"name":"असोज","days":31,"start":"1998-09-17"},{"name":"कार्तिक","days":30,"start":"1998-10-18"},{"name":"मंसिर","days":29,"start":"1998-11-17"},{"name":"पुष","days":30,"start":"1998-12-16"},{"name":"माघ","days":29,"start":"1999-01-15"},{"name":"फाल्गुन","days":30,"start":"1999-02-13"},{"name":"चैत्र","days":30,"start":"1999-03-15"}]},"2056":{"months":[{"name":"बैशाख","days":31,"start":"1999-04-14"},{"name":"जेठ","days":31,"start":"1999-05-15"},{"name":"असार","days":32,"start":"1999-06-15"},{"name":"श्रावण","days":31,"start":"1999-07-17"},{"name":"भदौ","days":32,"start":"1999-08-17"},{"name":"असोज","days":30,"start":"1999-09-18"},{"name":"कार्तिक","days":30,"start":"1999-10-18"},{"name":"मंसिर","days":29,"start":"1999-11-17"},{"name":"पुष","days":30,"start":"1999-12-16"},{"name":"माघ","days":29,"start":"2000-01-15"},{"name":"फाल्गुन","days":30,"start":"2000-02-13"},{"name":"चैत्र","days":30,"start":"2000-03-14"}]},"2057":{"months":[{"name":"बैशाख","days":31,"start":"2000-04-13"},{"name":"जेठ","days":32,"start":"2000-05-14"},{"name":"असार","days":31,"start":"2000-06-15"},{"name":"श्रावण","days":32,"start":"2000-07-16"},{"name":"भदौ","days":31,"start":"2000-08-17"},{"name":"असोज","days":30,"start":"2000-09-17"},{"name":"कार्तिक","days":30,"start":"2000-10-17"},{"name":"मंसिर","days":30,"start":"2000-11-16"},{"name":"पुष","days":29,"start":"2000-12-16"},{"name":"माघ","days":29,"start":"2001-01-14"},{"name":"फाल्गुन","days":30,"start":"2001-02-12"},{"name":"चैत्र","days":31,"start":"2001-03-14"}]},"2058":{"months":[{"name":"बैशाख","days":30,"start":"2001-04-14"},{"name":"जेठ","days":32,"start":"2001-05-14"},{"name":"असार","days":31,"start":"2001-06-15"},{"name":"श्रावण","days":32,"start":"2001-07-16"},{"name":"भदौ","days":31,"start":"2001-08-17"},{"name":"असोज","days":30,"start":"2001-09-17"},{"name":"कार्तिक","days":30,"start":"2001-10-17"},{"name":"मंसिर","days":30,"start":"2001-11-16"},{"name":"पुष","days":29,"start":"2001-12-16"},{"name":"माघ","days":30,"start":"2002-01-14"},{"name":"फाल्गुन","days":29,"start":"2002-02-13"},{"name":"चैत्र","days":31,"start":"2002-03-14"}]},"2059":{"months":[{"name":"बैशाख","days":31,"start":"2002-04-14"},{"name":"जेठ","days":31,"start":"2002-05-15"},{"name":"असार","days":32,"start":"2002-06-15"},{"name":"श्रावण","days":31,"start":"2002-07-17"},{"name":"भदौ","days":31,"start":"2002-08-17"},{"name":"असोज","days":31,"start":"2002-09-17"},{"name":"कार्तिक","days":30,"start":"2002-10-18"},{"name":"मंसिर","days":29,"start":"2002-11-17"},{"name":"पुष","days":30,"start":"2002-12-16"},{"name":"माघ","days":29,"start":"2003-01-15"},{"name":"फाल्गुन","days":30,"start":"2003-02-13"},{"name":"चैत्र","days":30,"start":"2003-03-15"}]},"2060":{"months":[{"name":"बैशाख","days":31,"start":"2003-04-14"},{"name":"जेठ","days":31,"start":"2003-05-15"},{"name":"असार","days":32,"start":"2003-06-15"},{"name":"श्रावण","days":32,"start":"2003-07-17"},{"name":"भदौ","days":31,"start":"2003-08-18"},{"name":"असोज","days":30,"start":"2003-09-18"},{"name":"कार्तिक","days":30,"start":"2003-10-18"},{"name":"मंसिर","days":29,"start":"2003-11-17"},{"name":"पुष","days":30,"start":"2003-12-16"},{"name":"माघ","days":29,"start":"2004-01-15"},{"name":"फाल्गुन","days":30,"start":"2004-02-13"},{"name":"चैत्र","days":30,"start":"2004-03-14"}]},"2061":{"months":[{"name":"बैशाख","days":31,"start":"2004-04-13"},{"name":"जेठ","days":32,"start":"2004-05-14"},{"name":"असार","days":31,"start":"2004-06-15"},{"name":"श्रावण","days":32,"start":"2004-07-16"},{"name":"भदौ","days":31,"start":"2004-08-17"},{"name":"असोज","days":30,"start":"2004-09-17"},{"name":"कार्तिक","days":30,"start":"2004-10-17"},{"name":"मंसिर","days":30,"start":"2004-11-16"},{"name":"पुष","days":29,"start":"2004-12-16"},{"name":"माघ","days":29,"start":"2005-01-14"},{"name":"फाल्गुन","days":30,"start":"2005-02-12"},{"name":"चैत्र","days":31,"start":"2005-03-14"}]},"2062":{"months":[{"name":"बैशाख","days":31,"start":"2005-04-14"},{"name":"जेठ","days":31,"start":"2005-05-15"},{"name":"असार","days":31,"start":"2005-06-15"},{"name":"श्रावण","days":32,"start":"2005-07-16"},{"name":"भदौ","days":31,"start":"2005-08-17"},{"name":"असोज","days":31,"start":"2005-09-17"},{"name":"कार्तिक","days":29,"start":"2005-10-18"},{"name":"मंसिर","days":30,"start":"2005-11-16"},{"name":"पुष","days":29,"start":"2005-12-16"},{"name":"माघ","days":30,"start":"2006-01-14"},{"name":"फाल्गुन","days":29,"start":"2006-02-13"},{"name":"चैत्र","days":31,"start":"2006-03-14"}]},"2063":{"months":[{"name":"बैशाख","days":31,"start":"2006-04-14"},{"name":"जेठ","days":31,"start":"2006-05-15"},{"name":"असार","days":32,"start":"2006-06-15"},{"name":"श्रावण","days":31,"start":"2006-07-17"},{"name":"भदौ","days":31,"start":"2006-08-17"},{"name":"असोज","days":31,"start":"2006-09-17"},{"name":"कार्तिक","days":30,"start":"2006-10-18"},{"name":"मंसिर","days":29,"start":"2006-11-17"},{"name":"पुष","days":30,"start":"2006-12-16"},{"name":"माघ","days":29,"start":"2007-01-15"},{"name":"फाल्गुन","days":30,"start":"2007-02-13"},{"name":"चैत्र","days":30,"start":"2007-03-15"}]},"2064":{"months":[{"name":"बैशाख","days":31,"start":"2007-04-14"},{"name":"जेठ","days":31,"start":"2007-05-15"},{"name":"असार","days":32,"start":"2007-06-15"},{"name":"श्रावण","days":32,"start":"2007-07-17"},{"name":"भदौ","days":31,"start":"2007-08-18"},{"name":"असोज","days":30,"start":"2007-09-18"},{"name":"कार्तिक","days":30,"start":"2007-10-18"},{"name":"मंसिर","days":29,"start":"2007-11-17"},{"name":"पुष","days":30,"start":"2007-12-16"},{"name":"माघ","days":29,"start":"2008-01-15"},{"name":"फाल्गुन","days":30,"start":"2008-02-13"},{"name":"चैत्र","days":30,"start":"2008-03-14"}]},"2065":{"year":2065,"months":[{"name":"बैशाख","days":31,"start":"2008-04-13"},{"name":"जेठ","days":32,"start":"2008-05-14"},{"name":"असार","days":31,"start":"2008-06-15"},{"name":"श्रावण","days":32,"start":"2008-07-16"},{"name":"भदौ","days":31,"start":"2008-08-17"},{"name":"असोज","days":30,"start":"2008-09-17"},{"name":"कार्तिक","days":30,"start":"2008-10-17"},{"name":"मंसिर","days":30,"start":"2008-11-16"},{"name":"पुष","days":29,"start":"2008-12-16"},{"name":"माघ","days":29,"start":"2009-01-14"},{"name":"फाल्गुन","days":30,"start":"2009-02-12"},{"name":"चैत्र","days":31,"start":"2009-03-14"}]},"2066":{"months":[{"name":"बैशाख","days":31,"start":"2009-04-14"},{"name":"जेठ","days":31,"start":"2009-05-15"},{"name":"असार","days":31,"start":"2009-06-15"},{"name":"श्रावण","days":32,"start":"2009-07-16"},{"name":"भदौ","days":31,"start":"2009-08-17"},{"name":"असोज","days":31,"start":"2009-09-17"},{"name":"कार्तिक","days":29,"start":"2009-10-18"},{"name":"मंसिर","days":30,"start":"2009-11-16"},{"name":"पुष","days":30,"start":"2009-12-16"},{"name":"माघ","days":29,"start":"2010-01-15"},{"name":"फाल्गुन","days":29,"start":"2010-02-13"},{"name":"चैत्र","days":31,"start":"2010-03-14"}]},"2067":{"months":[{"name":"बैशाख","days":31,"start":"2010-04-14"},{"name":"जेठ","days":31,"start":"2010-05-15"},{"name":"असार","days":32,"start":"2010-06-15"},{"name":"श्रावण","days":31,"start":"2010-07-17"},{"name":"भदौ","days":31,"start":"2010-08-17"},{"name":"असोज","days":31,"start":"2010-09-17"},{"name":"कार्तिक","days":30,"start":"2010-10-18"},{"name":"मंसिर","days":29,"start":"2010-11-17"},{"name":"पुष","days":30,"start":"2010-12-16"},{"name":"माघ","days":29,"start":"2011-01-15"},{"name":"फाल्गुन","days":30,"start":"2011-02-13"},{"name":"चैत्र","days":30,"start":"2011-03-15"}]},"2068":{"year":2068,"months":[{"name":"बैशाख","days":31,"start":"2011-04-14"},{"name":"जेठ","days":31,"start":"2011-05-15"},{"name":"असार","days":32,"start":"2011-06-15"},{"name":"श्रावण","days":32,"start":"2011-07-17"},{"name":"भदौ","days":31,"start":"2011-08-18"},{"name":"असोज","days":30,"start":"2011-09-18"},{"name":"कार्तिक","days":30,"start":"2011-10-18"},{"name":"मंसिर","days":29,"start":"2011-11-17"},{"name":"पुष","days":30,"start":"2011-12-16"},{"name":"माघ","days":29,"start":"2012-01-15"},{"name":"फाल्गुन","days":30,"start":"2012-02-13"},{"name":"चैत्र","days":30,"start":"2012-03-14"}]},"2069":{"months":[{"name":"बैशाख","days":31,"start":"2012-04-13"},{"name":"जेठ","days":32,"start":"2012-05-14"},{"name":"असार","days":31,"start":"2012-06-15"},{"name":"श्रावण","days":32,"start":"2012-07-16"},{"name":"भदौ","days":31,"start":"2012-08-17"},{"name":"असोज","days":30,"start":"2012-09-17"},{"name":"कार्तिक","days":30,"start":"2012-10-17"},{"name":"मंसिर","days":30,"start":"2012-11-16"},{"name":"पुष","days":29,"start":"2012-12-16"},{"name":"माघ","days":29,"start":"2013-01-14"},{"name":"फाल्गुन","days":30,"start":"2013-02-12"},{"name":"चैत्र","days":31,"start":"2013-03-14"}]},"2070":{"months":[{"name":"बैशाख","days":31,"start":"2013-04-14"},{"name":"जेठ","days":31,"start":"2013-05-15"},{"name":"असार","days":31,"start":"2013-06-15"},{"name":"श्रावण","days":32,"start":"2013-07-16"},{"name":"भदौ","days":31,"start":"2013-08-17"},{"name":"असोज","days":31,"start":"2013-09-17"},{"name":"कार्तिक","days":29,"start":"2013-10-18"},{"name":"मंसिर","days":30,"start":"2013-11-16"},{"name":"पुष","days":30,"start":"2013-12-16"},{"name":"माघ","days":29,"start":"2014-01-15"},{"name":"फाल्गुन","days":30,"start":"2014-02-13"},{"name":"चैत्र","days":30,"start":"2014-03-15"}]},"2071":{"months":[{"name":"बैशाख","days":31,"start":"2014-04-14"},{"name":"जेठ","days":31,"start":"2014-05-15"},{"name":"असार","days":32,"start":"2014-06-15"},{"name":"श्रावण","days":31,"start":"2014-07-17"},{"name":"भदौ","days":31,"start":"2014-08-17"},{"name":"असोज","days":31,"start":"2014-09-17"},{"name":"कार्तिक","days":30,"start":"2014-10-18"},{"name":"मंसिर","days":29,"start":"2014-11-17"},{"name":"पुष","days":30,"start":"2014-12-16"},{"name":"माघ","days":29,"start":"2015-01-15"},{"name":"फाल्गुन","days":30,"start":"2015-02-13"},{"name":"चैत्र","days":30,"start":"2015-03-15"}]},"2072":{"months":[{"name":"बैशाख","days":31,"start":"2015-04-14"},{"name":"जेठ","days":32,"start":"2015-05-15"},{"name":"असार","days":31,"start":"2015-06-16"},{"name":"श्रावण","days":32,"start":"2015-07-17"},{"name":"भदौ","days":31,"start":"2015-08-18"},{"name":"असोज","days":30,"start":"2015-09-18"},{"name":"कार्तिक","days":30,"start":"2015-10-18"},{"name":"मंसिर","days":29,"start":"2015-11-17"},{"name":"पुष","days":30,"start":"2015-12-16"},{"name":"माघ","days":29,"start":"2016-01-15"},{"name":"फाल्गुन","days":30,"start":"2016-02-13"},{"name":"चैत्र","days":30,"start":"2016-03-14"}]},"2073":{"months":[{"name":"बैशाख","days":31,"start":"2016-04-13"},{"name":"जेठ","days":32,"start":"2016-05-14"},{"name":"असार","days":31,"start":"2016-06-15"},{"name":"श्रावण","days":32,"start":"2016-07-16"},{"name":"भदौ","days":31,"start":"2016-08-17"},{"name":"असोज","days":30,"start":"2016-09-17"},{"name":"कार्तिक","days":30,"start":"2016-10-17"},{"name":"मंसिर","days":30,"start":"2016-11-16"},{"name":"पुष","days":29,"start":"2016-12-16"},{"name":"माघ","days":29,"start":"2017-01-14"},{"name":"फाल्गुन","days":30,"start":"2017-02-12"},{"name":"चैत्र","days":31,"start":"2017-03-14"}]},"2074":{"months":[{"name":"बैशाख","days":31,"start":"2017-04-14"},{"name":"जेठ","days":31,"start":"2017-05-15"},{"name":"असार","days":31,"start":"2017-06-15"},{"name":"श्रावण","days":32,"start":"2017-07-16"},{"name":"भदौ","days":31,"start":"2017-08-17"},{"name":"असोज","days":31,"start":"2017-09-17"},{"name":"कार्तिक","days":30,"start":"2017-10-18"},{"name":"मंसिर","days":29,"start":"2017-11-17"},{"name":"पुष","days":30,"start":"2017-12-16"},{"name":"माघ","days":29,"start":"2018-01-15"},{"name":"फाल्गुन","days":30,"start":"2018-02-13"},{"name":"चैत्र","days":30,"start":"2018-03-15"}]},"2075":{"months":[{"name":"बैशाख","days":31,"start":"2018-04-14"},{"name":"जेठ","days":31,"start":"2018-05-15"},{"name":"असार","days":32,"start":"2018-06-15"},{"name":"श्रावण","days":31,"start":"2018-07-17"},{"name":"भदौ","days":31,"start":"2018-08-17"},{"name":"असोज","days":31,"start":"2018-09-17"},{"name":"कार्तिक","days":30,"start":"2018-10-18"},{"name":"मंसिर","days":29,"start":"2018-11-17"},{"name":"पुष","days":30,"start":"2018-12-16"},{"name":"माघ","days":29,"start":"2019-01-15"},{"name":"फाल्गुन","days":30,"start":"2019-02-13"},{"name":"चैत्र","days":30,"start":"2019-03-15"}]},"2076":{"months":[{"name":"बैशाख","days":31,"start":"2019-04-14"},{"name":"जेठ","days":32,"start":"2019-05-15"},{"name":"असार","days":31,"start":"2019-06-16"},{"name":"श्रावण","days":32,"start":"2019-07-17"},{"name":"भदौ","days":31,"start":"2019-08-18"},{"name":"असोज","days":30,"start":"2019-09-18"},{"name":"कार्तिक","days":30,"start":"2019-10-18"},{"name":"मंसिर","days":30,"start":"2019-11-17"},{"name":"पुष","days":29,"start":"2019-12-17"},{"name":"माघ","days":29,"start":"2020-01-15"},{"name":"फाल्गुन","days":30,"start":"2020-02-13"},{"name":"चैत्र","days":30,"start":"2020-03-14"}]},"2077":{"months":[{"name":"बैशाख","days":31,"start":"2020-04-13"},{"name":"जेठ","days":32,"start":"2020-05-14"},{"name":"असार","days":31,"start":"2020-06-15"},{"name":"श्रावण","days":32,"start":"2020-07-16"},{"name":"भदौ","days":31,"start":"2020-08-17"},{"name":"असोज","days":30,"start":"2020-09-17"},{"name":"कार्तिक","days":30,"start":"2020-10-17"},{"name":"मंसिर","days":30,"start":"2020-11-16"},{"name":"पुष","days":29,"start":"2020-12-16"},{"name":"माघ","days":30,"start":"2021-01-14"},{"name":"फाल्गुन","days":29,"start":"2021-02-13"},{"name":"चैत्र","days":31,"start":"2021-03-14"}]},"2078":{"months":[{"name":"बैशाख","days":31,"start":"2021-04-14"},{"name":"जेठ","days":31,"start":"2021-05-15"},{"name":"असार","days":31,"start":"2021-06-15"},{"name":"श्रावण","days":32,"start":"2021-07-16"},{"name":"भदौ","days":31,"start":"2021-08-17"},{"name":"असोज","days":31,"start":"2021-09-17"},{"name":"कार्तिक","days":30,"start":"2021-10-18"},{"name":"मंसिर","days":29,"start":"2021-11-17"},{"name":"पुष","days":30,"start":"2021-12-16"},{"name":"माघ","days":29,"start":"2022-01-15"},{"name":"फाल्गुन","days":30,"start":"2022-02-13"},{"name":"चैत्र","days":30,"start":"2022-03-15"}]},"2079":{"months":[{"name":"बैशाख","days":31,"start":"2022-04-14"},{"name":"जेठ","days":31,"start":"2022-05-15"},{"name":"असार","days":32,"start":"2022-06-15"},{"name":"श्रावण","days":31,"start":"2022-07-17"},{"name":"भदौ","days":31,"start":"2022-08-17"},{"name":"असोज","days":31,"start":"2022-09-17"},{"name":"कार्तिक","days":30,"start":"2022-10-18"},{"name":"मंसिर","days":29,"start":"2022-11-17"},{"name":"पुष","days":30,"start":"2022-12-16"},{"name":"माघ","days":29,"start":"2023-01-15"},{"name":"फाल्गुन","days":30,"start":"2023-02-13"},{"name":"चैत्र","days":30,"start":"2023-03-15"}]},"2080":{"months":[{"name":"बैशाख","days":31,"start":"2023-04-14"},{"name":"जेठ","days":32,"start":"2023-05-15"},{"name":"असार","days":31,"start":"2023-06-16"},{"name":"श्रावण","days":32,"start":"2023-07-17"},{"name":"भदौ","days":31,"start":"2023-08-18"},{"name":"असोज","days":30,"start":"2023-09-18"},{"name":"कार्तिक","days":30,"start":"2023-10-18"},{"name":"मंसिर","days":30,"start":"2023-11-17"},{"name":"पुष","days":29,"start":"2023-12-17"},{"name":"माघ","days":29,"start":"2024-01-15"},{"name":"फाल्गुन","days":30,"start":"2024-02-13"},{"name":"चैत्र","days":30,"start":"2024-03-14"}]},"2081":{"months":[{"name":"बैशाख","days":31,"start":"2024-04-13"},{"name":"जेठ","days":32,"start":"2024-05-14"},{"name":"असार","days":31,"start":"2024-06-15"},{"name":"श्रावण","days":32,"start":"2024-07-16"},{"name":"भदौ","days":31,"start":"2024-08-17"},{"name":"असोज","days":30,"start":"2024-09-17"},{"name":"कार्तिक","days":30,"start":"2024-10-17"},{"name":"मंसिर","days":30,"start":"2024-11-16"},{"name":"पुष","days":29,"start":"2024-12-16"},{"name":"माघ","days":30,"start":"2025-01-14"},{"name":"फाल्गुन","days":29,"start":"2025-02-13"},{"name":"चैत्र","days":31,"start":"2025-03-14"}]},"2082":{"months":[{"name":"बैशाख","days":31,"start":"2025-04-14"},{"name":"जेठ","days":31,"start":"2025-05-15"},{"name":"असार","days":32,"start":"2025-06-15"},{"name":"श्रावण","days":31,"start":"2025-07-17"},{"name":"भदौ","days":31,"start":"2025-08-17"},{"name":"असोज","days":31,"start":"2025-09-17"},{"name":"कार्तिक","days":30,"start":"2025-10-18"},{"name":"मंसिर","days":29,"start":"2025-11-17"},{"name":"पुष","days":30,"start":"2025-12-16"},{"name":"माघ","days":29,"start":"2026-01-15"},{"name":"फाल्गुन","days":30,"start":"2026-02-13"},{"name":"चैत्र","days":30,"start":"2026-03-15"}]},"2083":{"months":[{"name":"बैशाख","days":31,"start":"2026-04-14"},{"name":"जेठ","days":31,"start":"2026-05-15"},{"name":"असार","days":32,"start":"2026-06-15"},{"name":"श्रावण","days":31,"start":"2026-07-17"},{"name":"भदौ","days":31,"start":"2026-08-17"},{"name":"असोज","days":31,"start":"2026-09-17"},{"name":"कार्तिक","days":30,"start":"2026-10-18"},{"name":"मंसिर","days":29,"start":"2026-11-17"},{"name":"पुष","days":30,"start":"2026-12-16"},{"name":"माघ","days":29,"start":"2027-01-15"},{"name":"फाल्गुन","days":30,"start":"2027-02-13"},{"name":"चैत्र","days":30,"start":"2027-03-15"}]},"2084":{"months":[{"name":"बैशाख","days":31,"start":"2027-04-14"},{"name":"जेठ","days":31,"start":"2027-05-15"},{"name":"असार","days":32,"start":"2027-06-15"},{"name":"श्रावण","days":31,"start":"2027-07-17"},{"name":"भदौ","days":31,"start":"2027-08-17"},{"name":"असोज","days":30,"start":"2027-09-17"},{"name":"कार्तिक","days":30,"start":"2027-10-17"},{"name":"मंसिर","days":30,"start":"2027-11-16"},{"name":"पुष","days":29,"start":"2027-12-16"},{"name":"माघ","days":30,"start":"2028-01-14"},{"name":"फाल्गुन","days":30,"start":"2028-02-13"},{"name":"चैत्र","days":30,"start":"2028-03-14"}]},"2085":{"months":[{"name":"बैशाख","days":31,"start":"2028-04-13"},{"name":"जेठ","days":32,"start":"2028-05-14"},{"name":"असार","days":31,"start":"2028-06-15"},{"name":"श्रावण","days":32,"start":"2028-07-16"},{"name":"भदौ","days":30,"start":"2028-08-17"},{"name":"असोज","days":31,"start":"2028-09-16"},{"name":"कार्तिक","days":30,"start":"2028-10-17"},{"name":"मंसिर","days":30,"start":"2028-11-16"},{"name":"पुष","days":29,"start":"2028-12-16"},{"name":"माघ","days":30,"start":"2029-01-14"},{"name":"फाल्गुन","days":30,"start":"2029-02-13"},{"name":"चैत्र","days":30,"start":"2029-03-15"}]},"2086":{"months":[{"name":"बैशाख","days":30,"start":"2029-04-14"},{"name":"जेठ","days":32,"start":"2029-05-14"},{"name":"असार","days":31,"start":"2029-06-15"},{"name":"श्रावण","days":32,"start":"2029-07-16"},{"name":"भदौ","days":31,"start":"2029-08-17"},{"name":"असोज","days":30,"start":"2029-09-17"},{"name":"कार्तिक","days":30,"start":"2029-10-17"},{"name":"मंसिर","days":30,"start":"2029-11-16"},{"name":"पुष","days":29,"start":"2029-12-16"},{"name":"माघ","days":30,"start":"2030-01-14"},{"name":"फाल्गुन","days":30,"start":"2030-02-13"},{"name":"चैत्र","days":30,"start":"2030-03-15"}]},"2087":{"months":[{"name":"बैशाख","days":31,"start":"2030-04-14"},{"name":"जेठ","days":31,"start":"2030-05-15"},{"name":"असार","days":32,"start":"2030-06-15"},{"name":"श्रावण","days":31,"start":"2030-07-17"},{"name":"भदौ","days":31,"start":"2030-08-17"},{"name":"असोज","days":31,"start":"2030-09-17"},{"name":"कार्तिक","days":30,"start":"2030-10-18"},{"name":"मंसिर","days":30,"start":"2030-11-17"},{"name":"पुष","days":30,"start":"2030-12-17"},{"name":"माघ","days":30,"start":"2031-01-16"},{"name":"फाल्गुन","days":30,"start":"2031-02-15"},{"name":"चैत्र","days":30,"start":"2031-03-17"}]},"2088":{"months":[{"name":"बैशाख","days":30,"start":"2031-04-16"},{"name":"जेठ","days":31,"start":"2031-05-16"},{"name":"असार","days":32,"start":"2031-06-16"},{"name":"श्रावण","days":32,"start":"2031-07-18"},{"name":"भदौ","days":30,"start":"2031-08-19"},{"name":"असोज","days":31,"start":"2031-09-18"},{"name":"कार्तिक","days":30,"start":"2031-10-19"},{"name":"मंसिर","days":30,"start":"2031-11-18"},{"name":"पुष","days":29,"start":"2031-12-18"},{"name":"माघ","days":30,"start":"2032-01-16"},{"name":"फाल्गुन","days":30,"start":"2032-02-15"},{"name":"चैत्र","days":30,"start":"2032-03-16"}]},"2089":{"months":[{"name":"बैशाख","days":30,"start":"2032-04-15"},{"name":"जेठ","days":32,"start":"2032-05-15"},{"name":"असार","days":31,"start":"2032-06-16"},{"name":"श्रावण","days":32,"start":"2032-07-17"},{"name":"भदौ","days":31,"start":"2032-08-18"},{"name":"असोज","days":30,"start":"2032-09-18"},{"name":"कार्तिक","days":30,"start":"2032-10-18"},{"name":"मंसिर","days":30,"start":"2032-11-17"},{"name":"पुष","days":29,"start":"2032-12-17"},{"name":"माघ","days":30,"start":"2033-01-15"},{"name":"फाल्गुन","days":30,"start":"2033-02-14"},{"name":"चैत्र","days":30,"start":"2033-03-16"}]}}');
;// ./src/utils/numberUtils.js
var toNepaliNumber = function toNepaliNumber(num) {
  var nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return num.toString().split("").map(function (digit) {
    return nepaliDigits[digit] || digit;
  }).join("");
};
var toNepaliDateString = function toNepaliDateString(dateString) {
  var nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return dateString.replace(/\d/g, function (match) {
    return nepaliDigits[match] || match;
  });
};
var toLocalizedNumber = function toLocalizedNumber(number) {
  var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "nepali";
  if (language === "english") {
    return number.toString();
  }
  return toNepaliNumber(number);
};
var translations = {
  nepali: {
    weekDays: ["आइत", "सोम", "मङ्गल", "बुध", "बिही", "शुक्र", "शनि"],
    placeholder: "मिति छान्नुहोस्",
    today: "आज",
    close: "बन्द गर्नुहोस्",
    ariaLabels: {
      selectDate: "नेपाली मिति छान्नुहोस्",
      calendar: "नेपाली क्यालेन्डर",
      prevMonth: "अघिल्लो महिना",
      nextMonth: "अर्को महिना",
      selectYear: "वर्ष चयन गर्नुहोस्"
    },
    monthNames: ["बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज", "कात्तिक", "मंसिर", "पुष", "माघ", "फाल्गुन", "चैत्र"]
  },
  english: {
    weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    placeholder: "Select date",
    today: "Today",
    close: "Close",
    ariaLabels: {
      selectDate: "Select Nepali date",
      calendar: "Nepali Calendar",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      selectYear: "Select year"
    },
    monthNames: ["Baisakh", "Jestha", "Ashad", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"]
  }
};
;// ./src/utils/dateUtils.js
var _NepaliDate;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var NepaliDate = /*#__PURE__*/function () {
  function NepaliDate(year, month, day) {
    _classCallCheck(this, NepaliDate);
    this.year = year;
    this.month = month;
    this.day = day;
    this.validateDate();
  }
  return _createClass(NepaliDate, [{
    key: "validateDate",
    value: function validateDate() {
      var yearData = NepaliDates_namespaceObject[this.year.toString()];
      if (!yearData) {
        throw new Error("No calendar data for year ".concat(this.year));
      }
      if (this.month < 0 || this.month >= yearData.months.length) {
        throw new Error("Invalid month ".concat(this.month, ". Must be between 0-").concat(yearData.months.length - 1));
      }
      var daysInMonth = yearData.months[this.month].days;
      if (this.day < 1 || this.day > daysInMonth) {
        throw new Error("Invalid day ".concat(this.day, " for month ").concat(this.month));
      }
    }
  }, {
    key: "getYear",
    value: function getYear() {
      return this.year;
    }
  }, {
    key: "getMonth",
    value: function getMonth() {
      return this.month;
    }
  }, {
    key: "getDate",
    value: function getDate() {
      return this.day;
    }
  }, {
    key: "getDay",
    value: function getDay() {
      var gregorianStart = NepaliDates_namespaceObject[this.year.toString()].months[this.month].start;
      var startDate = new Date(gregorianStart);
      var currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + this.day - 1);
      return currentDate.getDay();
    }
  }, {
    key: "format",
    value: function format(formatStr) {
      if (formatStr === "YYYY-MM-DD") {
        return "".concat(this.year, "-").concat(String(this.month + 1).padStart(2, "0"), "-").concat(String(this.day).padStart(2, "0"));
      }
      return "".concat(toNepaliNumber(this.day), " ").concat(NepaliDates_namespaceObject[this.year.toString()].months[this.month].name, " ").concat(toNepaliNumber(this.year));
    }
  }, {
    key: "getTime",
    value: function getTime() {
      var gregorianStart = NepaliDates_namespaceObject[this.year.toString()].months[this.month].start;
      var startDate = new Date(gregorianStart);
      var currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + this.day - 1);
      return currentDate.getTime();
    }
  }, {
    key: "toGregorian",
    value: function toGregorian() {
      var yearData = NepaliDates_namespaceObject[this.year.toString()];
      if (!yearData) throw new Error("No calendar data for year ".concat(this.year));
      var monthData = yearData.months[this.month];
      if (!monthData) throw new Error("No data for month ".concat(this.month));

      // Parse the start date in UTC to avoid timezone issues
      var _monthData$start$spli = monthData.start.split("-").map(Number),
        _monthData$start$spli2 = _slicedToArray(_monthData$start$spli, 3),
        y = _monthData$start$spli2[0],
        m = _monthData$start$spli2[1],
        d = _monthData$start$spli2[2];
      var startDate = new Date(Date.UTC(y, m - 1, d));

      // Add the Nepali day offset (subtract 1 because days are 1-based)
      var result = new Date(startDate);
      result.setUTCDate(result.getUTCDate() + this.day - 1);
      return result;
    }
  }, {
    key: "toADString",
    value: function toADString() {
      var gregorianDate = this.toGregorian();
      return "".concat(gregorianDate.getFullYear(), "-").concat(String(gregorianDate.getMonth() + 1).padStart(2, "0"), "-").concat(String(gregorianDate.getDate()).padStart(2, "0"));
    }
  }, {
    key: "toJSDate",
    value: function toJSDate() {
      return this.toGregorian();
    }
  }], [{
    key: "fromGregorian",
    value: function fromGregorian(input) {
      var dateToFind = input instanceof Date ? input : new Date(input);
      dateToFind.setHours(12, 0, 0, 0);
      var timeToFind = dateToFind.getTime();
      for (var _i = 0, _Object$entries = Object.entries(NepaliDates_namespaceObject); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          year = _Object$entries$_i[0],
          yearData = _Object$entries$_i[1];
        for (var month = 0; month < yearData.months.length; month++) {
          var monthData = yearData.months[month];
          var monthStart = new Date(monthData.start + "T12:00:00").getTime();
          var dayInMillis = 24 * 60 * 60 * 1000;
          var monthEnd = monthStart + monthData.days * dayInMillis;
          if (timeToFind >= monthStart && timeToFind < monthEnd) {
            var day = Math.floor((timeToFind - monthStart) / dayInMillis) + 1;
            return new NepaliDate(parseInt(year), month, day);
          }
        }
      }
      throw new Error("Date not found in calendar data");
    }
  }, {
    key: "fromADString",
    value: function fromADString(adDateString) {
      var _adDateString$split$m = adDateString.split("-").map(Number),
        _adDateString$split$m2 = _slicedToArray(_adDateString$split$m, 3),
        year = _adDateString$split$m2[0],
        month = _adDateString$split$m2[1],
        day = _adDateString$split$m2[2];
      var jsDate = new Date(year, month - 1, day);
      return NepaliDate.fromGregorian(jsDate);
    }
  }]);
}();
_NepaliDate = NepaliDate;
_defineProperty(NepaliDate, "convert", {
  /**
   * Convert AD date string (YYYY-MM-DD) to BS date string (YYYY-MM-DD)
   */
  ADtoBS: function ADtoBS(adDateString) {
    var nepaliDate = _NepaliDate.fromADString(adDateString);
    return nepaliDate.format("YYYY-MM-DD");
  },
  /**
   * Convert BS date string (YYYY-MM-DD) to AD date string (YYYY-MM-DD)
   */
  BStoAD: function BStoAD(bsDateString) {
    var _bsDateString$split$m = bsDateString.split("-").map(Number),
      _bsDateString$split$m2 = _slicedToArray(_bsDateString$split$m, 3),
      year = _bsDateString$split$m2[0],
      month = _bsDateString$split$m2[1],
      day = _bsDateString$split$m2[2];
    var nepaliDate = new _NepaliDate(year, month - 1, day);
    return nepaliDate.toADString();
  },
  /**
   * Convert JavaScript Date object to BS date string (YYYY-MM-DD)
   */
  JStoBS: function JStoBS(jsDate) {
    var nepaliDate = _NepaliDate.fromGregorian(jsDate);
    return nepaliDate.format("YYYY-MM-DD");
  },
  /**
   * Convert BS date string (YYYY-MM-DD) to JavaScript Date object
   */
  BStoJS: function BStoJS(bsDateString) {
    var _bsDateString$split$m3 = bsDateString.split("-").map(Number),
      _bsDateString$split$m4 = _slicedToArray(_bsDateString$split$m3, 3),
      year = _bsDateString$split$m4[0],
      month = _bsDateString$split$m4[1],
      day = _bsDateString$split$m4[2];
    var nepaliDate = new _NepaliDate(year, month - 1, day);
    return nepaliDate.toJSDate();
  }
});
var convertADtoBS = function convertADtoBS(adDateString) {
  return NepaliDate.convert.ADtoBS(adDateString);
};
var convertBStoAD = function convertBStoAD(bsDateString) {
  return NepaliDate.convert.BStoAD(bsDateString);
};
var convertJStoBS = function convertJStoBS(jsDate) {
  return NepaliDate.convert.JStoBS(jsDate);
};
var convertBStoJS = function convertBStoJS(bsDateString) {
  return NepaliDate.convert.BStoJS(bsDateString);
};

// Unified converter object
var dateConverter = {
  ADtoBS: NepaliDate.convert.ADtoBS,
  BStoAD: NepaliDate.convert.BStoAD,
  JStoBS: NepaliDate.convert.JStoBS,
  BStoJS: NepaliDate.convert.BStoJS,
  fromGregorian: NepaliDate.fromGregorian,
  fromADString: NepaliDate.fromADString
};
;// ./src/components/NepaliCalendar.jsx
function NepaliCalendar_typeof(o) { "@babel/helpers - typeof"; return NepaliCalendar_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, NepaliCalendar_typeof(o); }
function NepaliCalendar_defineProperty(e, r, t) { return (r = NepaliCalendar_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function NepaliCalendar_toPropertyKey(t) { var i = NepaliCalendar_toPrimitive(t, "string"); return "symbol" == NepaliCalendar_typeof(i) ? i : i + ""; }
function NepaliCalendar_toPrimitive(t, r) { if ("object" != NepaliCalendar_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != NepaliCalendar_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || NepaliCalendar_unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return NepaliCalendar_arrayLikeToArray(r); }
function NepaliCalendar_slicedToArray(r, e) { return NepaliCalendar_arrayWithHoles(r) || NepaliCalendar_iterableToArrayLimit(r, e) || NepaliCalendar_unsupportedIterableToArray(r, e) || NepaliCalendar_nonIterableRest(); }
function NepaliCalendar_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function NepaliCalendar_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return NepaliCalendar_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? NepaliCalendar_arrayLikeToArray(r, a) : void 0; } }
function NepaliCalendar_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function NepaliCalendar_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function NepaliCalendar_arrayWithHoles(r) { if (Array.isArray(r)) return r; }






var NepaliCalendar = function NepaliCalendar(_ref) {
  var onChange = _ref.onChange,
    value = _ref.value,
    minDate = _ref.minDate,
    maxDate = _ref.maxDate,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "मिति छान्नुहोस्" : _ref$placeholder,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "medium" : _ref$size,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? "#4f46e5" : _ref$color,
    _ref$language = _ref.language,
    language = _ref$language === void 0 ? "nepali" : _ref$language,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "default" : _ref$variant;
  var today = (0,external_react_.useMemo)(function () {
    return NepaliDate.fromGregorian(new Date());
  }, []);
  var _translations$languag = translations[language],
    weekDays = _translations$languag.weekDays,
    translatedPlaceholder = _translations$languag.placeholder,
    todayText = _translations$languag.today,
    closeText = _translations$languag.close,
    ariaLabels = _translations$languag.ariaLabels,
    monthNames = _translations$languag.monthNames;
  var initialDate = (0,external_react_.useMemo)(function () {
    if (value) {
      try {
        var _value$split$map = value.split("-").map(Number),
          _value$split$map2 = NepaliCalendar_slicedToArray(_value$split$map, 3),
          year = _value$split$map2[0],
          month = _value$split$map2[1],
          day = _value$split$map2[2];
        return new NepaliDate(year, month - 1, day);
      } catch (e) {
        console.error("Invalid initial date:", value, e);
        return today;
      }
    }
    return today;
  }, [value, today]);
  (0,external_react_.useEffect)(function () {
    if (!value && onChange) {
      var initialBsDate = today.format("YYYY-MM-DD");
      var initialAdDate = today.toGregorian().toISOString().split("T")[0];
      onChange({
        bs: initialBsDate,
        ad: initialAdDate,
        bsDate: today,
        adDate: today.toGregorian()
      });
    }
  }, [today, value]);
  var _useState = (0,external_react_.useState)(initialDate),
    _useState2 = NepaliCalendar_slicedToArray(_useState, 2),
    selectedDate = _useState2[0],
    setSelectedDate = _useState2[1];
  var _useState3 = (0,external_react_.useState)(new NepaliDate(initialDate.getYear(), initialDate.getMonth(), 1)),
    _useState4 = NepaliCalendar_slicedToArray(_useState3, 2),
    visibleMonth = _useState4[0],
    setVisibleMonth = _useState4[1];
  var _useState5 = (0,external_react_.useState)(false),
    _useState6 = NepaliCalendar_slicedToArray(_useState5, 2),
    isCalendarOpen = _useState6[0],
    setIsCalendarOpen = _useState6[1];
  var _useState7 = (0,external_react_.useState)("below"),
    _useState8 = NepaliCalendar_slicedToArray(_useState7, 2),
    popupPosition = _useState8[0],
    setPopupPosition = _useState8[1];
  var inputRef = (0,external_react_.useRef)(null);
  var calendarRef = (0,external_react_.useRef)(null);
  var availableYears = (0,external_react_.useMemo)(function () {
    return Object.keys(NepaliDates_namespaceObject).map(Number).sort(function (a, b) {
      return a - b;
    });
  }, []);
  var currentMonthData = (0,external_react_.useMemo)(function () {
    var _calendarData$visible;
    return (_calendarData$visible = NepaliDates_namespaceObject[visibleMonth.getYear().toString()]) === null || _calendarData$visible === void 0 ? void 0 : _calendarData$visible.months[visibleMonth.getMonth()];
  }, [visibleMonth]);
  var calendarDays = (0,external_react_.useMemo)(function () {
    var days = [];
    if (!currentMonthData) return days;
    for (var day = 1; day <= currentMonthData.days; day++) {
      days.push(new NepaliDate(visibleMonth.getYear(), visibleMonth.getMonth(), day));
    }
    return days;
  }, [currentMonthData, visibleMonth]);
  var calendarGrid = (0,external_react_.useMemo)(function () {
    if (!calendarDays.length) return [];
    var firstDay = calendarDays[0].getDay();
    var blanks = Array(firstDay).fill(null);
    return [].concat(_toConsumableArray(blanks), _toConsumableArray(calendarDays));
  }, [calendarDays]);
  var isDateDisabled = (0,external_react_.useMemo)(function () {
    var minDateObj = null;
    var maxDateObj = null;
    if (minDate) {
      try {
        var _minDate$split$map = minDate.split("-").map(Number),
          _minDate$split$map2 = NepaliCalendar_slicedToArray(_minDate$split$map, 3),
          minYear = _minDate$split$map2[0],
          minMonth = _minDate$split$map2[1],
          minDay = _minDate$split$map2[2];
        minDateObj = new NepaliDate(minYear, minMonth - 1, minDay);
      } catch (e) {
        console.error("Invalid minDate:", minDate, e);
      }
    }
    if (maxDate) {
      try {
        var _maxDate$split$map = maxDate.split("-").map(Number),
          _maxDate$split$map2 = NepaliCalendar_slicedToArray(_maxDate$split$map, 3),
          maxYear = _maxDate$split$map2[0],
          maxMonth = _maxDate$split$map2[1],
          maxDay = _maxDate$split$map2[2];
        maxDateObj = new NepaliDate(maxYear, maxMonth - 1, maxDay);
      } catch (e) {
        console.error("Invalid maxDate:", maxDate, e);
      }
    }
    return function (date) {
      if (!date) return true;
      if (minDateObj && date.getTime() < minDateObj.getTime()) return true;
      if (maxDateObj && date.getTime() > maxDateObj.getTime()) return true;
      return false;
    };
  }, [minDate, maxDate]);
  var handleDateClick = function handleDateClick(date) {
    if (!date || isDateDisabled(date)) return;
    var gregorianDate = date.toGregorian();
    setSelectedDate(date);
    setIsCalendarOpen(false);
    // onChange?.(date.format("YYYY-MM-DD"));
    if (onChange) {
      onChange({
        bs: date.format("YYYY-MM-DD"),
        ad: gregorianDate.toISOString().split("T")[0],
        bsDate: date,
        adDate: gregorianDate
      });
    }
  };
  var handlePrevMonth = function handlePrevMonth(e) {
    e.preventDefault();
    var currentYear = visibleMonth.getYear();
    var currentMonth = visibleMonth.getMonth();
    if (currentMonth > 0) {
      setVisibleMonth(new NepaliDate(currentYear, currentMonth - 1, 1));
    } else {
      var prevYear = availableYears.find(function (y) {
        return y < currentYear;
      });
      if (prevYear !== undefined) {
        var monthsInPrevYear = NepaliDates_namespaceObject[prevYear.toString()].months.length;
        setVisibleMonth(new NepaliDate(prevYear, monthsInPrevYear - 1, 1));
      }
    }
  };
  var handleNextMonth = function handleNextMonth(e) {
    e.preventDefault();
    var currentYear = visibleMonth.getYear();
    var currentMonth = visibleMonth.getMonth();
    var monthsInCurrentYear = NepaliDates_namespaceObject[currentYear.toString()].months.length;
    if (currentMonth < monthsInCurrentYear - 1) {
      setVisibleMonth(new NepaliDate(currentYear, currentMonth + 1, 1));
    } else {
      var nextYear = availableYears.find(function (y) {
        return y > currentYear;
      });
      if (nextYear !== undefined) {
        setVisibleMonth(new NepaliDate(nextYear, 0, 1));
      }
    }
  };
  var handleYearChange = function handleYearChange(e) {
    var newYear = parseInt(e.target.value, 10);
    var currentMonth = Math.min(visibleMonth.getMonth(), NepaliDates_namespaceObject[newYear.toString()].months.length - 1);
    setVisibleMonth(new NepaliDate(newYear, currentMonth, 1));
  };
  (0,external_react_.useEffect)(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return function () {
        return document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isCalendarOpen]);
  (0,external_react_.useEffect)(function () {
    if (isCalendarOpen && inputRef.current) {
      var inputRect = inputRef.current.getBoundingClientRect();
      var spaceBelow = window.innerHeight - inputRect.bottom;
      setPopupPosition(spaceBelow < 350 ? "above" : "below");
    }
  }, [isCalendarOpen]);
  (0,external_react_.useEffect)(function () {
    if (value) {
      try {
        var _value$split$map3 = value.split("-").map(Number),
          _value$split$map4 = NepaliCalendar_slicedToArray(_value$split$map3, 3),
          year = _value$split$map4[0],
          month = _value$split$map4[1],
          day = _value$split$map4[2];
        var newDate = new NepaliDate(year, month - 1, day);
        setSelectedDate(newDate);
        setVisibleMonth(new NepaliDate(year, month - 1, 1));
      } catch (error) {
        console.error("Invalid date value provided:", value, error);
      }
    }
  }, [value]);
  return /*#__PURE__*/external_react_default().createElement("div", {
    className: "nepali-calendar-container ".concat(size, " ").concat(variant),
    style: color ? {
      "--calendar-color": color,
      "--calendar-color-light": "".concat(color, "20"),
      "--calendar-color-dark": "".concat(color, "30")
    } : {}
  }, /*#__PURE__*/external_react_default().createElement("div", {
    className: "nepali-calendar-input-wrapper"
  }, /*#__PURE__*/external_react_default().createElement("input", {
    ref: inputRef,
    value: selectedDate ? language === "english" ? selectedDate.format("YYYY-MM-DD") : toNepaliDateString(selectedDate.format("YYYY-MM-DD")) : "",
    id: "nepali-date",
    name: "nepaliDate",
    onFocus: function onFocus() {
      return !disabled && setIsCalendarOpen(true);
    },
    placeholder: placeholder || translatedPlaceholder,
    style: {
      "--placeholder-color": color ? "".concat(color, "80") : "#4f46e580"
    },
    readOnly: true,
    disabled: disabled,
    className: "nepali-calendar-input ".concat(disabled ? "disabled" : ""),
    "aria-label": ariaLabels.selectDate,
    "aria-haspopup": "dialog",
    "aria-expanded": isCalendarOpen
  }), /*#__PURE__*/external_react_default().createElement("div", {
    className: "nepali-calendar-icon"
  }, /*#__PURE__*/external_react_default().createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/external_react_default().createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/external_react_default().createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/external_react_default().createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/external_react_default().createElement("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  }), /*#__PURE__*/external_react_default().createElement("line", {
    x1: "7",
    y1: "14",
    x2: "7",
    y2: "18"
  }), /*#__PURE__*/external_react_default().createElement("line", {
    x1: "12",
    y1: "14",
    x2: "12",
    y2: "18"
  }), /*#__PURE__*/external_react_default().createElement("line", {
    x1: "17",
    y1: "14",
    x2: "17",
    y2: "18"
  })))), isCalendarOpen && /*#__PURE__*/external_react_default().createElement("div", {
    className: "nepali-calendar-popup ".concat(popupPosition),
    ref: calendarRef,
    style: NepaliCalendar_defineProperty(NepaliCalendar_defineProperty({
      position: "absolute"
    }, popupPosition === "above" ? "bottom" : "top", "100%"), "zIndex", 1000),
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "\u0928\u0947\u092A\u093E\u0932\u0940 \u0915\u094D\u092F\u093E\u0932\u0947\u0928\u094D\u0921\u0930"
  }, /*#__PURE__*/external_react_default().createElement("div", {
    className: "nepali-calendar-header"
  }, /*#__PURE__*/external_react_default().createElement("button", {
    type: "button",
    onClick: handlePrevMonth,
    className: "nepali-calendar-nav-button",
    "aria-label": "\u0905\u0918\u093F\u0932\u094D\u0932\u094B \u092E\u0939\u093F\u0928\u093E",
    disabled: visibleMonth.getMonth() === 0 && !availableYears.includes(visibleMonth.getYear() - 1)
  }, "\u2039"), /*#__PURE__*/external_react_default().createElement("div", {
    className: "nepali-calendar-month-selector"
  }, /*#__PURE__*/external_react_default().createElement("select", {
    value: visibleMonth.getYear(),
    onChange: handleYearChange,
    className: "nepali-calendar-year-select",
    "aria-label": "\u0935\u0930\u094D\u0937 \u091A\u092F\u0928 \u0917\u0930\u094D\u0928\u0941\u0939\u094B\u0938\u094D"
  }, availableYears.map(function (year) {
    return /*#__PURE__*/external_react_default().createElement("option", {
      key: year,
      value: year
    }, toLocalizedNumber(year, language));
  })), /*#__PURE__*/external_react_default().createElement("span", {
    className: "nepali-calendar-month-name"
  }, monthNames[visibleMonth.getMonth()])), /*#__PURE__*/external_react_default().createElement("button", {
    type: "button",
    onClick: handleNextMonth,
    className: "nepali-calendar-nav-button",
    "aria-label": "\u0905\u0930\u094D\u0915\u094B \u092E\u0939\u093F\u0928\u093E",
    disabled: visibleMonth.getMonth() === NepaliDates_namespaceObject[visibleMonth.getYear().toString()].months.length - 1 && !availableYears.includes(visibleMonth.getYear() + 1)
  }, "\u203A")), /*#__PURE__*/external_react_default().createElement("div", {
    className: "nepali-calendar-grid"
  }, /*#__PURE__*/external_react_default().createElement("div", {
    className: "nepali-calendar-weekdays"
  }, weekDays.map(function (day) {
    return /*#__PURE__*/external_react_default().createElement("div", {
      key: day,
      className: "nepali-calendar-weekday"
    }, day);
  })), /*#__PURE__*/external_react_default().createElement("div", {
    className: "nepali-calendar-days"
  }, calendarGrid.map(function (date, i) {
    var isToday = (date === null || date === void 0 ? void 0 : date.format("YYYY-MM-DD")) === today.format("YYYY-MM-DD");
    var isSelected = (date === null || date === void 0 ? void 0 : date.format("YYYY-MM-DD")) === (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.format("YYYY-MM-DD"));
    var isDisabled = isDateDisabled(date);
    return /*#__PURE__*/external_react_default().createElement("button", {
      key: i,
      type: "button",
      className: "nepali-calendar-day ".concat(isSelected ? "selected" : "", " ").concat(isToday && !isSelected ? "today" : "", " ").concat(isDisabled ? "disabled" : ""),
      onClick: function onClick() {
        return handleDateClick(date);
      },
      disabled: isDisabled,
      "aria-label": date ? "".concat(date.format("YYYY-MM-DD")).concat(isToday ? ", आज" : "") : "खाली दिन",
      "aria-current": isToday ? "date" : undefined,
      "aria-selected": isSelected
    }, date ? toLocalizedNumber(date.getDate(), language) : "");
  }))), /*#__PURE__*/external_react_default().createElement("div", {
    className: "nepali-calendar-footer"
  }, /*#__PURE__*/external_react_default().createElement("button", {
    type: "button",
    className: "nepali-calendar-today-button",
    onClick: function onClick() {
      return handleDateClick(today);
    },
    disabled: isDateDisabled(today)
  }, todayText), /*#__PURE__*/external_react_default().createElement("button", {
    type: "button",
    className: "nepali-calendar-close-button",
    onClick: function onClick() {
      return setIsCalendarOpen(false);
    }
  }, closeText))));
};
NepaliCalendar.propTypes = {
  onChange: (external_prop_types_default()).func,
  value: (external_prop_types_default()).string,
  minDate: (external_prop_types_default()).string,
  maxDate: (external_prop_types_default()).string,
  placeholder: (external_prop_types_default()).string,
  disabled: (external_prop_types_default()).bool,
  color: (external_prop_types_default()).string,
  size: external_prop_types_default().oneOf(["small", "medium", "large"]),
  variant: external_prop_types_default().oneOf(["default", "outlined", "filled"]),
  language: external_prop_types_default().oneOf(["nepali", "english"])
};
/* harmony default export */ const components_NepaliCalendar = (NepaliCalendar);
;// ./src/index.js



/* harmony default export */ const src = (components_NepaliCalendar);

/******/ 	return __webpack_exports__;
/******/ })()
;
});