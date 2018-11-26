"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer = require("puppeteer");
var timeout = 1000;
var eanCodes = ['8711252416793', '2950001557127'];
puppeteer.launch().then(function (browser) { return __awaiter(_this, void 0, void 0, function () {
    var _i, eanCodes_1, ean, page, searchBtn, url, buyBtn, modalClose, titleElement, title, priceElement, price, basketBtn, url, maxVal, okBtn, availableQ, removeBtn, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 34, , 35]);
                _i = 0, eanCodes_1 = eanCodes;
                _a.label = 1;
            case 1:
                if (!(_i < eanCodes_1.length)) return [3 /*break*/, 33];
                ean = eanCodes_1[_i];
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto('https://www.bol.com/nl/')];
            case 3:
                _a.sent();
                // Search for an EAN code.
                console.log("Searching for: " + ean);
                return [4 /*yield*/, page.focus('#searchfor')];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.keyboard.type(ean)];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.$("[data-test='search-button']")];
            case 6:
                searchBtn = _a.sent();
                return [4 /*yield*/, searchBtn.click()];
            case 7:
                _a.sent();
                return [4 /*yield*/, page.waitFor(timeout)];
            case 8:
                _a.sent();
                url = page.url();
                console.log("Page at: " + url);
                return [4 /*yield*/, page.$(".btn--buy")];
            case 9:
                buyBtn = _a.sent();
                if (buyBtn) {
                    console.log("Product in basket.");
                    buyBtn.click();
                }
                else {
                    console.log("Product not added to basket.");
                    return [3 /*break*/, 32];
                }
                return [4 /*yield*/, page.waitFor(timeout)];
            case 10:
                _a.sent();
                return [4 /*yield*/, page.$("[data-test='modal-window-close']")];
            case 11:
                modalClose = _a.sent();
                modalClose.click();
                return [4 /*yield*/, page.waitFor(timeout)];
            case 12:
                _a.sent();
                return [4 /*yield*/, page.$("[data-test='title']")];
            case 13:
                titleElement = _a.sent();
                return [4 /*yield*/, page.evaluate(function (el) { return el.innerText; }, titleElement)];
            case 14:
                title = _a.sent();
                console.log("Title: " + title);
                return [4 /*yield*/, page.$("[data-test='price']")];
            case 15:
                priceElement = _a.sent();
                return [4 /*yield*/, page.evaluate(function (el) { return el.innerText; }, priceElement)];
            case 16:
                price = _a.sent();
                console.log("Price: " + parseFloat(price));
                return [4 /*yield*/, page.$("[data-test='basket-button']")];
            case 17:
                basketBtn = _a.sent();
                basketBtn.click();
                return [4 /*yield*/, page.waitFor(timeout)];
            case 18:
                _a.sent();
                url = page.url();
                console.log("Page at: " + url);
                console.log("At basket");
                return [4 /*yield*/, page.evaluate(function () {
                        var m = 0;
                        var select = document.querySelector('#tst_quantity_dropdown');
                        for (var i = 0; i < select.options.length; i++) {
                            if (select.options[i].value === "meer") {
                                return undefined;
                            }
                            var intVal = parseInt(select.options[i].value);
                            if (intVal > m) {
                                m = intVal;
                            }
                        }
                        return m;
                    })];
            case 19:
                maxVal = _a.sent();
                if (!(maxVal == undefined)) return [3 /*break*/, 27];
                console.log("Max val is undefined");
                return [4 /*yield*/, page.select('#tst_quantity_dropdown', 'meer')];
            case 20:
                _a.sent();
                console.log("Select more");
                return [4 /*yield*/, page.evaluate(function () {
                        var element = document.querySelector('input[type=tel]');
                        element.value = '';
                        element.focus();
                    })];
            case 21:
                _a.sent();
                return [4 /*yield*/, page.type('input[type=tel]', '500')];
            case 22:
                _a.sent();
                console.log("Set q to 500");
                return [4 /*yield*/, page.$('.js_quantity_overlay_ok')];
            case 23:
                okBtn = _a.sent();
                return [4 /*yield*/, okBtn.click()];
            case 24:
                _a.sent();
                console.log("Click ok");
                return [4 /*yield*/, page.waitFor(timeout)];
            case 25:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        var e = document.querySelector('#tst_quantity_dropdown');
                        return e.options[e.selectedIndex].value;
                    })];
            case 26:
                availableQ = _a.sent();
                console.log("Max value: " + availableQ);
                return [3 /*break*/, 28];
            case 27:
                console.log("Max value: " + maxVal);
                _a.label = 28;
            case 28: return [4 /*yield*/, page.$('#tst_remove_from_basket')];
            case 29:
                removeBtn = _a.sent();
                return [4 /*yield*/, removeBtn.click()];
            case 30:
                _a.sent();
                return [4 /*yield*/, page.waitFor(timeout)];
            case 31:
                _a.sent();
                page.close();
                _a.label = 32;
            case 32:
                _i++;
                return [3 /*break*/, 1];
            case 33:
                console.log("Done.");
                return [3 /*break*/, 35];
            case 34:
                error_1 = _a.sent();
                console.log("Error");
                console.error(error_1);
                return [3 /*break*/, 35];
            case 35: return [2 /*return*/];
        }
    });
}); });
