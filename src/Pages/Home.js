import React, { useEffect, useContext, useState } from 'react';
import { schoolApi } from '../Context/globalContext';
import Map from '../Components/Map';
import useFetch from '../hook/useApi';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const { apiData, setApiData } = useContext(schoolApi);
  const [listData, setListData] = useState([]);

  const [value] = useFetch(
    `http://apis.data.go.kr/1532000/KCG_Station_Position/list_view?serviceKey=${process.env.REACT_APP_API_URL}&rowsCount=5&startPage=1`
  );

  const navigate = useNavigate();

  console.log(value, 'qpff');
  useEffect(() => {}, []);

  console.log(apiData, '클릭이벤트 실행시');

  const onClickHanddler = () => {
    const newValue = value.children.map((item, idx) => {
      const body = {
        id: idx,
        name: item.children[0].value,
        x: item.children[1].value,
        y: item.children[2].value,
      };
      return body;
    });
    setApiData(newValue);
    navigate("/map");
  };

  return <div onClick={onClickHanddler}>검색창 </div>;
};

export default Home;
