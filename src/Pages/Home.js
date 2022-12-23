import React, { useEffect, useContext, useState } from 'react';
import XMLParser from 'react-xml-parser';
import { schoolApi } from '../Context/globalContext';
import axios from 'axios';
const Home = () => {
  const { apiData, setApiData } = useContext(schoolApi);
  const apiKey =
    'Zlb1Vzz%2FXozCyf%2FKGFcPfYHNHsEo0DMxI1YIS5bD1y22HauG3TKirP8dr9aAVg8U5ZpSvWxEC2ppvuXNY7XyYA%3D%3D';
  const defaultClient = () => {
    axios
      .get(
        `https://api.odcloud.kr/api/15062028/v1/uddi:58093a45-2905-49a3-9c74-f3226e1581e0?page=1&perPage=5&returnType=JSON&serviceKey=%09%20Zlb1Vzz%2FXozCyf%2FKGFcPfYHNHsEo0DMxI1YIS5bD1y22HauG3TKirP8dr9aAVg8U5ZpSvWxEC2ppvuXNY7XyYA%3D%3D`,
        {
          headers: {
            accept: 'application/json',
            Authorization: apiKey,
          },
        }
      )
      .then((res) => {
        const datas = res.data.definitions;
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
