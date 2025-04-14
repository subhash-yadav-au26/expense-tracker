import React,{useState} from 'react'
import  {useForm}  from 'react-hook-form'
import {generateAccountNumber} from "../utils/index.js"
import DialogWrapper from "./wrappers/dialog-wrapper.jsx"
import { DialogPanel, DialogTitle} from '@headlessui/react'
import { BiLoader } from 'react-icons/bi'
import Input from "./ui/input.jsx"
import {Button} from "./ui/button.jsx" 
import { toast } from 'sonner'
import api from '../utils/apiCall.js';
import { formatCurrency } from '../utils/index.js'


const AddMoney = ({isOpen, setIsOpen, id, refresh}) => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch
    }=useForm({
        defaultValues:{account_number: generateAccountNumber()},
    })
    
    function closeModal (){
        setIsOpen(false)
    }

    const onSubmit = async(data)=>{
        try {
            setLoading(true)
            const {data:res} = await api.put(`/account/add-money/${id}`, data)
            if(res?.data){
                toast.success(res?.message)
                setIsOpen(false)
                refresh()
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }finally{
            setLoading(false)
        }
    }

  return (
    <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 align-middle shadow-xl transition-all">
            <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 mb-4 uppercase"
            >
                Add Money to Account
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <>
                    <Input
                        type="number"
                        name="amount"
                        label="Amount"
                        placeholder="20.10"
                        {...register("amount",{
                            required: "Amount is required!"
                        })}
                        error={errors.amount ? errors.amount.message: ""}
                        className="inputStyle"

                    />
                    <div className='w-full mt-8'>
                        <Button
                            disabled={loading}
                            type="submit"
                            className="bg-violet-700 text-white w-full mt-4"
                        >
                            { loading ? 
                                <BiLoader className='text-xl animate-spin text-white'/> 
                                : 
                                `Submit ${watch("amount") ? formatCurrency(watch("amount")): ""}`
                            }  
                        </Button>
                    </div>

                </>
            </form>
        </DialogPanel>
    </DialogWrapper>
  )
}

export default AddMoney