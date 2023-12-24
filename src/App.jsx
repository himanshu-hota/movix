import { useCallback, useEffect } from "react"
import { fetchDataFromApi } from "./utils/api"
import { useDispatch } from "react-redux"
import { getApiConfiguration } from "./store/homeSlice";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header, Footer } from "./components";
import { Details, ErrorPage, Explore, Home, SearchResult } from './pages';
import { getGenres } from "./store/homeSlice";



function App() {

  const dispatch = useDispatch();
  


  const fetchApiConfig = useCallback(async () => {
    const res = await fetchDataFromApi('/configuration');
    const urls = {
      backdrop: res.images.secure_base_url + 'original',
      poster: res.images.secure_base_url + 'original',
      profile: res.images.secure_base_url + 'original',

    }
    dispatch(getApiConfiguration(urls));
  }, [dispatch]);



  const genresCall = async () => {
    let promises = [];
    let endPoints = ['tv', 'movie'];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map(item => (allGenres[item.id] = item));
    })

    dispatch(getGenres(allGenres));
  }


  useEffect(() => {
    genresCall();
    fetchApiConfig();

  }, [fetchApiConfig]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />

        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
