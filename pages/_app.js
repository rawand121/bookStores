import "../styles/globals.css";
import { wrapper } from "../redux/store";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const {locale} = useRouter()
  return (
    <div id="modalApp" className={locale === 'English' ? 'ltr' : 'rtl'}>
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
