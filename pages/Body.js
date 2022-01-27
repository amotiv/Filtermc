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
                        var versions = response.data.version
                        var Online = "Online";
                        console.log(players)
                        updateDoc(docu(db, "servers", doc.id),{
                            "players" : players,
                            "version" : versions,
                            "status" : Online
                          })
                        
                }
                if(response.data.players === undefined){
                  var Offline = "Offline";
                    updateDoc(docu(db, "servers", doc.id),{
                        "players" : 0,
                        "status": Offline
                      })
                }
                
           })
        });
        // [END firestore_data_get_all_documents]
      }
    useEffect(() => {
        getAll();
        const q = query(collection(db, 'users'))
        const u = query(collection(db, 'users'))
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
        <div className="h-screen w-screen">
            <p className="text-white font-bold text-xl mx-7">Most Popular Servers </p>
            <div className="flex flex-row space-x-2 mx-7">
            {mostpopular.map(({ id, data: { username, domain, rank,website,discord,players,thumbnail,version,status,tags,description } }) => (
          <ServerRow
            id={id}
            key={id}
            version={version}
            username={username}
            status={status}
            website={website}
            discord={discord}
            thumbnail={thumbnail}
            domain={domain}
            players={players}
            description={description}
            tags={tags} 
          />
        ))}
            
            </div>
            <p className="text-white font-bold text-xl mx-7">Trending Servers </p>
            <div className="flex flex-row space-x-2 mx-7">
            {usersn.map(({ id, data: { username, domain, rank,players,website,discord,thumbnail,version,status,tags,description } }) => (
          <ServerRow
            id={id}
            key={id}
            version={version}
            username={username}
            status={status}
            website={website}
            discord={discord}
            thumbnail={thumbnail}
            domain={domain}
            players={players}
            description={description}
            tags={tags}
          />
        ))}
            
            </div>
        </div>
    )
}

export default Body
