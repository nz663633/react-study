import { useState, useRef } from "react";
// useState: 값이 바뀌면 리렌더링
// useRef: 값을 저장하는 객체(값이 바뀌어도 리렌더링 X)

// 간단한 회원가입 폼
// 1. 이름
// 2. 생년월일
// 3. 국적
// 4. 자기소개

const Register = () => {

    const [input, setInput] = useState({
        name: "",
        birth: "",
        country: "",
        bio: ""
    });
    const countRef = useRef(0); // 렌더링되더라도 값 유지
    const inputRef = useRef(); 

    // let count = 0; -> 렌더링될 때마다 초기화 됨

    const onChange = (e) => {
        countRef.current++;
        console.log(countRef.current); // 브라우저에서의 수정 횟수 기록하기
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const onChangeName = (e) => {
        setInput({
            ...input, // birth, country, bio 값을 변경하지 않고 그대로 유지시킴
            name: e.target.value // 변경하고자 하는 값
        });
    };

    const onSubmit = () => {
        if (input.name === "") {
            // 이름을 입력하는 DOM 요소에 포커스
            inputRef.current.focus();
        }
    }

    return (
        <div>
            <div>
                <input
                    ref={inputRef}
                    name="name"
                    value={input.name}
                    onChange={onChange}
                    placeholder="이름"
                />
            </div>

            <div>
                <input
                    name="birth"
                    value={input.birth}
                    onChange={onChange}
                    type="date" />
            </div>

            <div>
                <select
                    name="country"
                    value={input.country}
                    onChange={onChange}>
                    <option></option>
                    <option>한국</option>
                    <option>미국</option>
                    <option>영국</option>
                </select>
            </div>

            <div>
                <textarea
                    name="bio"
                    value={input.bio}
                    onChange={onChange} />
            </div>

            <button onClick={onSubmit}>제출</button>
        </div>
    );
};

export default Register;