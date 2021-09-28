import React, {useEffect, useState} from "react";
import useCheckMobileScreen from '../../helpers/mobile.js';

import '../../css/main.css';
import '../../css/header.css';

import cclogo from '../../resources/images/CCLogo.png';
import cctext from "../../resources/images/CCtext.png";
import menuHamburger from "../../resources/images/Menu.png";
import userlogo from "../../resources/images/Wegnar.jpg";
import borderUserLogo from "../../resources/images/pframe.png";
import wallet from "../../resources/images/wallet.png";
import division from "../../resources/images/line.svg";
import dfinity from "../../resources/images/dfinity.png";
import lBtn from "../../resources/images/gameBtn.png";
import rBtn from "../../resources/images/esportsBtn.png";
import mBtn from "../../resources/images/midBtn.png";
import game from "../../resources/images/GAME.png";
import market from "../../resources/images/MARKETPLACE.png";
import community from "../../resources/images/COMMUNITY.png";
import esports from "../../resources/images/ESPORTS.png";

export default function Header(props){
    let isMobile = useCheckMobileScreen();
    return (
        <div>
            <div className="header-main-div">
                <div className="div-left-banner" >
                    <img src={cclogo} className="img-logo" />
                    <img src={cctext} className="text-logo" />
                </div>
                <div className="div-center-menu">
                    {isMobile ?
                    <div>
                        <img src={menuHamburger} className="img-center-menu" />
                    </div>
                    :
                    <div className="panel-pc-bckg">
                        <img src={lBtn} className="img-lbtn-menu" />
                        <img src={game} className="txt-img-2" />
                        <img src={mBtn} className="img-mbtn1-menu" />
                        <img src={market} className="txt-img" />
                        <img src={mBtn} className="img-mbtn2-menu" />
                        <img src={community} className="txt-img" />
                        <img src={rBtn} className="img-rbtn-menu" />
                        <img src={esports} className="txt-img" />
                    </div>
                    }
                </div>
                <div className="div-right-banner">
                    <div className="div-user">
                        <img src={userlogo} className="img-right-banner userlogo" />
                        <img src={borderUserLogo} className="img-right-banner" />
                    </div>
                    <div className="wallet-div" >
                        <img src={wallet} className="wallet" />
                    </div>
                    <div className="division-div">
                        <img src={division} className="division" />
                    </div>
                    <div className="dfinity-div">
                        <img src={dfinity} className="dfinity" />
                    </div>
                </div>
            </div>
        </div>
    );
}
