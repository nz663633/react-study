import './App.css'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Button from './components/Button';

function App() { // 부모 컴포넌트(root 컴포넌트)

  const buttonProps = { // 객체로 만들어 spread 사용
    text: "메일",
    color: "red",
    a: 1,
    b: 2,
    c: 3,
  }
  return ( // <div>자식 요소</div> -> children
    <>
      <Button {...buttonProps} />
      <Button text={"카페"} />
      <Button text={"블로그"}>
        <div>자식 요소</div>
      </Button>
    </>
  );
};

export default App
