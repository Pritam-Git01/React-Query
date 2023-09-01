import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import {ReactQueryDevtools, ReactQueryDevtoolsPanel} from "@tanstack/react-query-devtools"
import  HomePage  from './components/Pages/Home-Page'
import RQSuperHeroesPage from "./components/Pages/RQSuperHeroes.page"
import SuperHeroesPage from "./components/Pages/SuperHeroes.page"
import Header from './components/Pages/Header'
import TempData from './components/Pages/TempData'
import RQSuperHero from './components/Pages/RQSuperHero.page'
import DynamicParallelQuery from './components/Pages/DynamicParallelQuery'
import DependentQueries from './components/Pages/DependentQueries'
import PaginatedQueries from './components/Pages/PaginatedQueries'
import InfinteQueries from './components/Pages/InfinteQueries'

const queryClient = new QueryClient
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/rq-super-heroes" element={<RQSuperHeroesPage/>}/>
        <Route path="/super-heroes" element={<SuperHeroesPage/>}/>
        <Route path="/temp-heroes" element={<TempData/>}/>
        <Route path='/rq-super-heroes/:heroId' element={<RQSuperHero/>}/>
        <Route path="/dynamic-parallel-query" element={ <DynamicParallelQuery heroIds={[1,3]}/>}/>
        <Route path='/dependent-queries' element={<DependentQueries email="pritam@example.com"/>}/>
        <Route path="/paginated-queries" element={<PaginatedQueries/>}/>
        <Route path='/infinite-queries' element={<InfinteQueries/>}/>

        
      </Routes>
    </Router>
    <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App;