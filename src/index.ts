import axios from 'axios';
import axiosRetry from 'axios-retry';
import { setupCache } from 'axios-cache-adapter'

export class CPCoinNodeApiService {
  host: string = "https://sslapi1.cpcoin.io"
  delayTime: number = 0 
  lastRequestTime: any = new Date()

  api: any

  constructor(host: string = "https://sslapi1.cpcoin.io") {
    this.host = host
    const cache = setupCache({
      maxAge: 5 * 1000
    })

    this.api = axios.create({
      adapter: cache.adapter
    })

    axiosRetry(this.api, {
      retries: 5,
      shouldResetTimeout: true,
      retryDelay: (retryCount: number) => {
        return retryCount * 1000;
      }
    })
  }

  parseData(data: any) {
    let urlParams = ""

    for (let key in data) {
      if (urlParams != "") {
        urlParams += "&";
      }
      urlParams += key + "=" + data[key];
    }

    return urlParams
  }

  request(resolve: Function, reject: Function, urlParams: string, type: string, method: string) {
    this.api({
      method: method,
      url: `${this.host}/api?requestType=${type}&${urlParams}`,
      timeout: 10 * 1000, // seconds * milisecond
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    })
    .then((res: any) => {
      if (res['data']['errorDescription'] && type != 'getAccount') {
        return reject(res['data']['errorDescription'])
      }

      resolve(res['data'])
    })
    .catch((err: any) => {
      reject(err)
    })
  }

  async makeRequest (type: string, data: string, method: string) {
    return new Promise((resolve: Function, reject: Function) => {
      const urlParams = this.parseData(data)

      setTimeout(() => {
        this.request(resolve, reject, urlParams, type, method)
      }, this.delayTime);

      let currentRequestTime: any = new Date()

      if (currentRequestTime - this.lastRequestTime < 100) {
        this.delayTime += 50;
      } else {
        this.delayTime = 0;
      }
      
      this.lastRequestTime = new Date();
    })
  }

  /**
    Account
  **/

  async deleteAccountProperty (data: any) {
    return await this.makeRequest("deleteAccountProperty", data, "POST");
  }

  async getAccount (data: any) {
    return await this.makeRequest("getAccount", data, "GET");
  }

  async getAccountBlockCount (data: any) {
    return await this.makeRequest("getAccountBlockCount", data, "GET");
  }

  async getAccountBlockIds (data: any) {
    return await this.makeRequest("getAccountBlockIds", data, "GET");
  }

  async getAccountBlock (data: any) {
    return await this.makeRequest("getAccountBlock", data, "GET");
  }

  async getAccountId (data: any) {
    return await this.makeRequest("getAccountId", data, "POST");
  }

  async getAccountLessors (data: any) {
    return await this.makeRequest("getAccountLessors", data, "GET");
  }

  async getAccountPublicKey (data: any) {
    return await this.makeRequest("getAccountPublicKey", data, "GET");
  }

  async getBalance (data: any) {
    return await this.makeRequest("getBalance", data, "GET");
  }

  async getGuaranteedBalance (data: any) {
    return await this.makeRequest("getGuaranteedBalance", data, "GET");
  }

  async getUnconfirmedTransactionIds (data: any) {
    return await this.makeRequest("getUnconfirmedTransactionIds", data, "GET");
  }

  async getUnconfirmedTransactions (data: any) {
    return await this.makeRequest("getUnconfirmedTransactions", data, "GET");
  }

  async searchAccounts (data: any) {
    return await this.makeRequest("searchAccounts", data, "GET");
  }

  async sendMoney (data: any) {
    return await this.makeRequest("sendMoney", data, "POST");
  }

  async getBlockchainTransactions (data: any) {
    return await this.makeRequest("getBlockchainTransactions", data, "GET");
  }

  async setAccountInfo (data: any) {
    return await this.makeRequest("setAccountInfo", data, "POST");
  }

  async setAccountProperty (data: any) {
    return await this.makeRequest("setAccountProperty", data, "POST");
  }

  async getAccountAssets (data: any) {
    return await this.makeRequest("getAccountAssets", data, "GET");
  }

