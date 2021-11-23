/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

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
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
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
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n::-webkit-scrollbar {\n  width: 0;\n  background: transparent;\n}\n\nbody {\n  background-image: #D4D7D9;\n  background-size: 1880px;\n  width: 100%;\n  height: 100%;\n  background-repeat: no-repeat;\n  resize: both;\n  font-family: \"Prata\", serif;\n  margin: 0;\n}\n\nheader {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background-color: #454647;\n  height: 20vh;\n}\n\nh1 {\n  color: #F7F2F7;\n  margin-left: 7vw;\n  font-size: xx-large;\n}\n\nnav {\n  color: #F7F2F7;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n}\nnav a:link {\n  text-decoration: none;\n}\nnav ul {\n  list-style-type: none;\n}\nnav ul button {\n  color: #D4D7D9;\n  margin-right: 7vw;\n  width: 100px;\n  height: 5vh;\n  border-radius: 20px;\n  background-color: #827B72;\n  border: 0;\n  box-shadow: rgba(72, 64, 64, 0.825) -2px 2px 2px 0px;\n}\n\n.main-container__new-booking {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n}\n\n.main-container__new-booking__form,\n.main-container__new-booking__bookings,\n.main-container__log-in__box,\n.main-container__room-render__room {\n  width: 30vw;\n  height: 60vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  background-color: #DBD2C5;\n  margin-top: 10vh;\n  border-radius: 7px;\n  box-shadow: rgba(20, 8, 8, 0.825) -2px 2px 2px 0px;\n  max-width: 500px;\n  min-width: 300px;\n  max-height: 500px;\n}\n.main-container__new-booking__form h3,\n.main-container__new-booking__bookings h3,\n.main-container__log-in__box h3,\n.main-container__room-render__room h3 {\n  padding-left: 1vw;\n}\n.main-container__new-booking__form p,\n.main-container__new-booking__bookings p,\n.main-container__log-in__box p,\n.main-container__room-render__room p {\n  margin: 1vw;\n  color: #454647;\n  font-size: 15px;\n  text-align: center;\n}\n.main-container__new-booking__form button,\n.main-container__new-booking__bookings button,\n.main-container__log-in__box button,\n.main-container__room-render__room button {\n  width: 150px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #D4D7D9;\n  color: #827B72;\n  border: none;\n  box-shadow: #827B72 5px 5px 5px 4px;\n}\n.main-container__new-booking__form input,\n.main-container__new-booking__bookings input,\n.main-container__log-in__box input,\n.main-container__room-render__room input {\n  margin: 5px;\n  height: 25px;\n  border-radius: 5px;\n  text-align: center;\n  border: none;\n  box-shadow: rgba(72, 64, 64, 0.825) -2px 2px 2px 0px;\n}\n.main-container__new-booking__form input[type=submit],\n.main-container__new-booking__bookings input[type=submit],\n.main-container__log-in__box input[type=submit],\n.main-container__room-render__room input[type=submit] {\n  width: 150px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #D4D7D9;\n  color: #827B72;\n  border: none;\n  box-shadow: rgba(72, 64, 64, 0.825) -2px 2px 2px 0px;\n}\n\n.booking-list {\n  max-height: 38vh;\n  --contentHeight: 35vh;\n  overflow: scroll;\n}\n.booking-list p {\n  width: 200px;\n  height: 3vh;\n  background-color: #F7F2F7;\n  font-size: 15px;\n  text-align: center;\n  box-shadow: rgba(72, 64, 64, 0.825) -2px 2px 2px 0px;\n}\n\n.checkin-input,\n.checkout-input {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  align-items: center;\n  padding-bottom: 3vh;\n}\n.checkin-input div,\n.checkout-input div {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  align-content: space-around;\n}\n.checkin-input div label,\n.checkout-input div label {\n  padding: 1vh;\n}\n\n.submit {\n  margin-left: 1vw;\n}\n\n.main-container__rooms__tags {\n  margin-top: 2vh;\n  height: 8vh;\n  width: 95vw;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n.main-container__rooms__tags form {\n  display: flex;\n  justify-content: center;\n  width: 1500px;\n}\n.main-container__rooms__tags label {\n  background-color: #D4D7D9;\n  min-width: 130px;\n  height: 25px;\n  border: 1px solid rgba(0, 0, 0, 0.4);\n  border-radius: 16px;\n  margin: 0 10px 8px;\n  text-align: center;\n  padding-top: 6px;\n  font-size: 0.75em;\n  text-transform: capitalize;\n  box-shadow: rgba(72, 64, 64, 0.825) -2px 2px 2px 0px;\n}\n.main-container__rooms__tags input[type=checkbox] {\n  opacity: 0;\n  position: fixed;\n  width: 0;\n}\n.main-container__rooms__tags input[type=checkbox]:checked + label {\n  background-color: #F7F2F7;\n}\n\n.main-container__rooms {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.main-container__rooms h2 {\n  color: #454647;\n}\n\n.main-container__rooms__pool {\n  display: grid;\n  height: 75vh;\n  width: 95vw;\n  grid-template-columns: [first] 20% [second] 20% [third] 20% [fourth] 20% [five] 20% [end];\n  grid-template-rows: [first-row] 45% [second-row] 45%;\n  grid-auto-flow: row;\n  row-gap: 3%;\n  padding-left: 2%;\n  --contentWidth: 95vw;\n  overflow: scroll;\n}\n.main-container__rooms__pool div {\n  max-width: 300px;\n  box-shadow: rgba(20, 8, 8, 0.825) -2px 2px 2px 0px;\n  border-radius: 7px;\n  background-color: #DBD2C5;\n  opacity: 0.9;\n  display: flex;\n  flex-direction: column;\n}\n.main-container__rooms__pool div img {\n  max-height: 20vh;\n  border-radius: 7px 7px 0 0;\n}\n.main-container__rooms__pool div p {\n  text-transform: capitalize;\n  padding-left: 7px;\n}\n\n.room-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  background-color: #F7F2F7;\n  align-items: stretch;\n  box-shadow: rgba(20, 8, 8, 0.825) -2px 2px 2px 0px;\n}\n\n.main-container__log-in,\n.main-container__room-render {\n  display: flex;\n  justify-content: center;\n}\n\n.log-in-form {\n  margin-top: 10vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.log-in-form input[type=submit] {\n  margin-top: 2vh;\n}\n.log-in-form label {\n  margin-top: 4vh;\n}\n\n.log-in-error {\n  margin: 2px;\n  color: red;\n  font-size: 13px;\n}\n\n.main-container__room-render__room img {\n  height: 30vh;\n  width: 30vw;\n  border-radius: 7px 7px 0 0;\n  opacity: 1;\n  max-width: 500px;\n  min-width: 300px;\n}\n.main-container__room-render__room article {\n  margin: 2vh 2vh 0 2vh;\n}\n.main-container__room-render__room button {\n  margin-top: 2vh;\n  border: none;\n  box-shadow: rgba(72, 64, 64, 0.825) -2px 2px 2px 0px;\n}\n\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/base.scss","webpack://./src/css/mixins.scss","webpack://./src/css/_variables.scss"],"names":[],"mappings":"AAIA;EACE,YAAA;ECJA,aAAA;EACA,sBAAA;ADEF;;AAKA;EACE,QAAA;EACA,uBAAA;AAFF;;AAKA;EACE,yBEfmB;EFgBnB,uBAAA;EACA,WAAA;EACA,YAAA;EACA,4BAAA;EACA,YAAA;EACA,2BEdU;EFeV,SAAA;AAFF;;AAKA;ECxBE,aAAA;EACA,sBAAA;EDyBA,uBAAA;EACA,yBE3BW;EF4BX,YAAA;AADF;;AAIA;EACE,cE9BM;EF+BN,gBAAA;EACA,mBAAA;AADF;;AAGA;EACE,cEnCM;EDQN,aAAA;EACA,mBAAA;ED4BA,mBAAA;EACA,8BAAA;AACF;AACE;EACE,qBAAA;AACJ;AAEE;EACE,qBAAA;AAAJ;AAEI;EACE,cEjDM;EFkDN,iBAAA;EACA,YAAA;EACA,WAAA;EACA,mBAAA;EACA,yBEpDG;EFqDH,SAAA;EACA,oDEhDW;AFgDjB;;AAKA;ECpDE,aAAA;EACA,mBAAA;EDqDA,6BAAA;AADF;;AAIA;;;;EAIE,WAAA;EACA,YAAA;ECxEA,aAAA;EACA,sBAAA;EDyEA,2BAAA;EACA,mBAAA;EACA,yBExEO;EFyEP,gBAAA;EACA,kBAAA;EACA,kDEvEc;EFwEd,gBAAA;EACA,gBAAA;EACA,iBAAA;AAAF;AACE;;;;EACE,iBAAA;AAIJ;AAFE;;;;EACE,WAAA;EACA,cExFS;EFyFT,eAAA;EACA,kBAAA;AAOJ;AALE;;;;EACE,YAAA;EACA,YAAA;EACA,mBAAA;EACA,yBE/FQ;EFgGR,cE9FK;EF+FL,YAAA;EACA,mCAAA;AAUJ;AAPE;;;;EACE,WAAA;EACA,YAAA;EACA,kBAAA;EACA,kBAAA;EACA,YAAA;EACA,oDEnGa;AF+GjB;AATE;;;;EACE,YAAA;EACA,YAAA;EACA,mBAAA;EACA,yBElHQ;EFmHR,cEjHK;EFkHL,YAAA;EACA,oDE7Ga;AF2HjB;;AAVA;EACE,gBAAA;EACA,qBAAA;EACA,gBAAA;AAaF;AAZE;EACE,YAAA;EACA,WAAA;EACA,yBE/HI;EFgIJ,eAAA;EACA,kBAAA;EACA,oDE3Ha;AFyIjB;;AAVA;;EC9HE,aAAA;EACA,mBAAA;EDgIA,6BAAA;EACA,mBAAA;EACA,mBAAA;AAcF;AAbE;;EC9IA,aAAA;EACA,sBAAA;ED+IE,mBAAA;EACA,2BAAA;AAiBJ;AAhBI;;EACE,YAAA;AAmBN;;AAdA;EACE,gBAAA;AAiBF;;AAdA;EACE,eAAA;EACA,WAAA;EACA,WAAA;EACA,aAAA;EACA,6BAAA;EACA,mBAAA;AAiBF;AAhBE;EACE,aAAA;EACA,uBAAA;EACA,aAAA;AAkBJ;AAhBE;EACE,yBExKQ;EFyKR,gBAAA;EACA,YAAA;EACA,oCAAA;EACA,mBAAA;EACA,kBAAA;EACA,kBAAA;EACA,gBAAA;EACA,iBAAA;EACA,0BAAA;EACA,oDE1Ka;AF4LjB;AAhBE;EACE,UAAA;EACA,eAAA;EACA,QAAA;AAkBJ;AAjBI;EACE,yBExLE;AF2MR;;AAdA;EC/LE,aAAA;EACA,sBAAA;EDgMA,mBAAA;AAkBF;AAjBE;EACE,cEnMS;AFsNb;;AAhBA;EACE,aAAA;EACA,YAAA;EACA,WAAA;EACA,yFAAA;EACA,oDAAA;EACA,mBAAA;EACA,WAAA;EACA,gBAAA;EACA,oBAAA;EACA,gBAAA;AAmBF;AAlBE;EACE,gBAAA;EACA,kDE3MY;EFoNZ,kBAAA;EACA,yBEzNK;EF0NL,YAAA;EC9NF,aAAA;EACA,sBAAA;AD2OF;AAxBI;EACE,gBAAA;EACA,0BAAA;AA0BN;AAxBI;EACE,0BAAA;EACA,iBAAA;AA0BN;;AAjBA;EACE,aAAA;EACA,sBAAA;EACA,2BAAA;EACA,yBErOM;EFsON,oBAAA;EACA,kDEjOc;AFqPhB;;AAjBA;;EAEE,aAAA;EACA,uBAAA;AAoBF;;AAjBA;EACE,gBAAA;ECnPA,aAAA;EACA,sBAAA;ED0PA,mBAAA;AAeF;AAtBE;EACE,eAAA;AAwBJ;AAtBE;EACE,eAAA;AAwBJ;;AAlBA;EACE,WAAA;EACA,UAAA;EACA,eAAA;AAqBF;;AAjBE;EACE,YAAA;EACA,WAAA;EACA,0BAAA;EACA,UAAA;EACA,gBAAA;EACA,gBAAA;AAoBJ;AAlBE;EACE,qBAAA;AAoBJ;AAlBE;EACE,eAAA;EACA,YAAA;EACA,oDE1Qa;AF8RjB;;AAhBA;EACE,aAAA;AAmBF","sourcesContent":["\n@import '_variables';\n@import 'mixins.scss';\n\nhtml {\n  height: 100%;\n  @include flex-column()\n}\n\n::-webkit-scrollbar {\n  width: 0;\n  background: transparent;\n}\n\nbody {\n  background-image: $primary-background;\n  background-size: 1880px;\n  width: 100%;\n  height: 100%;\n  background-repeat: no-repeat;\n  resize: both;\n  font-family: $main-font;\n  margin: 0;\n}\n\nheader {\n  @include flex-column();\n  justify-content: center;\n  background-color: $dark-color;\n  height: 20vh;\n}\n\nh1 {\n  color: $white;\n  margin-left: 7vw;\n  font-size: xx-large;\n}\nnav {\n  color: $white;\n  @include flex-row();\n  align-items: center;\n  justify-content: space-between;\n\n  a:link {\n    text-decoration: none;\n  }\n\n  ul {\n    list-style-type: none;\n\n    button {\n      color: $less-dark;\n      margin-right: 7vw;\n      width: 100px;\n      height: 5vh;\n      border-radius: 20px;\n      background-color: $greish;\n      border: 0;\n      box-shadow: $inputBoxShadow;\n    }\n  }\n}\n\n.main-container__new-booking {\n  @include flex-row();\n  justify-content: space-around;\n}\n\n.main-container__new-booking__form,\n.main-container__new-booking__bookings,\n.main-container__log-in__box,\n.main-container__room-render__room {\n  width: 30vw;\n  height: 60vh;\n  @include flex-column();\n  justify-content: flex-start;\n  align-items: center;\n  background-color: $pastel;\n  margin-top: 10vh;\n  border-radius: 7px;\n  box-shadow: $cardBoxShadow;\n  max-width: 500px;\n  min-width: 300px;\n  max-height: 500px;\n  h3 {\n    padding-left: 1vw;\n  }\n  p {\n    margin: 1vw;\n    color: $dark-color;\n    font-size: 15px;\n    text-align:center;\n  }\n  button {\n    width: 150px;\n    height: 30px;\n    border-radius: 15px;\n    background-color: $less-dark;\n    color: $greish;\n    border: none;\n    box-shadow: $greish 5px 5px 5px 4px;\n  }\n\n  input {\n    margin: 5px;\n    height: 25px;\n    border-radius: 5px;\n    text-align:center;\n    border: none;\n    box-shadow: $inputBoxShadow;\n  }\n\n  input[type=submit] {\n    width: 150px;\n    height: 30px;\n    border-radius: 15px;\n    background-color: $less-dark;\n    color: $greish;\n    border: none;\n    box-shadow: $inputBoxShadow;\n  }\n}\n\n.booking-list {\n  max-height: 38vh;\n  --contentHeight: 35vh;\n  overflow: scroll;\n  p {\n    width: 200px;\n    height: 3vh;\n    background-color: $white;\n    font-size: 15px;\n    text-align:center;\n    box-shadow: $inputBoxShadow;\n  }\n}\n\n.checkin-input,\n.checkout-input {\n  @include flex-row();\n  justify-content: space-evenly;\n  align-items: center;\n  padding-bottom: 3vh;\n  div {\n    @include flex-column();\n    align-items: center;\n    align-content: space-around;\n    label {\n      padding: 1vh;\n    }\n  }\n}\n\n.submit {\n  margin-left: 1vw;\n}\n\n.main-container__rooms__tags {\n  margin-top: 2vh;\n  height: 8vh;\n  width: 95vw;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  form {\n    display: flex;\n    justify-content: center;\n    width: 1500px;\n  }\n  label {\n    background-color: $less-dark;\n    min-width: 130px;\n    height: 25px;\n    border: 1px solid rgba(0, 0, 0, .4);\n    border-radius: 16px;\n    margin: 0 10px 8px;\n    text-align: center;\n    padding-top: 6px;\n    font-size: .75em;\n    text-transform: capitalize;\n    box-shadow: $inputBoxShadow;\n  }\n  input[type=checkbox] {\n    opacity: 0;\n    position: fixed;\n    width: 0;\n    &:checked + label {\n      background-color: $white;\n    }\n  }\n}\n\n.main-container__rooms {\n  @include flex-column();\n  align-items: center;\n  h2 {\n    color: $dark-color\n  }\n}\n.main-container__rooms__pool {\n  display: grid;\n  height: 75vh;\n  width: 95vw;\n  grid-template-columns: [first] 20% [second] 20% [third] 20% [fourth] 20% [five] 20%[end];\n  grid-template-rows: [first-row] 45% [second-row] 45%;\n  grid-auto-flow: row;\n  row-gap: 3%;\n  padding-left: 2%;\n  --contentWidth: 95vw;\n  overflow: scroll;\n  div {\n    max-width: 300px;\n    box-shadow: $cardBoxShadow;\n    img {\n      max-height: 20vh;\n      border-radius: 7px 7px 0 0;\n    }\n    p {\n      text-transform: capitalize;\n      padding-left: 7px;\n    }\n    border-radius: 7px;\n    background-color: $pastel;\n    opacity: .9;\n    @include flex-column();\n  }\n}\n\n.room-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  background-color: $white;\n  align-items: stretch;\n  box-shadow: $cardBoxShadow;\n}\n\n.main-container__log-in,\n.main-container__room-render {\n  display: flex;\n  justify-content: center;\n}\n\n.log-in-form {\n  margin-top: 10vh;\n  input[type=submit] {\n    margin-top: 2vh;\n  }\n  label {\n    margin-top: 4vh;\n  }\n  @include flex-column();\n  align-items: center\n}\n\n.log-in-error {\n  margin: 2px;\n  color: red;\n  font-size: 13px;\n}\n\n.main-container__room-render__room {\n  img {\n    height: 30vh;\n    width: 30vw;\n    border-radius: 7px 7px 0 0;\n    opacity: 1;\n    max-width: 500px;\n    min-width: 300px;\n  }\n  article {\n    margin: 2vh 2vh 0 2vh;\n  }\n  button {\n    margin-top: 2vh;\n    border: none;\n    box-shadow: $inputBoxShadow;\n  }\n}\n\n.hidden {\n  display: none;\n}","@mixin flex-column() {\n  display: flex;\n  flex-direction: column;\n}\n\n@mixin flex-center-columns() {\n  display: flex;\n  align-items: center;\n}\n\n@mixin flex-row() {\n  display: flex;\n  flex-direction: row;\n}\n\n","$primary-background: #D4D7D9;\n$dark-color: #454647;\n$less-dark: #D4D7D9;\n$white: #F7F2F7;\n$greish: #827B72;\n$pastel: #DBD2C5;\n//font-family: \n$main-font: 'Prata', serif;\n$secondary-font: 'Karma', serif;\n$cardBoxShadow: rgba(20, 8, 8, 0.825) -2px 2px 2px 0px;\n$inputBoxShadow: rgba(72, 64, 64, 0.825) -2px 2px 2px 0px;\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable max-len */

const data = {
  customers: [
    {
      "id": 1,
      "name": "Leatha Ullrich"
    },
    {
      "id": 2,
      "name": "Rocio Schuster"
    },
    {
      "id": 3,
      "name": "Kelvin Schiller"
    },
    {
      "id": 4,
      "name": "Kennedi Emard"
    },
    {
      "id": 5,
      "name": "Rhiannon Little"
    },
    {
      "id": 6,
      "name": "Fleta Schuppe"
    },
    {
      "id": 7,
      "name": "Dell Rath"
    },
    {
      "id": 8,
      "name": "Era Hand"
    },
    {
      "id": 9,
      "name": "Faustino Quitzon"
    },
    {
      "id": 10,
      "name": "Tony Armstrong"
    }
  ],

  rooms: [
    {
      "number": 1,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
    },
    {
      "number": 2,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 477.38
    },
    {
      "number": 3,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "king",
      "numBeds": 1,
      "costPerNight": 491.14
    },
    {
      "number": 4,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 429.44
    },
    {
      "number": 5,
      "roomType": "single room",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 340.17
    },
    {
      "number": 6,
      "roomType": "junior suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 397.02
    },
    {
      "number": 7,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 231.46
    },
    {
      "number": 8,
      "roomType": "junior suite",
      "bidet": false,
      "bedSize": "king",
      "numBeds": 1,
      "costPerNight": 261.26
    },
    {
      "number": 9,
      "roomType": "single room",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 200.39
    },
    {
      "number": 10,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "twin",
      "numBeds": 1,
      "costPerNight": 497.64
    }
  ],

  bookings: [
    {
      "id": "5fwrgu4i7k55hl6sz",
      "userID": 9,
      "date": "2021/09/30",
      "roomNumber": 1,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 43,
      "date": "2021/10/2",
      "roomNumber": 2,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 13,
      "date": "2021/10/3",
      "roomNumber": 3,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t7",
      "userID": 20,
      "date": "2020/02/16",
      "roomNumber": 4,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t8",
      "userID": 1,
      "date": "2020/02/05",
      "roomNumber": 5,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t9",
      "userID": 38,
      "date": "2020/02/14",
      "roomNumber": 6,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6ta",
      "userID": 1,
      "date": "2020/01/11",
      "roomNumber": 7,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tb",
      "userID": 49,
      "date": "2020/02/06",
      "roomNumber": 8,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tc",
      "userID": 22,
      "date": "2020/01/30",
      "roomNumber": 9,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6td",
      "userID": 27,
      "date": "2020/01/31",
      "roomNumber": 1,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6te",
      "userID": 1,
      "date": "2020/01/19",
      "roomNumber": 3,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tf",
      "userID": 36,
      "date": "2020/01/25",
      "roomNumber": 5,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tg",
      "userID": 2,
      "date": "2020/02/03",
      "roomNumber": 2,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6th",
      "userID": 2,
      "date": "2020/02/26",
      "roomNumber": 8,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6ti",
      "userID": 6,
      "date": "2020/01/22",
      "roomNumber": 1,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tj",
      "userID": 21,
      "date": "2020/01/17",
      "roomNumber": 7,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tk",
      "userID": 2,
      "date": "2020/01/27",
      "roomNumber": 4,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tl",
      "userID": 2,
      "date": "2020/01/10",
      "roomNumber": 8,
      "roomServiceCharges": []
    }
  ],
  roomImgs: [
    {
      roomType: 'residential suite',
      imageUrl: './images/residential-suite.png'
    },
    {
      roomType: 'suite',
      imageUrl: './images/suite.png'
    },
    {
      roomType: 'single room',
      imageUrl: './images/single-room.png'
    },
    {
      roomType: 'junior suite',
      imageUrl: './images/junior-suite.png'
    }
  ]
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchData": () => (/* binding */ fetchData),
/* harmony export */   "updateBookings": () => (/* binding */ updateBookings)
/* harmony export */ });
/* eslint-disable max-len */

