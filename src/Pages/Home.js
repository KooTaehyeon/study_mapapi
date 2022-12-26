import React, { useEffect, useContext, useState } from 'react';
import XMLParser from 'react-xml-parser';
import { schoolApi } from '../Context/globalContext';
import axios from 'axios';
const Home = () => {
  const { apiData, setApiData } = useContext(schoolApi);
  console.log(apiData);
  const PROXY = '/data';
  const apiKey =
    'Zlb1Vzz%2FXozCyf%2FKGFcPfYHNHsEo0DMxI1YIS5bD1y22HauG3TKirP8dr9aAVg8U5ZpSvWxEC2ppvuXNY7XyYA%3D%3D';
  const defaultClient = () => {
    axios
      .get(
        `http://apis.data.go.kr/1532000/KCG_Station_Position/list_view?serviceKey=${apiKey}&rowsCount=3&startPage=1`
      )
      .then((res) => {
        const datas = res.data;
        console.log('datas', datas);

        parseStr(datas);
      })
      .catch((err) => {
        console.log(err, '에러');
      });
  };
  function parseStr(dataSet) {
    const dataArr = new XMLParser().parseFromString(dataSet);
    setApiData(dataArr.children[6]);
    console.log(
      'dataArr.children[6]',
      dataArr.children[6].children[0].children[0].value,
      dataArr.children[6].children[0].children[1].value,
      dataArr.children[6].children[0].children[2].value
    );
  }
  useEffect(() => {
    defaultClient();
  }, []);
  console.log('apiData1', apiData.children);

  return <div>홈 메인 페이지</div>;
};

export default Home;
