import React,{useState} from 'react'
import {Button} from "./ui/button.jsx";
import { BiLoader } from "react-icons/bi";
import api from "../utils/apiCall.js";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import Input from "./ui/input";

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()
    const [ loading, setLoading] = useState(false)
    const submitPasswordHandler = async (data) => {
        try {
            setLoading(true)
            const {data: res} = await api.put('/user/change-password',data);
            if(res?.status === "success"){
                toast.success(res?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='py-20'>
        <form onSubmit={handleSubmit(submitPasswordHandler)} >
            <div className=''>
                <p className='text-xl font-bold text-black dark:text-white mb-1'>
                    Change Password
                </p>
                <span className='labelStyles'>
                    This will be used to log into your account and complete high
                    serverity actions
                </span>

                <div className='mt-6 space-y-6 '>
                    <Input
                        disabled={loading}
                        type="password"
                        label="Current Password"
                        name="currentPassword"
                        className="inputStyle"
                        placeholder="Enter your current password"
                        {...register("currentPassword", {
                            required: "Current Password is required",
                        })}
                        error={errors.currentPassword ? errors.currentPassword?.message : ""}
                    
                    />
                    <Input
                        disabled={loading}
                        type="password"
                        label="New Password"
                        name="newPassword"
                        className="inputStyle"
                        placeholder="Enter your New password"
                        {...register("newPassword", {
                            required: "New Password is required",
                        })}
                        error={errors.newPassword ? errors.newPassword?.message : ""}
                    />

                    <Input
                        disabled={loading}
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        className="inputStyle"
                        placeholder="Enter your Confirm password"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (val) => {
                                const { newPassword } = getValues()
                                return newPassword === val || "Your passwords do not match"
                            }
                        })}
                        error={errors.confirmPassword ? errors.confirmPassword?.message : ""}
                    />


                </div>
            </div>
            <div className="flex items-center mt-10 gap-6 justify-end pb-10 border-b-2 border-gray-200 dark:border-gray-800">
                <Button
                    variant="outline"
                    loading={loading}
                    type="reset"
                    className="px-6 bg-transparent text-black dark:text-white border border-gray-200 dark:border-gray-700"
                >
                    Reset
                </Button>
        
                <Button
                    loading={loading}
                    type="submit"
                    className="px-8 bg-violet-800 text-white"
                >
                    {loading ? <BiLoader/> : "Change Password"}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default ChangePassword