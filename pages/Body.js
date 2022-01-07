import React, { useEffect, useState } from "react";
import {collection, query, orderBy, onSnapshot,getDocs,addDoc,doc as docu,updateDoc} from "firebase/firestore"
import ServerRow from "./ServerRow";
import { db } from "./firebase";
import {FormData} from "./SendServer"
import { async } from "@firebase/util";
import { selectOpenServer } from "../reducers/serverSlice";
import { useSelector } from "react-redux";
import axios from "axios";

function Body() {
    const selectedServer = useSelector(selectOpenServer);
    var playersonline;
    const url = 'https://api.mcsrvstat.us/2/';
    const [online,setPlayer] = useState([]);
    const [mostpopular,setMostPopular]= useState([])
    const [usersn,setUsersn]= useState([])
    async function getAll() {
        // [START firestore_data_get_all_documents]
       
        const snapshot = await getDocs(collection(db, 'servers'))
        
        snapshot.forEach((doc) => {
            axios.get(`${url}${doc.data().domain}`).then(response => {
                
                if(response.data.players !== undefined){
                        console.log(response.data.players.online)
                        var players = response.data.players.online
                        console.log(players)
                        updateDoc(docu(db, "servers", doc.id),{
                            "players" : players
                          })
                }
                else{
                    updateDoc(docu(db, "servers", doc.id),{
                        "players" : 0
                      })
                }
                
           })
        });
        // [END firestore_data_get_all_documents]
      }
    useEffect(() => {
        getAll();
        const q = query(collection(db, 'servers'), orderBy('domain'))
        const u = query(collection(db, 'servers'), orderBy('username'))
        onSnapshot(q, (querySnapshot) => {
          setMostPopular(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
        onSnapshot(u, (querySnapshot) => {
            setUsersn(querySnapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            }))) 
        })
      },[])
    return (
        <div className="bg-blue-600 h-screen w-screen">
            <p className="text-white font-bold text-xl mx-7">Most Popular Servers </p>
            <div className="flex flex-row space-x-2 mx-7">
            {mostpopular.map(({ id, data: { username, domain, rank,players,thumbnail } }) => (
          <ServerRow
            id={id}
            key={id}
            thumbnail={thumbnail}
            domain={domain}
            players={players}
          />
        ))}
            
            </div>
            <p className="text-white font-bold text-xl mx-7">Trending Servers </p>
            <div className="flex flex-row space-x-2 mx-7">
            {usersn.map(({ id, data: { username, domain, rank,players,thumbnail } }) => (
          <ServerRow
            id={id}
            key={id}
            thumbnail={thumbnail}
            domain={domain}
            players={players}
          />
        ))}
            
            </div>
        </div>
    )
}

export default Body
