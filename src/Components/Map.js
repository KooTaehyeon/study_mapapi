import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
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
  const [selectedItemStatus, setSelectedItemStatus] = useState(["파술소를 선택해주세요.", "37.597013003652336", "127.05386856941846", "없음"]);
  const [effectOnce, setEffectOnce] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const mapElement = useRef(null);

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

  /*
  * 네이버 지도 생성 및 초기화
  */
  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    
    var centerLocation = new naver.maps.LatLng(selectedItemStatus[1], selectedItemStatus[2]);
    const map = new naver.maps.Map(mapElement.current, {
      center: centerLocation,
      zoom: 17,
    });
    new naver.maps.Marker({
      position: centerLocation,
      map,
    });
  }, []);

  /*
   * 사용자가 파출소 정보(selectedItemStatus 가 변경될 시) 지도 및 오버레이 업데이트
   */
  useEffect(() => {
    if(!effectOnce) {setEffectOnce(true);return;}
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    var selectedItemName = selectedItemStatus[0];
    var selectedItemNote = selectedItemStatus[3];
    var centerLocation = new naver.maps.LatLng(selectedItemStatus[2], selectedItemStatus[1]);
    
    // 새로운 네이버 맵 생성..(기존 지도를 업데이트 하도록 수정)
    const map = new naver.maps.Map(mapElement.current, {
      center: centerLocation,
      zoom: 17,
    });
    // 아마도 마커 제거
    new naver.maps.Marker(null);
    // 마커 생성
    new naver.maps.Marker({
      position: centerLocation,
      map,
    });

    // 네이버 API 헤더 내 공백 문제로 axios 사용 불가..
    /*
    const baseUrl = "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc";
    const client_id = "jqnqizu970";
    const client_secret = "QJgaBXPXVRVNbSUBQexgMJsSW7R6JRQ7iAqYhrG9";
    var coords = selectedItemStatus[2] + "," + selectedItemStatus[1];
    axios.get(baseUrl + "?coords=" + coords + "&output=json&order=addr", {
        headers: {
        'X-NCP-APIGW-API-KEY-ID':client_id,
        'X-NCP-APIGW-API-KEY':client_secret
      }
    }).then(({response}) => console.log("주소 검색 결과:\n" + response));    
    */
    
    toggleOverlay(true);

  }, [selectedItemStatus]);

  useEffect(() => {
    getNewData();
  } , [page])

  useEffect(() => {
    const menuContainer = document.querySelector('.menuConatiner');
    menuContainer.addEventListener("scroll", _infiniteScroll, true);
    return () => menuContainer.removeEventListener("scroll", _infiniteScroll, true);
  }, [_infiniteScroll])

  // console.log(value,'value');

  const onUpdateMap = (name, x, y, text) => {
    console.log(name + "로 지도 이동\n좌표:" + x + ", " + y + "\n메모:" + text);
    setSelectedItemStatus([name, x, y, text]);
  }

  /*
   * 오버레이 토글 
   */
  const toggleOverlay = (isOverlay) => {
    const overlay = document.getElementById('overlay');
    if(isOverlay) {
      overlay.setAttribute("style", overlay.getAttribute("style").replace("display: none", ""));
    }else {
      overlay.setAttribute("style", overlay.getAttribute("style") + "display: none");
    }
  }

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
      <div ref={mapElement} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 'calc(100vh - 45px)',
          backgroundColor: '#dfdfdf'
        }} />
        <div id='overlay' style={{position: 'absolute', width: '200px', minHeight: '200px', backgroundColor: 'white', top: '0px', marginLeft: '10vw', marginTop: '20vh', borderRadius: '10px', boxShadow: '1px 1px 3px gainboro', paddingLeft: '20px', paddingRight: '20px', wordBreak: 'keep-all', boxShadow: '1px 1px 3px grey'}}>
          <h6 style={{textAlign: 'end', marginTop: '14px', marginBottom: '2px', fontSize: '14px'}} onClick={() => {toggleOverlay(false)}}>x</h6>
          <h4 style={{marginTop: '0px'}}>이름: <span>{selectedItemStatus[0]}</span></h4>
          <h5>좌표: <span>{selectedItemStatus[1] + ", " + selectedItemStatus[2]}</span></h5>
          <h5>메모: <span>{selectedItemStatus[3]}</span></h5>
        </div>
      <section css={rightStyle} className={`${menuStatus ? 'on' : ''} menuConatiner`}>
          { apiData && apiData.map((item, idx) => (
            <Item key={idx} id={idx} name={item.name} x={item.x} y={item.y} onUpdateMap={onUpdateMap}/>
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
