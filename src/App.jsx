import {Navigate, Outlet, Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/sign-in';
import SignUp from './pages/auth/sign-up';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';
import Account from './pages/account';
import Navbar from './components/ui/navbar';
import Transactions from './pages/transactions';
import useStore  from './store/index';
import {setAuthToken} from './utils/apiCall'
import { Toaster } from 'sonner';
import { useEffect } from 'react';

const RootLayout = ()=>{
  const {user} = useStore((state)=> state)
  setAuthToken(user?.token ?? "")
  return !user ? 
    <Navigate to='sign-in' replace={true}/> 
  : 
  <>
    <Navbar/>
    <div className='min-h-[cal(h-screen-100px)]'>
      <Outlet/>
    </div>
  </>
}

function App() {
  const {theme} = useStore((state)=>state)

  useEffect(()=>{
    if(theme === "dark"){
      document.body.classList.add("dark")
    }else{
      document.body.classList.remove("dark")
    }
  },[theme])
  
  return (
    <main>
      <div className='w-full min-h-screen px-6 bg-gray-100 md:px-20 dark:bg-slate-900'>
        <Routes>

          <Route element={<RootLayout/>}>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Dashboard/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/account" element={<Account/>} />
            <Route path="/transactions" element={<Transactions/>} />
          </Route>
        
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
        </Routes>
      </div>
      <Toaster richColors position='top-center'/>
    </main>
  )
}

export default App
