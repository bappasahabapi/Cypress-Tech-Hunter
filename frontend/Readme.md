###    Cypress 

### Server Link:

🫧 Clone the server code 
- [Tech Hunter Server ](https://github.com/bappasahabapi/tech-hunter-server/tree/main)


run the server 

- `yarn start`

- `npm cypress open`

Resource Link:[https://ui.shadcn.com/docs/components/]

###   Steps:

`1. fix the project structure`

- Make the **store**
- connect store to **main.tsx** file
- copy the **hook.ts** file and add it to the **redux/hook.ts** file. this is Apphooks

`2. Make cart slice and handle product`

- Make **cart/cartSlice**
- export cart reducer / actions
- add the reducer to the store
- next go to the products page and see the devtool is cart is exist in the redux store
- make the reducer(**addToCart**) in cartSlice and export it
- use the function to the **ProductCart.tsx** 

- Dispatch korlei product store e jabe means **devtool** e pabo state ta.

- jekane use korte chabo sekane useSelector diye store the data ante dekhabo UI te

`3. Handling business logic inside an action reducer`

- useAppSelector() in the *cart.tsx* file to add the cart
- Handle the product quantity part in the **cartSlice**
--  //todo: push korar age check kore nibo j product ta age theke exist kore ki na


```javascript
  addToCart:(state, action:PayloadAction<IProduct>)=>{
            // state.products.push(action.payload)
            //todo: push korar age check kore nibo j product ta age theke exist kore ki na

            const existing =state.products.find((product)=>product._id ===action.payload._id);
            if(existing){
                // console.log('product is  already exist');
                existing.quantity=existing.quantity! +1

            }else{
                //unique product added then quatity=1
                //  state.products.push(action.payload)
                state.products.push({...action.payload ,quantity:1})
               
            }
        },
```


`4. add and remove cart features`

- cart.tsx file e jabo 

- plus button er onclick e dispatch er vitore function call kore er vitore product take rap kore dibo

- remove korte chaile filter use kore same vabe button e korbo.

```ts
        removeCart:(state,action:PayloadAction<IProduct>)=>{
            state.products=state.products.filter(p=>p._id !==action.payload._id)
        }
```

```ts
                <Button onClick={()=>dispatch(removeCart(product))}>
                  <HiMinus size="20" />
                </Button>
```


`5. Total Count and Checkout`

`6. Product filters with vanila redux`

- make a **productSlice**.ts inside features/products
- 
- `8.  create api slice and add to the store`

**apiSlice.ts**

```powershell
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'apidada',
  baseQuery: fetchBaseQuery({ baseUrl:'http://localhost:5000' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/product',
    }),
  }),
});

export const { useGetProductsQuery } = api;
```
**store.ts**

```typescript
import { api } from './api/apiSlice';

const store = configureStore({
    reducer: {
        cart:cartReducer,
        product:producReducer,
        [api.reducerPath]:api.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(api.middleware)
});

// fix the type error 
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
```

 `9.  create api slice and add to the store`

 `10.  Parameterized Query`

 `11. Creating-first-mutation`

- we make our first mutation in the comment section of the product.

```typescript
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      })
    })

```
`12.  Handling-post-method-using-mutation-hook`

-    we use this hook in the product review component.
-    This mutation  hook returns [fucntion,{}] -- here we dot use dispatch.
-  amra data kivabe pathaci seta besi important .mane backend kivabe data ta accept kortece rest file 
    e hit kore bujte hbe.

```javascript
 const options={
      id:id,
      comment:{comment:inputValue}
      // comment:inputValue --> this gives undefined 
    }
```

`13. Catch Revalidation`
- make a hook named  **useGetCommentQuery**
- 1st the data is post and the fetch [thats why its called two times]
- so we need to invalidated the comment tag for refetch the data
- ami jodoki ekta post commnent request korbo sathe sathei post hobar por
  redux data tak fetch kore niye asebe . **ek kajtai hoi tagTypes use kore.**
- ami chacci comment provide korte tai ami sekhane **provideTags['comments']**
 ebong 

- jei endpoint theke data ta astece setai hocce amr **provider**. ekhane **getComment** endpoint
  theke data ta astece.
- And ami kokon chacci j data ta refetch trigger hok seta holo **postComment** endpoint e
  sei thetre ami comments tag er jei data ta ase seta invalided kore dibo. that means postComment
  e **invalidetesTags**['comments'] hobe. 



`14: Refetching-using-Mount-or-Arg-change,-polling-and-code-splitting`

- onno kuno user jodi data post kore seita sathe sathe add hocce na . ei case ta at a time 
    handle korar jonnno amra 
` const { data:commentsData}=useGetCommentQuery(id,{refetchOnMountOrArgChange:true});`
component ta jokon remount hbe tokon add hoye jabe comment.
**or,**
amra chaile ekta time interval por por update kore dite pari ei case handle korara jonno **pollingInterval** use kore

`  const { data:commentsData}=useGetCommentQuery(id,{refetchOnMountOrArgChange:true,pollingInterval:9000});`

- make a root api where all endpoint of others api is injected.
- 
`15.  Creating-a-user-slice`
- here we handle the create async part. this is related to handle authentication . To do this 

1. first make a slice in **userSlice.ts** file
2. store the user slice in store.ts 



`16.  Create Async thunk jinisgulo amra extraReducer e handle korbo` 

`17.  Handling-promise-stages-with-builder-and-addCase` 

`18.  22-8: Handling-user-persistency  ` 

`18.  22-8: Handling logout  ` 