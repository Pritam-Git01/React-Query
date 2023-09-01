import axios from "axios";
import { Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchColors = ({ pageParam }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};
const InfinteQueries = () => {
  const {
    isLoading,
    isError,
    data,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        // here you can use condition based on your api request like in how much page you have to show to the user
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      {data?.pages.map((group, i) => {
        return (
          <Fragment key={i}>
            {group.data.map((item) => (
              <p key={item.id}>
                {item.id}. {item.label}
              </p>
            ))}
          </Fragment>
        );
      })}

      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Load More...
      </button>

      {isFetching && !isFetchingNextPage ? <h2>Loading...</h2> : null}
    </div>
  );
};

export default InfinteQueries;
