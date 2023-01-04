import React, { Component } from 'react';
import '../App.css';
import './exchanges.css';
import { Link } from "react-router-dom";
import { getExchanges } from '../services/fetchs';

export default class exchanges extends Component {
  state = {
    exchange: [],
  };
  async componentDidMount() {
    const token = localStorage.getItem('token');
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization':`${token}`,
      },
    };
    const result = await getExchanges(options);
    this.setState({
      exchange: result,
    });
  };
  render() {
    const { exchange } = this.state;
    console.log(exchange);
    const list = exchange.map((item, index) => (<div key={ index } className='lists'>
      <li className='li-exchange'>
        <li>book: <strong>{ item.bookExchanged.title }</strong></li>
        <li>sender: <strong>{ item.sender.name }</strong></li>
        <li>received: <strong>{ item.receiver.name }</strong></li>
      </li>
      <div>
        <li>sendDate: <strong>{ item.sendDate }</strong></li>
        <li>receivedDate: <strong>{ item.receiveDate }</strong></li>
      </div>
      <div className='div-button'>
          <button type='button' className='button-list'> - </button>
          <button type='button' className='button-list'>Status</button>
          </div>
      </div>));

    return (
      <div><h1>SKAMBOOKS</h1>
      <header className='header'><h2 className='book'><Link to='/skambooks' className='Link'>My books</Link></h2><h2>My exchanges</h2><h2 className='search'><Link to='/search' className='Link'>Search books</Link></h2></header>
        <h1>My exchanges</h1>
        <ol>
         { list }   
         </ol>  
      </div>
    );
  };
};
