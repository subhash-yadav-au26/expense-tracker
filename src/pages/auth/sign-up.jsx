import React, { useEffect, useState } from 'react';
import * as z from 'zod'
import useStore from '../../store/index'
import {useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom';
import {Card, CardHeader, CardTitle, CardContent, CardFooter} from '../../components/ui/card'
import {SocialAuth} from "../../components/ui/social-auth"
import Separator from '../../components/ui/separator'
import Input from "../../components/ui/input"
import {Button} from "../../components/ui/button"
import {BiLoader} from "react-icons/bi"
import { toast } from 'sonner';
import api from '../../utils/apiCall';

const RegisterSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  firstname: z
    .string({ required_error: "Name is required" })
    .min(3, "Name should have at least 3 characters"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password should be more than 8 characters"),
});

const SignUp = () => {

  const {user} = useStore((state) => state)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({resolver: zodResolver(RegisterSchema),  mode: "onBlur"})
  
  const navigate = useNavigate()
  const [loading, setLoading] = useState()

  useEffect(()=>{
    user && navigate("/")
  },[user])

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const {data:res} = await api.post("/auth/sign-up",data)
      if(res?.user){
        toast.success("Account created successfully. You can now login.")
        setTimeout(()=>{
          navigate("/sign-in")
        },1500)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }finally{
      setLoading(false)
    }
  }
  
  return (
    <div className='flex items-center justify-center w-full min-h-screen py-10'>
      <Card className="w-[400px] bg-white dark:bg-black/20 shadow-md overflow-hidden">
        <div className='p-6 md:-8'>
          <CardHeader className='py-0'>
            <CardTitle className='mb-8 text-center dark:text-white'>
              Create Account
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'> 
              <div className='mb-8 space-y-6'>
                <SocialAuth isLoading={loading} setLoading={setLoading}/>
                <Separator/>
                <Input
                  disabled={loading}
                  id="firstname"
                  label="Name"
                  name="firstname"
                  type="text"
                  placeholder="John Smith"
                  error = {errors?.firstname?.message}
                  {...register("firstname")}
                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400 dark:outline-none"
                />
                <Input
                  disabled={loading}
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="your@example.com"
                  error = {errors?.email?.message}
                  {...register("email")}
                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400 dark:outline-none"
                />

                <Input
                  disabled={loading}
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  error = {errors?.password?.message}
                  {...register("password")}
                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400 dark:outline-none"
                />

                <Button
                  type="submit"
                  className="w-full bg-violet-800"
                  disabled={loading}
                >
                  {loading ? <BiLoader className="text-2xl animate-spin" /> : "Create an account"}
                </Button>
              </div>
            </form>

          </CardContent>
        </div>
        <CardFooter className="justify-center gap-2">
          <p className='text-sm'>Already have an account</p>
          <Link to="/sign-in" 
            className='text-sm font-semibold text-voilet-600 hover:underline'
          >
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp