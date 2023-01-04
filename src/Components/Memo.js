import { useEffect, useState } from "react"
import Item from "./Item"

const Memo = () => {
  const [data, setData] = useState([])

  const data1 = JSON.parse(localStorage.getItem('body.id'))
  // setData(data1)
  console.log(data, "data")
  console.log(data1, "data1")
  
  useEffect(() => {
    setData(data1)
  }, [])

  return (
    <>
      { data && data.map((item) => {
        <Item key={item.id} id={item.id} name={item.name} x={item.x} y={item.y} text={item.text} />
      })}
    </>
  )
}

export default Memo