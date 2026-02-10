const Button = ({ children, text, color = "black" }) => { // props 구조 분해 할당
    // 이벤트 객체
    const onClickButton = (e) => {
        console.log(e);
        console.log(text);
    };

    return (
        <button
            onClick={onClickButton} // 함수 이름만 전달
            // onMouseEnter={onClickButton}
            style={{ color: color }}
        >
            {text} - {color.toUpperCase()}
            {children}
        </button>
    );
};


export default Button;