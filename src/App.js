import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import coverImg from './images/cover.jpg';

class App extends Component {
  state = {
    characters: [],
    fetchMoreCharacters: ''
  }

  componentDidMount(){
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let characters = data.results;
        let fetchMoreCharacters = data.info.next
        this.setState({
          characters,
          fetchMoreCharacters
        })
      })
  }

  render() {
    let characters = this.state.characters;
    console.log(characters);
    
    return (
      <Router>
        <div className="App">
          <img src={coverImg} alt="Rick and Morty Cover image" className="App__coverImg"/>
          <h1 className="App__title">Rick and Morty characters infromation app</h1>
          <div className="App__body">
            <div className="App__sideBar">
              {
                characters.map((character) => {
                  return (
                    <li>
                      <Link to={`/characters/${character.id}`}>{character.name}</Link>
                    </li>
                  );
                })
              }
            </div>
            <main className="App__informationsArea">
              INFO
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
