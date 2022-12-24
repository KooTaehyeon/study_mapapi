import React, { useEffect, useContext, useState } from 'react';
import XMLParser from 'react-xml-parser';
import { schoolApi } from '../Context/globalContext';
import axios from 'axios';
const Home = () => {
  const { apiData, setApiData } = useContext(schoolApi);
  const PROXY = '/data';
  const apiKey =
    'Zlb1Vzz/XozCyf/KGFcPfYHNHsEo0DMxI1YIS5bD1y22HauG3TKirP8dr9aAVg8U5ZpSvWxEC2ppvuXNY7XyYA==';
  const defaultClient = () => {
    axios
      .get(
        `${PROXY}/rest/shoppingcenter/getShoppingcenterList?authApiKey=${apiKey}&dataValue=%EB%82%98%EB%B9%84%EB%8A%98%EA%BD%83`
      )
      .then((res) => {
        const datas = res.data;
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
