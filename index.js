require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const trackedWallets = new Map();
const lastCheckedBlock = new Map();
const ETHERSCAN_API = 'https://api.etherscan.io/v2/api';

client.once('ready', () => {
    console.log(`✅ CryptoHawk is online!`);
    setInterval(checkAllWallets, 60000);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith('!')) return;

    const [cmd, ...args] = message.content.slice(1).split(' ');

    if (cmd === 'track') {
        const address = args[0]?.toLowerCase();
        const nickname = args.slice(1).join(' ') || address.slice(0, 10);

        trackedWallets.set(address, { nickname, channelId: message.channel.id });
        message.reply(`✅ Now tracking **${nickname}** (\`${address}\`)`);
    }

    if (cmd === 'list') {
        if (trackedWallets.size === 0) return message.reply('No wallets tracked yet!');

        const list = Array.from(trackedWallets.entries())
            .map(([addr, data]) => `**${data.nickname}**: \`${addr}\``)
            .join('\n');
        message.reply(`📊 **Tracked Wallets:**\n${list}`);
    }

    if (cmd === 'balance') {
        const address = args[0]?.toLowerCase();
        const balance = await getBalance(address);
        const price = await getEthPrice();
        const usd = (balance * price).toFixed(2);

        message.reply(`💰 Balance: **${balance} ETH** ($${usd.toLocaleString()})`);
    }
});

async function checkAllWallets() {
    for (const [address, data] of trackedWallets.entries()) {
        try {
            const txs = await getTransactions(address);
            const lastBlock = lastCheckedBlock.get(address) || 0;
            const newTxs = txs.filter(tx => parseInt(tx.blockNumber) > lastBlock);

            if (newTxs.length > 0) {
                lastCheckedBlock.set(address, parseInt(newTxs[0].blockNumber));
                const price = await getEthPrice();

                for (const tx of newTxs) {
                    const valueEth = parseFloat(tx.value) / 1e18;
                    const valueUsd = valueEth * price;

                    if (valueUsd >= 10000) {
                        const channel = await client.channels.fetch(data.channelId);
                        const embed = new EmbedBuilder()
                            .setColor(0xff0000)
                            .setTitle('🚨 Large Transaction!')
                            .addFields(
                                { name: 'Wallet', value: data.nickname },
                                { name: 'Value', value: `${valueEth.toFixed(4)} ETH ($${valueUsd.toLocaleString()})` },
                                { name: 'Link', value: `https://etherscan.io/tx/${tx.hash}` }
                            );
                        channel.send({ embeds: [embed] });
                    }
                }
            }
        } catch (err) {
            console.error(`Error checking ${address}:`, err.message);
        }
    }
}

async function getTransactions(address) {
    const url = `${ETHERSCAN_API}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.ETHERSCAN_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.status === '1' ? data.result.slice(0, 10) : [];
}

async function getBalance(address) {
    const url = `${ETHERSCAN_API}?chainid=1&module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.status === '1' ? (parseFloat(data.result) / 1e18).toFixed(4) : 0;
}

async function getEthPrice() {
    const url = `${ETHERSCAN_API}?chainid=1&module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.status === '1' ? parseFloat(data.result.ethusd) : 3000;
}

client.login(process.env.DISCORD_TOKEN);