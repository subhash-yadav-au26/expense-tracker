import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import React, {useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import api from "../../utils/apiCall";
import { auth } from "../../utils/firebaseConfig";
import useStore from "../../store";
import { Button } from "./button";

export const SocialAuth = ({ isLoading, setLoading }) => {
    const [oauth, setOauth] = useState("google")
    const { setCredentials } = useStore((state) => state)
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        setOauth("google");
        try {
            await signInWithPopup(auth, provider)
        } catch (error) {
            toast.error("Error signing in with google", error)
        }
    }

    const saveUserToDb = async (userData) => {
        try {
            setLoading(true)
            const {data : res} = await api.post("/auth/social-login", userData)

            if(res?.user){
                toast.success(res?.message)
                const userInfo = {...res?.user, token:res?.token}
                localStorage.setItem("user",JSON.stringify(userInfo))
                setCredentials(userInfo)

                setTimeout(()=>{
                    navigate("/overview")
                },1500)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const userData = {
                    email: currentUser.email,
                    firstname: currentUser.displayName?.toLowerCase(),
                    oauth,
                    firebaseId: currentUser.uid,
                };
                saveUserToDb(userData);
            }
        });

        // auth.signOut();
        return () => unsubscribe(); // Cleanup listener on unmount
    }, [auth]);

    return (
        <div className="flex items-center gap-2">
            <Button 
                onClick={signInWithGoogle}
                disabled={isLoading}
                variant="outline"
                className="w-full text-sm font-normal dark:bg-transparent dark:border-gray-800 dark:text-gray-400"
                type="button"
            >
                <FcGoogle className="mr-2 size-5"/>
                Continue with Google
            </Button>
        </div>
    )
}