import { useParams, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
    const data = useContext(DiaryStateContext); // 전체 일기 데이터 불러오기
    const [curDiaryItem, setCurDiaryItem] = useState();

    // params.id, 일기의 data state가 변경 될 때마다 실행
    useEffect(() => {
        const currentDiaryItem = data.find(
            (item) => String(item.id) === String(params.id));

        if (!currentDiaryItem) {
            window.alert("존재하지 않는 일기입니다!");
            nav('/', { replace: true }); // 해당 페이지로 다시 돌아오지 못하도록 함
        };

        setCurDiaryItem(currentDiaryItem);
    }, [params.id]);

    const onClickDelete = () => {
        if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
            onDelete(params.id);
            nav('/', { replace: true }); // Home 페이지로 이동(뒤로가기 방지)
        }
    };

    const onSubmit = (input) => {
        if (window.confirm("일기를 정말 수정할까요?")) {
            onUpdate(
                params.id,
                input.createdDate.getTime(),
                input.emotionId,
                input.content
            );
            nav('/', { replace: true }); // 뒤로가기 방지
        };
    };

    return (
        <div>
            <Header
                title={"일기 수정하기"}
                leftChild={<Button onClick={() => { nav(-1) }} text={"< 뒤로가기"} />}
                rightChild={
                    <Button
                        onClick={onClickDelete}
                        text={"삭제하기"}
                        type={"NEGATIVE"} />}
            />
            <Editor initData={curDiaryItem} onSubmit={onSubmit} />
        </div>
    );
};

export default Edit;