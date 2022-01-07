import React, { useEffect, useState } from 'react';
import {useRouter} from "next/router"
import {selectOpenServer} from "../reducers/serverSlice";
import {useSelector} from "react-redux";
import axios from 'axios'
import {backSpaceIcon} from '@heroicons/react/solid'
import e from 'cors';
function ServerInfo() {
    const router = useRouter();
    const selectedServer = useSelector(selectOpenServer);
    const [status,getStatus] = useState('')
    const [players,getPlayers] = useState('')
    const url = 'https://api.mcsrvstat.us/2/';
    useEffect(() => {
        getAllInfo();
    }, []);
    const getAllInfo = () =>{
        axios.get(`${url}${selectedServer?.ip}`).then(response => {
            const online = response.data.online;
            getStatus(online);
            const allplayers = response.data.players;
            getPlayers(allplayers)
          })
        }
    if(status == true){
        status == "Online"
    }else{
        status == "Offline"
    }
    return (
        <div>
            <backSpaceIcon onClick={() => router.push("/")}/>
            <img width="600" src={selectedServer?.thumbnail} />
            <h2>{selectedServer?.username}</h2>
            <h2>{selectedServer?.ip}</h2>
            <h2>{status}</h2>
            <h2>{players}</h2>
            <h2>{selectedServer?.rank}</h2>
            <h2>{selectedServer?.votes}</h2>
            <h2>{selectedServer?.website}</h2>
            <h2>{selectedServer?.discord}</h2>
            <h2>{selectedServer?.version}</h2>
            <h2>{selectedServer?.tags}</h2>
            <h2>{selectedServer?.country}</h2>
            <img width="600" src={selectedServer?.trailer} />
            <h2>{selectedServer?.description}</h2>

        </div>
    )
}

export default ServerInfo;
