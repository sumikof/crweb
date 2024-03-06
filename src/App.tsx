import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { Buffer } from 'buffer';
import SignupUser from '@/module/home/signup-user'
import { UserAccountProvider, useUserAccount } from './provider/userAccountProvider';
import { CroutonProvider, useCrouton } from '@/provider/croutonProvider';
import ReactModal from 'react-modal';
import Home from '@/module/home/home';
import Header from './module/common/header';

// @ts-ignore
window.Buffer = Buffer;

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');
ReactModal.setAppElement('#root');

const App: FC = () => {
    return (
        <Context>
            <CroutonProvider>
                <UserAccountProvider>
                    <Content />
                </UserAccountProvider>
            </CroutonProvider>
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/solana-labs/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            new PhantomWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    const programId = "FX9ubUxMQNK4bLuUwWzGwweiWBesVAgbfZukkhSkhGwb";
    const wallet = useAnchorWallet();
    const connection = useConnection();
    const { crouton } = useCrouton();


    const { userAccount, setUserAccount } = useUserAccount();


    useEffect(() => {
        if (wallet && connection) {
            crouton.setup(connection,wallet);

            crouton.findAccountPDA(wallet.publicKey)
            .then(
                (pda: any)=>{
                    crouton.fetchUser(pda)
                    .then(
                        (user:any)=>{
                            console.log("App.tsx.useEffect:"+JSON.stringify(user));
                            if(user){
                            setUserAccount({
                                publicKey: pda,
                                dataset: user
                            }); 
                        }
                        }
                    )   
                }
            );
        }
    }, [wallet, connection]);


    return (
        <div>
            <Header>
                
            </Header>
        <div className="App max-w-screen-2x1 " 
            style={{ 
                color: 'white', 
                display: 'flex', 
                // flexDirection: 'column', 
                alignItems: 'center' 
                }}>
            <div className='w-[1000px] '>
            <div style={{ margin: '20px' }}>
            {wallet && connection
                ? 
                    <div >
                    {
                        userAccount
                            ? <Home />
                            : <SignupUser />
                    }
                    </div>
               
                : ""
            }

            </div>
            </div>
        </div>
        </div>
    );
};
