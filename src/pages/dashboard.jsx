import React, { useEffect, useState } from 'react'
import api from "../utils/apiCall";
import {toast} from "sonner"
import Loading from "../components/loading"
import Stats from "../components/stats"
import Info from "../components/info"
import Chart from "../components/chart"
import DoughnutChart from "../components/doughnutchart"
import RecentTransaction from "../components/transactions"
import Accounts from "../components/accounts"

const Dashboard = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchDashboardStats = async() =>{
    const URL = `/transaction/dashboard`;
    try {
      const {data} = await api.get(URL);
      setData(data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 
        "Something unexpected happend. Try again later."
      )

      if(error?.response?.data?.status === "auth_failed"){
        localStorage.removeItem("user");
        window.location.reload()
      }

    }finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    setIsLoading(true)
    fetchDashboardStats()
  },[])
  
  if(isLoading){
    return(
      <div className='flex items-center justify-center w-full h-[80vh]'> 
        <Loading/>
      </div>
    )
  }

  return (
    <div className='px-0 md:px-5 2xl:px-20'>
      <Info title="Dashboard" subTitle={"Monitor your financial activities"}/>
      <Stats 
        dt={{
          balance: data?.availableBalance,
          income:data?.totalIncome,
          expense: data?.totalExpense
        }}
      />

      <div className='flex flex-col-reverse items-center gap-10 w-ful md:flex-row'>
        <Chart data={data?.chartData}/>
        {
          data?.totalIncome > 0 && (
            <DoughnutChart
              dt={[
                {name:"balance", value: data?.availableBalance},
                {name:"income", value: data?.totalIncome},
                {name:"expense", value:data?.totalExpense}
              ]}
            />
          )
        }
      </div>

      <div className='flex flex-col-reverse gap-0 md:flex-row md:gap-10 2xl:gap-20'>
        <RecentTransaction  data={data?.lastTransactions || []}/>
        {
          data?.lastAccounts?.length > 0 && <Accounts data={data?.lastAccounts}/>
        }

      </div>
    </div>
  )
}

export default Dashboard