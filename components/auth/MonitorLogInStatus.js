import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { fetchPurchasedIds } from '@/helpers/apiServices/purchases';
import {bindActionCreators} from 'redux';



const MonitorLogInStatus = ({

    auth,
    fetchPurchasedIds,
    purchasedIds
}) => {

    const [c,sc] = useState(0)
    useEffect(() => {
        console.log('I am in hetre and its ace')
// console.log('auth', auth, c)
// sc(c+1)
//         if(auth.isAuthenticated && !idsLoaded && !loadingIds) {
            
//             setLoadingIds(true);
//             fetchPurchasedIds().then(() => {
//                 setLoadingIds(false);
//                 setIsLoadedIds(true);
//             });
//         } 
        
//         // if(!auth.isAuthenticated) {
//         //     alert(2)
//         // }

    }, [auth])

    return null;
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchPurchasedIds
        },
        dispatch
    );
}
const mapStateToProps = (state) => ({
    purchasedIds: state.purchased.purchasedIds,
    globalState: state.globalState,
    auth: state.auth,
    cart: state.cart, // check what already in yhe cart

    // also once logged in check if they already booked this product
});

export default connect(mapStateToProps, mapDispatchToProps)(MonitorLogInStatus);