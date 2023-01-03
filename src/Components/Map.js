import React, { useCallback, useContext, useEffect, useState } from 'react';
import { schoolApi } from '../Context/globalContext';
import useFetch from '../hook/useApi';
import XMLParser from 'react-xml-parser';
import axios from 'axios';

/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import Item from './Item';

const Map = () => {
  const [menuStatus, setMenuStatus] = useState(false);
  const { apiData, setApiData } = useContext(schoolApi);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const menuHandler = () => {
    setMenuStatus(!menuStatus);
  };

  // const [value] = useFetch(
  //   `http://apis.data.go.kr/1532000/KCG_Station_Position/list_view?serviceKey=${process.env.REACT_APP_API_URL}&rowsCount=5&startPage=${page}`
  // );

  const getNewData = () => {
      console.log("새로운 데이터를 가져옴");
      console.log(page,"new");
      const fetchData = () => 
        axios.get(`http://apis.data.go.kr/1532000/KCG_Station_Position/list_view?serviceKey=${process.env.REACT_APP_API_URL}&rowsCount=5&startPage=${page}`)
        .then(({ data }) => parseStr(data));
      setLoading(false);
      fetchData();
  }

  function parseStr(dataSet) {
    const dataArr = new XMLParser().parseFromString(dataSet);
    const newData = dataArr.children[6];
    const newValue = newData.children.map((item, idx) => {
      const body = {
        id: idx,
        name: item.children[0].value,
        x: item.children[1].value,
        y: item.children[2].value,
      };
      return body;
    });
    console.log(newValue,page);
    setApiData(apiData.concat(newValue))
  }
  console.log(apiData,"Wks");

  const _infiniteScroll = useCallback(() => {
    // 스크롤 높이 값
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.querySelector('.menuConatiner').scrollHeight
    );
    // 스크롤 top 값
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.querySelector('.menuConatiner').scrollTop
    );
    // 화면높이
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
        console.log("끝에 닿았따!");
        setLoading(true)
        setPage( page + 1 );
    }
      
  }, []);

  useEffect(() => {
    getNewData();
  } , [page])

  useEffect(() => {
    const menuContainer = document.querySelector('.menuConatiner');
    menuContainer.addEventListener("scroll", _infiniteScroll, true);
    return () => menuContainer.removeEventListener("scroll", _infiniteScroll, true);
  }, [_infiniteScroll])

  // console.log(value,'value');

  return (
    <>
      <header css={headerStyle}>
        <div css={logoStyle}>
          <span>파출소</span>
        </div>
        <div
          css={menuStyle}
          className={menuStatus ? 'on' : ''}
          onClick={menuHandler}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <section css={mapStyle}>지도 영역</section>
      <section css={rightStyle} className={`${menuStatus ? 'on' : ''} menuConatiner`}>
          { apiData && apiData.map((item, idx) => (
            <Item key={idx} id={idx} name={item.name} x={item.x} y={item.y}/>
            // <div css={contentStyle} key={idx}>
            //   <p>-  {item.name}</p>
            //   <p>- 위치 : (위도 : {item.x}) , (경도 : {item.y})</p>
            //   <p>- 메모 : 
            //     <textarea placeholder='메모를 입력해주세요.'></textarea>
            //   </p>
            //   <ul css={btnStyle}>
            //     <li>
            //       <button>추가</button>
            //     </li>
            //     {/* <li>
            //       <button>삭제</button>
            //     </li> */}
            //   </ul>
            // </div> 
          ))}
      </section>
    </>
  );
};

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ffca0c;
`;
const logoStyle = css`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
`;
const menuStyle = css`
  width: 30px;
  height: 25px;
  cursor: pointer;
  flex-shrink: 0;
  & > span {
    display: block;
    width: 100%;
    height: 4px;
    background-color: #222;
    margin-bottom: 5px;
    overflow: hidden;
    transition: transform 0.5s, opacity 0.5s;
  }
  &.on > span:nth-of-type(1) {
    transform: translateY(10px) rotate(-45deg);
    -webkit-transform: translateY(10px) rotate(-45deg);
  }
  &.on > span:nth-of-type(2) {
    opacity: 0;
  }
  &.on > span:nth-of-type(3) {
    transform: translateY(-8px) rotate(45deg);
    -webkit-transform: translateY(-8px) rotate(45deg);
  }
`;
const mapStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 45px);
  background-color: #dfdfdf;
`;

const rightStyle = css`
  position: absolute;
  display: block;
  width: 90%;
  height: calc(100vh - 45px);
  overflow-y: scroll;
  background-color: #fff;
  top: 45px;
  right: -90%;
  padding: 15px;
  z-index: 1;
  transition: right 1s;
  &.on {
    right: 0;
  }
`;
export default Map;