function fetchData(file) {
  return fetch(`https://overlookdata.herokuapp.com/api/v1/${file}`)
    .then(response => response.json())
    
}

function updateBookings(userID, date, roomNumber) {
  return fetch('https://overlookdata.herokuapp.com/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({
      userID,
      date,
      roomNumber,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => checkResponse(response))
    .catch(error => console.warn(error));
}

function checkResponse(response) {
  if (!response.ok) {
    throw new Error(`Status: ${response.status} StatusText: ${response.status.text}`);
  }
  return response.json();
}



/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _room__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* eslint-disable max-len */



class Hotel {
  constructor(rooms, bookings, customers, roomImgs) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.customers = customers;
    this.roomImgs = roomImgs;
    this.roomsToDisplay = [];
  }

  prepareRooms() {
    this.rooms.forEach(roomDetails => {
      const roomReady = new _room__WEBPACK_IMPORTED_MODULE_0__.default(roomDetails);
      roomReady.getRoomImg(this.roomImgs);
      this.roomsToDisplay.push(roomReady);
    });
    return this.roomsToDisplay;
  }

  getRandomCustomer() {
    const randomCustomer = this.customers[Math.floor(Math.random() * this.customers.length)];
    return randomCustomer;
  }

  getCustomerByID(id) {
    let customerDetails = this.customers.find(customer => customer.id === id);
    return customerDetails;
  }

  getDates(startDate, stopDate) {
    const dateArray = [];
    let currentDate = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(startDate);
    const checkOutDate = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(stopDate);
    while (currentDate < checkOutDate) {
      dateArray.push(dayjs__WEBPACK_IMPORTED_MODULE_1___default()(currentDate).format('YYYY/MM/DD') )
      currentDate = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  getAvailableRooms(checkInDate, checkOutDate) {
    const bookingSearch = this.getDates(checkInDate, checkOutDate);
    const availableRooms = this.roomsToDisplay.reduce((acc, room) => {
      let filterBookingsByRoom = this.bookings.filter(booking => booking.roomNumber === room.number);
      let isBooked = filterBookingsByRoom.some(booking => bookingSearch.includes(booking.date))
      if (!filterBookingsByRoom.length) {
        acc.push(room);
      } else if (!isBooked) {
        acc.push(room);
      }
      return acc;
    }, [])
     
    if (!availableRooms.length) {
      return 'We are very sorry, there is not an available room for this dates';
    }
    return availableRooms;
  }
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hotel);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Room {
  constructor(roomDetails) {
    this.number = roomDetails.number;
    this.roomType = roomDetails.roomType;
    this.hasBidet = roomDetails.bidet;
    this.bedsNumber = roomDetails.numBeds;
    this.bedSize = roomDetails.bedSize;
    this.costPerNight = roomDetails.costPerNight;
    this.image = '';
  }

  getRoomImg(imgs) {
    this.image = imgs.find(img => img.roomType === this.roomType).imageUrl;
    return this.image;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Room);

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable max-len */
class Booking {
  constructor(userID, checkInDate, checkOutDate, roomNumber) {
    this.userID = userID;
    this.checkIn = checkInDate;
    this.checkOut = checkOutDate;
    this.roomNumber = roomNumber;
    this.singleBookings = [];
    this.bookingCost = 0;
    this.roomDetails = '';
    this.roomToBook = {};
  }

  getSingleBookings(hotel) {
    const singleDates = hotel.getDates(this.checkIn, this.checkOut);
    const bookingsToPost = singleDates.map(date => {
      const bookingDetails = {
        userID: this.userID,
        date,
        roomNumber: this.roomNumber
      }
      return bookingDetails;
    })
    this.singleBookings = bookingsToPost;
    return bookingsToPost;
  }

  getRoomDetails(hotel) {
    const room = hotel.roomsToDisplay.find(room => room.number === this.roomNumber);
    let roomKeys = Object.keys(room);
    let roomDetails = roomKeys.reduce((acc, detail) => {
      if (detail === 'hasBidet' && room[detail]) {
        acc += 'Bidet / ';
      } else if (detail === 'bedsNumber' && room[detail] > 1) {
        acc += '2 Beds /';
      } else if (detail === 'bedsNumber' && room[detail] === 1) {
        acc += '1 Bed / ';
      } else if (detail === 'bedSize') {
        acc += `${room[detail]} bed / `;
      } else if (detail === 'costPerNight') {
        acc += `Cost per night: $ ${room[detail]}`
      }
      return acc
    }, '');
    this.roomDetails = roomDetails;
    
    return roomDetails;
  }

  getBookingCost(hotel) {
    const room = hotel.roomsToDisplay.find(room => room.number === this.roomNumber);
    const bookingCost = room.costPerNight * this.singleBookings.length;
    this.roomToBook = room;
    this.bookingCost = bookingCost;
    return bookingCost;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Booking);

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable max-len */


class Customer {
  constructor(customerDetails) {
    this.id = customerDetails.id;
    this.name = customerDetails.name;
    this.username = `customer${this.id}`;
    this.password = 'overlook2021';
    this.bookings = [];
  }

  getBookings(hotel) {
    const customerBookings = hotel.bookings.filter(booking => booking.userID === this.id);
    this.bookings = customerBookings;
    return customerBookings;
  }

  getSpentAmount(hotel) {
    const spentAmount = this.bookings.reduce((acc, booking) => {
      if (dayjs__WEBPACK_IMPORTED_MODULE_0___default()(booking.date).isBefore(dayjs__WEBPACK_IMPORTED_MODULE_0___default()())) {
        const room = hotel.roomsToDisplay.find(room => room.number === booking.roomNumber);
        acc += room.costPerNight;
      }
      return acc;
    }, 0).toFixed(2);
    return spentAmount;
  }

  filterRoomsByType(input, availableRooms) {
    let filteredRooms = input.reduce((acc, roomType) => {
      let indvFiltered = availableRooms.filter(room => {
        return room.roomType === roomType;
      })
      acc.push(indvFiltered); 
      return acc;
    }, []).flat();
    if (!filteredRooms.length) {
      return 'We are sorry, we don\'t have this types of rooms available';
    } else { 
      return filteredRooms;
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable max-len */
//Selectors

//Buttons

//Input
const checkInInput = document.getElementById('checkInInput');
const checkOutInput = document.getElementById('checkOutInput');
// const datesInput = document.querySelector(`form[name="${datesInput}"]`);
const submitDates = document.getElementById('datesSubmit');
const typesForm = document.getElementById('roomFeaturesInput');
const logInForm = document.getElementById('logInForm');

//Sections
const allBookings = document.getElementById('allBookings');
const totalSpent = document.getElementById('totalSpent');
const dashBoard = document.getElementById('inputBooking');
const roomsPool = document.getElementById('availableRooms');
const roomsContainer = document.getElementById('roomDisplay');
const bookingContainer = document.getElementById('roomRender');
const bookingPreview = document.getElementById('bookingPreview');
const dashboard = document.getElementById('inputBooking');
const logInBtn = document.getElementById('logInSubmit');
const usernameInp = document.getElementById('username');
const passwordInp = document.getElementById('password');
const logInBox = document.getElementById('logInContainer');
const logInError = document.getElementById('logInError');
const checkoutError = document.getElementById('checkoutError');
const errorMessage1 = document.getElementById('errorMessage1')
const apology = document.getElementById('apology');
const home = document.getElementById('home');
const logOutBtn = document.getElementById('logOut');
const logInContainer = document.getElementById('logInBox');

const domUpdates = {

  renderAllBookings(customerBookings) {
    customerBookings.forEach(booking => {
      allBookings.innerHTML += `
      <p>${booking.date} - Room#: ${booking.roomNumber}</p>
      `
    })
  },

  renderAvailableRooms(availableRooms) {
    if (availableRooms === 'We are sorry, we don\'t have this types of rooms available') {
      errorMessage1.innerText = availableRooms
    } else {
      errorMessage1.innerText = ''
      availableRooms.forEach(room => {
        roomsContainer.innerHTML += `
      <div id="${room.number}" tabindex="0">
      <img src="${room.image}" alt="Hotel room Image">
      <p>${room.roomType}</p>
      <p>Cost per night: $ ${room.costPerNight}</p>
      </div>
      `
      });
    }
  },

  renderBookingPreview(booking) {
    bookingPreview.innerHTML = `
    <img src=${booking.roomToBook.image} 
    alt="Image of a hotel ${booking.roomToBook.roomType}">
    <article>${booking.roomDetails}</article>
    <article>${booking.checkIn} to ${booking.checkOut}</article>
    <article>Booking Total: $ ${booking.bookingCost}</article>
    <button id="bookNow">Book now</button>
    <button id="back">Back to rooms</button>
    `
  },

  renderSpentAmount(money) {
    totalSpent.innerText = `Total Bookings: $ ${money}`;
  },

  hide(element) {
    element.classList.add('hidden');
  },

  show(element) {
    element.classList.remove('hidden');
  },

  allBookings,
  totalSpent,
  checkInInput,
  checkOutInput,
  submitDates,
  dashBoard,
  roomsPool,
  roomsContainer,
  typesForm,
  bookingContainer,
  bookingPreview,
  dashboard,
  logInBtn,
  usernameInp,
  passwordInp,
  logInBox,
  logInForm,
  logInError,
  checkoutError,
  apology,
  home,
  logOutBtn,
  logInContainer,
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domUpdates);

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/junior-suite.png");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/suite.png");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/residential-suite.png");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/single-room.png");

/***/ })
/******/ 	]);
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _test_data_test__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _classes_hotel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _classes_booking__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _classes_customer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var _images_junior_suite_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14);
/* harmony import */ var _images_suite_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(15);
/* harmony import */ var _images_residential_suite_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(16);
/* harmony import */ var _images_single_room_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(17);
/* eslint-disable max-len */
//Imports













