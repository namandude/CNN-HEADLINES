import axios from 'axios';
import { useState } from 'react';
import { NewsAppContext } from './NewsAppContext';

const API_KEY = 'c7ed991d123440e0935f5ce6e37b7818';
const BASE_URL = `https://newsapi.org/v2/top-headlines?`;

export const NewsAppProvider = ({ children }) => {
  const [headlineByCategory, setHeadlineByCategory] = useState([]);
  const [businessState, setBusinessState] = useState([]);
  const [entertainmentState, setEntertainmentState] = useState([]);
  const [healthState, setHealthState] = useState([]);
  const [scienceState, setScienceState] = useState([]);
  const [sportsState, setSportsState] = useState([]);
  const [technologyState, setTechnologyState] = useState([]);
  const [searchState, setSearchState] = useState([]);
  const [queryState, setQueryState] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getHeadlineByCategory = (COUNTRY_CODE, CATEGORY) => {
    axios
      .get(`${BASE_URL}country=${COUNTRY_CODE}&category=${CATEGORY}&apiKey=${API_KEY}`)
      .then(response => {
        setHeadlineByCategory(response.data);
        return response.data;
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  return (
    <NewsAppContext.Provider
      value={{
        headlineByCategory,
        getHeadlineByCategory,
        businessState,
        setBusinessState,
        entertainmentState,
        setEntertainmentState,
        healthState,
        setHealthState,
        scienceState,
        setScienceState,
        sportsState,
        setSportsState,
        technologyState,
        setTechnologyState,
        searchState,
        setSearchState,
        setQueryState,
        queryState,
        searchResult,
        setSearchResult,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </NewsAppContext.Provider>
  );
};
