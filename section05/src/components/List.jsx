import "./List.css";
import TodoItem from "./TodoItem";
import { useState, useMemo } from "react";

const List = ({ todos, onUpdate, onDelete }) => {

    const [search, setSearch] = useState("");
    // search -> 현재 입력창에 들어있는 값
    // setSearch -> 그 값을 바꾸는 함수

    const onChangeSearch = (e) => {
        setSearch(e.target.value); // input에 입력된 실제 값
    };

    const getFilteredData = () => {
        if (search === "") { // 검색어가 없으면?
            return todos; // 원래 목록 그대로 보여줌
        }
        return todos.filter((todo) => // 배열의 모든 todo를 순회하면서
            todo.content.toLowerCase().includes(search.toLocaleLowerCase()) // includes의 결과가 참인 것만 필터링
        );
        // filter -> 배열을 하나씩 돌면서 조건이 참인 것만 남기는 함수
        // 배열.filter((요소) => 조건식)
    };

    const filteredTodos = getFilteredData(); // 컴포넌트가 리렌더링될때마다 호출(함수를 실행해서 결과를 변수에 저장)

    const { totalCount, doneCount, notDoneCount } =
        useMemo(() => {
            console.log("getAnalyzedData 호출")
            const totalCount = todos.length; // 현재 todos 배열의 전체 길이 -> 전체 할 일 개수
            const doneCount = todos.filter((todo) => // todos 배열 중 isDone이 true인 요소만 필터링 -> 완료된 할 일 개수
                todo.isDone).length;
            const notDoneCount = totalCount - doneCount;

            return {
                totalCount,
                doneCount,
                notDoneCount
            };
        }, [todos]);
    // 두 번째 인수: 의존성 배열 deps
    // 의존성 배열에 들어있는 값의 참조값이 바뀌면 useMemo가 실행됨
    // CREATE처럼 새 배열을 생성하거나,
    // UPDATE, DELETE처럼 map, filter를 사용해 새 배열을 반환할 때 useMemo가 실행됨
    // search(검색어를 입력할 때)는 todos 배열에 변화가 없으므로 useMemo 실행되지 않음

    return (
        <div className="List">
            <h4>Todo List🌱</h4>
            <div>
                <div>total: {totalCount}</div>
                <div>done: {doneCount}</div>
                <div>notDone: {notDoneCount}</div>
            </div>
            <input value={search}
                onChange={onChangeSearch}
                placeholder="검색어를 입력하세요."></input>
            <div className="todos_wrapper">
                {filteredTodos.map((todo) => { // 필터링된 Todos의 객체에 대하여
                    return (
                        <TodoItem key={todo.id}
                            {...todo}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    ); // 객체를 펼쳐서 각각의 props에 전달
                    // <TodoItem todo={todo}/> -> 객체 자체를 통째로 하나의 props에 전달
                })}
            </div>
        </div>
    )
}

export default List;