  async getAccountCurrencies (data: any) {
    return await this.makeRequest("getAccountCurrencies", data, "GET");
  }

  async getAccountCurrencyCount (data: any) {
    return await this.makeRequest("getAccountCurrencyCount", data, "GET");
  }

  async getAccountAssetCount (data: any) {
    return await this.makeRequest("getAccountAssetCount", data, "GET");
  }

  async getAccountCurrentAskOrderIds (data: any) {
    return await this.makeRequest("getAccountCurrentAskOrderIds", data, "GET");
  }

  async getAccountCurrentBidOrderIds (data: any) {
    return await this.makeRequest("getAccountCurrentBidOrderIds", data, "GET");
  }

  async getAccountCurrentAskOrders (data: any) {
    return await this.makeRequest("getAccountCurrentAskOrders", data, "GET");
  }

  async getAccountCurrentBidOrders (data: any) {
    return await this.makeRequest("getAccountCurrentBidOrders", data, "GET");
  }

  async getAccountExchangeRequests (data: any) {
    return await this.makeRequest("getAccountExchangeRequests", data, "GET");
  }

  async getAllPhasingOnlyControls (data: any) {
    return await this.makeRequest("getAllPhasingOnlyControls", data, "GET");
  }

  async getPhasingOnlyContro (data: any) {
    return await this.makeRequest("getPhasingOnlyContro", data, "GET");
  }

  async setPhasingOnlyControl (data: any) {
    return await this.makeRequest("setPhasingOnlyControl", data, "POST");
  }

  /**
    Aliases
  **/

  async sellAlias (data: any) {
    return await this.makeRequest("sellAlias", data, "POST");
  }

  async deleteAlias (data: any) {
    return await this.makeRequest("deleteAlias", data, "POST");
  }

  async getAlias (data: any) {
    return await this.makeRequest("getAlias", data, "GET");
  }

  async getAliasCount (data: any) {
    return await this.makeRequest("getAliasCount", data, "GET");
  }

  async getAliases (data: any) {
    return await this.makeRequest("getAliases", data, "GET");
  }

  async getAliasesLike (data: any) {
    return await this.makeRequest("getAliasesLike", data, "GET");
  }

  async buyAlias (data: any) {
    return await this.makeRequest("buyAlias", data, "POST");
  }

  async setAlias (data: any) {
    return await this.makeRequest("setAlias", data, "POST");
  }

  async getAliasesPublicOffers (data: any) {
    return await this.makeRequest("getAliasesPublicOffers", data, "GET");
  }

  async getAliasesOpenOffers (data: any) {
    return await this.makeRequest("getAliasesOpenOffers", data, "GET");
  }

  /**
    Assets
  **/

  async cancelBidOrder (data: any) {
    return await this.makeRequest("cancelBidOrder", data, "POST");
  }

  async cancelAskOrder (data: any) {
    return await this.makeRequest("cancelAskOrder", data, "POST");
  }

  async deleteAssetShares (data: any) {
    return await this.makeRequest("deleteAssetShares", data, "POST");
  }

  async dividendPayment (data: any) {
    return await this.makeRequest("dividendPayment", data, "POST");
  }

  async getAllAssets (data: any) {
    return await this.makeRequest("getAllAssets", data, "GET");
  }

  async getAllOpenBidOrders (data: any) {
    return await this.makeRequest("getAllOpenBidOrders", data, "GET");
  }

  async getAllOpenAskOrders (data: any) {
    return await this.makeRequest("getAllOpenAskOrders", data, "GET");
  }

  async getAllTrades (data: any) {
    return await this.makeRequest("getAllTrades", data, "GET");
  }

  async getAsset (data: any) {
    return await this.makeRequest("getAsset", data, "GET");
  }

  async getAssetAccountCount (data: any) {
    return await this.makeRequest("getAssetAccountCount", data, "GET");
  }

  async getAssetAccounts (data: any) {
    return await this.makeRequest("getAssetAccounts", data, "GET");
  }

  async getAssetDeletes (data: any) {
    return await this.makeRequest("getAssetDeletes", data, "GET");
  }

  async getAssetIds (data: any) {
    return await this.makeRequest("getAssetIds", data, "GET");
  }

