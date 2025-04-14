import React,{useState,useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import {getDateSevenDaysAgo} from "../utils/index"

const DateRange = () => {
    const sevenDaysAgo = getDateSevenDaysAgo();
    const [searchParams, setSearchParams] = useSearchParams()
    const [dateFrom, setDateFrom] = useState(()=>{
        const df = searchParams.get("df");
        return df && new Date(df).getTime()  <= new Date().getTime()
        ? df
        : sevenDaysAgo || new Date().toISOString().split("T")[0]
    })
    
    const [dateTo, setDateTo] = useState(()=>{
        const dt = searchParams.get("dt");
        return dt && new Date(dt).getTime()  <= new Date().getTime()
        ? dt
        : new Date().toISOString().split("T")[0]
    })

    useEffect(()=>{
        setSearchParams({df:dateFrom, dt:dateTo})
    },[dateFrom, dateTo])

    const handleDateFromChange = (e)=>{
        const df = e.target.value;
        setDateFrom(df)
        if(new Date(df).getTime() > new Date(dateTo).getTime()){
            setDateFrom(df)
        }
    }

    const handleDateToChange = (e)=>{
        const dt = e.target.value;
        setDateTo(dt)
        if(new Date(dt).getTime() < new Date(dateFrom).getTime()){
            setDateTo(dt)
        }
    }



  return (
    <div className='flex items-center gap-2'>
        <div className='flex items-center gap-1'>
            <label htmlFor="dateFrom"
            className='block text-gray-700 darK:text-gray-700 text-sm mb-2'
            >
                Filter
            </label>
            <input
                className='inputStyles'
                name="dateFrom"
                type='date'
                value={dateFrom}
                onChange={handleDateFromChange}
            />
        </div>
        <div className='flex items-center gap-1'>
            <label htmlFor="dateFrom"
            className='block text-gray-700 darK:text-gray-700 text-sm mb-2'
            >
                To
            </label>
            <input
                className='inputStyles'
                name="dateTo"
                type='date'
                value={dateTo}
                onChange={handleDateToChange}
            />
        </div>
    </div>
  )
}

export default DateRange