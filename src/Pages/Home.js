import React, { useEffect, useContext, useState } from 'react';
import { schoolApi } from '../Context/globalContext';
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

  const [value] = useFetch(
    `http://apis.data.go.kr/1532000/KCG_Station_Position/list_view?serviceKey=${process.env.REACT_APP_API_URL}&rowsCount=5&startPage=1`
  );
  console.log(value, 'value');

  useEffect(() => {}, []);

  console.log(apiData, '클릭이벤트 실행시');

  const onClickHanddler = () => {
    setApiData(value.children);

    let result = []
    for (let i = 0; i < 5; i++) {
      let apiResult = {
        id: i,
        name: value.children[i].children[0].value,
        x: value.children[i].children[1].value,
        y: value.children[i].children[2].value
      }
      result.push(apiResult)
    }
    setListData(result)
  };

  console.log(listData, "가공")

  return <div onClick={onClickHanddler}>검색창 </div>;
};

export default Home;