const {
  checkInInput,
  checkOutInput,
  submitDates,
  dashBoard,
  roomsPool,
  roomsContainer,
  typesForm,
  bookingContainer,
  bookingPreview,
  dashboard,
  logInBtn,
  usernameInp,
  passwordInp,
  logInBox,
  logInForm,
  logInError,
  checkoutError,
  apology,
  home,
  logOutBtn,
  logInContainer,
} = _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default;

// Global Variables
const roomImgs = _test_data_test__WEBPACK_IMPORTED_MODULE_2__.default.roomImgs;
let hotel, customerBookings, spentAmount, checkInDate,
  checkOutDate, availableRooms, roomTypes, booking, newCustomer;

//Event Listeners

window.addEventListener('load', loadPage);
typesForm.addEventListener('click', getRoomTypes);
roomsContainer.addEventListener('click', checkRoomDetails);
bookingPreview.addEventListener('click', bookNow);
submitDates.addEventListener('click', displayAvailableRooms);
logInBtn.addEventListener('click', validateCustomer);
home.addEventListener('click', bringMeHome);
logOutBtn.addEventListener('click', logOut);
roomsPool.addEventListener('keyup', enableTab);
checkInInput.addEventListener('change', updateCheckoutMinimum);

//Event Handlers

function loadPage() {
  getData()
}

