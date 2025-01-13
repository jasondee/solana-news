console.log('Script loaded');

// Solana devnet endpoint
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

if (window.solana && window.solana.isPhantom) {
    console.log('Phantom wallet detected');

    document.getElementById('connectWallet').addEventListener('click', async () => {
        console.log('Connect wallet button clicked');

        try {
            await window.solana.connect();
            const walletAddress = window.solana.publicKey.toString();
            document.getElementById('walletAddress').innerText =
                'Connected wallet: ' + walletAddress;

            const balance = await connection.getBalance(window.solana.publicKey);
            document.getElementById('walletAddress').innerText +=
                '\nBalance: ' + (balance / solanaWeb3.LAMPORTS_PER_SOL) + ' SOL';
        } catch (err) {
            console.error('Wallet connection failed:', err);
        }
    });
} else {
    console.log('Phantom wallet not detected');
    document.getElementById('walletAddress').innerText =
        'Please install a Solana wallet like Phantom.';
}
