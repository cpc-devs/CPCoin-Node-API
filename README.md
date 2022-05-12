![CPCoin Node API Logo](logo.png)

# CPCoin Node API
CPCoin Node API features and library for Node.js and browser, enabling easy connection with Node REST API.

## Installing

Using npm:

```bash
$ npm install cpcoin-node-api
```

## Example

```js
import { CPCoinNodeApiService } from 'cpcoin-node-api'

const api : CPCoinNodeApiService = new CPCoinNodeApiService()

api.getStatistics({})
    .then((response) => {
        console.log('Response:', response)
    })
    .catch((error) => {
        console.log('Error:', error)
    })
```

```txt
api.<method>(<params>) <- return Promise

api.<method> will provide autocomplete and parameter typings
```