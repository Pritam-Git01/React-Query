import useSuperHeroData from "../Custom-Hooks/useSuperHeroData";
import { useParams } from "react-router-dom";

const RQSuperHero = () => {
  const { heroId } = useParams();
  const { isLoading, isError, data, error } = useSuperHeroData(heroId);

  if(isError){
    return <h2>{error.message}</h2>
  }
  console.log(data)
  return(
<div>
    <h2>Indivisual Details</h2>

    {
        isLoading? <h2>Loading...</h2>:<p>{data?.data.name} -  {data?.data.alterEgo}</p>
    }
</div>
  ) 
};

export default RQSuperHero;
