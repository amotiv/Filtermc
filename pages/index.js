import Head from 'next/head'
import Image from 'next/image'
import Hello from './api/axios'
import Body from './Body'
import Header from './Header'
import Login from './Login'
import axios from 'axios';
import ServerInfo from './ServerInfo'
import Link from 'next/link'
import {login,selectUser} from "../reducers/userSlice"
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import {auth} from "./firebase"
 
export default function Home() {
  const ip = 'pvp.thearchon.net'
  const url = 'https://api.mcsrvstat.us/2/';
  axios.get(`${url}${ip}`).then(response => {
  console.log(response.data.online);
    });
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // the user is logged in
          dispatch(
            login({
              displayName: user.displayName,
            })
          );
        }
      });
    }, []);
  return (


    <div className="divide-y-4 divide-blue-600">

      <Header />
      <Body />
    </div>
    
  )
}
