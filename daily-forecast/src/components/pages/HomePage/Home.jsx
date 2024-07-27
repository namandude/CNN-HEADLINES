import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterAndSliceArticles } from '../../../utils/filterAndSliceArticles/filterAndSliceArticles';
import { timeElapsedSince } from '../../../utils/timeElapsed/timeElapsed';
import CategoryHeader from '../../atoms/CategoryHeader/Header';
import Loader from '../../atoms/Loader/Loader';
import Card from '../../molecules/Card/Card';
import CategoryComponent from '../../molecules/Category/Category';
import HeaderNavigationMenu from '../../organisms/Navigation/HeaderNavigationMenu';
import { NewsAppContext } from '../../organisms/context/NewsAppContext';
import './Home.styles.css';

const HomeComponent = () => {
  const navigate = useNavigate();
  const {
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
    fetchSearchData,
    queryState,
    searchQuery,
    searchResult,
  } = useContext(NewsAppContext);

  const initialState = {
    business: [],
    entertainment: [],
    health: [],
    science: [],
    sports: [],
    technology: [],
    loading: true,
    error: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          ...state,
          [action.category]: action.articles,
          loading: false,
          error: null,
        };
      case 'FETCH_ERROR':
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const API_KEY = 'c7ed991d123440e0935f5ce6e37b7818';
  
  const fetchArticles = async (category) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      switch (category) {
        case 'business':
          setBusinessState(data.articles);
          break;
        case 'entertainment':
          setEntertainmentState(data.articles);
          break;
        case 'health':
          setHealthState(data.articles);
          break;
        case 'science':
          setScienceState(data.articles);
          break;
        case 'sports':
          setSportsState(data.articles);
          break;
        case 'technology':
          setTechnologyState(data.articles);
          break;
        default:
          console.error(`Invalid category: ${category}`);
      }
      dispatch({ type: 'FETCH_SUCCESS', category, articles: data.articles });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', error });
    }
  };

  useEffect(() => {
    fetchArticles('business');
    fetchArticles('entertainment');
    fetchArticles('health');
    fetchArticles('science');
    fetchArticles('sports');
    fetchArticles('technology');
  }, []);

  const {
    business,
    entertainment,
    health,
    science,
    sports,
    technology,
    loading,
    error,
  } = state;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const categoryDetailPage = (val, data) => {
    const category = { title: val, data: data };
    navigate(`/detail/${val}`, { state: { category } });
  };

  return (
    <>
      {/* nav */}
      <HeaderNavigationMenu title={'CNN-HEADLINES'} />
      {/* <h1>Category</h1> */}
      <CategoryComponent />
      <div className='flex-container'>
        {/* left */}
        <div className='flex-item-left'>
          <CategoryHeader
            title={'Technology'}
            onClick={() => categoryDetailPage('technology', technologyState)}
          />
          {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

          {loading ? (
            <Loader />
          ) : (
            filterAndSliceArticles(technologyState, 3).map((article, index) => (
              <Card
                key={index}
                source={article.source.name}
                url={article.url}
                imageUrl={article.urlToImage}
                title={article.title}
                lastUpdated={timeElapsedSince(article.publishedAt)}
              />
            ))
          )}
        </div>
        {/* center */}

        <div className='flex-item-center'>
          <CategoryHeader
            title={'Health'}
            onClick={() => categoryDetailPage('health', healthState)}
          />
          {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

          {loading ? (
            <Loader />
          ) : (
            filterAndSliceArticles(healthState, 3).map((article, index) => (
              <Card
                key={index}
                source={article.source.name}
                url={article.url}
                imageUrl={article.urlToImage}
                title={article.title}
                lastUpdated={timeElapsedSince(article.publishedAt)}
              />
            ))
          )}
        </div>
        {/* right */}
        <div className='flex-item-right'>
          <CategoryHeader
            title={'Science'}
            onClick={() => categoryDetailPage('science', scienceState)}
          />
          {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

          {loading ? (
            <Loader />
          ) : (
            filterAndSliceArticles(scienceState, 3).map((article, index) => (
              <Card
                key={index}
                source={article.source.name}
                url={article.url}
                imageUrl={article.urlToImage}
                title={article.title}
                lastUpdated={timeElapsedSince(article.publishedAt)}
              />
            ))
          )}
        </div>
      </div>
      <div className='flex-container'>
        {/* left */}
        <div className='flex-item-left'>
          <CategoryHeader
            title={'Sports'}
            onClick={() => categoryDetailPage('sports', sportsState)}
          />
          {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

          {loading ? (
            <Loader />
          ) : (
            filterAndSliceArticles(sportsState, 3).map((article, index) => (
              <Card
                key={index}
                source={article.source.name}
                url={article.url}
                imageUrl={article.urlToImage}
                title={article.title}
                lastUpdated={timeElapsedSince(article.publishedAt)}
              />
            ))
          )}
        </div>
        {/* center */}

        <div className='flex-item-center'>
          <CategoryHeader
            title={'Entertainment'}
            onClick={() =>
              categoryDetailPage('entertainment', entertainmentState)
            }
          />
          {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

          {loading ? (
            <Loader />
          ) : (
            filterAndSliceArticles(entertainmentState, 3).map((article, index) => (
              <Card
                key={index}
                source={article.source.name}
                url={article.url}
                imageUrl={article.urlToImage}
                title={article.title}
                lastUpdated={timeElapsedSince(article.publishedAt)}
              />
            ))
          )}
        </div>
        {/* right */}
        <div className='flex-item-right'>
          <CategoryHeader
            title={'Business'}
            onClick={() => categoryDetailPage('business', businessState)}
          />
          {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

          {loading ? (
            <Loader />
          ) : (
            filterAndSliceArticles(businessState, 3).map((article, index) => (
              <Card
                key={index}
                source={article.source.name}
                url={article.url}
                imageUrl={article.urlToImage}
                title={article.title}
                lastUpdated={timeElapsedSince(article.publishedAt)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
