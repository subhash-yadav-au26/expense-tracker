import React from "react";
import { FaBtc, FaPaypal } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { GiCash } from "react-icons/gi";
import Title from "./title";
import {maskAccountNumber,formatCurrency} from '../utils/index'

const ICONS = {
  crypto : (
    <div className='w-12 h-12 bg-amber-600 text-white flex items-center justify-center rounded-full'>
      <FaBtc size={26} />
    </div>
  ),
  "visa debit card" :(
    <div className='w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full'>
        <RiVisaLine size={26} />
    </div>
  ),
  paypal: (
    <div className='w-12 h-12 bg-blue-700 text-white flex items-center justify-center rounded-full'>
        <FaPaypal size={26} />
    </div>
  ),
  cash: (
    <div className='w-12 h-12 bg-rose-600 text-white flex items-center justify-center rounded-full'>
        <GiCash size={26} />
    </div>
  )

}

const Accounts = ({data}) => {
  return (
    <div className='mt-20 md:mt-0 py-5 md:py-20 md:w-1/3'>
      <Title title='Accounts' />
      <span className='text-sm text-gray-600 dark:text-gray-500'>
        View all your accounts
      </span>

      <div className='w-full'>
        {data.map((item, index) => (
          <div key={index + item?.account_name} className='flex items-center justify-between mt-6'>
            <div className='flex items-center gap-4'>
              {ICONS[item?.account_name?.toLowerCase()]}
              <div>
                <p className='text-black dark:text-gray-400 text-lg'>
                  {item.account_name}
                </p>
                <span className='text-gray-600'>{maskAccountNumber(item.account)}</span>
              </div>
            </div>

            <div>
              <p className='text-xl text-black dark:text-gray-400 font-medium'>
                ${formatCurrency(item.account_balance)}
              </p>
              <span className='text-sm text-gray-600 dark:text-violet-700'>
                Account Balance
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