  async getAssetTransfers (data: any) {
    return await this.makeRequest("getAssetTransfers", data, "GET");
  }

  async getAssets (data: any) {
    return await this.makeRequest("getAssets", data, "GET");
  }

  async getAssetsByIssue (data: any) {
    return await this.makeRequest("getAssetsByIssue", data, "GET");
  }

  async getExpectedAssetDeletes (data: any) {
    return await this.makeRequest("getExpectedAssetDeletes", data, "GET");
  }

  async getExpectedAssetTransfers (data: any) {
    return await this.makeRequest("getExpectedAssetTransfers", data, "GET");
  }

  async getBidOrder (data: any) {
    return await this.makeRequest("getBidOrder", data, "GET");
  }

  async getAskOrder (data: any) {
    return await this.makeRequest("getAskOrder", data, "GET");
  }

  async getBidOrderIds (data: any) {
    return await this.makeRequest("getBidOrderIds", data, "GET");
  }

  async getAskOrderIds (data: any) {
    return await this.makeRequest("getAskOrderIds", data, "GET");
  }

  async getBidOrders (data: any) {
    return await this.makeRequest("getBidOrders", data, "GET");
  }

  async getAskOrders (data: any) {
    return await this.makeRequest("getAskOrders", data, "GET");
  }

  async getExpectedAskOrders (data: any) {
    return await this.makeRequest("getExpectedAskOrders", data, "GET");
  }

  async getExpectedBidOrders (data: any) {
    return await this.makeRequest("getExpectedBidOrders", data, "GET");
  }

  async getExpectedOrderCancellations (data: any) {
    return await this.makeRequest("getExpectedOrderCancellations", data, "GET");
  }

  async getLastTrades (data: any) {
    return await this.makeRequest("getLastTrades", data, "GET");
  }

  async getOrderTrades (data: any) {
    return await this.makeRequest("getOrderTrades", data, "GET");
  }

  async getTrades (data: any) {
    return await this.makeRequest("getTrades", data, "GET");
  }

  async searchAssets (data: any) {
    return await this.makeRequest("searchAssets", data, "GET");
  }

  async getAssetDividends (data: any) {
    return await this.makeRequest("getAssetDividends", data, "GET");
  }

  async issueAsset (data: any) {
    return await this.makeRequest("issueAsset", data, "POST");
  }

  async placeBidOrder (data: any) {
    return await this.makeRequest("placeBidOrder", data, "POST");
  }

  async placeAskOrder (data: any) {
    return await this.makeRequest("placeAskOrder", data, "POST");
  }

  async transferAsset (data: any) {
    return await this.makeRequest("transferAsset", data, "POST");
  }

  /**
    Blocks
  **/

  async getBlock (data: any) {
    return await this.makeRequest("getBlock", data, "GET");
  }

  async getBlockId (data: any) {
    return await this.makeRequest("getBlockId", data, "GET");
  }

  async getBlocks (data: any) {
    return await this.makeRequest("getBlocks", data, "GET");
  }

  /**
    Clinet
  **/

  async getLightClientPing (data: any) {
    return await this.makeRequest("getLightClientPing", data, "GET");  
  }

  async getStatistics (data: any) {
    return await this.makeRequest("getStatistics", data, "GET");  
  }

  async getPeerState (data: any) {
    return await this.makeRequest("getPeerState", data, "GET");  
  }

  async getTransactions (data: any) {
    return await this.makeRequest("getTransactions", data, "GET");  
  }

  async getAccounts (data: any) {
    return await this.makeRequest("getAccounts", data, "GET");  
  }

  async unsignedJSONtoBytes (data: any) {
    return await this.makeRequest("unsignedJSONtoBytes", data, "POST");
  }

  async sendToken (data: any) {
    return await this.makeRequest("sendToken", data, "POST");
  }

  /**
    Contracts (AT)
  **/

  // :(

  /**
    Crowdfunding
  **/

  async getAllCrowdfundings (data: any) {
    return await this.makeRequest("getAllCrowdfundings", data, "GET");  
  }

  /**
    Currencies
  **/

  async getExpectedExchangeRequests (data: any) {
    return await this.makeRequest("getExpectedExchangeRequests", data, "GET");  
  }

