import React, { PureComponent } from 'react';

import {
    List, Avatar, Row,
    Col, Divider,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import API_KEY from '../values/apiKeys';

const USERNAME = 'marllonfrizzo';

class musicas extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            info: null,
            tracks: [],
            topArtists: [],
        };
    }

    componentDidMount() {
        this._requestInfo();
        this._requestRecentTracks();
        this._requestTopArtists();
    }

    _requestTopArtists = () => {
        this.setState({ loading: true });
        return axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=5&period=7day`)
            .then(response => {
                const { data } = response;
                this.setState({
                    topArtists: data.topartists.artist,
                })
            })
            .catch(ex => {
                console.error(ex);
            })
            .finally(() => {
                this.setState({ loading: false });
            })
    }

    _requestRecentTracks = () => {
        this.setState({ loading: true });
        return axios.get(`https://ws.audioscrobbler.com/2.0/?limit=5&method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json`)
            .then(response => {
                const { data } = response;
                this.setState({
                    tracks: data.recenttracks.track,
                })
            })
            .catch(ex => {
                console.error(ex);
            })
            .finally(() => {
                this.setState({ loading: false });
            })
    }

    _requestInfo = () => {
        this.setState({ loading: true });
        return axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${USERNAME}&api_key=${API_KEY}&format=json`)
            .then(response => {
                const { data } = response;
                this.setState({
                    info: data.user,
                })
            })
            .catch(ex => {
                console.error(ex);
            })
            .finally(() => {
                this.setState({ loading: false });
            })
    }

    _renderTopArtists = () => {
        const { topArtists, loading } = this.state;

        if (!topArtists) return null;

        return (
            <List
                itemLayout="horizontal"
                loading={loading}
                pagination={false}
                dataSource={topArtists}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.image[3]['#text']} />}
                            title={item.name}
                        />
                        <span><strong>{item.playcount}</strong> reproduções</span>
                    </List.Item>
                )}
            />
        );
    }

    _formatItemList = (artist, album) => (
        <span>Por <strong>{artist}</strong>, do álbum <strong>{album}</strong></span>
    )

    _renderRecentTracks = () => {
        const { tracks, loading } = this.state;

        if (!tracks) return null;

        let day;

        return (
            <List
                itemLayout="horizontal"
                loading={loading}
                pagination={false}
                dataSource={tracks}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.image[3]['#text']} />}
                            title={item.name}
                            description={this._formatItemList(item.artist['#text'], item.album['#text'])}
                        />
                        {item['@attr']
                            ? 'Reproduzindo agora'
                            : moment.unix(item.date.uts).locale('pt-br').format('lll')
                        }
                    </List.Item>
                )}
            />
        );
    }

    _renderInfo = () => {
        const { info } = this.state;

        if (!info) return null;

        const {
            name, realname, country, url,
            registered, playcount, image,
        } = info;

        const date = moment.unix(registered.unixtime);

        return (
            <div>
                <Row>
                    <Col lg={2}>
                        <Avatar shape="square" size={64} src={image[1]['#text']} />
                    </Col>
                    <Col lg={12}>
                        <h3>{realname}</h3>
                        <h4>{name}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        Usuário desde <strong>{date.locale('pt-br').format('LL')}</strong><br />
                        País: <strong>{country}</strong><br />
                        Total de reproduções: <strong>{playcount}</strong><br />
                        <span>Ir para o <a href={url} target="_blank" rel="noopener noreferrer">perfil</a></span>
                    </Col>
                </Row>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this._renderInfo()}
                <Divider>Últimas 5 músicas reproduzidas</Divider>
                {this._renderRecentTracks()}
                <Divider>Top 5 artistas da última semana</Divider>
                {this._renderTopArtists()}
                <div style={{ marginTop: '35px' }}>
                    <span>Voltar ao <Link to="/">início</Link>.</span>
                </div>
            </div>
        );
    }
}

// export const query = graphql`
//   query SiteTitleQuery {
//     site {
//       buildTimeZone
//     }
//   }
// `

export default musicas;
