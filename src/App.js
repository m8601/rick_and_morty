import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CharacterInformation from './components/CharacterInformation';

import './App.css';
import coverImg from './images/cover.jpg';

class App extends Component {
  state = {
    characters: [],
    fetchMoreCharacters: '',
    selectedCharacter: {
      location: '',
      origin: ''
    }
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

  loadMoreCharacters = () => {
    let url = this.state.fetchMoreCharacters;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let characters = [...this.state.characters, ...data.results];
        let fetchMoreCharacters = data.info.next
        this.setState({
          characters,
          fetchMoreCharacters
        })
      })
  }

  selectCharacter = (index) => {
    let selectedCharacter = this.state.characters[index]
    this.setState({
      selectedCharacter
    })
  }

  render() {
    let characters = this.state.characters;
    let selectedCharacter = this.state.selectedCharacter;
    console.log(characters);
    console.log(selectedCharacter);
    
    return (
      <Router>
        <div className="App">
          <img src={coverImg} alt="Rick and Morty Cover image" className="App__coverImg"/>
          <h1 className="App__title">Rick and Morty characters infromation app</h1>
          <div className="App__body">
            <div className="App__sideBar">
              <button 
                disabled={this.state.fetchMoreCharacters === ''? true:false} 
                onClick={this.loadMoreCharacters}
              >Load more characters</button>
              {
                characters.map((character, index) => {
                  return (
                    <li onClick={()=>{this.selectCharacter(index)}} key={character.id}>
                      <Link to={`/characters/${character.id}`}>{character.name}</Link>
                    </li>
                  );
                })
              }
            </div>
            <main className="App__informationsArea">
              
              <Route 
                path="/characters/:id"
                render={() => (<CharacterInformation characterInfo={this.state.selectedCharacter}/>)}
              />
              
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
