import React from "react";
import { useState } from "react";
import { CheckCircleIcon, XIcon } from "@heroicons/react/solid";
import {db, storage} from "./firebase"
import {ref, getDownloadURL, uploadBytes, serverTimestamp} from "firebase/storage"
import { collection,addDoc, doc, updateDoc } from "firebase/firestore"
import firebase from './firebase'
import { closeSendMessage } from "../reducers/serverSlice";
import {useForm,useFormState} from "react-hook-form"
import {useDispatch} from "react-redux"
import { getStorage, uploadBytesResumable } from "@firebase/storage";

function SendServer() {
    var custom;
    const [fileURL, setFileUrl] = React.useState(null);
    const onFileChange = async (formData) => {
        const file = formData.target.files[0]
        const storageRef = ref(storage, file.name);
        await uploadBytes(storageRef,file)
        setFileUrl(await getDownloadURL(storageRef));
    }

    const { register,handleSubmit,watch,errors} = useForm();
    const dispatch = useDispatch();
    
    const onSubmit = (formData) => {
        console.log(formData);
        addDoc(collection(db, 'servers'), {
            username: formData.username,
            domain: formData.domain,
            website: formData.website ? formData.website : "",
            discord: formData.discord ? formData.discord : "",
            version: null,
            tags: formData.tags,
            country: formData.country ? formData.country : "",
            description: formData.description,
            timestamp: serverTimestamp(),
            votes: null,
            rank: null,      
            players: null,
            status: null,
            thumbnail: fileURL,
        
        });
        
        
        dispatch(closeSendMessage());
    }
    
    return (
        <div className="flex bg-gray-200 h-max w-full">
            <div className="flex flex-col bg-gray-400 mx-auto my-10 h-screen w-1/3">
            <div className="flex flex-row divide-solid divide-y-4 divide-blue-500 mx-auto w-max">
                Add Server
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input className="flex p-1 mx-8 my-2" name="username" type="text" placeholder="Username" ref={register({required: true})} />
            
            <p className="text-black mx-8 text-xs">Name used In-Game </p>
            <input className="flex p-1 mx-8 my-2 " type="text" placeholder="Domain" name="domain" ref={register({required: true})} />
            <p className="text-black mx-8 text-xs">Only enter domain address </p>
            <input className="flex p-1 mx-8 my-2" type="url" placeholder="Website" name="website" ref={register({required: false})} />
            <p className="text-black mx-8 text-xs">Optional </p>
                <input className="flex p-1 mx-8 my-2" type="text" placeholder="Country" name="country" ref={register({required: false})}/>
                <p className="text-black mx-8 text-xs">Optional </p>
                <input className="flex w-2/3 h-1/3 my-2 mx-8" type="text" placeholder="Description" name="description" ref={register({required: true, max: 100, min: 10})} />
                <p className="text-black mx-8 text-xs">Max 100 words Min 10 words</p>
                <input
                className="flex p-1 mx-8 my-2"
                name="thumbnail"
                type="file"
                onChange={onFileChange}
                ref={register({required:true})}
                />
                <p className="text-black mx-8 text-xs">Upload Thumnail </p>
                <input className="flex p-1 mx-8 my-2" type="url" placeholder="Discord" name="discord" ref={register({required: false})} />
                <p className="text-black mx-8 text-xs">Optional </p>
                <select className="flex p-1 mx-8 my-2 w-1/2" name="tags" ref={register({required: true, min: 1, max: 7})} >
                <option value="Anarchy">
                    Anarchy
                </option>
                <option value="Creative">
                    Creative
                </option>
                <option value="Factions">
                    Factions
                </option>
                <option value="FTB">
                    FTB
                </option>
                <option value="Hardcore">
                    Hardcore
                </option>
                <option value="KitPvP">
                    KitPvP
                </option>
                <option value="McMMO">
                    McMMO
                </option>
                <option value="MiniGames">
                    MiniGames
                </option>
                <option value="Parkour">
                    Parkour
                </option>
                <option value="PixelMon">
                    PixelMon
                </option>
                <option value="Prison">
                    Prison
                </option>
                <option value="PvE">
                    PvE
                </option>
                <option value="PvP">
                    PvP
                </option>
                <option value="Raiding">
                    Raiding
                </option>
                <option value="Roleplay">
                    Roleplay
                </option>
                <option value="Skyblock">
                    SkyBlock
                </option>
                <option value="Skywars">
                    Skywars
                </option>
                <option value="Survival">
                    Survival
                </option>
                <option value="SurvivalGames">
                    SurvivalGames
                </option>
                <option value="Tekkit">
                    Tekkit
                </option>
                <option value="Towny" >
                    Towny
                </option>
                <option value="Vanilla">
                    Vanilla
                </option>
                </select>
                <p className="text-black mx-8 text-xs">Tags(Max 7) </p>
                <input className="flex mx-auto my-auto" type="submit" />
            </form>
            </div>
        </div>
    )
}

export default SendServer;