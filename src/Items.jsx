import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import { useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import { cartContext } from './Main';

const Items = (props) => {
    const { id, imgPath, title, price, description, quantity } = props.allitem;
    const { removeItem, incrementFunc, decrementFunc } = useContext(cartContext);
    return (
        <>
            <div className="descr">
                <div className="img-div">
                    <img className="photo" src={imgPath} alt="samsung" />
                </div>

                <div className="name-div">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>

                <div className="control-div">
                    <div className="control">
                        <RemoveIcon onClick={() => decrementFunc(id, quantity, price)} />
                        <input type="text" placeholder={quantity} disabled />
                        <AddIcon onClick={() => incrementFunc(id, price)} />
                    </div>
                </div>

                <div className="price-div">
                    <h4>{price} ৳</h4>
                </div>
                <div className="delete-div">
                    <DeleteIcon className="deleteicon" onClick={() => removeItem(id)} />
                </div>
            </div>
            <hr className="hr" />
        </>
    );
};

export default Items;
