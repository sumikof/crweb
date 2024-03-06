import {  WalletMultiButton } from '@solana/wallet-adapter-react-ui';
export default function Component(props: any) {
    return (
        <header className="bg-blue-500 p-4 text-white">
        <nav className="flex items-center justify-between">
        <h1>
          <a href="/" className="text-2xl font-semibold hover:underline">ホーム</a>
        </h1>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">            <WalletMultiButton /></a></li>
          </ul>
        </nav>
      </header>
    );
}