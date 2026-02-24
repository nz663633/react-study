import { TodoContext } from "../App";
import "./Editor.css";
import { useState, useRef, useContext } from "react";

const Editor = () => {
    const { onCreate } = useContext(TodoContext);
    // useContext를 통해 필요한 데이터만 가져오기
    // 부모로부터 props 받을 필요 X

    const [content, setContent] = useState("");
    const contentRef = useRef();

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onKeydown = (e) => { // enter키를 누르면 onSubmit을 실행하도록 처리
        if (e.key === "Enter") {
            onSubmit();
        }
    }

    const onSubmit = () => {
        if (content === "") { // 입력값이 비어 있으면?
            contentRef.current.focus(); // 입력창에 다시 포커스 추가
            return;
        }
        onCreate(content);
        setContent(""); // 새로운 Todo 추가하고 나서 입력창 초기화
    }
    return (
        <div className="Editor">
            <input
                ref={contentRef}
                value={content}
                onKeyDown={onKeydown}
                onChange={onChangeContent}
                placeholder="새로운 Todo..."
            />
            <button onClick={onSubmit}>추가</button>
        </div>
    )
}

export default Editor;