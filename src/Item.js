import React from 'react';

const Item = (props) => {
  const { name, colour, category, price, quantity, pic } = props.item;
  const addToCart = props.addToCart;
  let oldPrice = null;
  if ('oldPrice' in props.item) {
    oldPrice = props.item.oldPrice;
    console.log('this is oldprice', props.item.oldPrice);
  }
  return (
    <article className='item'>
      <div className='item-header-wrap'>
        <img
          className='item-pic'
          alt={name}
          src={pic}
          width='150'
          height='200'
        />
        <h3 className='item-header'> {name} </h3>
      </div>
      <div className='wrapper'>
        <p className='item-colour'> Colour: {colour}</p>
        <p className={oldPrice ? 'old-price' : 'hidden'}> {oldPrice} </p>
        <p className='item-price'> £{price} </p>
        <p className='item-stock'> {quantity > 0 ? 'In Stock' : 'Out of Stock'} </p>
        <p className='item-category'> {category} </p>
        <button
          onClick={addToCart}
          disabled={quantity === 0 ? true : false}
          className='add-btn'
        > Add to cart </button>
      </div>
    </article >
  )
}

export default Item;