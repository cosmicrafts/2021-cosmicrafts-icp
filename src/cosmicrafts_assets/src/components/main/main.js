import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main.css';
import Header from "../header/header";
import Lottie from "lottie-web";

import { cosmicrafts } from "../../../../declarations/cosmicrafts";

import {StoicIdentity} from '../../ic/identity.js';
import extjs from '../../ic/extjs.js';

import shipLeft from "../../resources/images/TerraformAnim.json";
import ap320 from "../../resources/images/AP320.json";
import Flashlights from "../../resources/images/Flashlights.json";
import shipRight from "../../resources/images/HawkIdle.json";
import discord from "../../resources/images/JoinDiscord.png";

import mainBkg from "../../resources/images/Recurso1.png";
import cc_bkg from "../../resources/images/cc_bkg.png";
import cc_txt from "../../resources/images/sign_box.png";
import cc_btn from "../../resources/images/dfinity_button.png";

import wallet_background_spiral from "../../resources/images/wallet/WoUSW.png";
import wallet_background_wegnar from "../../resources/images/wallet/Wegnar_full.png";
import wallet_background_dofshlu from "../../resources/images/wallet/Dofshlu.png";
import wallet_background_dofshlu1 from "../../resources/images/wallet/Dofshlu1.png";
import btn_back from "../../resources/images/wallet/back_button.png";
import btn_next from "../../resources/images/wallet/next_button.png";
import btn_cancel from "../../resources/images/wallet/cancel_btn.png";
import btn_finish from "../../resources/images/wallet/finish_btn.png";
import logged_panel from "../../resources/images/wallet/logged_panel.png";

