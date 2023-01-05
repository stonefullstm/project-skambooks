import React, { Component } from 'react'
import { requiretBooks } from '../actions/action';
import { connect } from 'react-redux';
import { getAllBooks, getReaderById, deleteBook } from '../services/fetchs';
import '../App.css';
import './exchanges.css';
import { Link } from "react-router-dom";
import troca from '../images/troca.png';
import excluir from '../images/excluir.png';
import editar from '../images/editar.png';

class skambooks extends Component {
  state = {
    reader: {},
  };


  async componentDidMount(){
    const token = localStorage.getItem('token');
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization':`${token}`,
      },
    };
    const { dispatch, history } = this.props;
    const books = await getAllBooks(options);
    if (books.message) {
      history.push('/');
    }
    const reader = await getReaderById(options);
    this.setState({
      reader: reader,
    });
    const result = requiretBooks(books);
    dispatch(result);
  };

  handleExcluir = async (id) => {
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
  
      const { message } = await deleteBook(id, options);
      alert(message);
      const { book, dispatch } = this.props;
      const result = book.filter((item) => item.id !== id);
      const r = requiretBooks(result);
      dispatch(r);
    }
  };

  render() {
    const { reader } = this.state;
    const { book } = this.props;
    const list = book.map((item, index) => {
      if (item.readers.id === reader.id) {
        return ( <div key={ index } className='list'>
          <li className='li-exchange'>
            <li>book: <strong>{ item.title }</strong></li>
            { item.authors.map((i) => (<li>author: <strong>{i.name}</strong></li>))}
          </li>
          <div>
            <li>readers: <strong>{ item.readers.name }</strong></li>
            <li>year: <strong>{ item.year }</strong></li>
          </div>
          <div className='div-button'>
          <button type='button' className='button-list'><img src={ editar } alt='images' className='img'/></button>
          <button type='button' className='button-list' onClick={ () => this.handleExcluir(item.id)}><img src={ excluir } alt='images' className='img'/></button>
          <button type='button' className='button-list'><img src={ troca } alt='images' className='img'/></button>
          </div>
        </div>)
      }
      return null;
  });
    return (
      <div>
        <h1>SKAMBOOKS</h1>
        <header className='header'><h2 className='book'>My books</h2><h2><Link to='/exchange' className='Link'>My exchanges</Link></h2><h2 className='search'><Link to='/search' className='Link'>Search books</Link></h2></header>
          <h1>My books</h1>
          <ol>{ list }</ol>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  book: state.reducerFetch.books,
});


export default connect(mapStateToProps)(skambooks);
