import React from 'react';
import './App.css';
import Logo from "./Pokedex_logo.png";

class PokemonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: []
    };
  }

  getPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=151", {
      method: "GET"
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            pokemon: json.results
          });
        });
      }
    });
  }

  componentDidMount() {
    this.getPokemon();
  }

  render() {
    let { pokemon } = this.state;
    let pokemonList;
    pokemonList = (
        <div className="d-flex flex-wrap w-100">
          {pokemon.map((monster, index) =>
            <Pokemon key={monster.name} id={index + 1} pokemon={monster.name} />
          )}
        </div>
    );

    return <div className="container"><div className="logo"><img className="w-25" src={Logo}/></div>{pokemonList}</div>;
  }
}


class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { back: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(pokemon) {
    this.setState(prevState => ({
      back: !prevState.back
    }));
  }
  render() {
    let pokemon = this.props.pokemon;
    let weight = this.props.weight;
    let height = this.props.height;
    let type = this.props.type;
    let caps = this.props.caps;
    let stats = this.props.stats;
    const id = this.props.id;

    return (
      <div className="pokemon-single-container rounded" onClick={() => this.handleClick(pokemon)}>
        <div>
          <img className="sprites" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.back ?  "back/" + id : id}.png`} />
          <div className="align-bottom text-uppercase"> {pokemon}</div>
          <div className="align-bottom">Poids :"{weight}" / Taille="{height}"</div>
          <div className="align-bottom">Capacités="{caps}"</div>
          <div className="align-bottom">Statistiques="{stats}"</div>
          <div className="align-bottom">Type="{type}"</div>
        </div>
      </div>
    );
  }
}

export default PokemonList;
