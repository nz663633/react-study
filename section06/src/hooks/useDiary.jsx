import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
    const data = useContext(DiaryStateContext); // 전체 일기 데이터 불러오기
    const [curDiaryItem, setCurDiaryItem] = useState();
    const nav = useNavigate();

    // params.id, 일기의 data state가 변경 될 때마다 실행
    useEffect(() => {
        const currentDiaryItem = data.find(
            (item) => String(item.id) === String(id));

        if (!currentDiaryItem) {
            window.alert("존재하지 않는 일기입니다!");
            nav('/', { replace: true }); // 해당 페이지로 다시 돌아오지 못하도록 함
        };

        setCurDiaryItem(currentDiaryItem);
    }, [id]);

    return curDiaryItem;
};

export default useDiary;