import "./TodoItem.css";

const TodoItem = ({ id, isDone, content, date, onUpdate }) => {

    const onChangeCheckbox = () => {
        onUpdate(id);
        // 현재 todo의 id를 부모에게 전달
        // 부모는 이 id를 기준으로 해당 todo를 찾아 isDone 값을 토글
        // 바꾸려는 todo의 상태는 부모가 관리하므로 직접 isDone의 값을 넘기지 않음
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
            <button>삭제</button>
        </div>
    )
};

export default TodoItem;