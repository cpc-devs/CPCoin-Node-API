import { CPCoinNodeApiService } from './index'

const api : CPCoinNodeApiService = new CPCoinNodeApiService()

api.getStatistics({})
    .then((res) => {
        console.log('Test:', res);
    })
    .catch