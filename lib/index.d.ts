export declare class CPCoinNodeApiService {
    host: string;
    delayTime: number;
    lastRequestTime: any;
    api: any;
    constructor(host?: string);
    parseData(data: any): string;
    request(resolve: Function, reject: Function, urlParams: string, type: string, method: string): void;
    makeRequest(type: string, data: string, method: string): Promise<unknown>;
    /**
      Account
    **/
    deleteAccountProperty(data: any): Promise<unknown>;
    getAccount(data: any): Promise<unknown>;
    getAccountBlockCount(data: any): Promise<unknown>;
    getAccountBlockIds(data: any): Promise<unknown>;
    getAccountBlock(data: any): Promise<unknown>;
    getAccountId(data: any): Promise<unknown>;
    getAccountLessors(data: any): Promise<unknown>;
    getAccountPublicKey(data: any): Promise<unknown>;
    getBalance(data: any): Promise<unknown>;
    getGuaranteedBalance(data: any): Promise<unknown>;
    getUnconfirmedTransactionIds(data: any): Promise<unknown>;
    getUnconfirmedTransactions(data: any): Promise<unknown>;
    searchAccounts(data: any): Promise<unknown>;
    sendMoney(data: any): Promise<unknown>;
    getBlockchainTransactions(data: any): Promise<unknown>;
    setAccountInfo(data: any): Promise<unknown>;
    setAccountProperty(data: any): Promise<unknown>;
    getAccountAssets(data: any): Promise<unknown>;
    getAccountCurrencies(data: any): Promise<unknown>;
    getAccountCurrencyCount(data: any): Promise<unknown>;
    getAccountAssetCount(data: any): Promise<unknown>;
    getAccountCurrentAskOrderIds(data: any): Promise<unknown>;
    getAccountCurrentBidOrderIds(data: any): Promise<unknown>;
    getAccountCurrentAskOrders(data: any): Promise<unknown>;
    getAccountCurrentBidOrders(data: any): Promise<unknown>;
    getAccountExchangeRequests(data: any): Promise<unknown>;
    getAllPhasingOnlyControls(data: any): Promise<unknown>;
    getPhasingOnlyContro(data: any): Promise<unknown>;
    setPhasingOnlyControl(data: any): Promise<unknown>;
    /**
      Aliases
    **/
    sellAlias(data: any): Promise<unknown>;
    deleteAlias(data: any): Promise<unknown>;
    getAlias(data: any): Promise<unknown>;
    getAliasCount(data: any): Promise<unknown>;
    getAliases(data: any): Promise<unknown>;
    getAliasesLike(data: any): Promise<unknown>;
    buyAlias(data: any): Promise<unknown>;
    setAlias(data: any): Promise<unknown>;
    getAliasesPublicOffers(data: any): Promise<unknown>;
    getAliasesOpenOffers(data: any): Promise<unknown>;
    /**
      Assets
    **/
    cancelBidOrder(data: any): Promise<unknown>;
    cancelAskOrder(data: any): Promise<unknown>;
    deleteAssetShares(data: any): Promise<unknown>;
    dividendPayment(data: any): Promise<unknown>;
    getAllAssets(data: any): Promise<unknown>;
    getAllOpenBidOrders(data: any): Promise<unknown>;
    getAllOpenAskOrders(data: any): Promise<unknown>;
    getAllTrades(data: any): Promise<unknown>;
    getAsset(data: any): Promise<unknown>;
    getAssetAccountCount(data: any): Promise<unknown>;
    getAssetAccounts(data: any): Promise<unknown>;
    getAssetDeletes(data: any): Promise<unknown>;
    getAssetIds(data: any): Promise<unknown>;
    getAssetTransfers(data: any): Promise<unknown>;
    getAssets(data: any): Promise<unknown>;
    getAssetsByIssue(data: any): Promise<unknown>;
    getExpectedAssetDeletes(data: any): Promise<unknown>;
    getExpectedAssetTransfers(data: any): Promise<unknown>;
    getBidOrder(data: any): Promise<unknown>;
    getAskOrder(data: any): Promise<unknown>;
    getBidOrderIds(data: any): Promise<unknown>;
    getAskOrderIds(data: any): Promise<unknown>;
    getBidOrders(data: any): Promise<unknown>;
    getAskOrders(data: any): Promise<unknown>;
    getExpectedAskOrders(data: any): Promise<unknown>;
    getExpectedBidOrders(data: any): Promise<unknown>;
    getExpectedOrderCancellations(data: any): Promise<unknown>;
    getLastTrades(data: any): Promise<unknown>;
    getOrderTrades(data: any): Promise<unknown>;
    getTrades(data: any): Promise<unknown>;
    searchAssets(data: any): Promise<unknown>;
    getAssetDividends(data: any): Promise<unknown>;
    issueAsset(data: any): Promise<unknown>;
    placeBidOrder(data: any): Promise<unknown>;
    placeAskOrder(data: any): Promise<unknown>;
    transferAsset(data: any): Promise<unknown>;
    /**
      Blocks
    **/
    getBlock(data: any): Promise<unknown>;
    getBlockId(data: any): Promise<unknown>;
    getBlocks(data: any): Promise<unknown>;
    /**
      Clinet
    **/
    getLightClientPing(data: any): Promise<unknown>;
    getStatistics(data: any): Promise<unknown>;
    getPeerState(data: any): Promise<unknown>;
    getTransactions(data: any): Promise<unknown>;
    getAccounts(data: any): Promise<unknown>;
    unsignedJSONtoBytes(data: any): Promise<unknown>;
    sendToken(data: any): Promise<unknown>;
    /**
      Contracts (AT)
    **/
    /**
      Crowdfunding
    **/
    getAllCrowdfundings(data: any): Promise<unknown>;
    /**
      Currencies
    **/
    getExpectedExchangeRequests(data: any): Promise<unknown>;
    canDeleteCurrency(data: any): Promise<unknown>;
    getAllCurrencies(data: any): Promise<unknown>;
    getAllExchanges(data: any): Promise<unknown>;
    getAvailableToBuy(data: any): Promise<unknown>;
    getAvailableToSell(data: any): Promise<unknown>;
    getBuyOffers(data: any): Promise<unknown>;
    getSellOffers(data: any): Promise<unknown>;
    getExpectedBuyOffers(data: any): Promise<unknown>;
    getExpectedSellOffers(data: any): Promise<unknown>;
    getCurrency(data: any): Promise<unknown>;
    getCurrencies(data: any): Promise<unknown>;
    getCurrencyFounders(data: any): Promise<unknown>;
    getCurrencyIds(data: any): Promise<unknown>;
    getCurrenciesByIssuer(data: any): Promise<unknown>;
    getCurrencyAccounts(data: any): Promise<unknown>;
    getCurrencyAccountCount(data: any): Promise<unknown>;
    getCurrencyTransfers(data: any): Promise<unknown>;
    getExpectedCurrencyTransfers(data: any): Promise<unknown>;
    getExchanges(data: any): Promise<unknown>;
    getExchangesByExchangeRequest(data: any): Promise<unknown>;
    getExchangesByOffer(data: any): Promise<unknown>;
    getLastExchanges(data: any): Promise<unknown>;
    getOffer(data: any): Promise<unknown>;
    searchCurrencies(data: any): Promise<unknown>;
    issueCurrency(data: any): Promise<unknown>;
    publishExchangeOffer(data: any): Promise<unknown>;
    currencyBuy(data: any): Promise<unknown>;
    currencySell(data: any): Promise<unknown>;
    currencyReserveIncrease(data: any): Promise<unknown>;
    currencyReserveClaim(data: any): Promise<unknown>;
    deleteCurrency(data: any): Promise<unknown>;
    transferCurrency(data: any): Promise<unknown>;
    /**
      Debug
    **/
    fullReset(data: any): Promise<unknown>;
    RebroadcastUnconfirmedTransactions(data: any): Promise<unknown>;
    requeueUnconfirmedTransactions(data: any): Promise<unknown>;
    shutdown(data: any): Promise<unknown>;
    trimDerivedTables(data: any): Promise<unknown>;
    clearUnconfirmedTransactions(data: any): Promise<unknown>;
    luceneReindex(data: any): Promise<unknown>;
    scan(data: any): Promise<unknown>;
    GetAllBroadcastedTransactions(data: any): Promise<unknown>;
    getLog(data: any): Promise<unknown>;
    getStackTraces(data: any): Promise<unknown>;
    /**
      Escrow
    **/
    sendMoneyEscrow(data: any): Promise<unknown>;
    escrowSign(data: any): Promise<unknown>;
    getEscrowTransaction(data: any): Promise<unknown>;
    getAccountEscrowTransactions(data: any): Promise<unknown>;
    /**
      Forging
    **/
    startForging(data: any): Promise<unknown>;
    stopForging(data: any): Promise<unknown>;
    getForging(data: any): Promise<unknown>;
    leaseBalance(data: any): Promise<unknown>;
    /**
      Gateways
    **/
    gatewayIpfs(data: any): Promise<unknown>;
    gatewayTenderMint(data: any): Promise<unknown>;
    /**
      Hallmark
    **/
    decodeHallmark(data: any): Promise<unknown>;
    markHost(data: any): Promise<unknown>;
    /**
      Messages
    **/
    decryptFrom(data: any): Promise<unknown>;
    encryptTo(data: any): Promise<unknown>;
    getSharedKey(data: any): Promise<unknown>;
    readMessage(data: any): Promise<unknown>;
    sendMessage(data: any): Promise<unknown>;
    /**
      Networking
    **/
    getInboundPeers(data: any): Promise<unknown>;
    getMyInfo(data: any): Promise<unknown>;
    getPeer(data: any): Promise<unknown>;
    getPeers(data: any): Promise<unknown>;
    dumpPeers(data: any): Promise<unknown>;
    addPeer(data: any): Promise<unknown>;
    blacklistPeer(data: any): Promise<unknown>;
    /**
      Phasing
    **/
    getAccountPhasedTransactionCount(data: any): Promise<unknown>;
    getAccountPhasedTransactions(data: any): Promise<unknown>;
    getAssetPhasedTransactions(data: any): Promise<unknown>;
    getCurrencyPhasedTransactions(data: any): Promise<unknown>;
    getVoterPhasedTransactions(data: any): Promise<unknown>;
    getLinkedPhasedTransactions(data: any): Promise<unknown>;
    getPhasingPoll(data: any): Promise<unknown>;
    getPhasingPollVote(data: any): Promise<unknown>;
    getPhasingPolls(data: any): Promise<unknown>;
    getPhasingPollVotes(data: any): Promise<unknown>;
    approveTransaction(data: any): Promise<unknown>;
    /**
      Proxies
    **/
    proxyBitcoin(data: any): Promise<unknown>;
    proxyEthereum(data: any): Promise<unknown>;
    proxyLiteCoin(data: any): Promise<unknown>;
    proxyRipple(data: any): Promise<unknown>;
    proxyPoloniex(data: any): Promise<unknown>;
    /**
      Server
    **/
    getBlockchainStatus(data: any): Promise<unknown>;
    getState(data: any): Promise<unknown>;
    getTime(data: any): Promise<unknown>;
    eventRegister(data: any): Promise<unknown>;
    eventWait(data: any): Promise<unknown>;
    /**
      Services
    **/
    getServices(data: any): Promise<unknown>;
    /**
      Shuffling
    **/
    getAccountShufflings(data: any): Promise<unknown>;
    getAllShufflings(data: any): Promise<unknown>;
    getAssignedShufflings(data: any): Promise<unknown>;
    getHoldingShufflings(data: any): Promise<unknown>;
    getShufflers(data: any): Promise<unknown>;
    getShuffling(data: any): Promise<unknown>;
    getShufflingParticipants(data: any): Promise<unknown>;
    stopShuffler(data: any): Promise<unknown>;
    startShuffler(data: any): Promise<unknown>;
    shufflingCancel(data: any): Promise<unknown>;
    shufflingVerify(data: any): Promise<unknown>;
    shufflingProcess(data: any): Promise<unknown>;
    shufflingRegister(data: any): Promise<unknown>;
    shufflingCreate(data: any): Promise<unknown>;
    /**
      Storage
    **/
    storageMongoDb(data: any): Promise<unknown>;
    storageRethinkDb(data: any): Promise<unknown>;
    storageMySqlDb(data: any): Promise<unknown>;
    /**
      Subscriptions
    **/
    sendMoneySubscription(data: any): Promise<unknown>;
    subscriptionCancel(data: any): Promise<unknown>;
    getSubscription(data: any): Promise<unknown>;
    getAccountSubscriptions(data: any): Promise<unknown>;
    getSubscriptionsToAccount(data: any): Promise<unknown>;
    /**
      Token
    **/
    decodeToken(data: any): Promise<unknown>;
    generateFileToken(data: any): Promise<unknown>;
    generateToken(data: any): Promise<unknown>;
    decodeFileToken(data: any): Promise<unknown>;
    /**
      Transactions
    **/
    getTransaction(data: any): Promise<unknown>;
    broadcastTransaction(data: any): Promise<unknown>;
    calculateFullHash(data: any): Promise<unknown>;
    getExpectedTransactions(data: any): Promise<unknown>;
    getReferencingTransactions(data: any): Promise<unknown>;
    getTransactionBytes(data: any): Promise<unknown>;
    parseTransaction(data: any): Promise<unknown>;
    signTransaction(data: any): Promise<unknown>;
    /**
      Utilities
    **/
    encodeQRCode(data: any): Promise<unknown>;
    decodeQRCode(data: any): Promise<unknown>;
    fullHashToId(data: any): Promise<unknown>;
    longConvert(data: any): Promise<unknown>;
    hexConvert(data: any): Promise<unknown>;
    rsConvert(data: any): Promise<unknown>;
    hash(data: any): Promise<unknown>;
    /**
      Voting
    **/
    castVote(data: any): Promise<unknown>;
    createPoll(data: any): Promise<unknown>;
    getPoll(data: any): Promise<unknown>;
    getAllPolls(data: any): Promise<unknown>;
    getPollResult(data: any): Promise<unknown>;
    getPollVotes(data: any): Promise<unknown>;
    getPollVote(data: any): Promise<unknown>;
    getPolls(data: any): Promise<unknown>;
    searchPolls(data: any): Promise<unknown>;
}
