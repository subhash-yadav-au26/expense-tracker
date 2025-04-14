import {Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {BiTransfer} from "react-icons/bi";
import {FaMoneyCheckDollar} from "react-icons/fa6";
import {MdMoreVert} from "react-icons/md";

import TransitionWrapper from "./wrappers/transition-wrapper";


export default function AccountMenu({addMoney,transferMoney}){
    return (
        <>
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton className='inline-flex w-full justify-center rounded-md text-sm font-medium text-gray-600 dark:text-gray-300'>
                <MdMoreVert/>
            </MenuButton>

            <TransitionWrapper>
                <MenuItems className='absolute p-2 right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white '>
                    <div className="px-1 py-1 space-y-2">
                        <MenuItem>
                        {
                            ()=>(
                                <button
                                onClick={transferMoney}
                                className={`group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray`}
                                
                                >
                                    <BiTransfer/>
                                    Transfer Funds
                                </button>
                            )
                        }
                        
                        </MenuItem>

                        <MenuItem>
                        {
                            ()=>(
                                <button
                                onClick={addMoney}
                                className={`group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray`}
                                
                                >
                                    <FaMoneyCheckDollar/>
                                    Add Money
                                </button>
                            )
                        }
                        
                        </MenuItem>

                    </div>
                
                </MenuItems>
            </TransitionWrapper>
        </Menu>
        
        </>
    )
}
