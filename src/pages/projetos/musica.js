import React, { PureComponent } from "react";

import { Helmet } from "react-helmet";

import axios from "axios";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import {
    Avatar, Divider,
    List, Icon, Skeleton,
} from "antd";
import API_KEY from '../../keys/apiKeys';

const USERNAME = 'marllonfrizzo';
const ROOT_URL = 'https://ws.audioscrobbler.com/2.0/';

export default class musica extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            info: null,
            tracks: [],
            topArtists: [],
            loadingInfo: false,
            loadingArtists: false,
            loadingRecentTracks: false,
            lovedTracks: 0,
        };
    }

    componentDidMount() {
        this._requestInfo();
        this._requestLovedTracks();
        this._requestRecentTracks();
        this._requestTopArtists();
    }

    _requestTopArtists = () => {
        this.setState({ loadingArtists: true });
        return axios.get(`${ROOT_URL}?method=user.gettopartists&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=5&period=7day`)
            .then(response => {
                const { data } = response;
                this.setState({
                    topArtists: data.topartists.artist,
                })
            })
            .catch(ex => {
                console.warn(ex);
            })
            .finally(() => {
                this.setState({ loadingArtists: false });
            })
    }

    _requestRecentTracks = () => {
        this.setState({ loadingRecentTracks: true });
        return axios.get(`${ROOT_URL}?limit=10&method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&extended=1`)
            .then(response => {
                const { data } = response;
                this.setState({
                    tracks: data.recenttracks.track,
                })
            })
            .catch(ex => {
                console.warn(ex);
            })
            .finally(() => {
                this.setState({ loadingRecentTracks: false });
            })
    }

    _requestInfo = () => {
        this.setState({ loadingInfo: true });
        return axios.get(`${ROOT_URL}?method=user.getinfo&user=${USERNAME}&api_key=${API_KEY}&format=json`)
            .then(response => {
                const { data } = response;
                this.setState({
                    info: data.user,
                })
            })
            .catch(ex => {
                console.warn(ex);
            })
            .finally(() => {
                this.setState({ loadingInfo: false });
            });
    }

    _requestLovedTracks = () => {
        this.setState({ loadingInfo: true });
        return axios.get(`${ROOT_URL}?method=user.getlovedtracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`)
            .then(response => {
                const { data } = response;
                this.setState({
                    lovedTracks: data.lovedtracks['@attr'].total,
                })
            })
            .catch(ex => {
                console.warn(ex);
            })
            .finally(() => {
                this.setState({ loadingInfo: false });
            });
    }

    _renderInfo = () => {
        const { info, lovedTracks } = this.state;

        if (!info) return null;

        const {
            name, realname, url,
            registered, playcount, image,
        } = info;

        const date = moment.unix(registered.unixtime);
        const playcountFormatted = new Intl.NumberFormat('pt-BR').format(playcount);
        const lovedTracksFormatted = new Intl.NumberFormat('pt-BR').format(lovedTracks);

        return (
            <div>
                <h3>
                    <span>{realname} ({name}) </span>
                    <a href={url}>
                        <Icon title="Ir para perfil em last.fm" type="link" theme="outlined" />
                    </a>
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div style={{ width: '70px' }}>
                        <Avatar shape="square" size={64} src={image[1]['#text']} />
                    </div>
                    <div style={{ flex: '1' }}>
                        Usuário desde <strong>{date.locale('pt-br').format('LL')}</strong><br />
                        Total de reproduções: <strong>{playcountFormatted}</strong><br />
                        Total de faixas preferidas: <strong>{lovedTracksFormatted}</strong><br />
                    </div>
                </div>
            </div>
        )
    }

    _formatItemList = (artist, album) => (
        <span>Por <strong>{artist}</strong>, do álbum <strong>{album}</strong></span>
    )

    _renderListFooter = () => (
        <a href="https://www.last.fm/pt/user/marllonfrizzo/library">
            Ver mais
        </a>
    )

    _renderRecentTracksItem = item => (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar src={
                    item.image[3]['#text']}
                    size={64}
                />}
                title={
                    <span>
                        <span>{item.name} </span>
                        {item.loved === '1'
                            ? (
                                <Icon
                                    title="Adicionada como preferida"
                                    type="heart"
                                    theme="filled"
                                    style={{
                                        color: 'red'
                                    }}
                                />
                            )
                            : null
                        }
                    </span>
                }
                description={this._formatItemList(item.artist.name, item.album['#text'])}
            />
            {item['@attr']
                ? 'Reproduzindo agora'
                : moment.unix(item.date.uts).locale('pt-br').format('lll')
            }
        </List.Item>
    )

    _renderRecentTracks = () => {
        const { tracks, loadingRecentTracks } = this.state;

        if (!tracks) return null;

        return (
            <List
                itemLayout="horizontal"
                loading={loadingRecentTracks}
                pagination={false}
                dataSource={tracks}
                footer={this._renderListFooter()}
                renderItem={this._renderRecentTracksItem}
            />
        );
    }

    _renderUrlArtist = url => (
        <a href={url}>{url}</a>
    )

    _renderTopArtistsItem = item => (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar
                    src={item.image[3]['#text']}
                    size="large"
                />}
                title={item.name}
                description={this._renderUrlArtist(item.url)}
            />
            <span><strong>{item.playcount}</strong> reproduções</span>
        </List.Item>
    )

    _renderTopArtists = () => {
        const { topArtists, loadingArtists } = this.state;

        if (!topArtists.length) return null;

        return (
            <List
                itemLayout="horizontal"
                loading={loadingArtists}
                pagination={false}
                dataSource={topArtists}
                renderItem={this._renderTopArtistsItem}
            />
        );
    }

    render() {
        const { loadingInfo } = this.state;
        return (
            <div>
                <Helmet>
                    <title>Minhas músicas</title>
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-61529437-3"></script>
                    <script>{`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                    
                        gtag('config', 'UA-61529437-3');
                        `}
                    </script>
                    <meta charSet="utf8" />
                    <meta name="description" content="Relatório de músicas reproduzidas nos últimos dias." />
                </Helmet>
                <h1>Minhas músicas</h1>
                <Skeleton active loading={loadingInfo}>
                    {this._renderInfo()}
                </Skeleton>
                <Divider>Últimas 10 músicas reproduzidas</Divider>
                {this._renderRecentTracks()}
                <Divider>Top 5 artistas da última semana</Divider>
                {this._renderTopArtists()}
                <div style={{ marginTop: '35px' }}>
                    <Link to="./">Voltar</Link>
                </div>
            </div>
        );
    }

};