function displayAvailableRooms(event) {
  event.preventDefault();
  checkInDate = checkInInput.value;
  checkOutDate = checkOutInput.value;
  availableRooms = hotel.getAvailableRooms(checkInDate, checkOutDate);
  if (dayjs__WEBPACK_IMPORTED_MODULE_1___default()(checkOutDate).isBefore(dayjs__WEBPACK_IMPORTED_MODULE_1___default()(checkInDate))) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.show(checkoutError);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(apology);
  } else if (typeof(availableRooms) === 'string') {
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(checkoutError);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.show(apology);
  } else {
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(apology);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(checkoutError);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(dashBoard);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.show(roomsPool);
    checkInDate = checkInInput.value;
    checkOutDate = checkOutInput.value;
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.renderAvailableRooms(availableRooms);
  }
}

function checkRoomDetails(event) {
  event.preventDefault();
  let roomNumber;
  let targetParentId = parseInt(event.target.parentNode.id);
  let targetId = parseInt(event.target.id);
  if (targetParentId) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(roomsPool);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.show(bookingPreview);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.show(bookingContainer);
    roomNumber = targetParentId;
    booking = createBooking(roomNumber);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.renderBookingPreview(booking);
  } else if (targetId) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(roomsPool);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.show(bookingPreview);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.show(bookingContainer);
    roomNumber = targetId;
    booking = createBooking(roomNumber);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.renderBookingPreview(booking);
  }
}

