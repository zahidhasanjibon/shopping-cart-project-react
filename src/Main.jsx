import React, { useEffect, useReducer } from 'react';
// eslint-disable-next-line import/no-cycle
import Cart from './Cart';
import products from './Products';
import './style/style.css';

export const cartContext = React.createContext();
const Main = () => {
    const initialState = {
        items: products,
        totalAmount: 0,
        totalItem: 0
    };

    const Reducer = (currentState, action) => {
        switch (action.type) {
            case 'REMOVE':
                return {
                    ...currentState,
                    items: currentState.items.filter((elm) => elm.id !== action.value)
                };
            case 'CLEAR':
                return {
                    ...currentState,
                    items: []
                };

            case 'INCREMENT': {
                const updateArr = currentState.items.map((elm) => {
                    if (elm.id === action.value) {
                        const newPrice = (+action.price / elm.quantity) * (elm.quantity + 1);
                        return {
                            ...elm,
                            quantity: elm.quantity + 1,
                            price: +newPrice
                        };
                    }
                    return elm;
                });
                return {
                    ...currentState,
                    items: updateArr
                };
            }

            case 'DECREMENT': {
                if (action.count === 1) {
                    return {
                        ...currentState,
                        items: currentState.items.filter((elm) => elm.id !== action.value)
                    };
                }

                const updatedArr = currentState.items.map((elm) => {
                    if (elm.id === action.value) {
                        const newDecr = +action.price - action.price / elm.quantity;
                        return {
                            ...elm,
                            quantity: elm.quantity - 1,
                            price: +newDecr
                        };
                    }
                    return elm;
                });

                return {
                    ...currentState,
                    items: updatedArr
                };
            }

            case 'GET_TOTAL': {
                const { totalItem, totalAmount } = currentState.items.reduce(
                    (acm, curVal) => {
                        const { quantity, price } = curVal;
                        // eslint-disable-next-line no-param-reassign
                        acm.totalItem += quantity;
                        // eslint-disable-next-line no-param-reassign
                        acm.totalAmount += price;
                        return acm;
                    },
                    { totalItem: 0, totalAmount: 0 }
                );

                return {
                    ...currentState,
                    totalItem,
                    totalAmount
                };
            }

            default:
                return currentState;
        }
    };

    const [state, dispatch] = useReducer(Reducer, initialState);
    useEffect(() => {
        dispatch({
            type: 'GET_TOTAL'
        });
    }, [state.items]);

    const removeItem = (id) =>
        dispatch({
            type: 'REMOVE',
            value: id
        });
    const clearCart = () =>
        dispatch({
            type: 'CLEAR'
        });

    const incrementFunc = (id, price) => {
        dispatch({
            type: 'INCREMENT',
            value: id,
            price
        });
    };

    const decrementFunc = (id, quantity, price) => {
        dispatch({
            type: 'DECREMENT',
            value: id,
            count: quantity,
            price
        });
    };

    return (
        <>
            <cartContext.Provider
                value={{ ...state, removeItem, clearCart, incrementFunc, decrementFunc }}
            >
                <Cart />
            </cartContext.Provider>
        </>
    );
};
export default Main;
