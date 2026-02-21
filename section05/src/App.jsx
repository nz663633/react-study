import './App.css'
import { useState, useRef } from "react";
import Header from './components/Header'
import Editor from './components/Editor'
import List from './components/List'
import Exam from './components/Exam';

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
  };

  const onUpdate = (targetId) => {
    // todo State의 값들 중에
    // targetId와 일치하는 id를 갖는 투두 아이템의 isDone을 변경

    // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 바꾼 새로운 배열
    setTodos(todos.map((todo) => { // map은 항상 새로운 배열 반환
      if (todo.id === targetId) {
        return {
          ...todo, // 기존의 todo 값을 펼쳐주고 
          isDone: !todo.isDone
        }
      }
      return todo
    }))
  }

  const onDelete = (targetId) => {
    // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    setTodos(todos.filter((todo) => todo.id !== targetId));
  }; // filter는 조건이 true인 것만 모아서 새로운 배열을 생성

  return (
    <div className='App'>
      <Exam />
      {/* <Header />
      <Editor onCreate={onCreate} />
      <List
        todos={todos}
        onUpdate={onUpdate}
        onDelete={onDelete} /> */}
    </div>
  )
}

export default App
