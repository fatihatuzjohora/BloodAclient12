import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hook/useAxiosPublic";
import useAuth from "../../hook/useAuth";
import toast from "react-hot-toast";


const CheckoutForm = () => {
const stripe = useStripe();
const elements = useElements();
const [error, setError] = useState('');
const axiosPublic = useAxiosPublic();
// eslint-disable-next-line no-unused-vars
const [transactionId, setTransactionId] = useState('');
const [clientSecret, setClientSecret] = useState('')
const [inputValue, setInputValue] = useState('');
const { user } = useAuth();

//console.log(user);
    const handleBlurCapture = (event) => {
        setInputValue(event.target.value);
       // console.log("Input value on blur:", event.target.value);
    };
//console.log(inputValue);
 let value = Number(inputValue);
//console.log(value);

useEffect(() => {
    if (value>0) {
      
        axiosPublic.post('/create-payment-intent', { price: value })
            .then(res => {
               // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
        }

}, [axiosPublic, value ])




const handleSubmit = async(event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

const card = elements.getElement(CardElement)

if (card == null) {
    return;
  }

const {error, paymentMethod} = await stripe.createPaymentMethod({
    type: 'card',
    card
})

if(error){
    console.log('error',error);
    setError(error.message);
} else {
    console.log('payment', paymentMethod);
    setError('');
}

// confirm payment
const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment (clientSecret, {
    payment_method: {
        card: card,
        billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
        }
    }
})

if (confirmError) {
    console.log('confirm error')
}
else {
    console.log('payment intent', paymentIntent)

    if (paymentIntent.status === 'succeeded') {
        console.log('transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id);


// now save the payment in the database
const payment = {
    email: user?.email,
    name: user?.displayName,
    price: value,
    transactionId: paymentIntent.id,
    date: new Date(), // utc date convert. use moment js to 
    status: 'pending'
}

const res = await axiosPublic.post('/confirm', payment);
                console.log('payment saved', res.data);

                toast.success('Donate successfully');
                   
                          

    }

}

}



    return (
        <>
        <div className="bg-slate-100 w-[95%] md:w-[60%] mx-auto rounded-md p-2 md:p-5">
        <input  className="w-[70%] md:w-[40%] mx-auto bg-red-100 rounded-md flex justify-center py-4 pl-3 mb-5"
                type="text" 
                onBlurCapture={handleBlurCapture} 
                placeholder="Enter amount" 
            />
        <form onSubmit={handleSubmit}>
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button  className="btn btn-primary text-lg text-white my-5 w-20 mx-auto" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
        </form>
        </div>
        </> );
};

export default CheckoutForm;