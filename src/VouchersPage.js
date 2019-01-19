import React from 'react';
import classnames from 'classnames';

const VouchersPage = (props) => {
  const { validVouchers, vouchersCollapsed } = props;
  const vouchersToRender = validVouchers.map((item, key) => {
    return <li className='voucher' key={key}>
      <p className='voucher-description'> {item.description}</p>
      <b className='voucher-code'> {item.code}</b>
    </li>
  })
  return (
    <section className='vouchers-block'>
      <h3
        onClick={props.openBlock}
        id='vouchersCollapsed'
        className='vouchers-block-header'
      > Vouchers </h3>
      <div className={vouchersCollapsed ? 'collapsed' : 'block'}>
        <p className='vouchers-intro'> Shop more, get more! Check out our discounts:</p>
        <ul className='vouchers-list'>
          {vouchersToRender}
        </ul>
        <button
          onClick={props.closeBlock}
          className='vouchersCollapsed'
        >Close block </button>
      </div>
    </section >
  )
}

export default VouchersPage;