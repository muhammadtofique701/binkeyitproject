import { createContext, useContext, useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { handleAddAddress } from "../store/addressSlice";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0)
    const [notDiscountTotalPrice,setNotDiscountTotalPrice]= useState(0)
    const [totalQty, setTotalQty] = useState(0)
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state?.user)

    // Fetch all cart items
    const fetchCartItem = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getCartItem
            });

            const { data: responseData } = response;

            if (responseData.success) {
                dispatch(handleAddItemCart(responseData.data));
                console.log("Cart Items Fetched:", responseData.data);
            }
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
        }
    };

    // Update item quantity in cart
    const updateCartItem = async (_id, qty) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateCartItemQty,
                data: { _id, qty }
            });

            const { data: responseData } = response;

            if (responseData.success) {
                // toast.success(responseData.message);
                await fetchCartItem();
            }

            return responseData; // ✅ return response to caller
        } catch (error) {
            AxiosToastError(error);
            return { success: false, error: true };
        }
    };
  
    // Delete item from cart
    const deleteCartItem = async (_id) => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCartItem,
                data: { _id }
            });

            const { data: responseData } = response;

            if (responseData.success) {
                await fetchCartItem();
            }

            return responseData;
        } catch (error) {
            AxiosToastError(error);
            return { success: false, error: true };
        }
    };

    useEffect(() => {
        fetchCartItem();
    }, []);

    useEffect(() => {
        const qty = cartItem.reduce((preve, curr) => {
            return preve + curr.quantity
        }, 0);
        setTotalQty(qty);
    
        const tPrice = cartItem.reduce((preve, curr) => {
            const price = Number(curr?.productId?.price) || 0;
            const quantity = Number(curr?.quantity) || 0;
            return preve + price * quantity;
        }, 0);
        setTotalPrice(tPrice);
        const notDiscountTotalPrice = cartItem.reduce((preve, curr) => {
            const price = Number(curr?.productId?.price) || 0;
            const quantity = Number(curr?.quantity) || 0;
            return preve + price * quantity;
        }, 0);
        setNotDiscountTotalPrice(notDiscountTotalPrice)
    }, [cartItem]);
    
    const handleLogout =()=>{
        localStorage.clear()
        dispatch(handleAddItemCart([]))
    }

    const fetchAddress = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.getAddress
            })
            const {data : responseData} = response
            if(responseData.success){
                dispatch(handleAddAddress(responseData.data))
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    useEffect(()=>{
        fetchCartItem()
        handleLogout()
        fetchAddress()
    },[user])


    return (
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartItem,
            deleteCartItem,
            fetchAddress,
            totalPrice,
            totalQty,
            notDiscountTotalPrice
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
