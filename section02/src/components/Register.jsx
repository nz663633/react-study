import { useState } from "react";

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

    const onChange = (e) => {
        console.log(e.target.name, e.target.value);
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

    return (
        <div>
            <div>
                <input
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
        </div>
    );
};

export default Register;