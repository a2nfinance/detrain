import 'antd/dist/reset.css';
import type { AppProps } from 'next/app';
import { Provider } from "react-redux";
import { LayoutProvider } from '@/components/LayoutProvider';
import { store } from '@/controller/store';
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation-extension"
import { ChainProvider } from "@cosmos-kit/react-lite";
import { assets, chains } from "chain-registry";
import "@/styles/app.css";
import Router from "next/router";
import NProgress from "nprogress";
import withTheme from '@/theme';
import { useEffect, useState } from 'react';
import { WalletModel } from '@/components/common/WalletModal';

Router.events.on("routeChangeStart", (url) => {
    NProgress.start()
})

Router.events.on("routeChangeComplete", (url) => {
    NProgress.done()
})

Router.events.on("routeChangeError", (url) => {
    NProgress.done()
})
export default function MyApp({ Component, pageProps }: AppProps) {

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (typeof window !== 'undefined') {
        window.onload = () => {
            document.getElementById('holderStyle')!.remove();
        };
    }

    return (

        <Provider store={store}>
            <style
                id="holderStyle"
                dangerouslySetInnerHTML={{
                    __html: `
                    *, *::before, *::after {
                        transition: none!important;
                    }
                    `,
                }}
            />
            <ChainProvider
                chains={[...chains.filter((c) => c.chain_name == "akash")]}
                //@ts-ignore
                assetLists={[...assets.filter((a) => a.chain_name === "akash")]}
                wallets={[keplrWallets[0], leapWallets[0], cosmostationWallets[0]]}
                logLevel={"DEBUG"}
                walletModal={WalletModel}
            >
                <div style={{ visibility: !mounted ? 'hidden' : 'visible' }}>
                    {

                        withTheme(<LayoutProvider>

                            <Component {...pageProps} />

                        </LayoutProvider>)
                    }

                </div>
            </ChainProvider>

        </Provider >

    )
}
