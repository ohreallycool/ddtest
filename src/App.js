import React, { Component } from 'react';
import './App.css';
import Item from './Item';
import CartItem from './CartItem';
import VouchersPage from './VouchersPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      cart: [],
      numOfItems: 0,
      discount: 0,
      totalPrice: 0,
      toPay: 0,
      inputValue: '',
      validVouchers: [],
      voucherApplied: false,
      categoryF: false,
      voucherError: null,
      vouchersCollapsed: true,
      cartCollapsed: true
    };
  }

  // FETCH DATA AND SAVE IT TO THE STATE
  componentWillMount() {
    const data = require('./items.js');
    const vouchers = require('./vouchers.js');
    this.setState({
      data: data.items,
      validVouchers: vouchers.vouchers
    });
  }

  //COUNT TOTAL PRICE OF ALL ITEMS IN THE CART
  countTotal(cart, priceKey) {
    return cart.reduce(function (r, a) {
      return r + a[priceKey];
    }, 0);
  }

  addToCartHandler = (e, id) => {
    e.preventDefault();
    const cart = this.state.cart;
    const cartItem = this.state.data.filter(item => item.id === id);//get item by id
    cart.push(cartItem[0]); //save item to the cart
    const totalPrice = this.countTotal(cart, 'price'); //count the price of items in the cart
    const numOfItems = this.state.numOfItems + 1;//get number of items in the cart
    this.setState({
      cart: cart,
      numOfItems: numOfItems,
      voucherError: false,
      totalPrice: totalPrice,
      toPay: totalPrice
    });
  }

  deleteFromCartHandler = (e, key) => {
    e.preventDefault();
    const cart = this.state.cart;
    cart.splice(key, 1); //delete item from cart
    const numOfItems = this.state.numOfItems - 1;//get number of items in the cart
    const totalPrice = this.countTotal(cart, 'price');//count price of items in the cart
    this.setState({
      cart: cart,
      numOfItems: numOfItems,
      discount: 0,
      voucherApplied: false,//annulate discount
      voucherError: null,//annulate discount
      categoryF: false,//annulate discount
      totalPrice: totalPrice,
      toPay: totalPrice//annulate discount
    });
  }

  inputChangeHandler = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  applyDiscountHandler = (e) => {
    e.preventDefault();
    let { discount, totalPrice, inputValue, voucherApplied, voucherError, cart, categoryF, toPay } = this.state;
    cart.map(el => {
      if (el.category.includes('Footwear') === true) {
        categoryF = true;
      }
    })
    if (inputValue === 'DISCOUNT5' && totalPrice > 10 && voucherApplied === false) {
      discount = 5;
      voucherApplied = true;
      voucherError = false;
      toPay = totalPrice - discount;
    } else if (inputValue === 'DISCOUNT10' && totalPrice >= 50 && voucherApplied === false) {
      discount = 10;
      voucherApplied = true;
      voucherError = false;
      toPay = totalPrice - discount;
    } else if (inputValue === 'FOOTWEAR15' && totalPrice >= 75 && categoryF === true && voucherApplied === false) {
      discount = 15;
      voucherApplied = true;
      voucherError = false;
      toPay = totalPrice - discount;
    } else {
      voucherError = true;
    }
    this.setState({
      discount: discount,
      inputValue: '',
      voucherApplied: voucherApplied,
      voucherError: voucherError,
      categoryF: categoryF,
      toPay: toPay
    })
  }

  openBlockHandler = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: false
    })
  }

  closeBlockHandler = (e) => {
    e.preventDefault();
    const targetBlock = e.target.attributes[0].nodeValue;
    this.setState({
      [targetBlock]: true
    })
  }

  render() {
    const { data, cart, numOfItems, discount, totalPrice, inputValue,
      validVouchers, voucherError,
      toPay, cartCollapsed, vouchersCollapsed } = this.state;

    const itemsToRender = data.map((item, key) => {
      return <Item
        item={item}
        key={key}
        addToCart={(e) => this.addToCartHandler(e, item.id)}
      />
    })
    const cartItemsToRender = cart.map((item, key) => {
      return <CartItem
        item={item}
        key={key}
        deleteFromCart={(e) => this.deleteFromCartHandler(e, key)}
      />
    })

    return (
      <div className="App">
        <main className='body'>
          {/* CART BLOCK */}
          <section className='cart'>
            <h2
              onClick={this.openBlockHandler}
              id='cartCollapsed' className='cart-header'
            > My Shopping Cart (Items: {numOfItems}) </h2>
            <div className={cartCollapsed ? 'collapsed' : 'block'}>
              {cartItemsToRender}
              < section >
                <section className='discount-block'>
                  <form onSubmit={this.applyDiscountHandler}>
                    <label htmlFor='discount' className='discount-label'>Have a discount?</label>
                    <input
                      id='discount'
                      type='text'
                      value={inputValue}
                      onChange={this.inputChangeHandler}
                      placeholder='Enter discount code' />
                    <button className='apply-btn'> Apply </button>
                    <p className={voucherError ? 'error' : 'hidden'}> Sorry, invalid voucher</p>
                  </form>
                </section>
                <p> Discount: £{discount}</p>
                <p> Total: £{totalPrice} </p>
                <h4> TO PAY: £{toPay}</h4>
                <button className='cartCollapsed' onClick={this.closeBlockHandler}> Back to shopping</button>
                <button> Checkout </button>
              </section>
            </div>
          </section>
          {/* VOUCHERS BLOCK */}
          <VouchersPage
            validVouchers={validVouchers}
            vouchersCollapsed={vouchersCollapsed}
            openBlock={(e, id) => this.openBlockHandler(e, id)}
            closeBlock={(e) => this.closeBlockHandler(e)}
          />
          {/* SHOP BLOCK */}
          <section className='shop-block'>
            {itemsToRender}
          </section>
        </main>
      </div >
    );
  }
}

export default App;
