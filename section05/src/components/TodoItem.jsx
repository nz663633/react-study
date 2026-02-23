import "./TodoItem.css";
import { memo } from "react";

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {

    const onChangeCheckbox = () => {
        onUpdate(id);
        // 현재 todo의 id를 부모에게 전달
        // 부모는 이 id를 기준으로 해당 todo를 찾아 isDone 값을 토글
        // 바꾸려는 todo의 상태는 부모가 관리하므로 직접 isDone의 값을 넘기지 않음
    }

    const onClickDeleteButton = () => {
        onDelete(id);
    }

    return (
        <div className="TodoItem">
            <input
                onChange={onChangeCheckbox}
                readOnly
                checked={isDone}
                type="checkbox"
            />
            <div className="content">{content}</div>
            <div className="date">
                {new Date(date).toLocaleDateString()}
            </div>
            <button onClick={onClickDeleteButton}>삭제</button>
        </div>
    )
};

// 고차 컴포넌트 (HOC)
// export default memo(TodoItem, (prevProps, nextProps) => {
//     // 두 번째 인자로 이전과 현재 props를 비교하는 함수 전달
//     // 반환값에 따라, Props가 바뀌었는지 안바뀌었는지 판단
//     // True -> Props가 같다고 판단 -> 리렌더링 X
//     // False -> Props가 다르다고 판단 -> 리렌더링 O

//     if(prevProps.id !== nextProps.id) return false;
//     if(prevProps.isDone !== nextProps.isDone) return false;
//     if(prevProps.content !== nextProps.content) return false;
//     if(prevProps.date !== nextProps.date) return false;

//     // onUpdate, onDelete는 App 내부에서 정의된 함수
//     // App이 리렌더링될 때마다 새로 생성되어 참조값이 달라짐
//     // 비교에 포함하면 항상 변경된 것으로 판단될 수 있음

//     return true; // Props가 모두 동일하다면 리렌더링 X
// });

export default memo(TodoItem);