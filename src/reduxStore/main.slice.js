import {createAsyncThunk, createSlice, TaskAbortError} from "@reduxjs/toolkit"
import {
    httpGetBooks,
    httpGetOrders,
    httpAddBook,
    httpUpdateBook,
    httpUpdateOrderStatus,
    httpPlaceOrder,
    httpValidateLogin
} from '../requests/requests'

import NotificationManager from "react-notifications/lib/NotificationManager"

const initalState={
    isAdmin:false,
    username:null,
    pass:null,
    isLoggedIn:false,
    books:[],
    cart:[],
    order:[],
    viewingBook:null,
    cartTotal:null,
    loading:false,

    // cartItem => book props+qty+subtotal
    // order    => info+cartItemsprops+status+

}


// thunk creation using createAsyncThunk
// 1) create a funtion like below for an async task
// 2) add the case to for that functon.[fullfilled,rejected,pending] to the builder addCase()
// 3) handle state updates there
// 4) export the function for use in components ( use same as normal actions)

// https://redux-toolkit.js.org/api/createAsyncThunk#:~:text=thunkAPI%20%3A%20an%20object%20containing%20all,middleware%20on%20setup%2C%20if%20available
// refer this one

// createAsyncThunk's function is called "payloadCreator"
// createAsycThunk accepts first param as arg

export const getAllBooks=createAsyncThunk('/main/getAllBooks',async ()=>{
    // erasing await gives same op?? (how?)
    const res=await httpGetBooks()
    console.log(res)
    return res
})

export const getAllOrders=createAsyncThunk('/main/getAllOrders',async ()=>{
    const res=await httpGetOrders()
    console.log(res)
    return res
})

export const validateLogin=createAsyncThunk('main/validateLogin',async ({username,password},{dispatch})=>{
    dispatch(setUserInfo({username:username,password:password}))
    const res=await httpValidateLogin(username,password)
    return res.status
})

// export const updateBook=createAsyncThunk('main/updateBook',async({bkTitle,modBook},{dispatch})=>{
//     const res=await httpUpdateBook(bkTitle,modBook)
//     return res
// })

// export const addBook=createAsyncThunk('main/',async({newBook},{dispatch})=>{
//     const res=await httpAddBook(newBook)
//     return res
// })




const mainSlice= createSlice({
    name:"main",
    initialState:initalState,
    reducers:{
        // decide on all reducers here
        setLoader:(state,action)=>{
            state.loading=action.payload
        },
        setViewBook:(state,action)=>{
            state.viewingBook=action.payload
        },
        setUserInfo:(state,action)=>{
            console.log("scllas")
            console.log(action.payload)
            state.username=action.payload.username
            state.password=action.payload.password
        },
        setAdmin:(state)=>{
            state.isAdmin=true
        },
        logout:(state)=>{
            state.isLoggedIn=false
            state.isAdmin=false
            state.username=null
            state.password=null
        },
        showMsg:(state,action)=>{
            switch (action.payload.type) {
                case 'info':
                  NotificationManager.info(action.payload.msg,null,1000);
                  break;
                case 'success':
                  NotificationManager.success(action.payload.msg,null,1000);
                  break;
                case 'warning':
                  NotificationManager.warning(action.payload.msg,null,1000);
                  break;
                case 'error':
                  NotificationManager.error(action.payload.msg,null,1000)
                  break;
                default:
                    break;
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(getAllBooks.pending,(state,action)=>{
                console.log("made req")
                state.loading=true
            })
            .addCase(getAllBooks.fulfilled,(state,action)=>{
                console.log("fulfilled books")
                console.log(action.payload)
                state.books=action.payload
                state.loading=false
            })
            .addCase(getAllBooks.rejected,(state,action)=>{
                console.log("err books")
                console.log(action.payload)
                state.books=null
            })
            .addCase(validateLogin.fulfilled,(state,action)=>{
                state.isLoggedIn=action.payload=="success"?true:false
                console.log("im herhe"+JSON.stringify(action.payload))
            })
            .addCase(validateLogin.rejected,(state,action)=>{
                state.isLoggedIn=false
                state.username=null
                state.password=null
            })
            .addCase(getAllOrders.fulfilled,(state,action)=>{
                state.order=action.payload
            })
    }
})


export const { setLoader,setViewBook,setAdmin,showMsg,setUserInfo,logout }=mainSlice.actions
export default mainSlice.reducer

// export const { addManga, delManga, replicateManga } = mangaSlice.actions;
// export default mangaSlice.reducer;