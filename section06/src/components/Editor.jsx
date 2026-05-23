import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { emotionList } from '../util/constants';
import { getStringedDate } from '../util/getStringedDate';

const Editor = ({ onSubmit, initData }) => {

    const [input, setInput] = useState({
        createdDate: new Date(),
        emotionId: 3,
        content: ""
    });

    const nav = useNavigate();

    useEffect(() => {
        if (initData) {
            setInput({
                ...initData,
                createdDate: new Date(Number(initData.createdDate))
            })
        }
    }, [initData]);

    const onChangeInput = (e) => {
        // console.log(e.target.name) -> 어떤 요소에 입력이 들어온건지 확인
        // console.log(e.target.value) -> 현재 입력된 값이 무엇인지 확인

        let name = e.target.name;
        let value = e.target.value;

        if (name === 'createdDate') { // 문자열 createdDate를 다시 Date객체로 변환
            value = new Date(value);
        }

        setInput({
            ...input,
            [name]: value,
        })
    }

    const onClickSubmitButton = () => {
        onSubmit(input);
    }

    return (
        <div className='Editor'>
            <section className='date_section'>
                <h4>오늘의 날짜</h4>
                <input
                    name='createdDate'
                    onChange={onChangeInput}
                    value={getStringedDate(input.createdDate)} type='date' />
            </section>
            <section className='emotion_section'>
                <h4>오늘의 감정</h4>
                <div className='emotion_list_wrapper'>
                    {emotionList.map((item) =>
                        <EmotionItem
                            onClick={() => onChangeInput({
                                target: {
                                    name: "emotionId",
                                    value: item.emotionId
                                }
                            })}
                            key={item.emotionId} {...item}
                            isSelected={item.emotionId === input.emotionId} />
                    )}
                </div>
            </section>
            <section className='content_section'>
                <h4>오늘의 일기</h4>
                <textarea
                    name='content'
                    value={input.content}
                    onChange={onChangeInput}
                    placeholder='오늘은 어땠나요?' />
            </section>
            <section className='button_section'>
                <Button
                    onClick={() => nav(-1)}
                    text={"취소하기"} />
                <Button
                    onClick={onClickSubmitButton}
                    text={"작성완료"}
                    type={"POSITIVE"} />
            </section>
        </div>
    )
};

export default Editor;