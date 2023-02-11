import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

// Components
import Pokemon from "../components/Pokemon";
import Loader from "../components/Loader";

//weakness

const Homepage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterpokemon, setFilterPokemon] = useState([]);
  const [pokemontypes] = useState([
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Flying",
    "Fighting",
    "Poison",
    "Electric",
    "Ground",
    "Rock",
    "Psychic",
    "Ice",
    "Bug",
    "Ghost",
    "Steel",
    "Dragon",
    "Dark",
    "Fairy",
  ]);

  const getPokemonList = async () => {
    let pokemonArray = [];
    for (let i = 1; i <= 151; i++) {
      pokemonArray.push(await getPokemonData(i));
    }
    console.log(pokemonArray);
    setPokemon(pokemonArray);
    setFilterPokemon(pokemonArray);

    setLoading(false);
  };

  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  const handlefilterbyname = () => {
    let value = document.getElementById("p-name").value;
    console.log(value);

    let ab = pokemon.filter((item) => {
      console.log(item.data.name);
      return item.data.name.includes(value);
    });
    setFilterPokemon(ab);
    console.log(ab);
  };

  const handlefilterbytypes = () => {
    let value = document.getElementsByClassName("a-name");
    var arr = Array.from(value);
    console.log(arr);

    let filteringTypes = arr.map((item, index) => {
      if (value[index].checked) {
        return pokemontypes[index];
      }
      return "";
    });
    filteringTypes = filteringTypes.filter((item) => {
      return item !== "";
    });
    console.log(filteringTypes);

    let ab = pokemon.filter((item) => {
      let currentTypes = item.data.types.map((typeObj) => {
        return typeObj.type.name;
      });
      for (let newType of filteringTypes) {
        console.log(
          currentTypes.includes(newType.toLowerCase()),
          newType,
          currentTypes
        );

        if (currentTypes.includes(newType.toLowerCase())) {
          return true;
        }

        if (newType === pokemontypes[0]) {
          return true;
        }
      }
      return false;
    });

    setFilterPokemon(ab);
    console.log(ab);
  };

  const weakness = [
    {
      type: "Normal",
      weakness: "fighting",
    },
    {
      type: "Fire",
      weakness: "ground, rock, water",
    },
    {
      type: "Water",
      weakness: "grass, electric",
    },
    {
      type: "Grass",
      weakness: "flying, poison, bug, steel, fire, grass, dragon",
    },
    {
      type: "Flying",
      weakness: "rock, electric, ice",
    },
    {
      type: "Fighting",
      weakness: "flying, psychic, ice",
    },
    {
      type: "Poison",
      weakness: "ground, psychic",
    },
    {
      type: "Electric",
      weakness: "ground",
    },
    {
      type: "Ground",
      weakness: "water, grass, ice",
    },
    {
      type: "Rock",
      weakness: "fighting, ground, steel, water, grass",
    },
    {
      type: "Psychic",
      weakness: "bug, ghost, dark",
    },
    {
      type: "Ice",
      weakness: "fighting, rock, steel, fire",
    },
    {
      type: "Bug",
      weakness: "flying, rock, fire",
    },
    {
      type: "Ghost",
      weakness: "ghost, dark",
    },
    {
      type: "Steel",
      weakness: "fighting, ground, fire",
    },
    {
      type: "Dragon",
      weakness: "ice, dragon, fairy",
    },
    {
      type: "Dark",
      weakness: "fighting, bug, fairy",
    },
    {
      type: "Fairy",
      weakness: "poison, steel",
    },
  ];

  return (
    <>
      <h4 style={{ textAlign: "center", color: "#252422" }}>
        Filter By Name
      </h4>
      <div id="name-container">
        <input id="p-name" type="text" placeholder="Enter Pokemon Name..." />
        <button onClick={handlefilterbyname}>Filter By Name</button>
      </div>
      <h4 style={{ textAlign: "center", color: "#252422" }}>
        Filter By Types
      </h4>
      <div id="types-container">
        {pokemontypes.map((item, key) => {
          return (
            <div>
              <input className="a-name" type="checkbox" />
              <label>{item}</label>
            </div>
          );
        })}

        <button onClick={handlefilterbytypes}>Filter By Types</button>
      </div>
      <h4 style={{ textAlign: "center", color: "#252422" }}>
        Weakness for...
      </h4>
      <div id="types-container">
        {weakness.map((obj, key) => {
          return (
            <div className="weakness-container">
              <div className="weakness-div">{obj.type}</div>

              <button className="weak-btn">{obj.weakness}</button>
            </div>
          );
        })}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <Row>
          {filterpokemon.map((p) => (
            <Col key={p.data.name} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Pokemon pokemon={p.data} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Homepage;
