import React, { useEffect } from 'react'
import './App.css'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/FetchUserDetails'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import { setAllCategory ,setAllSubCategory,setLoadingCategory  } from './store/productSlice'
import Axios from './utils/Axios'
import SummaryApi from './common/SummaryApi'
import GlobalProvider from './provider/GlobalProvider'
import { IoCartSharp } from "react-icons/io5";
import CartMobileLink from './components/CartMobileLink'


function App() {

  const dispetch = useDispatch();
  const loaction = useLocation()

  const fetchData = async () => {
    const userData = await fetchUserDetails()
    dispetch(setUserDetails(userData.data))

    }

  const fetchCategory = async () => {
        dispetch(setLoadingCategory(true))
        try {
          const response = await Axios({
            ...SummaryApi.getCategory
          })
    
          const {data : responseData} = response
          if(responseData.success){
            dispetch(setAllCategory(responseData.data))
          }
          
        } catch (error) {
          AxiosToastError(error)
        }finally {
          dispetch(setLoadingCategory(false))
        }
    }

  const fetchSubCategory = async () => {
        try {
          const response = await Axios({
            ...SummaryApi.getSubCatgory
          })
    
          const {data : responseData} = response
          if(responseData.success){
            dispetch(setAllSubCategory(responseData.data))
          }
          
        } catch (error) {
          AxiosToastError(error)
        }finally {
        }
    }
   

  useEffect(() => {
    fetchData();
    fetchCategory() 
    fetchSubCategory()
    // fetchCartItem()
  },[])
  
  return (  
  <GlobalProvider>
    <Header/>
    <main className='min-h-[83vh]'>
      <Outlet/>
    </main>
    <Footer/>

    <Toaster/>
    {
      loaction.pathname !== './checkout' && (
        <CartMobileLink/>
      )
    }
  </GlobalProvider>
  )
}

export default App