  async canDeleteCurrency (data: any) {
    return await this.makeRequest("canDeleteCurrency", data, "GET");  
  }

  async getAllCurrencies (data: any) {
    return await this.makeRequest("getAllCurrencies", data, "GET");  
  }

  async getAllExchanges (data: any) {
    return await this.makeRequest("getAllExchanges", data, "GET");  
  }

  async getAvailableToBuy (data: any) {
    return await this.makeRequest("getAvailableToBuy", data, "GET");  
  }

  async getAvailableToSell (data: any) {
    return await this.makeRequest("getAvailableToSell", data, "GET");  
  }

  async getBuyOffers (data: any) {
    return await this.makeRequest("getBuyOffers", data, "GET");  
  }

  async getSellOffers (data: any) {
    return await this.makeRequest("getSellOffers", data, "GET");  
  }

  async getExpectedBuyOffers (data: any) {
    return await this.makeRequest("getExpectedBuyOffers", data, "GET");  
  }

  async getExpectedSellOffers (data: any) {
    return await this.makeRequest("getExpectedSellOffers", data, "GET");  
  }

  async getCurrency (data: any) {
    return await this.makeRequest("getCurrency", data, "GET");  
  }

  async getCurrencies (data: any) {
    return await this.makeRequest("getCurrencies", data, "GET");  
  }

  async getCurrencyFounders (data: any) {
    return await this.makeRequest("getCurrencyFounders", data, "GET");  
  }

  async getCurrencyIds (data: any) {
    return await this.makeRequest("getCurrencyIds", data, "GET");  
  }

  async getCurrenciesByIssuer (data: any) {
    return await this.makeRequest("getCurrenciesByIssuer", data, "GET");  
  }

  async getCurrencyAccounts (data: any) {
    return await this.makeRequest("getCurrencyAccounts", data, "GET");  
  }

  async getCurrencyAccountCount (data: any) {
    return await this.makeRequest("getCurrencyAccountCount", data, "GET");  
  }

  async getCurrencyTransfers (data: any) {
    return await this.makeRequest("getCurrencyTransfers", data, "GET");  
  }

  async getExpectedCurrencyTransfers (data: any) {
    return await this.makeRequest("getExpectedCurrencyTransfers", data, "GET");  
  }

  async getExchanges (data: any) {
    return await this.makeRequest("getExchanges", data, "GET");  
  }

  async getExchangesByExchangeRequest (data: any) {
    return await this.makeRequest("getExchangesByExchangeRequest", data, "GET");  
  }

  async getExchangesByOffer (data: any) {
    return await this.makeRequest("getExchangesByOffer", data, "GET");  
  }

  async getLastExchanges (data: any) {
    return await this.makeRequest("getLastExchanges", data, "GET");  
  }

  async getOffer (data: any) {
    return await this.makeRequest("getOffer", data, "GET");  
  }

  async searchCurrencies (data: any) {
    return await this.makeRequest("searchCurrencies", data, "GET");  
  }

  async issueCurrency (data: any) {
    return await this.makeRequest("issueCurrency", data, "POST");
  }

  async publishExchangeOffer (data: any) {
    return await this.makeRequest("publishExchangeOffer", data, "POST");
  }

  async currencyBuy (data: any) {
    return await this.makeRequest("currencyBuy", data, "POST");
  }

  async currencySell (data: any) {
    return await this.makeRequest("currencySell", data, "POST");
  }

  async currencyReserveIncrease (data: any) {
    return await this.makeRequest("currencyReserveIncrease", data, "POST");
  }

  async currencyReserveClaim (data: any) {
    return await this.makeRequest("currencyReserveClaim", data, "POST");
  }

  async deleteCurrency (data: any) {
    return await this.makeRequest("deleteCurrency", data, "POST");
  }

  async transferCurrency (data: any) {
    return await this.makeRequest("transferCurrency", data, "POST");
  }

  /**
    Debug
  **/

  async fullReset (data: any) {
    return await this.makeRequest("fullReset", data, "POST");
  }

  async RebroadcastUnconfirmedTransactions (data: any) {
    return await this.makeRequest("RebroadcastUnconfirmedTransactions", data, "POST");
  }