function bookNow(event) {
  event.preventDefault();
  if (event.target.id === 'bookNow') {
    postBookings(booking)
  } else if (event.target.id === 'back') {
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(bookingPreview);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.show(roomsPool);
    displayDashboardInfo();
  }
}

function validateCustomer(event) {
  event.preventDefault();
  const username = usernameInp.value;
  const password = passwordInp.value;
  if ((username.length < 9 || username.length > 10) || password.length !== 12) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.show(logInError);
  } else {
    const customerID = getUserID(username);
    const customerDetails = hotel.getCustomerByID(customerID);
    newCustomer = new _classes_customer__WEBPACK_IMPORTED_MODULE_6__.default(customerDetails);
    if (newCustomer.password === password) {
      _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(logInBox);
      _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.show(dashboard);
      logInForm.reset();
      displayDashboardInfo();
    }
  }
}

function updateCheckoutMinimum(event) {
  event.preventDefault();
  checkOutInput.min = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(checkInInput.value).add('1', 'day').format('YYYY-MM-DD')
  checkOutInput.value = checkOutInput.min;
}

function bringMeHome() {
  if (newCustomer) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.show(dashboard);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(roomsPool)
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(bookingPreview);
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(bookingContainer);
    limitDatesInput();
  }
}

function logOut() {
  newCustomer = null;
  _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.show(logInBox);
  _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(dashboard);
  _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(roomsPool)
  _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(bookingPreview);
  _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(bookingContainer);
  limitDatesInput();
}

