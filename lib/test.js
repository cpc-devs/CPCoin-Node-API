"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const api = new index_1.CPCoinNodeApiService("asd");
api.getStatistics({})
    .then((res) => {
    console.log('Test:', res);
});
