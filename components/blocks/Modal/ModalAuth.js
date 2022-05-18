import AuthLogin from '@/components/auth/AuthLogin';
import ModalGeneric from './ModalGeneric';
import { toggleAuthModal, setAuthPage } from '@/store/actions/globalState';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthRegister from '@/components/auth/AuthRegister';
import AuthProfile from '@/components/auth/AuthProfile';

const ModalAuth = ({
    auth,
    toggleAuthModal,
    setAuthPage,
    globalState: { authModalIsOpen, authComponent }
}) => {
    return (
        authModalIsOpen && (
            <ModalGeneric
                setModalIsOpen={toggleAuthModal}
                close
                size="md:max-w-xl md:w-full xl:h-auto"
                auth={auth}>
                {authComponent === 'login' && <AuthLogin />}
                {authComponent === 'register' && <AuthRegister />}
                {authComponent === 'profile' && <AuthProfile />}
            </ModalGeneric>
        )
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            toggleAuthModal,
            setAuthPage
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAuth);
