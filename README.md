# Ethereum and CCXT  Assignment API Documentation

The Ethereum and CCXT API provides endpoints to interact with the Ethereum network and access information from cryptocurrency exchanges using the CCXT library. This documentation outlines the available endpoints and their usage.

## Table of Contents

- [Ethers Endpoints](#ethers-endpoints)
  - [Validate Address](#validate-address)
  - [Create Wallet](#create-wallet)
  - [Latest Transactions](#latest-transactions)
- [CCXT Endpoint](#ccxt-endpoint)
  - [List Tradable Coins](#list-tradable-coins)
  - [Average Coin Prices](#average-coin-prices)
- [Usage](#usage)
- [Example Requests](#example-requests)

## Ethers Endpoints

### Validate Address

Check whether a given Ethereum address is valid.

- Endpoint: `/ethers/validate/:address`
- Method: GET
- Parameters:
  - `address` (string): The Ethereum address to validate

### Create Wallet

Generate a new Ethereum wallet address.

- Endpoint: `/ethers/create-wallet`
- Method: GET
- Response:

  ```json
  {
    "wallet": {
      "_isSigner": true,
      "address": "0xd30858945AD8108fF8e236Ad8F0508834839611A",
      "provider": null
    }
  }
  ```
### Latest Transactions


Retrieve the latest 1000 Ethereum transactions, sorted by ether quantity.

- Endpoint: /ethers/latest-transactions
- Method: GET

## CCXT Endpoint
### List Tradable Coins

Get a list of symbols of tradable cryptocurrencies.

- Endpoint: /ccxt/tradable-coins

- Method: GET

- Response:

    ```json
    ["ETH", "BTC"]
    ```

### Average Coin Prices

Get the average price of coins from a cryptocurrency exchange.

- Endpoint: /ccxt/average-prices
- Method: GET

### Usage

To use the API, make requests to the appropriate endpoints using the provided methods. Refer to each endpoint's documentation for specific parameter details and request methods.
Example Requests

## Validate Address:

```bash
GET /ethers/validate/0x1234567890abcdef1234567890abcdef12345678
```

## Create Wallet:

```bash
GET /ethers/create-wallet
```
## Latest Transactions:

```bash
GET /ethers/latest-transactions
```
- Response:

    ```json
    [
        {
            "hash": "0x...",
            "sender": "0x...",
            "receiver": "0x...",
            "amount": "0.12345",
            "blockNumber": 123456
        },
        ...
    ]
    ```
### List Tradable Coins:

```bash
GET /ccxt/tradable-coins
```
- Response
    ```json
    {
        "tradableCoins": [
            "ETH/BTC",
            "LTC/BTC",
            "BNB/BTC",
            "NEO/BTC",
            "QTUM/ETH",
            ...
        ]
    }
    ```
### Average Coin Prices:

```bash
GET /ccxt/average-prices
```
- Response

    ```json
    {
        "averagePrices": {
            "ETH/BTC": "0.06304645",
            "LTC/BTC": "0.00283988",
            "BNB/BTC": "0.00835282",
            "NEO/BTC": "0.00029212",
            "QTUM/ETH": "0.00140760",
            "EOS/ETH": "0.00039760",
            "SNT/ETH": "0.00001371",
            ...
        }
    }
    ```