import React, {useState} from 'react';
import {auth} from './firebase'
import { useRouter } from "next/router";
import { db } from './firebase';
import {collection, doc, serverTimestamp, addDoc} from "firebase/firestore"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
function Login() {
    const router = useRouter()
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e =>{
        e.preventDefault();

        signInWithEmailAndPassword(auth,email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.push("/")
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth,email, password)
            .then((userCredential) => {
                // it successfully created a new user with email and password
                const user = userCredential.user
                addDoc(collection(db,"users"),{
                    uid: user.uid,
                    email: user.email,
                    password: password,
                    timestamp: serverTimestamp(),
                })
                if (user) {
                    router.push("/")

                }
            })
            .catch(error => alert(error.message))
    }
    return (
        <div className='bg-gradient-to-b from-gray-300 via-blue-500 to-gray-300'>
            <Header />
        <div className="flex h-max w-full md:h-screen md:w-screen py-auto">
            <div className="flex flex-col my-auto bg-gray-400 mx-auto w-3/5 md:w-2/5 h-2/5 divide-white divide-y-4">
                <div className="flex h-1/12 mx-auto my-auto">Sign-In</div>

                <form>
                    <div className="flex flex-row">E-mail</div>
                    <div className="w-full flex flex-row">
                    <input className="w-4/5 md:w-1/2 my-auto" type='text' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                    <h5>Password</h5>
                    <input className="w-4/5 md:w-1/2 my-auto" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="flex mx-auto">
                    <button type='submit' onClick={signIn} className='py-5 mx-auto w-1/6'>Login</button>
                    <p className="flex my-auto"> or </p>
                    <button onClick={register} className='py-auto mx-auto rounded-none'>Register</button>
                    </div>
                </form>
                <div>
                <p>
                    By signing-in you agree to the FilterMc Conditions of Terms and Service. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    )
}

export default Login;
