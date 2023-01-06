import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import '../App.css';
import { getReaderById } from '../services/fetchs';
import './exchanges.css';

class searcheBooks extends Component {
  state = {
    filter: '',
    change: '',
    reader: {},
  };
  async componentDidMount() {
    const token = localStorage.getItem('token');
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `${token}`,
      },
    };
    const reader = await getReaderById(options);
    this.setState({
      reader: reader,
    });
  }
  handleChange = ({ target }) => {
    this.setState({
      filter: target.value,
    })
  };
  change = ({ target }) => {
    this.setState({
      change: target.value,
    });
  };
  render() {
    const { filter, change, reader } = this.state;
    const { book } = this.props;
    let list = '';
    if (filter === 'All') {
      const result = book.filter((item) => item.readers.id !== reader.id);
      list = result.map((item, index) => (<div key={index} className='list'>
        <li className='li-filter'>
          <li>book: <strong>{item.title}</strong></li>
          <li>year: <strong>{item.year}</strong></li>
          {item.authors.map((i) => (<li>author: <strong>{i.name}</strong></li>))}
          <li>readers: <strong>{item.readers.name}</strong></li>
        </li>
      </div>));
    };

    if (filter === 'Title' && change.length > 0) {
      const result = book.filter((item) => item.readers.id !== reader.id);
      const result1 = result.filter((i) => i.title.includes(change));
      list = result1.map((item, index) => {
        if (result1.length > 0) {
          return (<div key={index} className='list'>
            <li className='li-filter'>
              <li>book: <strong>{item.title}</strong></li>
              <li>year: <strong>{item.year}</strong></li>
              {item.authors.map((i) => (<li>author: <strong>{i.name}</strong></li>))}
              <li>readers: <strong>{item.readers.name}</strong></li>
            </li>
          </div>)
        }
        return null;
      });
    };

    if (filter === 'Author' && change.length > 0) {
      const result = book.filter((item) => item.readers.id !== reader.id);
      const result2 = result.filter((item) => item
        .authors.some((author) => author.name.includes(change)));
      list = result2.map((item, index) => {
        if (result2.length > 0) {
           return ( <div key={ index } className='list'>
            <li className='li-filter'>
              <li>book: <strong>{item.title}</strong></li>
              <li>year: <strong>{item.year}</strong></li>
              {item.authors.map((i) => (<li>author: <strong>{i.name}</strong></li>))}
              <li>readers: <strong>{item.readers.name}</strong></li>
            </li>
           </div>)
         }
        return null;
      });
    };
    return (
      <div>
        <h1>SKAMBOOKS</h1>
        <header className='header'><h2 className='book'><Link to='/skambooks' className='Link'>My books</Link></h2><h2><Link to='/exchange' className='Link'>My exchanges</Link></h2><h2 className='search'>Search books</h2></header>
        <h1>Search books</h1>
        <div onChange={this.handleChange} className='filtered'>
          <input type="radio" value="All" name="gender" /> <h2>All</h2>
          <input type="radio" value="Title" name="gender" /> <h2>Title</h2>
          <input type="radio" value="Author" name="gender" /> <h2>Author</h2>
        </div>
        {filter === 'Author' || filter === 'Title' ? <input type='text' className='email' onChange={this.change} placeholder='search' /> : null}
        <ol>
          {list}
        </ol>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  book: state.reducerFetch.books,
});


export default connect(mapStateToProps)(searcheBooks);
