import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom";

export default class exchanges extends Component {
  render() {
    return (
      <div><h1>SKAMBOOKS</h1>
      <header className='header'><h2 className='book'><Link to='/skambooks' className='Link'>My books</Link></h2><h2>My exchanges</h2><h2 className='search'><Link to='/search' className='Link'>Search books</Link></h2></header>
        <h1>My exchanges</h1></div>
    )
  }
}
