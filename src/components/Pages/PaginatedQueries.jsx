import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};
const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const buttons = new Array(4).fill(1);
  const { isLoading, isError, data, error, isFetching } = useQuery(
    ["colors",pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h2>Colors</h2>
      {data?.data.map((item) => (
        <p key={item.id}>
          {item.id}. {item.label}
        </p>
      ))}
     {
        buttons.map((i,index) => (
            <button key={index} onClick={() => setPageNumber(index + 1)}>{index+1}</button>
        ))
     }

      {isFetching && "Loading..."}
    </div>
  );
};

export default PaginatedQueries;
