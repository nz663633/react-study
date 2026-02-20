import './App.css'
import { useState, useRef } from "react";
import Header from './components/Header'
import Editor from './components/Editor'
import List from './components/List'

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  }
];

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3); // 컴포넌트가 리렌더링되어도 값이 유지됨(다음 todo의 id 값을 저장하기 위해 사용)

  const onCreate = (content) => { // 새로운 todoItem을 객체형태로 생성
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime()
    }

    setTodos([newTodo, ...todos]) // React는 상태를 불변하게 관리해야 함
    // 기존 배열을 직접 수정하는 push 대신 새로운 배열을 만들어서 spread 문법 사용
  }
  return (
    <div className='App'>
      <Header />
      <Editor onCreate={onCreate} />
      <List />
    </div>
  )
}

export default App
