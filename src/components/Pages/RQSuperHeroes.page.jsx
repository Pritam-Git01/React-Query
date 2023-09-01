import React, { useState } from "react";
import useSuperHeroesData from "../Custom-Hooks/useSuperHEroesData";
import { useAddSuperHeroData } from "../Custom-Hooks/useSuperHEroesData";
import { request } from "./axios-utilit";

import axios from "axios";
import { Link } from "react-router-dom";

const fetchData = () => {
  return  request({ url : "/superheroes"});
};

const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const handleClick = () => {
    const hero = { name:name, alterEgo:alterEgo };
    console.log(hero)
    addHero(hero);
  };
  const onSuccess = (data) => {
     console.log(data)
  };
  const onError = (error) => {
    console.log(error);
  };
  const { mutate: addHero } = useAddSuperHeroData();
  const { isLoading, data, isError, error, isFetching } = useSuperHeroesData(
    onSuccess,
    onError,
    "super-heroes",
    fetchData
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h2>RQ Super Heroes</h2>
      <form onSubmit={handleClick}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleClick} type="button">
          Send Data
        </button>
      </form>
      {data?.data.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name} </Link>
        </div>
      ))}
      {/* {
        data.map((item) => <p key={item}>{item}</p>)
      } */}
    </div>
  );
};

export default RQSuperHeroesPage;
