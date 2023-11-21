import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from './redux/hook';
import { setLoading, setUser } from './redux/features/user/userSlice';
import { useEffect } from 'react';
function App() {
  const dispatch = useAppDispatch();

  useEffect(()=>{

    // initially
    dispatch(setLoading(true));


    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      }else{
        dispatch(setLoading(false));
      }
    });
  },[dispatch]);


  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     dispatch(setUser(user.email))
  //   }
  // });






  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}



export default App;
