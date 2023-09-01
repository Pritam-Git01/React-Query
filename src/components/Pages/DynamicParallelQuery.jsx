import { useQueries } from '@tanstack/react-query'
import axios from 'axios'

const fetchSuperHero = heroId => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

 const DynamicParallelQuery = ({ heroIds }) => {
  const queryResults = useQueries({
    queries: heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      }
    }),
  })

  console.log({queryResults})
  return <div>Dynamic Parallel Queries</div>
}
export default DynamicParallelQuery;