import './App.css'
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext,
  useMemo
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

/* State와 Dispatch를 분리하는 이유:
  todos(상태)가 변경되어 TodoStateContext가 리렌더링을 유발해도,
  변하지 않는 함수들을 담은 TodoDispatchContext는 리렌더링을 발생시키지 않기 위함 */
export const TodoStateContext = createContext(); // 변화할 값
export const TodoDispatchContext = createContext(); // 변화하지 않을 값

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

  // 불필요한 리렌더링을 막아서 최적화하기 위함
  const memoizedDispatch = useMemo(() => {
    return {
      onCreate, onDelete, onUpdate
    }
  }, []);

  return (
    <div className='App'>
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider
          value={memoizedDispatch}
          /*
          value={onCreate, onDelete, onUpdate}
          -> useMemo를 안 썼을 때 App이 리렌더링될 때마다
          value={onCreate, ...}이 새로 만들어짐
          */
        >
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  )
}

export default App
