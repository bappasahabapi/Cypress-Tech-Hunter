import { auth } from '@/lib/firebase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface IUserState {
    user: {
        email: string | null;
    };
    isLoading: boolean;
    isError: boolean;
    error: string | null;

}

const initialState: IUserState = {
    user: {
        email: null,
    },
    isLoading:false,
    isError:false,
    error:null

};

interface ICredential{
    email:string;
    password:string;
}


//* create old redux thunk
 export const createUser=createAsyncThunk(
    'user/createUser',
    async({email,password}:ICredential)=>{
        const data =await createUserWithEmailAndPassword(auth,email,password);

        return data.user.email; // otherwise we cant get the data in redux store
    }
);


//* 

//* create old redux thunk
 export const loginUser=createAsyncThunk(
    'user/loginUser',
    async({email,password}:ICredential)=>{
        const data =await signInWithEmailAndPassword(auth,email,password);

        return data.user.email; // otherwise we cant get the data in redux store
    }
);


//* 

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //make normal user
        setUser:(state,action:PayloadAction<string |null>)=>{
            state.user.email=action.payload;
        },
        setLoading:(state,action:PayloadAction<boolean>)=>{
            state.isLoading=action.payload;
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(createUser.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.error=null;
        })
        .addCase(createUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.user.email=action.payload;
        })
        .addCase(createUser.rejected,(state,action)=>{
            state.user.email=null;
            state.isLoading=false;
            state.isError=true;
            state.error=action.error.message! // this is not null assertion
            
        })
        //for login user
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.error=null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.user.email=action.payload;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.user.email=null;
            state.isLoading=false;
            state.isError=true;
            state.error=action.error.message! // this is not null assertion
            
        })
      
            
        }
});

export const { setUser,setLoading} = userSlice.actions;

export default userSlice.reducer;
