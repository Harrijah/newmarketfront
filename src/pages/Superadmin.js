import React from "react";
import { showpromo } from "../Assets/Functions";

const Superadmin = () => {
    const hlproduct = showpromo(60, 'promo');

    return (
        <>
            <div id="panelAdmin">
                <input type="checkbox" name="texttoshow" id="texttoshow" />
                <label htmlFor="texttoshow">texttoshow</label><br />
                <input type="checkbox" name="hlproduct" id="hlproduct" />
                <label htmlFor="hlproduct">hlproduct</label><br />
                <input type="checkbox" name="texttoshow02" id="texttoshow02" />
                <label htmlFor="texttoshow02">texttoshow02</label><br />
                <input type="checkbox" name="img" id="img" />
                <label htmlFor="img">img</label><br />
            </div>


            <div id="panelPub">
                {hlproduct}
                <img src="./image/pub.jpg" alt="" />
            </div>
        </>
    )


}

export default Superadmin;