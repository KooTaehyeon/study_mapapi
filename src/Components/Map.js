import React, { useState } from 'react';
import { useEffect, useRef } from 'react';

/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';

const Map = () => {
  const [menuStatus, setMenuStatus] = useState(false);
  const [selectedItemStatus, setSelectedItemStatus] = useState(["", "37.597013003652336", "127.05386856941846"]);
  const [effectOnce, setEffectOnce] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const menuHandler = () => {
    setMenuStatus(!menuStatus);
  };

  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    
    var centerLocation = new naver.maps.LatLng("37", "127");
    const map = new naver.maps.Map(mapElement.current, {
      center: centerLocation,
      zoom: 17,
    });
    new naver.maps.Marker({
      position: centerLocation,
      map,
    });
  }, []);

  useEffect(() => {
    if(!effectOnce) {setEffectOnce(true);return;}
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    var selectedItemName = selectedItemStatus[0];
    var centerLocation = new naver.maps.LatLng(selectedItemStatus[1], selectedItemStatus[2]);
    
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

  }, [selectedItemStatus]);

  toggleOverlay = (isOverlay) => {
    if(isOverlay) {
      // 오버레이 활성화
    }else {
      // 오버레이 비활성화
    }
  }

  const selectItemHandler = (e, placeName, latitude, longitude) => {
    setSelectedItemStatus([placeName, latitude, longitude])
  }

  return (
    <>
      <header css={headerStyle}>
        <div css={logoStyle}>
          <span>소방서</span>
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
      <div>
        <div ref={mapElement} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 'calc(100vh - 45px)',
          backgroundColor: '#dfdfdf'
        }} />
        <div style={{position: 'absolute', width: '200px', height: '200px', backgroundColor: 'white', top: '0px', marginLeft: '10vw', marginTop: '20vh', borderRadius: '10px', boxShadow: '1px 1px 3px gainboro', paddingLeft: '20px', paddingRight: '20px', wordBreak: 'keep-all'}}>
          <h6 style={{textAlign: 'end'}} onClick={(e) => toggleOverlay(false)}>x</h6>
          <h3>{name}</h3>
          <h5>주소: 서울 동대문구 이문동 10 이문동 파출소</h5>
        </div>
        <section css={rightStyle} className={menuStatus ? 'on' : ''}>
          <div css={contentStyle} onClick={(e) => selectItemHandler(e, 'name', '37', '127')}>
            <p>테스트용 위치</p>
            <p>- 주소 : 서울 동대문구 이문동</p>
            <p>- 메모 : 이문동 순찰대</p>
            <ul css={btnStyle}>
              <li>
                <button>수정</button>
              </li>
              <li>
                <button>삭제</button>
              </li>
            </ul>
          </div>
          <div css={contentStyle} onClick={(e) => selectItemHandler(e, 'name', '37.01', '127.01')}>
            <p>제목</p>
            <p>- 주소 : </p>
            <p>
              - 메모 : <br />
              <textarea placeholder='메모를 입력해주세요.'></textarea>
            </p>
            <ul css={btnStyle}>
              <li>
                <button>수정</button>
              </li>
              <li>
                <button>삭제</button>
              </li>
            </ul>
          </div>
          <div css={contentStyle}>
            <p>제목</p>
            <p>- 주소 : </p>
            <p>- 메모 : </p>
            <ul css={btnStyle}>
              <li>
                <button>수정</button>
              </li>
              <li>
                <button>삭제</button>
              </li>
            </ul>
          </div>
          <div css={contentStyle}>
            <p>제목</p>
            <p>- 주소 : </p>
            <p>- 메모 : </p>
            <ul css={btnStyle}>
              <li>
                <button>수정</button>
              </li>
              <li>
                <button>삭제</button>
              </li>
            </ul>
          </div>
          <div css={contentStyle}>
            <p>제목</p>
            <p>- 주소 : </p>
            <p>- 메모 : </p>
            <ul css={btnStyle}>
              <li>
                <button>수정</button>
              </li>
              <li>
                <button>삭제</button>
              </li>
            </ul>
          </div>
          <div css={contentStyle}>
            <p>제목</p>
            <p>- 주소 : </p>
            <p>- 메모 : </p>
            <ul css={btnStyle}>
              <li>
                <button>수정</button>
              </li>
              <li>
                <button>삭제</button>
              </li>
            </ul>
          </div>
          <div css={contentStyle}>
            <p>제목</p>
            <p>- 주소 : </p>
            <p>- 메모 : </p>
            <ul css={btnStyle}>
              <li>
                <button>수정</button>
              </li>
              <li>
                <button>삭제</button>
              </li>
            </ul>
          </div>
          <div css={contentStyle}>
            <p>제목</p>
            <p>- 주소 : </p>
            <p>- 메모 : </p>
            <ul css={btnStyle}>
              <li>
                <button>수정</button>
              </li>
              <li>
                <button>삭제</button>
              </li>
            </ul>
          </div>
          <div css={contentStyle}>
            <p>제목</p>
            <p>- 주소 : </p>
            <p>- 메모 : </p>
            <ul css={btnStyle}>
              <li>
                <button>수정</button>
              </li>
              <li>
                <button>삭제</button>
              </li>
            </ul>
          </div>
          <div css={contentStyle}>
            <p>제목</p>
            <p>- 주소 : </p>
            <p>- 메모 : </p>
            <ul css={btnStyle}>
              <li>
                <button>수정</button>
              </li>
              <li>
                <button>삭제</button>
              </li>
            </ul>
          </div>
        </section>
      </div>
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
  &.on > span:nth-child(1) {
    transform: translateY(10px) rotate(-45deg);
    -webkit-transform: translateY(10px) rotate(-45deg);
  }
  &.on > span:nth-child(2) {
    opacity: 0;
  }
  &.on > span:nth-child(3) {
    transform: translateY(-8px) rotate(45deg);
    -webkit-transform: translateY(-8px) rotate(45deg);
  }
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
const contentStyle = css`
  border: 1px solid #dfdfdf;
  padding: 15px;
  & p {
    margin: 0;
    line-height: 1.5em;
  }
  & p:nth-child(1) {
    font-weight: 600;
    font-size: 18px;
  }
  & + & {
    margin-top: 20px;
  }
  & p textarea {
    width: 100%;
    height: 100px;
    border: 1px solid #dfdfdf;
    resize: none;
    padding: 10px;
  }
`;
const btnStyle = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  & > li + li {
    padding-left: 5px;
  }
  & > li > button {
    border-radius: 0;
    font-size: 14px;
    border: 1px solid #7f7f7f;
    padding: 5px 15px;
    background-color: #dfdfdf;
    cursor: pointer;
  }
`;
export default Map;