  async requeueUnconfirmedTransactions (data: any) {
    return await this.makeRequest("requeueUnconfirmedTransactions", data, "POST");
  }

  async shutdown (data: any) {
    return await this.makeRequest("shutdown", data, "POST");
  }

  async trimDerivedTables (data: any) {
    return await this.makeRequest("trimDerivedTables", data, "POST");
  }

  async clearUnconfirmedTransactions (data: any) {
    return await this.makeRequest("clearUnconfirmedTransactions", data, "POST");
  }

  async luceneReindex (data: any) {
    return await this.makeRequest("luceneReindex", data, "POST");
  }

  async scan (data: any) {
    return await this.makeRequest("scan", data, "POST");
  }

  async GetAllBroadcastedTransactions (data: any) {
    return await this.makeRequest("GetAllBroadcastedTransactions", data, "GET");
  }

  async getLog (data: any) {
    return await this.makeRequest("getLog", data, "GET");
  }

  async getStackTraces (data: any) {
    return await this.makeRequest("getStackTraces", data, "GET");
  }

  /**
    Escrow
  **/

  async sendMoneyEscrow (data: any) {
    return await this.makeRequest("sendMoneyEscrow", data, "GET");
  }

  async escrowSign (data: any) {
    return await this.makeRequest("escrowSign", data, "GET");
  }

  async getEscrowTransaction (data: any) {
    return await this.makeRequest("getEscrowTransaction", data, "GET");
  }

  async getAccountEscrowTransactions (data: any) {
    return await this.makeRequest("getAccountEscrowTransactions", data, "GET");
  }

  /**
    Forging
  **/

  async startForging (data: any) {
    return await this.makeRequest("startForging", data, "POST");
  }

  async stopForging (data: any) {
    return await this.makeRequest("stopForging", data, "POST");
  }

  async getForging (data: any) {
    return await this.makeRequest("getForging", data, "POST");
  }

  async leaseBalance (data: any) {
    return await this.makeRequest("leaseBalance", data, "POST");
  }


  /**
    Gateways
  **/

  async gatewayIpfs (data: any) {
    return await this.makeRequest("gatewayIpfs", data, "GET");
  }

  async gatewayTenderMint (data: any) {
    return await this.makeRequest("gatewayTenderMint", data, "GET");
  }

  /**
    Hallmark
  **/

  async decodeHallmark (data: any) {
    return await this.makeRequest("decodeHallmark", data, "GET");
  }

  async markHost (data: any) {
    return await this.makeRequest("markHost", data, "POST");
  }

  /**
    Messages
  **/

  async decryptFrom (data: any) {
    return await this.makeRequest("decryptFrom", data, "GET");
  }

  async encryptTo (data: any) {
    return await this.makeRequest("encryptTo", data, "GET");
  }

  async getSharedKey (data: any) {
    return await this.makeRequest("getSharedKey", data, "GET");
  }

  async readMessage (data: any) {
    return await this.makeRequest("readMessage", data, "GET");
  }

  async sendMessage (data: any) {
    return await this.makeRequest("sendMessage", data, "GET");
  }

  /**
    Networking
  **/

  async getInboundPeers (data: any) {
    return await this.makeRequest("getInboundPeers", data, "GET");
  }

  async getMyInfo (data: any) {
    return await this.makeRequest("getMyInfo", data, "GET");
  }

  async getPeer (data: any) {
    return await this.makeRequest("getPeer", data, "GET");
  }

  async getPeers (data: any) {
    return await this.makeRequest("getPeers", data, "GET");
  }

  async dumpPeers (data: any) {
    return await this.makeRequest("dumpPeers", data, "GET");
  }

  async addPeer (data: any) {
    return await this.makeRequest("addPeer", data, "POST");
  }

  async blacklistPeer (data: any) {
    return await this.makeRequest("blacklistPeer", data, "POST");
  }

  /**
    Phasing
  **/

  async getAccountPhasedTransactionCount (data: any) {
    return await this.makeRequest("getAccountPhasedTransactionCount", data, "GET");
  }