function enableTab() {
  if (event.keyCode === 13) {
    checkRoomDetails(event)
  }
}

//Helper functions

function getData() {
  Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_3__.fetchData)('rooms'), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_3__.fetchData)('bookings'), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_3__.fetchData)('customers')])
    .then(data => createHotel(data, roomImgs))
    .catch(error => displayErrorMessage(error, logInContainer))
}

function createHotel(data, roomImgs) {
  hotel = new _classes_hotel__WEBPACK_IMPORTED_MODULE_4__.default(data[0].rooms, data[1].bookings, data[2].customers, roomImgs);
  hotel.prepareRooms();
  limitDatesInput();
 
  return hotel;
}

function displayDashboardInfo() {
  customerBookings = newCustomer.getBookings(hotel);
  _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.renderAllBookings(customerBookings);
  spentAmount = newCustomer.getSpentAmount(hotel);
  _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.renderSpentAmount(spentAmount);
}

function limitDatesInput() {
  checkInInput.min = dayjs__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYY-MM-DD');
  checkInInput.value = checkInInput.min;
  checkOutInput.min = dayjs__WEBPACK_IMPORTED_MODULE_1___default()().add('1', 'day').format('YYYY-MM-DD');
  checkOutInput.value = checkOutInput.min;
}

function getRoomTypes() {
  roomTypes = [];
  let checkedTypes = document.querySelectorAll('input[type=checkbox]:checked');
  checkedTypes.forEach(checkedBox => {
    roomTypes.push(checkedBox.value);
  })
  if (roomTypes.length) {
    let filteredRooms = newCustomer.filterRoomsByType(roomTypes, availableRooms);
    roomsContainer.innerHTML = '';
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.renderAvailableRooms(filteredRooms);
  } else {
    roomsContainer.innerHTML = '';
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.renderAvailableRooms(availableRooms);
  }
}

