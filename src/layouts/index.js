import React from "react";

import "moment/locale/pt-br";
import Link from "gatsby-link";
import moment from "moment-timezone";
import { LocaleProvider } from "antd";
import { Helmet } from "react-helmet";

moment.locale('pt-br');
import ptBR from 'antd/lib/locale-provider/pt_BR';

import favicon from '../img/favicon.png';
import logo from '../img/mf.jpg';

const ListLink = props =>
    <li style={{ display: `inline-block`, marginRight: `1rem` }}>
        <Link to={props.to}>
            {props.children}
        </Link>
    </li>

export default ({ children }) => (
    <LocaleProvider locale={ptBR}>
        <div style={{ margin: `0 auto`, maxWidth: 960, padding: `1.25rem 1rem` }}>
            <Helmet defaultTitle={`Página pessoal de Marllon Frizzo`}>
                <meta charSet="utf8" />
                <meta name="description" content="Minha página pessoal" />
                <link
                    rel="canonical"
                    href="https://mfrizzo.com.br"
                />
                <html lang="pt-BR" />
                <meta name="robots" content="all" />
                <meta name="author" content="Marllon Frizzo" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href={favicon} />
                <meta name="twitter:site" content="@marllonfrizzo" />
                <meta name="og:site_name" content="Página pessoal de Marllon Frizzo" />
                <meta property="og:title" content="Páginal pessoal de Marllon Frizzo" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.mfrizzo.com.br" />
                <meta property="og:image" content={logo} />
            </Helmet>
            <header style={{ marginBottom: `1.5rem` }}>
                <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
                    <h3 style={{ display: `inline` }}>Marllon Frizzo</h3>
                </Link>
                <ul style={{ listStyle: `none`, float: `right` }}>
                    <ListLink to="/">Início</ListLink>
                    <ListLink to="/projetos/">Projetos</ListLink>
                </ul>
            </header>
            {children()}
        </div>
    </LocaleProvider>
);

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
