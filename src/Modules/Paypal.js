import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {addCommand} from "../action/session.action";
import {useDispatch} from "react-redux";




export default function Paypal({listofproducts, buyerinfos, ttlgeneral, commanddata}) {
    const dispatch = useDispatch();
    function createOrder() {
        // return fetch("http://localhost:3000/create-paypal-order", {
        return fetch("https://trade.axel.mg/create-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: JSON.stringify({
                cart: listofproducts,
                buyer: buyerinfos,
                flow: "checkout",
                amount: ttlgeneral,
                currency: "USD",
                // intent: "capture",
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    }
    function onApprove(data) {        
          return fetch("https://trade.axel.mg/commandes/capture-paypal-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID,
              amount: ttlgeneral,
              currency: "USD",
            })
          })
            .then((response) => {
              if(!response.ok) {
                  throw new Error(`Erreur HTTP : ${response.status}`);
                } 
                return response.json();
                
            })
            .then((orderData) => {
                    const name = orderData.payer.name.given_name;
                    alert(`Transaction completed by ${name}`);
                    dispatch(addCommand(commanddata));
                })
            .catch((error) => {
                console.error("Erreur lors du paiement : ", error);
                alert("Le paiement n'a pas été confirmé");
            });
                
        }
    
    
    return (
        <PayPalScriptProvider options={{ clientId: "ARclgTf_H2nEr36scJRPNixO21TB5WLqA65EKCZozkiemG79YELU3hTkFd0txqchaWY6sRTKt687NKpz" }}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </PayPalScriptProvider>
    );
}