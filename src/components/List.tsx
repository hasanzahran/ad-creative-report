import React, {useEffect, useState} from 'react';
import {fixData, MAIN_URL} from "../utils/config";
import Iframe from "./Iframe";

type dataType = {
    ad_id: number,
    ad_name: string,
    spend: number,
    thumbnail: string
};

const List:React.FC = () => {
    const [data, setData] = useState<dataType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [ids, setIds] = useState<number[]>([]);
    const [format, setFormat] = useState<string>("FACEBOOK_STORY_MOBILE");
    const [iframeData, setIframeData] = useState<{}[]>([]);

    const getAllItems = async () => {
        setLoading(true);
        try {
            const getData = await fetch(`${MAIN_URL}/creatives`);
            let response  = await getData.json();
            let finalData = await response.data;
            setData(finalData);
        } catch (err) {
            console.error(err);
        }
    }

    const addToList = (id:number)  => {
        if(!ids.includes(id)) {
            setIds(ids => [...ids, id]);
        } else {
            alert("This item is in the list")
        }
    }

    useEffect(() => {
        getAllItems().then(() => setLoading(false));
    },[]);

    const showAds = async () => {
        try {
            const getData = await fetch(`${MAIN_URL}/iframes?ad_ids=${ids.join(",")}&format=${format}`);
            let response  = await getData.json();
            let iframeSrc = fixData(response.data);
            setIframeData(iframeSrc);
        } catch (err) {
            console.error(err);
        }
    }

    const clearData = () => {
        setIframeData([]);
        setIds([]);
    }

    return (
        <>
            <div className={"flex btns"}>
                <button disabled={!ids.length} className={"warning"} onClick={clearData}>Clear data</button>
                {iframeData.length === 0 && 
                    <div className={"flex options-view"}>
                        <div className={`${format === "FACEBOOK_STORY_MOBILE" ? "active" : null}`} onClick={() => setFormat("FACEBOOK_STORY_MOBILE")}>Story</div>
                        <div className={`${format === "MOBILE_FEED_STANDARD" ? "active" : null}`} onClick={() => setFormat("MOBILE_FEED_STANDARD")}>Mobile</div>
                        <div className={`${format === "DESKTOP_FEED_STANDARD" ? "active" : null}`} onClick={() => setFormat("DESKTOP_FEED_STANDARD")}>Desktop</div>
                    </div>
                }
                <button disabled={!ids.length} className={"success"} onClick={showAds}>{`Show Adds (${ids.length})`}</button>
            </div>
            {!loading && 
            <div className={"cards flex"}>
                {iframeData.length === 0 && data.length && data?.map((item, index) => (
                    <div key={`ad_${item.ad_id + index}`} className={"cards__item flex"}>
                        <div className={"card flex"} id={`ad_${item.ad_id}`}>
                            <div className={"card__image card__image--fence"} style={{
                                backgroundImage: `url(${item.thumbnail})`
                            }}>
                            </div>
                            <div className={"card__content flex"}>
                                <div className={"card__title"}>
                                    {item.ad_name}
                                </div>
                                <p className={"card__text"}>Total spend: ${item.spend}</p>
                                <button disabled={ids.indexOf(item.ad_id) !== -1} onClick={() => addToList(item.ad_id)} className="primary">{`${ids.indexOf(item.ad_id) === -1 ? 'Add': 'Added'}`}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            }
            <Iframe iframeData={iframeData} />
        </>
    );
};

export default List;