import React, {useEffect, useState} from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import { useSelector, useDispatch } from 'react-redux';

import { cosmicrafts } from "../../../../declarations/cosmicrafts";
import { score_token } from "../../../../declarations/score_token";

const unityContent = new UnityContent(
  "Build/CosmicBuild.json",
  "Build/UnityLoader.js"
);

const App = () => {
    const principals = useSelector(state => state.principals);
    const currentPrincipal = useSelector(state => state.currentPrincipal);
    const [user, setUser] = useState({ "WalletId": "NOT-LOADED", "NikeName": "PLAYER 007"});
    const [isLoading, setIsLoading] = useState(true);
    const [prog, setProg] = useState(0);
    const [game, setGame] = useState(0);

    const getAllData = async (addr) => {
        console.log("USR", principals[currentPrincipal].accounts[0].address, addr);
        let allUsers = await cosmicrafts.getAllUsers();
        //console.log("ALL USERS", allUsers);
        let data = await cosmicrafts.getUser(principals[currentPrincipal].accounts[0].address, addr);
        if(data.length >= 1){
            let _usr = {
                "WalletId": principals[currentPrincipal].identity.principal,
                "NikeName": data[0].user
            };
            setUser(_usr);
        } else {
            window.location.href = "/";
            //console.log("YOU WILL BE REDIRECTED", data);
        }
    };

    const saveScore = async (score) => {
        let addr = principals[currentPrincipal].identity.principal;
        let data = await cosmicrafts.getUser(principals[currentPrincipal].accounts[0].address, addr);
        if(data.length >= 1){
            let _highscore = parseInt(data[0].highscore);
            _highscore = (_highscore < score) ? score : _highscore;
            let allUsers = await cosmicrafts.getAllUsers();
            console.log("TOKENS");
            let saved = await cosmicrafts.saveUserScore(principals[currentPrincipal].accounts[0].address, addr, score, _highscore);
            allUsers = await cosmicrafts.getAllUsers();
            console.log("SCORE TOKEN", saved);
            /*console.log("mint");
            let minted = await score_token.mint(principals[currentPrincipal].accounts[0].address, score);
            let totalScore = await score_token.balanceOf(principals[currentPrincipal].accounts[0].address);
            console.log(minted, totalScore);*/
        } else {
            window.location.href = "/";
        }
    };

    unityContent.on("loaded", () => {
        console.log("LOADED");
        unityContent.send("Dashboard", "SetPlayerData", JSON.stringify(user));
        setIsLoading(false);
        createGame();
    });

    unityContent.on("SaveScore", (score) => {
        saveScore(score);
    });

    unityContent.on("gameStart", (matchPlayers) => {
        console.log(matchPlayers);
    });

    unityContent.on("SendJson", (gameStatus) => {
        console.log("GAME STATUS:", gameStatus);
        setGameStatus(gameStatus);
    });

    unityContent.on("progress", (progression) => {
        setProg(progression);
    });

    unityContent.on("error", function (message) { console.log(message); });

    useEffect (() => {
        let _url = window.location.href.split(".raw.");
        if(_url.length <= 1 ){
            _url = window.location.href.split(".localhost:");
            if(_url.length <= 1 ){
                window.location.href = "https://4nxsr-yyaaa-aaaaj-aaboq-cai.raw.ic0.app/game";
                return false;
            }
        }
        console.log("START LOADING");
        if(principals[0] !== undefined && principals[0] !== null && principals[0].identity !== undefined){
            getAllData(principals[currentPrincipal].identity.principal);
        } else {
            window.location.href = "/";
        }
    }, []);


    const createGame = async () => {
        let player_principal = principals[currentPrincipal].identity.principal;
        console.log("PLAYER PRINCIPAL:", player_principal);
        let _game = await cosmicrafts.createGame(player_principal, player_principal);
        console.log("GAME CREATED: ", _game);
        setGame(principals[currentPrincipal].identity.principal);
    };

    const setGameStatus = async (jsn) => {
        var _today = new Date(); 
        console.log("SEND ", _today, jsn);
        let _game = await cosmicrafts.setGameInProgressData(jsn, game);
        var _today2 = new Date(); 
        console.log("GAME PROGRESS SAVED:", _today, _today2, _game);
    }

    return (
        <div>
            {isLoading === true && <div>{`This is a Pre-alpha version... Loading ${prog * 100} percent... We are working on improving this load time!`}</div>}
            <Unity unityContent={unityContent} />
        </div>
    );
};

export default App;
