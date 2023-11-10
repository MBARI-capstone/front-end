import '@/styles/globals.css'
import UserProvider from '../context/UserProvider';

import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
   <Component {...pageProps} />
    </UserProvider>
);
}

export default App;