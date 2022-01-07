import React from "react";
import {useRouter} from "next/router";
import {useDispatch } from "react-redux";
import {selectServer} from "../reducers/serverSlice";
import Image from 'next/image';


function ServerRow({id,username,domain,website,discord,country,tags,thumbnail,description,rank,players}) {
    const router = useRouter();
    const dispatch = useDispatch();

    const openServer = () => {
        dispatch(
            selectServer({
                id,
                username,
                domain,
                website,
                discord,
                country,
                tags,
                thumbnail,
                description,
                rank,
                players,

            })
        )
        router.push("/ServerInfo");
    }
    return (
        <div className="flex flex-col divide-y-4 divide-blue-600 bg-gray-300" onClick={openServer}>
            <h3>{username}</h3>
            <h3>{rank}</h3>
            <h3>{website}</h3>
            <h3>{discord}</h3>
            <h3>{country}</h3>
            <h3>{tags}</h3>
            <h3 >{description}</h3>
            <Image
            className=""
            src={thumbnail}
            alt=""
            height={190}
            width={250}/>
            <div className="flex  text-center mx-auto">{domain}</div>
            <div className="flex text-center mx-auto">{players}</div>

        </div>
    )
}

export default ServerRow
