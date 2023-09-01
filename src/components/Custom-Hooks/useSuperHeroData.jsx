import { useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHero =  (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
     
  };
  
const useSuperHeroData = (heroId) => {
const queryClient = useQueryClient()
  return useQuery(["super-hero",heroId], () => fetchSuperHero(heroId), {
    initialData : () => {
      const hero = queryClient.getQueryData(["super-heroes"])?.data?.find((hero) => hero.id === parseInt(heroId))
      if(hero){
        return {
          data : hero
        }
      } else {
        return undefined;
      }
    }
  });
};

export default useSuperHeroData;
