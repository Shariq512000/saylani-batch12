import Header from "@/component/header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return(
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  ) 
}
