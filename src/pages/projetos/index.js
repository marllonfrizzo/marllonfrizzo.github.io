import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default () => (
    <div>
        <Helmet>
            <title>Projetos</title>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-61529437-3"></script>
            <script>{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                  
                    gtag('config', 'UA-61529437-3');

                `}</script>
            <meta charSet="utf8" />
            <meta name="description" content="Um resumo dos projetos desenvolvidos por mim." />
        </Helmet>
        <h1>Projetos</h1>

        <ul>
            <li>
                Relatório de últimas músicas reproduzidas <Link to="./musica">Ver</Link>
            </li>
        </ul>

    </div>
);
