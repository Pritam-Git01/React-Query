import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

const useSuperHeroesData = (onSuccess, onError, key, fn) => {
  return useQuery([key], fn, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroes = data.data.map((hero) => hero.name)
    //   return superHeroes;
    // },
  });
};

export default useSuperHeroesData;

export const useAddSuperHeroData = () => {
  // after using useQueryClient it helps us to when data mutate or post on that particular key
  // it start fetching data in background and after that it gives the result so we dont hqave to wait so much or
  // not start fetching manually after the data has been post thats called query Invalidation

  // here is a better approch which help us to do not make a network request for getting data
  // the response we get from after posting data we cam use of it show the data on ui

  const querClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data ) => {
    //   querClient.invalidateQueries(["super-heroes"])
    //   querClient.setQueryData(["super-heroes"], (oldQueryData) => {  // here data.data refers to we get response from posting data
    //     return {                                                     // the first data is response object and the second data is our hero data

    //       ...oldQueryData,                                           // oldQuerydatais our old previos data pf objects and data is all hero data araay
    //       data: [...oldQueryData.data, data.data]
    //     }
    //   })

    // }

    //here newHero is that argument which hero Object we are posting on APIs
    onMutate: async (newHero) => {
      await querClient.cancelQueries({queryKey:["super-heroes", newHero.id]});
      const previosHeroData = querClient.getQueryData(["super-heroes", newHero.id])
      querClient.setQueryData(["super-heroes", newHero.id], newHero)
      return {
        previosHeroData, newHero
      }
    },
    onError:(error, _hero, context) => {
      console.log(error.message)
      querClient.setQueryData(["super-heroes", context.newHero.id], context.previosHeroData)
    },
    onSettled:() => {
      querClient.invalidateQueries({queryKey: ["super-heroes"]})
    }
  });
};

//here we learn abut optimistic update it means when we post data on APIs it shouls show the data to the user in
// a optimistic way for that we use three function provided by tenstak query onMutate, onError, onSettled

// first Apporoch
// here we have three methods to use when posting data in first (   // onSuccess: (data ) => {
    //   querClient.invalidateQueries(["super-heroes"])) approch when we posting data we invalidate our queries 
    // here goes two network request one for post and then onr for get 

//SECOND APPROCH
// here we improve and do things in one network request we show the hold the response which we got fromposting data and show that 

//THIRD APPROCH
// here we do optimistic updates we do in sync with what we posting and what we getting for that we use three methods OnMutation, onError, onSettled