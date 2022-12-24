import React, { useEffect, useContext, useState } from 'react';
import XMLParser from 'react-xml-parser';
import { schoolApi } from '../Context/globalContext';
import axios from 'axios';
const Home = () => {
  const { apiData, setApiData } = useContext(schoolApi);
  const PROXY = '/data';
  const apiKey = '9722078016';
  const defaultClient = () => {
    axios
      .get(
        `http://data.ex.co.kr/openapi/locationinfo/locationinfoUnit?key=9722078016&type=json&routeNo=2&unitCode=1&numOfRows=1&pageNo=1`
      )
      .then((res) => {
        const datas = res;
        // parseStr(datas);
        console.log('datas', datas);
      })
      .catch((err) => {
        console.log(err, '에러');
      });
  };
  function parseStr(dataSet) {
    const dataArr = new XMLParser().parseFromString(dataSet).children;
    setApiData(dataArr[1]);
  }
  useEffect(() => {
    defaultClient();
  }, []);
  console.log('apiData', apiData);

  return <div>홈 메인 페이지</div>;
};

export default Home;
