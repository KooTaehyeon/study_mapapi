
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import { useEffect, useState } from 'react';

const Item = ({id, name, x, y}) => {
  const [text, setText] = useState('');
  const [Storage, setStorage] = useState([]);
  const [is,setIs]= useState(false)
  
  const onChange = (event) => {
    setText(event.target.value);
  }

  const onSubmit = () => {
    const body = {
      id : id,
      name : name,
      x : x,
      y : y ,
      text : text,
    } 
    const bodyString = JSON.stringify(body)
    if(!JSON.parse(localStorage.getItem('body.id'))){
      const so = bodyString;
      localStorage.setItem('body.id', so)
      console.log(JSON.parse(localStorage.getItem('body.id')))
      
      console.log("clicked!")
    }else{
      if (JSON.parse(localStorage.getItem('body.id')).length >= 2) {
        let result = []

        const bsj = JSON.parse(bodyString)
        const ssj = JSON.parse(localStorage.getItem('body.id'))
        console.log(...JSON.parse(localStorage.getItem('body.id')),'sdfds')
        result = [...ssj, {...bsj}];
        console.log(result, 'result')
        const results = JSON.stringify(result)
        console.log(results)
        localStorage.setItem('body.id', results)
        console.log(JSON.parse(localStorage.getItem('body.id')),'sdfsdf')
  
        console.log(JSON.parse(localStorage.getItem('body.id')).length,'sdfsdf22222')
        console.log("clicked!3")
      } else {
        let result = []
        const bsj = JSON.parse(bodyString)
        const ssj = JSON.parse(localStorage.getItem('body.id'))
        result = [{...ssj}, {...bsj}];
        console.log(result, 'result')
        const results = JSON.stringify(result)
        localStorage.setItem('body.id', results)
        console.log(JSON.parse(localStorage.getItem('body.id')),'sdfsdf')
  
        console.log(JSON.parse(localStorage.getItem('body.id')).length,'sdfsdf22222')
        console.log("clicked!2")
      }
    }
    setIs(true);
  }
  useEffect(()=>{
    if(!is) return;
    const StorageJSON = JSON.parse(localStorage.getItem('body.id'))
    setStorage(StorageJSON);
    console.log(Storage, 'Storage')
    setIs(false);
    console.log(44)
  },[onSubmit])

  return(
    <div css={contentStyle}>
      <p>-  {name}</p>
      <p>- 위치 : (위도 : {x}) , (경도 : {y})</p>
        <p>- 메모 : 
          <textarea placeholder='메모를 입력해주세요.' value={text} onChange={onChange}></textarea>
        </p>
        <ul css={btnStyle}>
          <li>
            <button onClick={onSubmit}>추가</button>
          </li>
          {/* <li>
            <button>삭제</button>
          </li> */}
        </ul>
    </div> 
  );
}

const contentStyle = css`
  border: 1px solid #dfdfdf;
  padding: 15px;
  & p {
    margin: 0;
    line-height: 1.5em;
  }
  & p:nth-of-type(1) {
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

export default Item;