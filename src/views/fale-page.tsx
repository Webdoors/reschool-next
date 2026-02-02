

import React from 'react'
import { useHistory } from 'react-router';
import PaymentModal from '../components/payment/payment-modal';


export const PaymentFail: React.FC = () => {
    const history= useHistory()
    const closeModal = ()=>{
        history.push('/courses')
    }
    return <React.Fragment>
    <div className='p-fail' >'</div>
    <PaymentModal error='გადახდა ვერ მოხერხდა' closePaymentModal={closeModal}/>
    </React.Fragment>
};

export default PaymentFail;