export default function MainView(props) {
    const [userData, setUserData] = useState({
        user: "",
        wallet: ""
    });
    const [newUser, setNewUser] = useState(false);
    const [_bool, _setBool] = useState(false);
    const [_wllCreate, _setWllCreate] = useState(false);
    const [route, setRoute] = useState('main');
    const [mnemonic, setMnemonic] = useState('');
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [appState, setAppState] = useState(false); //0 = nologin, 1 = locked, 2 = unlocked
    const principals = useSelector(state => state.principals)
    const currentPrincipal = useSelector(state => state.currentPrincipal)
    const [walletShow, setWalletShow] = useState("");
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    const [texts, setTexts] = useState({
        tips: {
            title: "Security tips",
            subtitle: "Things to keep in mind to increase the security of your funds:",
            tips: [
                "Never share your Secret Recovery Phrase with anyone",
                "The Cosmicrafts team will never ask for your Secret Recovery Phrase",
                "Always keep your Secret Recovery Phrase in a secure and secret place"
            ]
        },
        mnemonic:{
            title: "Write down your seed phrase",
            subtitle: "This is your 12 word seed phrase",
            footer: "Write your mnemonic down on a physical piece of paper and store it somewhere safe and private. Anyone who knows this can transfer funds out of your account."
        },
        confirm: {
            title: "Confirm your seed phrase",
            subtitle: "Please confirm your 12 word seed phrase",
            inputlabel: "Confirm Mnemonic seed",
            footer: "By confirming your mnemonic you know what you wrote on paper or stored somewhere else is good to use."
        },
        nickname:{
            title: "Choose your nickname",
            subtitle: "This is how other players will identify you",
            placeholder: "Type in your nickname",
            footer: "The characters can be letters and numbers You will get a chance to change your username later"
        },
        login: {
            title: "Enter your seed phrase",
            subtitle: "Please enter your 12 word seed phrase",
            inputlabel: "Enter Mnemonic seed",
            footer: "Never share your Secret Recovery Phrase with anyone, The Cosmicrafts team will never ask for your Secret Recovery Phrase"
        },
        passwords: {
            title: "Enter a password",
            subtitle: "This password is used to further encrypt your private data on your device.",
            requirements_title: "Passwords must contain:",
            requirements: [
                "At least 8 characters",
                "At least one uppercase letter",
                "At least one lowercase letter",
                "At least one number"
            ]
        },
        maintenance:{
            title: "Our servers are on maintenance!",
            subtitle: "Thank you for playing! This maintenance is programmed from 00:00 to 01:00 Hours CTS"
        }
    });
    const [newMnemonic, setNewMnemonic] = useState("something went wrong");
    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');

    useEffect (() => {
        setTimeout(() => {
            Lottie.loadAnimation({
                container: document.querySelector("#ship-left"),
                animationData: shipLeft
            });
            Lottie.loadAnimation({
                container: document.querySelector("#planet"),
                animationData: ap320
            });
            Lottie.loadAnimation({
                container: document.querySelector("#ship-right"),
                animationData: shipRight
            });
            Lottie.loadAnimation({
                container: document.querySelector("#flashlights"),
                animationData: Flashlights
            });
        }, 3000);
        //showAllUsers();
    }, []);

    const showAllUsers = async () => {
        let _u = await cosmicrafts.getAllUsers();
        //console.log(_u);
    }

    const getParams = () => {
        var url_string = window.location.href;
        var url = url_string.split("?");
        return url;
    }

    /// Login with IC identity
    const loginIC = async () => {
        StoicIdentity.setup("ii").then(identity => {
            dispatch({ type: 'createwallet', payload : {identity : identity}});
            //props.login();
            //props.loader(false);
            login();
        }).catch(e => {
            console.log(e);
            alert("Something went wrong while connecting to the Internet Identity. Please notify the developers to fix this issue. You can find us on twitter and discord");
        }).finally(() => {
            //console.log("Login Finished");
            //console.log(principals);
            //console.log(currentPrincipal);
            _setBool(!_bool);
        });
    }

    useEffect (() => {
        if(principals[0] !== undefined && principals[0] !== null && principals[0].identity !== undefined && route !== 'maintenance'){
            checkUser();
        }
    }, [_bool]);
    
    /// Check if wallet exists on network
    const checkUser = async () => {
        //console.log("Exists?", principals[0].accounts[0].address);
        let _usr = await cosmicrafts.checkWalletExists(principals[0].accounts[0].address);
        if(_usr === true){
            /// check if username is defined
            checkUsername();
        } else {
            /// create user
            loadSection('nickname');
        }
    }

    /// Check if user has username
    const checkUsername = async () => {
        let _usr = await cosmicrafts.getUser(principals[0].accounts[0].address);
        //console.log("Check username: ", _usr);
        if(_usr[0] !== undefined && _usr[0].user !== undefined && _usr[0].user !== ""){
            loadSection("logged");
            walletChars();
            setUsername(_usr[0].user);
            redirectCC(_usr[0].user, principals[0].accounts[0].address);
        } else {
            loadSection('nickname');
            //remove();
            //loadSection('main');
        }
    };

    const remove = () => {
        //loader(true);
        StoicIdentity.clear(principals[currentPrincipal].identity).then(r => {
          setAppState(0);
          //loader(false);
          setTimeout(() => {
            dispatch({ type: 'removewallet'})
          }, 1000);//hack in timeout to clear views...
        })
      };

    const loadSection = (section) => {
        setRoute(section);
        if(section === "mnenomic"){
            let nm = StoicIdentity.generateMnemonic();
            setNewMnemonic(nm);
            setMnemonic('');
        }
    }
    const confirmMnemonic = (signIn) => {
        if (!StoicIdentity.validateMnemonic(mnemonic)) return alert("The mnemonic you entered is not valid"); //show error
        if (route === 'mnenomic' && mnemonic !== newMnemonic) return alert("The mnemonic you entered does not match the one displayed"); //show error
        if(signIn === 'create'){
            loadSection("nickname");
            setNewUser(true);
        } else {
            loadSection("passwords");
            setNewUser(false);
        }
      };

    const checkUsernameAvailable = async () => {
        if(username.trim() !== ""){
            let _exists = await cosmicrafts.checkUsernameAvailable(username);
            if(_exists == true){
                loadSection("passwords");
            } else {
                alert("Username not available");
            }
        } else {
            alert("Invalid Username");
        }
    };

    const validatePassword = () => {
        if(password1 !== password2){
            alert("Passwords do not match");
            return false;
        }
        if(strongPassword.test(password1)){
            if(principals[0] !== undefined && principals[0] !== null && principals[0].identity !== undefined){
                createUser(principals[0].accounts[0].address, username);
                walletChars();
                loadSection("logged");
                redirectCC(username, principals[0].accounts[0].address);
            } else {
                submit();
            }
            return true;
        }
        alert("Password does not meet the minimum requirements");
        return false;
    }

    const submit = () => {
        var od = {}, t = '';
        t = 'private';
        od.mnemonic = mnemonic;
        od.password = password1;
        StoicIdentity.setup(t, od).then(identity => {
            dispatch({ type: 'createwallet', payload : {identity : identity}});
            login();
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            _setWllCreate(!_wllCreate);
        });
      };

      const login = () => {
        if (principals.length === 0) {
          setAppState(0);
        } else {
          //loader(true);
          StoicIdentity.load(principals[currentPrincipal].identity).then(i => {
            extjs.connect("https://boundary.ic0.app/", StoicIdentity.getIdentity(principals[currentPrincipal].identity.principal)).canister("qgsqp-byaaa-aaaah-qbi4q-cai").log();
            setAppState(2);
          }).catch(e => {
            setAppState(1);
          }).finally(() => {
            //console.log("FINALLY");
          });
        }    
      };

    const walletChars = () => {
        let _w = principals[0].accounts[0].address;
        let _ws = _w.charAt(0) + _w.charAt(1) + _w.charAt(2) + "..." + _w.charAt(_w.length-3) + _w.charAt(_w.length-2) + _w.charAt(_w.length-1);
        setWalletShow(_ws);
    }
    
    const createUser = async (wll, usr) => {
        let _usr = await cosmicrafts.saveUser(usr, wll);
        console.log("Create User:", usr, wll, _usr);
    }
    
    const redirectCC = (usr, wll) => {
        //console.log("Redirect:", usr, wll);
        setTimeout(()=>{
            window.location.href = "http://cosmicrafts.com?usr=" + usr + "&wlt=" + wll;
        }, 15000);
    }

    useEffect (() => {
        //console.log("user data:", userData);
    }, [userData]);

    useEffect (() => {
        if(principals[0] !== undefined && principals[0] !== null && principals[0].identity !== undefined && route !== 'maintenance' && username !== ""){
            createUser(principals[0].accounts[0].address, username);
            walletChars();
            loadSection("logged");
            redirectCC(username, principals[0].accounts[0].address);
        }
    }, [_wllCreate]);

    return (
        <div>
            <img className="main-background" src={mainBkg} />
            <Header loadSection={loadSection} />
            <div className="planet-div">
                <div id="planet" className="planet-center"></div>
            </div>
            <div className="ship-left-div">
                <div id="ship-left" className="ship-animation-left"></div>
            </div>
            <div className="ship-right-div">
                <div id="ship-right" className="ship-animation-right"></div>
            </div>
            <div className="flashlights-div">
                <div id="flashlights" className="flashlights"></div>
            </div>
            
            <div className="midpanel-div">
            {(() => {
                switch(route) {
                    case 'maintenance':
                        return(
                            <div className="midpanel-wallet-capsule">
                                <img className="midpanel-wallet-bkg" alt="" src={wallet_background_spiral} />
                                <img className="midpanel-wallet-character" alt="" src={wallet_background_dofshlu} />
                                <label className="midpanel-wallet-title-mnemonic">{texts.maintenance.title}</label>
                                <label className="midpanel-wallet-subtitle-mnemonic">{texts.maintenance.subtitle}</label>
                            </div>
                        );

                        case 'main': case 'connect':
                        return (
                                <div className="midpanel-capsule">
                                    <img className="midpanel-connect-bkg" src={cc_bkg} alt="" />
                                    <img className="midpanel-connect-txt" src={cc_txt} alt="" />
                                    <img className="midpanel-connect-btn" src={cc_btn} alt="" onClick={() => { /*loadSection('login');*/ loginIC(); }} />
                                    <label className="midpanel-create-wallet-label">CREATE NEW <span className="midpanel-create-new-wallet-label" onClick={() => { loadSection('tips'); }}>WALLET</span></label>
                                </div>
                            );

                    case 'tips':
                        return (
                            <div className="midpanel-wallet-capsule">
                                <img className="midpanel-wallet-bkg" alt="" src={wallet_background_spiral} />
                                <img className="midpanel-wallet-character" alt="" src={wallet_background_wegnar} />
                                <label className="midpanel-wallet-title">{texts.tips.title}</label>
                                <label className="midpanel-wallet-subtitle">{texts.tips.subtitle}</label>
                                <div className="midpanel-wallet-tips-div">
                                    <ul>
                                    {texts.tips.tips.map((t) => {
                                        return(
                                            <li className="midpanel-wallet-tip">{t}</li>
                                        )
                                    }
                                    )}
                                    </ul>
                                </div>
                                <img className="midpanel-wallet-btn-back" alt="" src={btn_back} onClick={() => { loadSection('connect'); }} />
                                <img className="midpanel-wallet-btn-continue" alt="" src={btn_next} onClick={() => { loadSection('mnenomic'); }} />
                            </div>
                        );

                    case 'mnenomic':
                        return (
                            <div className="midpanel-wallet-capsule">
                                <img className="midpanel-wallet-bkg" alt="" src={wallet_background_spiral} />
                                <img className="midpanel-wallet-character" alt="" src={wallet_background_dofshlu} />
                                <label className="midpanel-wallet-title-mnemonic">{texts.mnemonic.title}</label>
                                <label className="midpanel-wallet-subtitle-mnemonic">{texts.mnemonic.subtitle}</label>
                                <img className="midpanel-wallet-btn-back" alt="" src={btn_back} onClick={() => { loadSection('tips'); }} />
                                <img className="midpanel-wallet-btn-continue" alt="" src={btn_next} onClick={() => { loadSection('confirm'); }} />
                                <label className="midpanel-wallet-seed-phrase">{newMnemonic}</label>
                                <label className="midpanel-wallet-footer-mnemonic">{texts.mnemonic.footer}</label>
                            </div>
                        );

                    case 'confirm':
                        return (
                            <div className="midpanel-wallet-capsule">
                                <img className="midpanel-wallet-bkg" alt="" src={wallet_background_spiral} />
                                <img className="midpanel-wallet-character" alt="" src={wallet_background_dofshlu} />
                                <label className="midpanel-wallet-title-mnemonic">{texts.confirm.title}</label>
                                <label className="midpanel-wallet-subtitle-mnemonic">{texts.confirm.subtitle}</label>
                                <label className="midpanel-wallet-confirm-input-label">{texts.confirm.inputlabel}</label>
                                <img className="midpanel-wallet-btn-back" alt="" src={btn_back} onClick={() => { loadSection('tips'); }} />
                                <img className="midpanel-wallet-btn-continue" alt="" src={btn_next} onClick={() => { confirmMnemonic('create'); }} />
                                <textarea className="midpanel-wallet-confirm-prhase" value={mnemonic} onChange={(ev) => {  setMnemonic(ev.target.value); }}></textarea>
                                <label className="midpanel-wallet-footer-mnemonic">{texts.confirm.footer}</label>
                            </div>
                        );

                    case 'nickname':
                        return (
                            <div className="midpanel-wallet-capsule">
                                <img className="midpanel-wallet-bkg" alt="" src={wallet_background_spiral} />
                                <img className="midpanel-wallet-character" alt="" src={wallet_background_dofshlu1} />
                                <label className="midpanel-wallet-title-mnemonic">{texts.nickname.title}</label>
                                <label className="midpanel-wallet-subtitle-mnemonic">{texts.nickname.subtitle}</label>
                                <input value={username} onChange={(ev) => { setUsername(ev.target.value); }} className="midpanel-username-input" placeholder={texts.nickname.placeholder} />
                                <img className="midpanel-wallet-btn-back" alt="" src={btn_back} onClick={() => { loadSection('main'); }} />
                                <img className="midpanel-wallet-btn-continue" alt="" src={btn_next} onClick={() => { checkUsernameAvailable(); }} />
                                <label className="midpanel-wallet-footer-mnemonic">{texts.nickname.footer}</label>
                            </div>
                        );
                        break;

                    case 'login':
                        return (
                            <div className="midpanel-wallet-capsule">
                                <img className="midpanel-wallet-bkg" alt="" src={wallet_background_spiral} />
                                <img className="midpanel-wallet-character" alt="" src={wallet_background_dofshlu} />
                                <label className="midpanel-wallet-title-mnemonic">{texts.login.title}</label>
                                <label className="midpanel-wallet-subtitle-mnemonic">{texts.login.subtitle}</label>
                                <label className="midpanel-wallet-confirm-input-label">{texts.login.inputlabel}</label>
                                <img className="midpanel-wallet-btn-back" alt="" src={btn_back} onClick={() => { loadSection('main'); }} />
                                <img className="midpanel-wallet-btn-continue" alt="" src={btn_next} onClick={() => { confirmMnemonic('login'); }} />
                                <textarea className="midpanel-wallet-confirm-prhase" value={mnemonic} onChange={(ev) => {  setMnemonic(ev.target.value); }}></textarea>
                                <label className="midpanel-wallet-footer-mnemonic">{texts.login.footer}</label>
                            </div>
                        );

                    case 'passwords':
                        return(
                            <div className="midpanel-wallet-capsule">
                                <img className="midpanel-wallet-bkg" alt="" src={wallet_background_spiral} />
                                <img className="midpanel-wallet-character" alt="" src={wallet_background_dofshlu} />
                                <label className="midpanel-wallet-title-mnemonic">{texts.passwords.title}</label>
                                <label className="midpanel-wallet-subtitle-mnemonic">{texts.passwords.subtitle}</label>
                                <label className="midpanel-wallet-password-title">{texts.passwords.requirements_title}</label>
                                <div className="midpanel-wallet-password-requirements">
                                    <ul>
                                    {texts.passwords.requirements.map((r) => {
                                        return(
                                            <li className="midpanel-wallet-tip">{r}</li>
                                        )
                                    }
                                    )}
                                    </ul>
                                </div>
                                <input className="midpanel-wallet-password-input" placeholder="Enter password *" type="password" value={password1} onChange={(ev) => { setPassword1(ev.target.value); }} />
                                <input className="midpanel-wallet-password-input-confirm" placeholder="Confrim password *" type="password" value={password2} onChange={(ev) => { setPassword2(ev.target.value); }} />
                                <img className="midpanel-wallet-btn-back" alt="" src={btn_cancel} onClick={() => { loadSection('tips'); }} />
                                <img className="midpanel-wallet-btn-continue" alt="" src={btn_finish} onClick={() => { validatePassword(); }} />
                                
                            </div>
                        );

                    case 'logged':
                        return (
                                <div className="midpanel-capsule">
                                    <img className="midpanel-connect-bkg" src={logged_panel} alt="" />
                                    <label className="midpanel-user-name-account">{username}</label>
                                    <label className="midpanel-user-wallet-account" title="Copy to clipboard" onClick={() => {navigator.clipboard.writeText(principals[0].accounts[0].address); remove(); } }>{walletShow}</label>
                                </div>
                            );

                    default:
                        break;
                }
            })()}
            </div>
            <div className="div-dicord">
                <img src={discord} className="btn-discord" alt="" onClick={() => { window.open("https://discord.gg/4Wdc2MwHPv", "_blank"); }} />
            </div>
        </div>
    );
}