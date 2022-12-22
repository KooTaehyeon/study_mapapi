import React from 'react';
import { useContext } from 'react';
import { schoolApi } from '../Context/globalContext';
const Home = () => {
  const { apiData, setApiData } = useContext(schoolApi);
  console.log(apiData);
  return <div>홈 메인 페이지</div>;
};

export default Home;
