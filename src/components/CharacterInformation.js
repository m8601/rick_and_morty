import React , {Component} from 'react';

class CharacterInformation extends Component {
  render(){
    return (
      <div>
        <div className="CharacterInformation__info">
          <h2>Name: {this.props.characterInfo.name}</h2>
          <p>Species: {this.props.characterInfo.species}</p>
          <p>Gender: {this.props.characterInfo.gender}</p>
          <p>Status: {this.props.characterInfo.status}</p>
          <p>Origin: {this.props.characterInfo.origin.name}</p>
          <p>Location: {this.props.characterInfo.location.name}</p>
        </div>
        <div className="CharacterInformation__img">
          <img src={this.props.characterInfo.image} alt={this.props.characterInfo.name}/>
        </div>
      </div>
    );
  }
}

export default CharacterInformation;