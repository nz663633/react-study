import './App.css'
import Viewer from './components/Viewer'
import Controller from './components/Controller'
import { useState, useEffect } from 'react'
// useEffect: 컴포넌트 내부에서 값이 변경되었을 때 원하는 동작을 수행하도록 함

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  useEffect(() => { // 두번째 인수로 전달한 count 또는 input 값이 바뀔 때마다 콜백함수(첫번째 인수) 실행
    console.log(`count: ${count} / input: ${input}`);
  }, [count, input]); // 의존성 배열 deps (dependency array)

  const onClickButton = (value) => {
    setCount(count + value);
  };

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input value={input} onChange={(e) => {
          setInput(e.target.value)
        }} />
      </section>
      <section>
        <Viewer count={count} />
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  )
}

export default App