  async getAccountPhasedTransactions (data: any) {
    return await this.makeRequest("getAccountPhasedTransactions", data, "GET");
  }

  async getAssetPhasedTransactions (data: any) {
    return await this.makeRequest("getAssetPhasedTransactions", data, "GET");
  }

  async getCurrencyPhasedTransactions (data: any) {
    return await this.makeRequest("getCurrencyPhasedTransactions", data, "GET");
  }

  async getVoterPhasedTransactions (data: any) {
    return await this.makeRequest("getVoterPhasedTransactions", data, "GET");
  }

  async getLinkedPhasedTransactions (data: any) {
    return await this.makeRequest("getLinkedPhasedTransactions", data, "GET");
  }

  async getPhasingPoll (data: any) {
    return await this.makeRequest("getPhasingPoll", data, "GET");
  }

  async getPhasingPollVote (data: any) {
    return await this.makeRequest("getPhasingPollVote", data, "GET");
  }

  async getPhasingPolls (data: any) {
    return await this.makeRequest("getPhasingPolls", data, "GET");
  }

  async getPhasingPollVotes (data: any) {
    return await this.makeRequest("getPhasingPollVotes", data, "GET");
  }

  async approveTransaction (data: any) {
    return await this.makeRequest("approveTransaction", data, "POST");
  }

  /**
    Proxies
  **/

  async proxyBitcoin (data: any) {
    return await this.makeRequest("proxyBitcoin", data, "GET");
  }

  async proxyEthereum (data: any) {
    return await this.makeRequest("proxyEthereum", data, "GET");
  }

  async proxyLiteCoin (data: any) {
    return await this.makeRequest("proxyLiteCoin", data, "GET");
  }

  async proxyRipple (data: any) {
    return await this.makeRequest("proxyRipple", data, "GET");
  }

  async proxyPoloniex (data: any) {
    return await this.makeRequest("proxyPoloniex", data, "GET");
  }


  /**
    Server
  **/

  async getBlockchainStatus (data: any) {
    return await this.makeRequest("getBlockchainStatus", data, "GET");
  }

  async getState (data: any) {
    return await this.makeRequest("getState", data, "GET");
  }

  async getTime (data: any) {
    return await this.makeRequest("getTime", data, "GET");
  }

  async eventRegister (data: any) {
    return await this.makeRequest("eventRegister", data, "GET");
  }

  async eventWait (data: any) {
    return await this.makeRequest("eventWait", data, "POST");
  }

  /**
    Services
  **/

  async getServices (data: any) {
    return await this.makeRequest("getServices", data, "GET");
  }

  /**
    Shuffling
  **/

  async getAccountShufflings (data: any) {
    return await this.makeRequest("getAccountShufflings", data, "GET");
  }

  async getAllShufflings (data: any) {
    return await this.makeRequest("getAllShufflings", data, "GET");
  }

  async getAssignedShufflings (data: any) {
    return await this.makeRequest("getAssignedShufflings", data, "GET");
  }

  async getHoldingShufflings (data: any) {
    return await this.makeRequest("getHoldingShufflings", data, "GET");
  }

  async getShufflers (data: any) {
    return await this.makeRequest("getShufflers", data, "GET");
  }

  async getShuffling (data: any) {
    return await this.makeRequest("getShuffling", data, "GET");
  }

  async getShufflingParticipants (data: any) {
    return await this.makeRequest("getShufflingParticipants", data, "GET");
  }

  async stopShuffler (data: any) {
    return await this.makeRequest("stopShuffler", data, "GET");
  }

  async startShuffler (data: any) {
    return await this.makeRequest("startShuffler", data, "GET");
  }

  async shufflingCancel (data: any) {
    return await this.makeRequest("shufflingCancel", data, "GET");
  }

  async shufflingVerify (data: any) {
    return await this.makeRequest("shufflingVerify", data, "GET");
  }

  async shufflingProcess (data: any) {
    return await this.makeRequest("shufflingProcess", data, "GET");
  }

  async shufflingRegister (data: any) {
    return await this.makeRequest("shufflingRegister", data, "GET");
  }

  async shufflingCreate (data: any) {
    return await this.makeRequest("shufflingCreate", data, "GET");
  }

