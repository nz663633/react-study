import './App.css'
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext
} from "react";
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

function reducer(state, action) {
  // state: 현재 todos 배열
  // action: 어떻게 바꾸고 싶은지에 대한 설명
  // 새로운 배열 생성 후 반드시 return 할 것
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state]
    case 'UPDATE':
      return state.map((item) =>
        item.id === action.targetId
          ? { ...item, isDone: !item.isDone } // 체크박스만 토글
          : item // 나머지 요소는 그대로
      );
    case 'DELETE':
      return state.filter((item) =>
        item.id !== action.targetId);
    default:
      return state;
  }
}

// 원래 리액트 데이터는 오직 부모 -> 자식
// Context 객체는 중간 단계를 건너뛰고 누구나 접근할 수 있는 데이터 저장소를 만듦
export const TodoContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3); // 컴포넌트가 리렌더링되어도 값이 유지됨(다음 todo의 id 값을 저장하기 위해 사용)


  // mount되었을 때 한 번만 생성
  // 리렌더링이 되어도 생성되지 않도록 최적화
  // 최적화는 기능 구현을 완료하고 난 뒤 마지막에!
  // 의존성 배열을 비워둬도, dispatch 안에서 알아서 최신 상태를 기반으로 동작
  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime()
      }
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId
    });
  }, []);

  return (
    <div className='App'>
      <Header />
      <TodoContext.Provider
        value={{
          todos,
          onCreate,
          onUpdate,
          onDelete
        }}
      >
      <Editor />
      <List />
    </TodoContext.Provider>
    </div>
  )
}

export default App
