"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPCoinNodeApiService = void 0;
const axios_1 = require("axios");
const axios_retry_1 = require("axios-retry");
const axios_cache_adapter_1 = require("axios-cache-adapter");
class CPCoinNodeApiService {
    constructor(host = "https://sslapi1.cpcoin.io") {
        this.host = "https://sslapi1.cpcoin.io";
        this.delayTime = 0;
        this.lastRequestTime = new Date();
        this.host = host;
        const cache = (0, axios_cache_adapter_1.setupCache)({
            maxAge: 5 * 1000
        });
        this.api = axios_1.default.create({
            adapter: cache.adapter
        });
        (0, axios_retry_1.default)(this.api, {
            retries: 5,
            shouldResetTimeout: true,
            retryDelay: (retryCount) => {
                return retryCount * 1000;
            }
        });
    }
    parseData(data) {
        let urlParams = "";
        for (let key in data) {
            if (urlParams != "") {
                urlParams += "&";
            }
            urlParams += key + "=" + data[key];
        }
        return urlParams;
    }
    request(resolve, reject, urlParams, type, method) {
        this.api({
            method: method,
            url: `${this.host}/api?requestType=${type}&${urlParams}`,
            timeout: 10 * 1000,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
            .then((res) => {
            if (res['data']['errorDescription'] && type != 'getAccount') {
                return reject(res['data']['errorDescription']);
            }
            resolve(res['data']);
        })
            .catch((err) => {
            reject(err);
        });
    }
    makeRequest(type, data, method) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const urlParams = this.parseData(data);
                setTimeout(() => {
                    this.request(resolve, reject, urlParams, type, method);
                }, this.delayTime);
                let currentRequestTime = new Date();
                if (currentRequestTime - this.lastRequestTime < 100) {
                    this.delayTime += 50;
                }
                else {
                    this.delayTime = 0;
                }
                this.lastRequestTime = new Date();
            });
        });
    }
    /**
      Account
    **/
    deleteAccountProperty(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("deleteAccountProperty", data, "POST");
        });
    }
    getAccount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccount", data, "GET");
        });
    }
    getAccountBlockCount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountBlockCount", data, "GET");
        });
    }
    getAccountBlockIds(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountBlockIds", data, "GET");
        });
    }
    getAccountBlock(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountBlock", data, "GET");
        });
    }
    getAccountId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountId", data, "POST");
        });
    }
    getAccountLessors(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountLessors", data, "GET");
        });
    }
    getAccountPublicKey(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountPublicKey", data, "GET");
        });
    }
    getBalance(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getBalance", data, "GET");
        });
    }
    getGuaranteedBalance(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getGuaranteedBalance", data, "GET");
        });
    }
    getUnconfirmedTransactionIds(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getUnconfirmedTransactionIds", data, "GET");
        });
    }
    getUnconfirmedTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getUnconfirmedTransactions", data, "GET");
        });
    }
    searchAccounts(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("searchAccounts", data, "GET");
        });
    }
    sendMoney(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("sendMoney", data, "POST");
        });
    }
    getBlockchainTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getBlockchainTransactions", data, "GET");
        });
    }
    setAccountInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("setAccountInfo", data, "POST");
        });
    }
    setAccountProperty(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("setAccountProperty", data, "POST");
        });
    }
    getAccountAssets(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountAssets", data, "GET");
        });
    }
    getAccountCurrencies(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountCurrencies", data, "GET");
        });
    }
    getAccountCurrencyCount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountCurrencyCount", data, "GET");
        });
    }
    getAccountAssetCount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountAssetCount", data, "GET");
        });
    }
    getAccountCurrentAskOrderIds(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountCurrentAskOrderIds", data, "GET");
        });
    }
    getAccountCurrentBidOrderIds(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountCurrentBidOrderIds", data, "GET");
        });
    }
    getAccountCurrentAskOrders(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountCurrentAskOrders", data, "GET");
        });
    }
    getAccountCurrentBidOrders(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountCurrentBidOrders", data, "GET");
        });
    }
    getAccountExchangeRequests(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountExchangeRequests", data, "GET");
        });
    }
    getAllPhasingOnlyControls(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAllPhasingOnlyControls", data, "GET");
        });
    }
    getPhasingOnlyContro(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getPhasingOnlyContro", data, "GET");
        });
    }
    setPhasingOnlyControl(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("setPhasingOnlyControl", data, "POST");
        });
    }
    /**
      Aliases
    **/
    sellAlias(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("sellAlias", data, "POST");
        });
    }
    deleteAlias(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("deleteAlias", data, "POST");
        });
    }
    getAlias(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAlias", data, "GET");
        });
    }
    getAliasCount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAliasCount", data, "GET");
        });
    }
    getAliases(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAliases", data, "GET");
        });
    }
    getAliasesLike(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAliasesLike", data, "GET");
        });
    }
    buyAlias(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("buyAlias", data, "POST");
        });
    }
    setAlias(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("setAlias", data, "POST");
        });
    }
    getAliasesPublicOffers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAliasesPublicOffers", data, "GET");
        });
    }
    getAliasesOpenOffers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAliasesOpenOffers", data, "GET");
        });
    }
    /**
      Assets
    **/
    cancelBidOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("cancelBidOrder", data, "POST");
        });
    }
    cancelAskOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("cancelAskOrder", data, "POST");
        });
    }
    deleteAssetShares(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("deleteAssetShares", data, "POST");
        });
    }
    dividendPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("dividendPayment", data, "POST");
        });
    }
    getAllAssets(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAllAssets", data, "GET");
        });
    }
    getAllOpenBidOrders(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAllOpenBidOrders", data, "GET");
        });
    }
    getAllOpenAskOrders(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAllOpenAskOrders", data, "GET");
        });
    }
    getAllTrades(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAllTrades", data, "GET");
        });
    }
    getAsset(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAsset", data, "GET");
        });
    }
    getAssetAccountCount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAssetAccountCount", data, "GET");
        });
    }
    getAssetAccounts(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAssetAccounts", data, "GET");
        });
    }
    getAssetDeletes(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAssetDeletes", data, "GET");
        });
    }
    getAssetIds(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAssetIds", data, "GET");
        });
    }
    getAssetTransfers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAssetTransfers", data, "GET");
        });
    }
    getAssets(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAssets", data, "GET");
        });
    }
    getAssetsByIssue(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAssetsByIssue", data, "GET");
        });
    }
    getExpectedAssetDeletes(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getExpectedAssetDeletes", data, "GET");
        });
    }
    getExpectedAssetTransfers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getExpectedAssetTransfers", data, "GET");
        });
    }
    getBidOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getBidOrder", data, "GET");
        });
    }
    getAskOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAskOrder", data, "GET");
        });
    }
    getBidOrderIds(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getBidOrderIds", data, "GET");
        });
    }
    getAskOrderIds(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAskOrderIds", data, "GET");
        });
    }
    getBidOrders(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getBidOrders", data, "GET");
        });
    }
    getAskOrders(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAskOrders", data, "GET");
        });
    }
    getExpectedAskOrders(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getExpectedAskOrders", data, "GET");
        });
    }
    getExpectedBidOrders(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getExpectedBidOrders", data, "GET");
        });
    }
    getExpectedOrderCancellations(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getExpectedOrderCancellations", data, "GET");
        });
    }
    getLastTrades(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getLastTrades", data, "GET");
        });
    }
    getOrderTrades(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getOrderTrades", data, "GET");
        });
    }
    getTrades(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getTrades", data, "GET");
        });
    }
    searchAssets(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("searchAssets", data, "GET");
        });
    }
    getAssetDividends(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAssetDividends", data, "GET");
        });
    }
    issueAsset(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("issueAsset", data, "POST");
        });
    }
    placeBidOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("placeBidOrder", data, "POST");
        });
    }
    placeAskOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("placeAskOrder", data, "POST");
        });
    }
    transferAsset(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("transferAsset", data, "POST");
        });
    }
    /**
      Blocks
    **/
    getBlock(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getBlock", data, "GET");
        });
    }
    getBlockId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getBlockId", data, "GET");
        });
    }
    getBlocks(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getBlocks", data, "GET");
        });
    }
    /**
      Clinet
    **/
    getLightClientPing(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getLightClientPing", data, "GET");
        });
    }
    getStatistics(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getStatistics", data, "GET");
        });
    }
    getPeerState(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getPeerState", data, "GET");
        });
    }
    getTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getTransactions", data, "GET");
        });
    }
    getAccounts(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccounts", data, "GET");
        });
    }
    unsignedJSONtoBytes(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("unsignedJSONtoBytes", data, "POST");
        });
    }
    sendToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("sendToken", data, "POST");
        });
    }
    /**
      Contracts (AT)
    **/
    // :(
    /**
      Crowdfunding
    **/
    getAllCrowdfundings(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAllCrowdfundings", data, "GET");
        });
    }
    /**
      Currencies
    **/
    getExpectedExchangeRequests(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getExpectedExchangeRequests", data, "GET");
        });
    }
    canDeleteCurrency(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("canDeleteCurrency", data, "GET");
        });
    }
    getAllCurrencies(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAllCurrencies", data, "GET");
        });
    }
    getAllExchanges(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAllExchanges", data, "GET");
        });
    }
    getAvailableToBuy(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAvailableToBuy", data, "GET");
        });
    }
    getAvailableToSell(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAvailableToSell", data, "GET");
        });
    }
    getBuyOffers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getBuyOffers", data, "GET");
        });
    }
    getSellOffers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getSellOffers", data, "GET");
        });
    }
    getExpectedBuyOffers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getExpectedBuyOffers", data, "GET");
        });
    }
    getExpectedSellOffers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getExpectedSellOffers", data, "GET");
        });
    }
    getCurrency(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getCurrency", data, "GET");
        });
    }
    getCurrencies(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getCurrencies", data, "GET");
        });
    }
    getCurrencyFounders(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getCurrencyFounders", data, "GET");
        });
    }
    getCurrencyIds(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getCurrencyIds", data, "GET");
        });
    }
    getCurrenciesByIssuer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getCurrenciesByIssuer", data, "GET");
        });
    }
    getCurrencyAccounts(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getCurrencyAccounts", data, "GET");
        });
    }
    getCurrencyAccountCount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getCurrencyAccountCount", data, "GET");
        });
    }
    getCurrencyTransfers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getCurrencyTransfers", data, "GET");
        });
    }
    getExpectedCurrencyTransfers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getExpectedCurrencyTransfers", data, "GET");
        });
    }
    getExchanges(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getExchanges", data, "GET");
        });
    }
    getExchangesByExchangeRequest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getExchangesByExchangeRequest", data, "GET");
        });
    }
    getExchangesByOffer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getExchangesByOffer", data, "GET");
        });
    }
    getLastExchanges(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getLastExchanges", data, "GET");
        });
    }
    getOffer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getOffer", data, "GET");
        });
    }
    searchCurrencies(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("searchCurrencies", data, "GET");
        });
    }
    issueCurrency(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("issueCurrency", data, "POST");
        });
    }
    publishExchangeOffer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("publishExchangeOffer", data, "POST");
        });
    }
    currencyBuy(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("currencyBuy", data, "POST");
        });
    }
    currencySell(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("currencySell", data, "POST");
        });
    }
    currencyReserveIncrease(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("currencyReserveIncrease", data, "POST");
        });
    }
    currencyReserveClaim(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("currencyReserveClaim", data, "POST");
        });
    }
    deleteCurrency(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("deleteCurrency", data, "POST");
        });
    }
    transferCurrency(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("transferCurrency", data, "POST");
        });
    }
    /**
      Debug
    **/
    fullReset(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("fullReset", data, "POST");
        });
    }
    RebroadcastUnconfirmedTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("RebroadcastUnconfirmedTransactions", data, "POST");
        });
    }
    requeueUnconfirmedTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("requeueUnconfirmedTransactions", data, "POST");
        });
    }
    shutdown(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("shutdown", data, "POST");
        });
    }
    trimDerivedTables(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("trimDerivedTables", data, "POST");
        });
    }
    clearUnconfirmedTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("clearUnconfirmedTransactions", data, "POST");
        });
    }
    luceneReindex(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("luceneReindex", data, "POST");
        });
    }
    scan(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("scan", data, "POST");
        });
    }
    GetAllBroadcastedTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("GetAllBroadcastedTransactions", data, "GET");
        });
    }
    getLog(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getLog", data, "GET");
        });
    }
    getStackTraces(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getStackTraces", data, "GET");
        });
    }
    /**
      Escrow
    **/
    sendMoneyEscrow(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("sendMoneyEscrow", data, "GET");
        });
    }
    escrowSign(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("escrowSign", data, "GET");
        });
    }
    getEscrowTransaction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getEscrowTransaction", data, "GET");
        });
    }
    getAccountEscrowTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountEscrowTransactions", data, "GET");
        });
    }
    /**
      Forging
    **/
    startForging(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("startForging", data, "POST");
        });
    }
    stopForging(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("stopForging", data, "POST");
        });
    }
    getForging(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getForging", data, "POST");
        });
    }
    leaseBalance(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("leaseBalance", data, "POST");
        });
    }
    /**
      Gateways
    **/
    gatewayIpfs(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("gatewayIpfs", data, "GET");
        });
    }
    gatewayTenderMint(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("gatewayTenderMint", data, "GET");
        });
    }
    /**
      Hallmark
    **/
    decodeHallmark(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("decodeHallmark", data, "GET");
        });
    }
    markHost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("markHost", data, "POST");
        });
    }
    /**
      Messages
    **/
    decryptFrom(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("decryptFrom", data, "GET");
        });
    }
    encryptTo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("encryptTo", data, "GET");
        });
    }
    getSharedKey(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getSharedKey", data, "GET");
        });
    }
    readMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("readMessage", data, "GET");
        });
    }
    sendMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("sendMessage", data, "GET");
        });
    }
    /**
      Networking
    **/
    getInboundPeers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getInboundPeers", data, "GET");
        });
    }
    getMyInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getMyInfo", data, "GET");
        });
    }
    getPeer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getPeer", data, "GET");
        });
    }
    getPeers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getPeers", data, "GET");
        });
    }
    dumpPeers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("dumpPeers", data, "GET");
        });
    }
    addPeer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("addPeer", data, "POST");
        });
    }
    blacklistPeer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("blacklistPeer", data, "POST");
        });
    }
    /**
      Phasing
    **/
    getAccountPhasedTransactionCount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountPhasedTransactionCount", data, "GET");
        });
    }
    getAccountPhasedTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountPhasedTransactions", data, "GET");
        });
    }
    getAssetPhasedTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAssetPhasedTransactions", data, "GET");
        });
    }
    getCurrencyPhasedTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getCurrencyPhasedTransactions", data, "GET");
        });
    }
    getVoterPhasedTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getVoterPhasedTransactions", data, "GET");
        });
    }
    getLinkedPhasedTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getLinkedPhasedTransactions", data, "GET");
        });
    }
    getPhasingPoll(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getPhasingPoll", data, "GET");
        });
    }
    getPhasingPollVote(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getPhasingPollVote", data, "GET");
        });
    }
    getPhasingPolls(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getPhasingPolls", data, "GET");
        });
    }
    getPhasingPollVotes(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getPhasingPollVotes", data, "GET");
        });
    }
    approveTransaction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("approveTransaction", data, "POST");
        });
    }
    /**
      Proxies
    **/
    proxyBitcoin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("proxyBitcoin", data, "GET");
        });
    }
    proxyEthereum(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("proxyEthereum", data, "GET");
        });
    }
    proxyLiteCoin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("proxyLiteCoin", data, "GET");
        });
    }
    proxyRipple(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("proxyRipple", data, "GET");
        });
    }
    proxyPoloniex(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("proxyPoloniex", data, "GET");
        });
    }
    /**
      Server
    **/
    getBlockchainStatus(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getBlockchainStatus", data, "GET");
        });
    }
    getState(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getState", data, "GET");
        });
    }
    getTime(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getTime", data, "GET");
        });
    }
    eventRegister(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("eventRegister", data, "GET");
        });
    }
    eventWait(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("eventWait", data, "POST");
        });
    }
    /**
      Services
    **/
    getServices(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getServices", data, "GET");
        });
    }
    /**
      Shuffling
    **/
    getAccountShufflings(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountShufflings", data, "GET");
        });
    }
    getAllShufflings(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAllShufflings", data, "GET");
        });
    }
    getAssignedShufflings(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAssignedShufflings", data, "GET");
        });
    }
    getHoldingShufflings(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getHoldingShufflings", data, "GET");
        });
    }
    getShufflers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getShufflers", data, "GET");
        });
    }
    getShuffling(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getShuffling", data, "GET");
        });
    }
    getShufflingParticipants(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getShufflingParticipants", data, "GET");
        });
    }
    stopShuffler(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("stopShuffler", data, "GET");
        });
    }
    startShuffler(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("startShuffler", data, "GET");
        });
    }
    shufflingCancel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("shufflingCancel", data, "GET");
        });
    }
    shufflingVerify(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("shufflingVerify", data, "GET");
        });
    }
    shufflingProcess(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("shufflingProcess", data, "GET");
        });
    }
    shufflingRegister(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("shufflingRegister", data, "GET");
        });
    }
    shufflingCreate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("shufflingCreate", data, "GET");
        });
    }
    /**
      Storage
    **/
    storageMongoDb(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("storageMongoDb", data, "GET");
        });
    }
    storageRethinkDb(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("storageRethinkDb", data, "GET");
        });
    }
    storageMySqlDb(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("storageMySqlDb", data, "GET");
        });
    }
    /**
      Subscriptions
    **/
    sendMoneySubscription(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("sendMoneySubscription", data, "GET");
        });
    }
    subscriptionCancel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("subscriptionCancel", data, "GET");
        });
    }
    getSubscription(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getSubscription", data, "GET");
        });
    }
    getAccountSubscriptions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAccountSubscriptions", data, "GET");
        });
    }
    getSubscriptionsToAccount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getSubscriptionsToAccount", data, "GET");
        });
    }
    /**
      Token
    **/
    decodeToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("decodeToken", data, "GET");
        });
    }
    generateFileToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("generateFileToken", data, "POST");
        });
    }
    generateToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("generateToken", data, "POST");
        });
    }
    decodeFileToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("decodeFileToken", data, "POST");
        });
    }
    /**
      Transactions
    **/
    getTransaction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getTransaction", data, "GET");
        });
    }
    broadcastTransaction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("broadcastTransaction", data, "POST");
        });
    }
    calculateFullHash(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("calculateFullHash", data, "GET");
        });
    }
    getExpectedTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getExpectedTransactions", data, "GET");
        });
    }
    getReferencingTransactions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getReferencingTransactions", data, "GET");
        });
    }
    getTransactionBytes(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getTransactionBytes", data, "GET");
        });
    }
    parseTransaction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("parseTransaction", data, "GET");
        });
    }
    signTransaction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("signTransaction", data, "GET");
        });
    }
    /**
      Utilities
    **/
    encodeQRCode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("encodeQRCode", data, "POST");
        });
    }
    decodeQRCode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("decodeQRCode", data, "POST");
        });
    }
    fullHashToId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("fullHashToId", data, "GET");
        });
    }
    longConvert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("longConvert", data, "GET");
        });
    }
    hexConvert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("hexConvert", data, "GET");
        });
    }
    rsConvert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("rsConvert", data, "GET");
        });
    }
    hash(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("hash", data, "GET");
        });
    }
    /**
      Voting
    **/
    castVote(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("castVote", data, "POST");
        });
    }
    createPoll(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("createPoll", data, "POST");
        });
    }
    getPoll(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getPoll", data, "GET");
        });
    }
    getAllPolls(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getAllPolls", data, "GET");
        });
    }
    getPollResult(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getPollResult", data, "GET");
        });
    }
    getPollVotes(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getPollVotes", data, "GET");
        });
    }
    getPollVote(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getPollVote", data, "GET");
        });
    }
    getPolls(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("getPolls", data, "GET");
        });
    }
    searchPolls(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest("searchPolls", data, "GET");
        });
    }
}
exports.CPCoinNodeApiService = CPCoinNodeApiService;