  /**
    Storage
  **/

  async storageMongoDb (data: any) {
    return await this.makeRequest("storageMongoDb", data, "GET");
  }

  async storageRethinkDb (data: any) {
    return await this.makeRequest("storageRethinkDb", data, "GET");
  }

  async storageMySqlDb (data: any) {
    return await this.makeRequest("storageMySqlDb", data, "GET");
  }

  /**
    Subscriptions
  **/

  async sendMoneySubscription (data: any) {
    return await this.makeRequest("sendMoneySubscription", data, "GET");
  }

  async subscriptionCancel (data: any) {
    return await this.makeRequest("subscriptionCancel", data, "GET");
  }

  async getSubscription (data: any) {
    return await this.makeRequest("getSubscription", data, "GET");
  }

  async getAccountSubscriptions (data: any) {
    return await this.makeRequest("getAccountSubscriptions", data, "GET");
  }

  async getSubscriptionsToAccount (data: any) {
    return await this.makeRequest("getSubscriptionsToAccount", data, "GET");
  }

  /**
    Token
  **/

  async decodeToken (data: any) {
    return await this.makeRequest("decodeToken", data, "GET");
  }

  async generateFileToken (data: any) {
    return await this.makeRequest("generateFileToken", data, "POST");
  }

  async generateToken (data: any) {
    return await this.makeRequest("generateToken", data, "POST");
  }

  async decodeFileToken (data: any) {
    return await this.makeRequest("decodeFileToken", data, "POST");
  }

  /**
    Transactions
  **/

  async getTransaction (data: any) {
    return await this.makeRequest("getTransaction", data, "GET");
  }

  async broadcastTransaction (data: any) {
    return await this.makeRequest("broadcastTransaction", data, "POST");
  }

  async calculateFullHash (data: any) {
    return await this.makeRequest("calculateFullHash", data, "GET");
  }

  async getExpectedTransactions (data: any) {
    return await this.makeRequest("getExpectedTransactions", data, "GET");
  }

  async getReferencingTransactions (data: any) {
    return await this.makeRequest("getReferencingTransactions", data, "GET");
  }

  async getTransactionBytes (data: any) {
    return await this.makeRequest("getTransactionBytes", data, "GET");
  }

  async parseTransaction (data: any) {
    return await this.makeRequest("parseTransaction", data, "GET");
  }

  async signTransaction (data: any) {
    return await this.makeRequest("signTransaction", data, "GET");
  }

  /**
    Utilities
  **/

  async encodeQRCode (data: any) {
    return await this.makeRequest("encodeQRCode", data, "POST");
  }

  async decodeQRCode (data: any) {
    return await this.makeRequest("decodeQRCode", data, "POST");
  }

  async fullHashToId (data: any) {
    return await this.makeRequest("fullHashToId", data, "GET");
  }

  async longConvert (data: any) {
    return await this.makeRequest("longConvert", data, "GET");
  }

  async hexConvert (data: any) {
    return await this.makeRequest("hexConvert", data, "GET");
  }

  async rsConvert (data: any) {
    return await this.makeRequest("rsConvert", data, "GET");
  }

  async hash (data: any) {
    return await this.makeRequest("hash", data, "GET");
  }

  /**
    Voting
  **/

  async castVote (data: any) {
    return await this.makeRequest("castVote", data, "POST");
  }

  async createPoll (data: any) {
    return await this.makeRequest("createPoll", data, "POST");
  }

  async getPoll (data: any) {
    return await this.makeRequest("getPoll", data, "GET");
  }

  async getAllPolls (data: any) {
    return await this.makeRequest("getAllPolls", data, "GET");
  }

  async getPollResult (data: any) {
    return await this.makeRequest("getPollResult", data, "GET");
  }

  async getPollVotes (data: any) {
    return await this.makeRequest("getPollVotes", data, "GET");
  }

  async getPollVote (data: any) {
    return await this.makeRequest("getPollVote", data, "GET");
  }

  async getPolls (data: any) {
    return await this.makeRequest("getPolls", data, "GET");
  }

  async searchPolls (data: any) {
    return await this.makeRequest("searchPolls", data, "GET");
  }
}
