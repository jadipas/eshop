export const initialState = {
    basket: [],
    user: null,
}

export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price*item.quantity + amount, 0);

export const getTotalItems = (basket) =>
  basket?.reduce((amount, item) => item.quantity + amount, 0);
  
const reducer = (state, action) => {
    
    let i = -1;
    var newBasket = [...state.basket]
    switch(action.type){
        case 'ADD_TO_BASKET':
            i = state.basket.findIndex(
                (basketItem) => basketItem.id === action.item.id
            );
            var nBasket = [];
            let l = 1;
            if(i >= 0){
                l = state.basket[i].quantity + 1;
                nBasket = [...state.basket]
                nBasket[i] = {...action.item, quantity: l}
            }else{
                nBasket = [...state.basket, {...action.item, quantity: l}]
            }

            return {
                ...state,
                basket: nBasket
            }

        case 'INCREASE_QUANTITY':
            i = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            if(i >= 0){
                newBasket[i].quantity = newBasket[i].quantity + 1;
            }else{
                console.warn(`Can't add more of product (id: ${action.id}) as it's not in basket!`);
            }

            return {
                ...state,
                basket: newBasket
            }
        
        case 'DECREASE_QUANTITY':
            i = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            if(i >= 0){
                if(newBasket[i].quantity > 1){
                    newBasket[i].quantity = newBasket[i].quantity - 1;
                }
            }else{
                console.warn(`Can't remove more of product (id: ${action.id}) as it's not in basket!`);
            }

            return {
                ...state,
                basket: newBasket
            }

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            if(index >= 0){
                newBasket.splice(index, 1);
            }else{
                console.warn(`Can't remove product (id: ${action.id}) as it's not in basket!`)
            }

            return {
                ...state,
                basket: newBasket
            }
        
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: [],
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            }
        default:
            return state;
    }
}

export default reducer;