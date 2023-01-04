import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class searcheBooks extends Component {
  state = {
    filter: '',
    change: '',
  };
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
    const { filter, change } = this.state;
    const { book } = this.props;
    let list = '';
    if ( filter === 'All') {
      list = book.map((item, index) => (<div key={ index } className='list'>
      <li className='li'>{ item.title }</li>
    </div>));
    };
    
    if (filter === 'Title' && change.length > 0) {
      const result = book.filter((i) => i.title.includes(change));
     list = result.map((item, index) => {
        if (result.length > 0) {
          return ( <di key={ index } className='list'>
            <li className='li'>{ item.title }</li>
          </di>)
        }
        return null;
    });
    };

    if (filter === 'Author' && change.length > 0) {
      list = book.map((item, index) => {
        const result = item.authors.filter((i) => i.name.includes(change));
         if (result.length > 0) {
           return ( <di key={ index } className='list'>
             <li className='li'>{ result.map((e) => e.name) }</li>
           </di>)
         }
         return null;
     });
     };
    return (
      <div>
        <h1>SKAMBOOKS</h1>
        <header className='header'><h2 className='book'><Link to='/skambooks' className='Link'>My books</Link></h2><h2>My exchanges</h2><h2 className='search'>Search books</h2></header>
          <h1>Search books</h1>
        <div onChange={ this.handleChange } className='filtered'>
        <input type="radio" value="All" name="gender"/> <h2>All</h2>
        <input type="radio" value="Title" name="gender"/> <h2>Title</h2>
        <input type="radio" value="Author" name="gender"/> <h2>Author</h2>
        </div>
        { filter === 'Author' || filter === 'Title' ? <input type='text' className='email' onChange={ this.change }/> : null }
         <ol>
         { list }   
         </ol>  
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  book: state.reducerFetch.books,
});


export default connect(mapStateToProps)(searcheBooks);
