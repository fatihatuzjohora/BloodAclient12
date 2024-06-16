
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";


// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Funding = () => {


    return (
        <div>
           <h1 className="text-center my-5 text-xl font-semibold">Please Donate!!!</h1>
           
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div> 
        </div>
    );
};

export default Funding;
