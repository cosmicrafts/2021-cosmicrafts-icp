import React, {useEffect, useState} from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import { useSelector, useDispatch } from 'react-redux';

import { cosmicrafts } from "../../../../declarations/cosmicrafts";

const unityContent = new UnityContent(
  "Build/CosmicBuild.json",
  "Build/UnityLoader.js"
);

const App = () => {
    const principals = useSelector(state => state.principals);
    const currentPrincipal = useSelector(state => state.currentPrincipal);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [prog, setProg] = useState(0);

    const getAllData = async (addr) => {
        let data = await cosmicrafts.getUser(addr);
        console.log("MOTOKO DATA", data);
        if(data.length >= 1){
            let _usr = {
                "WalletId": principals[currentPrincipal].identity.principal,
                "NikeName": data[0].user
            };
            setUser(_usr);
        } else {
            console.log("REDIRECT", data);
            window.location.href = "/";
        }
    };

    const saveScore = async (score) => {
        let addr = principals[currentPrincipal].identity.principal;
        let data = await cosmicrafts.getUser(addr);
        if(data.length >= 1){
            let _highscore = parseInt(data[0].highscore);
            _highscore = (_highscore < score) ? score : _highscore;
            console.log("SCORE TO SAVE", addr, score, _highscore);
            let saved = await cosmicrafts.saveUserScore(addr, score, _highscore);
            let allUsers = await cosmicrafts.getAllUsers();
            console.log("ALL USERS:", saved, allUsers);
        } else {
            console.log("NO USER SELECTED", data);
        }
    };

    unityContent.on("loaded", () => {
        // Now we can for example hide the loading overlay.
        console.log("Identity", principals);
        unityContent.send("Dashboard", "SetPlayerData", JSON.stringify(user));
        console.log("sent: ", JSON.stringify(user));
        setIsLoading(false);
    });

    unityContent.on("SaveScore", (score) => {
        // Now we can use the score to for example
        // display it on our React app.
  
        console.log("GAME OVER!");
        saveScore(score);
        console.log("SCORE:", score);
    });

    unityContent.on("progress", (progression) => {

        console.log(progression);
        setProg(progression);

    });

    useEffect (() => {
        console.log("ADDRESS", principals);
        if(principals[0] !== undefined && principals[0] !== null && principals[0].identity !== undefined){
            getAllData(principals[currentPrincipal].identity.principal);
        } else {
            window.location.href = "/";
        }
    }, []);

    return (
        <div>
            {isLoading === true && <div>{`This is a Pre-alpha version... Loading ${prog * 100} percent... Loading can take up to 2 minutes, we are working on improving this!`}</div>}
            <Unity unityContent={unityContent} />
        </div>
    );
};

export default App;
