import { useEffect } from "react";
import NoticeDetails from "../compoments/Notice/NoticeDetails";
import NoticeStore from "../store/NoticeStore";
import { useParams } from "react-router-dom";
import NoticeSkeleton from "../skeletons/NoticeSkeleton";


const NoticeDetailsPage = () => {
    const {id} = useParams();

    const {DetailsNotice, DetailsNoticeRequest} = NoticeStore();

    useEffect( ()=>{
        (async()=>{
            await DetailsNoticeRequest(id)

        })()
    } ,[id])


    if(DetailsNotice === null) {
        return <NoticeSkeleton />
    }


    return (
        <div>
            <NoticeDetails />
        </div>
    );
};

export default NoticeDetailsPage;