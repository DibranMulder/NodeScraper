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
var urls = ['https://www.bol.com/nl/p/starbook-boeklamp-premium-lichthouten-cover-warm-wit-licht-relatiegeschenk-tafellamp/9200000101823319/?suggestionType=typedsearch&bltgh=lHJId9KPg14NsufrofBFfg.1.2.ProductTitle',
    'https://www.bol.com/nl/p/dunlop-led-fietslampen-set-zwart-rood/9200000049684295/?suggestionType=typedsearch&bltgh=k1TYkLxOYDzVeZ0DwQNOAA.1.4.ProductImage#modal_open'];
puppeteer.launch().then(function (browser) { return __awaiter(_this, void 0, void 0, function () {
    var _i, urls_1, url, page, orderBtn, label, maxVal, okBtn, availableQ, removeBtn, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 25, , 26]);
                _i = 0, urls_1 = urls;
                _a.label = 1;
            case 1:
                if (!(_i < urls_1.length)) return [3 /*break*/, 24];
                url = urls_1[_i];
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto(url)];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        var elements = document.getElementsByClassName('btn--buy');
                        var buyBtn = elements.item(0);
                        buyBtn.click();
                    })];
            case 4:
                _a.sent();
                console.log("Buy btn clicked");
                return [4 /*yield*/, page.waitFor(500)];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.$('a[href="/nl/order/basket.html"]')];
            case 6:
                orderBtn = _a.sent();
                return [4 /*yield*/, page.evaluate(function (el) { return el.innerText; }, orderBtn)];
            case 7:
                label = _a.sent();
                console.log(label);
                return [4 /*yield*/, orderBtn.click()];
            case 8:
                _a.sent();
                console.log("Ordered");
                return [4 /*yield*/, page.waitFor(2500)];
            case 9:
                _a.sent();
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
            case 10:
                maxVal = _a.sent();
                if (!(maxVal == undefined)) return [3 /*break*/, 18];
                console.log("Max val is undefined");
                return [4 /*yield*/, page.select('#tst_quantity_dropdown', 'meer')];
            case 11:
                _a.sent();
                console.log("Select more");
                return [4 /*yield*/, page.evaluate(function () {
                        var element = document.querySelector('input[type=tel]');
                        element.value = '';
                        element.focus();
                    })];
            case 12:
                _a.sent();
                return [4 /*yield*/, page.type('input[type=tel]', '500')];
            case 13:
                _a.sent();
                console.log("Set q to 500");
                return [4 /*yield*/, page.$('.js_quantity_overlay_ok')];
            case 14:
                okBtn = _a.sent();
                return [4 /*yield*/, okBtn.click()];
            case 15:
                _a.sent();
                console.log("Click ok");
                return [4 /*yield*/, page.waitFor(500)];
            case 16:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        var e = document.querySelector('#tst_quantity_dropdown');
                        return e.options[e.selectedIndex].value;
                    })];
            case 17:
                availableQ = _a.sent();
                console.log("Max value: " + availableQ);
                return [3 /*break*/, 19];
            case 18:
                console.log("Max value: " + maxVal);
                _a.label = 19;
            case 19: return [4 /*yield*/, page.$('#tst_remove_from_basket')];
            case 20:
                removeBtn = _a.sent();
                return [4 /*yield*/, removeBtn.click()];
            case 21:
                _a.sent();
                return [4 /*yield*/, page.waitFor(500)];
            case 22:
                _a.sent();
                page.close();
                _a.label = 23;
            case 23:
                _i++;
                return [3 /*break*/, 1];
            case 24:
                console.log("Done.");
                return [3 /*break*/, 26];
            case 25:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 26];
            case 26: return [2 /*return*/];
        }
    });
}); });
