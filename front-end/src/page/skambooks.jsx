import React, { Component } from 'react'
import { requiretBooks } from '../actions/action';
import { connect } from 'react-redux';
import { getAllBooks, getReaderById } from '../services/fetchs';
import '../App.css';
import { Link } from "react-router-dom";

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
  }
  render() {
    const { reader } = this.state;
    const { book } = this.props;
    console.log(book);
    const list = book.map((item, index) => {
      if (item.readers.id === reader.id) {
        return ( <di key={ index } className='list'>
          <li className='li'>{ item.title }</li>
          <di className='div-button'>
          <button type='button' className='button-list'>E</button>
          <button type='button' className='button-list'> - </button>
          <button type='button' className='button-list'>Atualizar</button>
          </di>
        </di>)
      }
      return null;
  });
    return (
      <div>
        <h1>SKAMBOOKS</h1>
        <header className='header'><h2 className='book'>My books</h2><h2>My exchanges</h2><h2 className='search'><Link to='/search' className='Link'>Search books</Link></h2></header>
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
