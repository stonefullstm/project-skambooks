import React, { Component } from 'react';
import '../App.css';
import './exchanges.css';
import { Link } from "react-router-dom";
import { getExchanges, deleteExchanges, getReaderById, confirmeExchanges } from '../services/fetchs';
import confirme from '../images/confirme.png';
import excluir from '../images/excluir.png';

export default class exchanges extends Component {
  state = {
    exchange: [],
    reader: {},
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
    const reader = await getReaderById(options);
    this.setState({
      exchange: result,
      reader: reader,
    });
  };

  handleClicDelete = async (id) => {
    let r = window.confirm(`Are you sure you want to delete the id ${id}?`);
    if (r) {
      const token = localStorage.getItem('token');
      const options = {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Authorization':`${token}`,
        },
    };
    const { message } = await deleteExchanges(id, options);
    alert(message);
    const { exchange } = this.state;
    this.setState({
      exchange: exchange.filter((i) => i.id !== id),
    });
    };
  };

  handleClicConfirme = async (id) => {
    let r = window.confirm(`Are you sure you want to change the id ${id}?`);
    if (r) {
      const token = localStorage.getItem('token');
      const options = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Authorization':`${token}`,
        },
      };
    const { message } = await confirmeExchanges(id, options);
    alert(message);
    };
  };

  render() {
    const { exchange, reader } = this.state;
    const list = exchange.map((item, index) => {
      let isDisabled = false;
      if (item.sender.id === reader.id && item.receiveDate === null) {
          isDisabled = true;
      };
      let disableReceiver = false;
      if (item.receiver.id === reader.id && item.receiveDate === null) {
        disableReceiver = true;
      };
      if (exchange.length > 0) {
        return (<div key={ index } className='lists'>
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
          { isDisabled ? <button type='button' className='button-list' onClick={ () => this.handleClicDelete(item.id)}><img src={ excluir } alt='images' className='img'/></button> : null }
          { disableReceiver ? <button type='button' className='button-list' onClick={ () => this.handleClicConfirme(item.id)}><img src={ confirme } alt='images' className='img'/></button> : null }
          </div>
      </div>)
      }
      return null;
    });

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
