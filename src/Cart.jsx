import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import Items from './Items';
// eslint-disable-next-line import/no-cycle
import { cartContext } from './Main';

const Cart = () => {
    const { items, clearCart, totalItem, totalAmount } = useContext(cartContext);

    return (
        <div className="container">
            <div className="header">
                <div className="brand">
                    <ArrowBackIcon className="arrow" />
                    <h3>Continue Shopping</h3>
                </div>

                <div className="shopping-div">
                    <ShoppingCartIcon className="icon" />
                    <div className="count">{totalItem}</div>
                </div>
            </div>
            <hr />

            <div className="banner">
                <h2>Shopping Cart</h2>
                <h5>you have {totalItem} items in shopping cart</h5>
            </div>

            {items.length > 0 && (
                <>
                    <div className="main">
                        {items.map((item) => (
                            <Items key={item.id} allitem={{ ...item }} />
                        ))}
                    </div>
                    <div className="total">
                        <h4>
                            <span>Cart Total : </span>
                            {totalAmount} Tk
                        </h4>

                        <button type="button">Checkout</button>
                        <button type="button" onClick={() => clearCart()}>
                            Clear Cart
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
