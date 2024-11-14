"use client";
import Aos from "aos";
import "aos/dist/aos.css";
import "../styles/index.scss";
import { useEffect, useState } from "react";
import ScrollToTop from "../components/common/ScrollTop";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Script from "next/script";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Jost } from 'next/font/google'

const jost = Jost({ subsets: ['latin'] })

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 0,
      once: false,
    });
  }, []);

  const [client] = useState(
    new QueryClient({ defaultOptions: { 
      queries: { 
        refetchOnWindowFocus: false, // default: true
      } 
    } 
  }));


    // Google analytics
    useEffect(() => {
      (function (w, d, s, l, i) {
  
          w[l] = w[l] || [];
   
          w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
        
          j.async = true;
  
          j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
       
          f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || 'GTM-57TZTX5M'}`);
  }, []);

  return (
    <html lang="en">
      <head>
        {/* <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="icon" href="./favicon.ico" />

        <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || 'GTM-57TZTX5M'}`}
            />

            <Script id="one" strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || 'GTM-57TZTX5M'}', {
                    page_path: window.location.pathname,
                    });
                `}
            </Script>
      </head>

      <body className={jost.className}>
        <Provider store={store}>
          <QueryClientProvider client={client}>
            <div className="page-wrapper">
              {children}

              {/* Toastify */}
              <ToastContainer
                position="bottom-right"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              {/* <!-- Scroll To Top --> */}
              <ScrollToTop />
            </div>
            <ReactQueryDevtools initialIsOpen={true} />
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
