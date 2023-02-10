import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Coin.css';
import { Helmet } from 'react-helmet-async';
import DOMPurify from 'dompurify';

const Coin = () => {

    const params = useParams();
    const [coin, setCoin] = useState({});
    const Cname = coin.name;

    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

    useEffect(() => {
        axios.get(url).then(response => {
            setCoin(response.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div>
            <Helmet>
                <title>{Cname ? Cname : ''} | CoinSmash</title>
                <meta name='description' content='CoinSmash is a Crypto price analytics tool' />
            </Helmet>
            <div className='coin-container'>
                <div className="content">
                    <h1>{coin.name}</h1>
                </div>
                <div className='content'>
                    <div className="rank">
                        {/* <span className='rank-btn'>Rank #{coin.market_cap_rank}</span> */}
                    </div>
                    <div className="info">
                        <div className="coin-heading">
                            {/* <span className='rank-btn'> # {coin.market_cap_rank}</span> */}
                            <label className='rank'>{coin.market_cap_rank}</label>
                            {coin.image ? <img src={coin.image.small} alt=' ' /> : null}
                            <h3>{coin.name}</h3>
                            {coin.symbol ? <p>{coin.symbol.toUpperCase()}</p> : null}

                        </div>
                        <div className="coin-price">
                            {coin.market_data?.current_price ? <h1>${coin.market_data.current_price.usd.toLocaleString()}</h1> : null}
                        </div>
                    </div>
                </div>

                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>1hr</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>14d</th>
                                <th>30d</th>
                                <th>1yr</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{coin.market_data?.price_change_percentage_1h_in_currency ? <p> {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2)} %</p> : null}</td>

                                <td>{coin.market_data?.price_change_percentage_24h_in_currency ? <p> {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)} %</p> : null}</td>

                                <td>{coin.market_data?.price_change_percentage_7d_in_currency ? <p> {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2)} %</p> : null}</td>

                                <td>{coin.market_data?.price_change_percentage_14d_in_currency ? <p> {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(2)} % </p> : null}</td>

                                <td>{coin.market_data?.price_change_percentage_30d_in_currency ? <p> {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(2)} % </p> : null}</td>

                                <td>{coin.market_data?.price_change_percentage_1y_in_currency ? <p> {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(2)} % </p> : null}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="content">
                    <div className="stats">
                        <div className="left">
                            <div className="row">
                                <h4>24 Hour Low</h4>
                                {coin.market_data?.low_24h ? <p>${coin.market_data.low_24h.usd.toLocaleString()}</p> : null}

                            </div>

                            <div className="row">
                                <h4>24 Hour High</h4>
                                {coin.market_data?.high_24h ? <p>${coin.market_data.high_24h.usd.toLocaleString()}</p> : null}

                            </div>

                        </div>

                        <div className="right">

                            <div className="row">
                                <h4>Market Cap</h4>
                                {coin.market_data?.market_cap ? <p>${coin.market_data.market_cap.usd.toLocaleString()}</p> : null}
                            </div>

                            <div className="row">
                                <h4>Circulating Supply</h4>
                                {coin.market_data ? <p>{coin.market_data.circulating_supply.toLocaleString()}</p> : null}
                            </div>

                        </div>
                    </div>
                </div>

                <div className='content'>
                    <div className="about">
                        <h3>About</h3>
                        <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(coin.description ? coin.description.en : '')
                        }}></p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Coin
