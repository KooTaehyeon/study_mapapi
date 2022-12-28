import React, { useEffect, useContext, useState } from 'react';
import XMLParser from 'react-xml-parser';
import { schoolApi } from '../Context/globalContext';
import axios from 'axios';
import Map from '../Components/Map';
import useFetch from '../hook/useApi';
const Home = () => {
  const { apiData, setApiData } = useContext(schoolApi);
  const [listData, setListData] = useState([
    {
      id: 0,
      name: '',
      x: 0,
      y: 0,
    },
  ]);
  const apiKey =
    'Zlb1Vzz%2FXozCyf%2FKGFcPfYHNHsEo0DMxI1YIS5bD1y22HauG3TKirP8dr9aAVg8U5ZpSvWxEC2ppvuXNY7XyYA%3D%3D';
  const [value] = useFetch(
    `http://apis.data.go.kr/1532000/KCG_Station_Position/list_view?serviceKey=${apiKey}&rowsCount=5&startPage=1`
  );
  console.log(value, '초기');

  useEffect(() => {}, []);
  console.log(apiData, '클릭이벤트 실행시');
  const onClickHanddler = () => {
    setApiData(value.children);
  };
  return <div onClick={onClickHanddler}>검색창 </div>;
};

export default Home;
