<h1 align="center">CryptoHawk 🦅</h1>

Discord bot for real-time Ethereum whale wallet tracking with automated transaction monitoring and instant alerts for large movements.

## 📖 Overview

CryptoHawk was built to monitor high-value Ethereum wallets and provide real-time alerts on significant transactions. The bot integrates with Discord for seamless notifications and uses Etherscan's API to track blockchain activity, making it valuable for traders, researchers, and crypto enthusiasts tracking whale movements.

## Key highlights:

- 🚨 Real-time monitoring – checks tracked wallets every 60 seconds for new transactions
  
- 💰 Smart alerts – automatic notifications for transactions exceeding $10,000
  
- 📊 Multi-wallet tracking – monitor unlimited wallets simultaneously across Discord servers

- ⚡ Instant balance checks – query any Ethereum wallet balance on demand

## 🚀 Features

- **Wallet Tracking**
  - Track multiple Ethereum addresses with custom nicknames
  - Persistent monitoring with automatic transaction detection
  - Historical transaction lookup (last 10 transactions per wallet)

- **Transaction Alerts**
  - Configurable threshold alerts (default $10k+)
  - Rich embed notifications with transaction details
  - Direct Etherscan links for verification

- **Balance Monitoring**
  - Real-time ETH balance queries
  - Live USD conversion using current market prices
  - Support for any Ethereum address

## 💻 Tech Stack

**Backend:**
- Node.js – Runtime environment
- Discord.js – Bot framework and event handling
- Etherscan API V2 – Blockchain data integration

**APIs & Services:**
- RESTful API calls for real-time data
- WebSocket connections via Discord gateway
- Automated polling system for transaction monitoring

## 🛠️ Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/Matthew-Duran/CryptoHawk.git
cd CryptoHawk
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file:
```
DISCORD_TOKEN=your_discord_bot_token
ETHERSCAN_API_KEY=your_etherscan_api_key
```

4. **Run the bot**
```bash
node index.js
```

## 📝 Commands

| Command | Description | Example |
|---------|-------------|---------|
| `!track <address> [nickname]` | Start monitoring a wallet | `!track 0xd8dA...96045 Vitalik` |
| `!list` | View all tracked wallets | `!list` |
| `!balance <address>` | Check wallet balance | `!balance 0x28C6...1d60` |
| `!untrack <address>` | Stop tracking a wallet | `!untrack 0xd8dA...96045` |


[Portfolio](https://mduran-portfolio.netlify.app) • [GitHub](https://github.com/Matthew-Duran) • [LinkedIn](https://linkedin.com/in/matthew-q-duran)

## 📄 License

MIT License - feel free to use this project for learning or building your own crypto monitoring tools.
