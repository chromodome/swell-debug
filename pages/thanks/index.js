import Layout from '@/layouts/Layout';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import { setViewedThanks } from '@/store/actions/order'
const LandingPage = ({
    setViewedThanks,
    order: {
        data: expData,
        viewed
    }
}) => {
    const router = useRouter();
    const { isReady } = useRouter();
    const  [loading, setLoading] = useState(true)

    useEffect(() => {
        if(isReady) {
            if(viewed) {
                router.push('/');
            } else {
                setViewedThanks();
                setLoading(false);
            }
            
        }

    }, [])
    
    return (
        <Layout>
            Thanks
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    order: state.order,
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setViewedThanks
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);