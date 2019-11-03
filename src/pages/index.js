import React from "react";
import { Helmet } from "react-helmet";

export default ({ data }) => (
    <div>
        <Helmet>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-61529437-3"></script>
            <script>{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                  
                    gtag('config', 'UA-61529437-3');

                `}
            </script>
        </Helmet>
        <h1>Olá!</h1>
        <p>
            Seja bem-vindo(a) a minha página pessoal.
        </p>
        <p>
            <a href="https://www.last.fm/pt/user/marllonfrizzo">Last.fm</a>
            {' | '}
            <a href="https://twitter.com/marllonfrizzo">Twitter</a>
            {' | '}
            <a href="https://github.com/marllonfrizzo">GitHub</a>
            {' | '}
            <a href="https://www.linkedin.com/in/marllon-f-8718b616b">LinkedIn</a>
            {' '}
        </p>
    </div>
);
