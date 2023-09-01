import axios from "axios";
import useSuperHeroData from "../Custom-Hooks/useSuperHEroesData";

const fetchingData = async () => {
  return await axios.get("http://localhost:4000/superheroes");
};

const TempData = () => {
  const onSuccess = (data) => {
    console.log(data.data);
  };

  const onError = (error) => {
    console.log(error);
  };
  const { isLoading, isError, data, error } = useSuperHeroData(
    onSuccess,
    onError,
    "temp-heroes",
    fetchingData
  );

  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div>{isLoading ? <p>Loading....</p> : <div>Temp Super Heroes</div>}</div>
  );
};

export default TempData;
