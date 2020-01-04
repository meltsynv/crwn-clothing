import React from "react";
import { connect } from "react-redux";
import {createStructuredSelector} from 'reselect'
import {selectCurrentUser} from '../../redux/user/user.selectors'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.util";

//components
import CartItem from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";

const Header = ({ currentUser, hidden }) => {
  return (
    <div className="header">
      <Link to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link to="/signin" className="option">
            SIGN IN
          </Link>
        )}
        <CartItem />
      </div>
      {hidden ? <CartDropdown /> : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});
export default connect(mapStateToProps)(Header);
