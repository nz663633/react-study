const Controller = ({ onClickButton }) => {
    return (
        // 원하는 값의 인수를 넘겨주기 위해 각 버튼에 화살표 함수 사용
        <div>
            <button onClick={() => {
                onClickButton(-1)
            }}>-1</button>
            <button onClick={() => {
                onClickButton(-10)
            }}>-10</button>
            <button onClick={() => {
                onClickButton(-100)
            }}>-100</button>
            <button onClick={() => {
                onClickButton(100)
            }}>+100</button>
            <button onClick={() => {
                onClickButton(10)
            }}>+10</button>
            <button onClick={() => {
                onClickButton(1)
            }}>+1</button>
        </div>
    )
};

export default Controller;