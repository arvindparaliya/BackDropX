import axios from "axios";

import toast from "react-hot-toast";
//place your order
export const placeOrder = async ({planId, getToken, onSuccess, backendUrl}) => {
    try {
        const token = await getToken();

        const response = await axios.post(`${backendUrl}/orders?planId=${planId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });       

        if (response.status == 200) {
            initializePayment({
                order: response.data.data,
                getToken,
                onSuccess,
                backendUrl
            })
        }
    } catch (error) {
        toast.error(error.message);
    }
}

//Payment
const initializePayment = ({order, getToken, onSuccess, backendUrl}) => {
    
    const options = {
        key: import.meta.env.VITE_RAZORPAY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Credit Payment",
        order_id: order.id,
        receipt: order.receipt,


        handler: async (paymentDetails) => {
            try {
                const token = await getToken();
                const response = await axios.post(`${backendUrl}/orders/verify`, paymentDetails, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status == 201) {
                    toast.success("Credits Added");
                    onSuccess?.();
                }
            } catch (error) {
                console.log("error in initializePayment");
                toast.error(error.message);
            }
        }

    }

    const rzp = new window.Razorpay(options);
    rzp.open();
}