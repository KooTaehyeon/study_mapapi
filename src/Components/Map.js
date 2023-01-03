import React, { useState } from 'react';

/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import Item from './Item';

const Map = () => {
  const [menuStatus, setMenuStatus] = useState(false);

<<<<<<< Updated upstream
=======


  console.log(apiData);
  
>>>>>>> Stashed changes
  const menuHandler = () => {
    setMenuStatus(!menuStatus);
  };

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
      <section css={mapStyle}>지도 영역</section>
<<<<<<< Updated upstream
      <section css={rightStyle} className={menuStatus ? 'on' : ''}>
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
=======
      <section css={rightStyle} className={`${menuStatus ? 'on' : ''} menuConatiner`}>
          { apiData && apiData.map((item, idx) => (
            <Item key={idx} name={item.name} x={item.x} y={item.y}/>
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

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======


>>>>>>> Stashed changes
export default Map;