function createBooking(roomNumber) {
  let booking = new _classes_booking__WEBPACK_IMPORTED_MODULE_5__.default(newCustomer.id, checkInDate, checkOutDate, roomNumber);
  booking.getSingleBookings(hotel);
  booking.getRoomDetails(hotel);
  booking.getBookingCost(hotel);
  return booking;
}

function postBookings(booking) {
  Promise.all(
    booking.singleBookings.map(booking => {
      return (0,_apiCalls__WEBPACK_IMPORTED_MODULE_3__.updateBookings)(booking.userID, booking.date, booking.roomNumber)
    })).then(() => {
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_3__.fetchData)('bookings')
      .then(data => hotel.bookings = data.bookings)
      .then(() => showConfirmation())
      .then(() => newCustomer.getBookings(hotel))
      .then(() => displayDashboardInfo())
      .catch(error => displayErrorMessage(error, bookingPreview))
  })
}

function showConfirmation() {
  bookingPreview.innerHTML = `
  <h2>Your booking has been made!</h2>
  <button id="backToDashboard">Dashboard</button>
  `
  const backToDashboard = document.getElementById('backToDashboard');
  backToDashboard.addEventListener('click', function() {
    roomsContainer.innerHTML = ''
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.hide(bookingPreview)
    _domUpdates__WEBPACK_IMPORTED_MODULE_7__.default.show(dashboard);
  })
}

function getUserID(username) {
  if (username.length === 10) {
    let splittedUsername = username.split('');
    let userID = parseInt(splittedUsername[8] + splittedUsername[9])
    return userID
  } else if (username.length === 9) {
    let splittedUsername = username.split('');
    let userID = parseInt(splittedUsername[8])
    return userID
  }
}

function displayErrorMessage(error, container) {
  console.warn(error);
  container.innerHTML = `<p id="connectivityError" class="connectivity-error "> Our clerks are having lunch, please come back later </p>`;
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map