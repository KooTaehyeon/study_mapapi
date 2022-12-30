import { useState, useEffect } from 'react';
import XMLParser from 'react-xml-parser';
import axios from 'axios';
const useFetch = (initalUrl) => {
  const [url, setUrl] = useState(initalUrl);
  const [value, setValue] = useState('');
  useEffect(() => {
    console.log('실행');
    fetchData();
  }, [url]);
  const fetchData = () => axios.get(url).then(({ data }) => parseStr(data));

  function parseStr(dataSet) {
    const dataArr = new XMLParser().parseFromString(dataSet);
    setValue(dataArr.children[6]);
  }

  return [value];
};

export default useFetch;
