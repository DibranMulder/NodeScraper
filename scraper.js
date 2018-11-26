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
var azure = require("azure-storage");
var uuidv4 = require('uuid/v4');
var timeout = 1000;
var eanCodes = [];
var options = {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    javascriptEnabled: true,
    phantomConfig: { "ssl-protocol": "ANY", 'ignore-ssl-errors': 'true' }
};
// Create table service.
var tableService = azure.createTableService('bolcomdata', 'kI5r3eynZTg92sosrgBg/lx8rmww2xI9CaJzxtXYU938DGAP4bEqkAesY9q1ZhAscRWdwL1EoHBjzdiV6czJcQ==');
var entGen = azure.TableUtilities.entityGenerator;
puppeteer.launch(options).then(function (browser) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            tableService.queryEntities('eancodes', null, null, function (error, result, response) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error) {
                                    console.log("Entires there");
                                    result.entries.forEach(function (element) {
                                        eanCodes.push(element["EanCode"]._);
                                    });
                                }
                                else {
                                    console.log(error);
                                }
                                return [4 /*yield*/, scrapeItems(browser)];
                            case 1:
                                _a.sent();
                                console.log("Done.");
                                return [2 /*return*/];
                        }
                    });
                });
            });
        }
        catch (error) {
            console.log("Error");
            console.error(error);
        }
        return [2 /*return*/];
    });
}); });
function scrapeItems(browser) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, eanCodes_1, ean, pot, page, searchBtn, url, titleElement, title, priceElement, price, floatPrice, buyBtn, modalClose, basketBtn, url, maxVal, okBtn, availableQ, removeBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, eanCodes_1 = eanCodes;
                    _a.label = 1;
                case 1:
                    if (!(_i < eanCodes_1.length)) return [3 /*break*/, 33];
                    ean = eanCodes_1[_i];
                    pot = {
                        PartitionKey: entGen.String(ean),
                        RowKey: entGen.String(uuidv4()),
                        Date: entGen.DateTime(new Date()),
                        Ean: entGen.String(ean),
                        Success: entGen.Boolean(false),
                        Title: entGen.String(null),
                        Price: entGen.Double(null),
                        Quantity: entGen.Int32(null)
                    };
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
                    return [4 /*yield*/, page.$("[data-test='title']")];
                case 9:
                    titleElement = _a.sent();
                    return [4 /*yield*/, page.evaluate(function (el) { return el.innerText; }, titleElement)];
                case 10:
                    title = _a.sent();
                    pot.Title = entGen.String(title);
                    console.log("Title: " + title);
                    return [4 /*yield*/, page.$("[data-test='price']")];
                case 11:
                    priceElement = _a.sent();
                    return [4 /*yield*/, page.evaluate(function (el) { return el.innerText; }, priceElement)];
                case 12:
                    price = _a.sent();
                    floatPrice = parseFloat(price.replace(/\n/g, '').replace(',', '.'));
                    pot.Price = entGen.Double(floatPrice);
                    console.log("Price: " + floatPrice);
                    return [4 /*yield*/, page.$(".btn--buy")];
                case 13:
                    buyBtn = _a.sent();
                    if (buyBtn) {
                        console.log("Product in basket.");
                        buyBtn.click();
                    }
                    else {
                        console.log("Product not added to basket.");
                        pot.Success = entGen.Boolean(false);
                        pot.Quantity = entGen.Int32(0);
                        insertRecord(pot);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, page.waitFor(timeout)];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, page.$("[data-test='modal-window-close']")];
                case 15:
                    modalClose = _a.sent();
                    modalClose.click();
                    return [4 /*yield*/, page.waitFor(timeout)];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, page.$("[data-test='basket-button']")];
                case 17:
                    basketBtn = _a.sent();
                    basketBtn.click();
                    console.log("At basket");
                    return [4 /*yield*/, page.waitFor(timeout)];
                case 18:
                    _a.sent();
                    url = page.url();
                    console.log("Page at: " + url);
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
                    // Select meer.
                    return [4 /*yield*/, page.select('#tst_quantity_dropdown', 'meer')];
                case 20:
                    // Select meer.
                    _a.sent();
                    console.log("Select more");
                    return [4 /*yield*/, page.evaluate(function () {
                            var element = document.querySelector('input[type=tel]');
                            element.value = '';
                            element.focus();
                        })];
                case 21:
                    _a.sent();
                    // Enter 500
                    return [4 /*yield*/, page.type('input[type=tel]', '500')];
                case 22:
                    // Enter 500
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
                    pot.Quantity = entGen.Int32(parseInt(availableQ));
                    return [3 /*break*/, 28];
                case 27:
                    console.log("Max value: " + maxVal);
                    pot.Quantity = entGen.Int32(maxVal);
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
                    // Close page.
                    page.close();
                    pot.Success = entGen.Boolean(true);
                    insertRecord(pot);
                    _a.label = 32;
                case 32:
                    _i++;
                    return [3 /*break*/, 1];
                case 33: return [2 /*return*/];
            }
        });
    });
}
function insertRecord(pot) {
    tableService.insertEntity('pointsintime', pot, function (error) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!error) {
                    console.log("Entity inserted");
                }
                return [2 /*return*/];
            });
        });
    });
}
//# sourceMappingURL=scraper.js.map