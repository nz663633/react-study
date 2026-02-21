import { act, useReducer } from "react";
// useReducer: useState보다 더 체계적이고 복잡한 상태를 관리할 때 사용

// reducer: 변환기
// -> 상태를 실제로 변환시키는 변환기 역할
function reducer(state, action) {
    // 첫 번째 인수(state): 현재 상태
    // 두 번째 인수(action): 어떻게 바꿀 지에 대한 정보

    switch (action.type) {
        case "INCREASE":
            return state + action.data;
        case "DECREASE":
            return state + action.data;
        default:
            return state;
    };
};

const Exam = () => {
    // dispatch: 발송하다, 급송하다
    // -> 상태 변화가 있어야 한다는 사실을 알리는, 발송하는 함수
    const [state, dispatch] = useReducer(reducer, 0);

    const onClickPlus = () => {
        // 인수: 상태가 어떻게 변화되길 원하는지
        dispatch({ // -> 액션 객체
            type: "INCREASE", // 증가시킨다
            data: 1, // 1씩
        });
    };

    const onClickMinus = () => {
        dispatch({
            type: "DECREASE",
            data: -1,
        })
    }

    return (
        <div>
            <h1>{state}</h1>
            <button onClick={onClickPlus}>+</button>
            <button onClick={onClickMinus}>-</button>
        </div>
    );
};

export default Exam;