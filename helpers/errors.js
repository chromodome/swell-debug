import translations from '@/constants/translations';
import { connect } from 'react-redux';

const ErrorSuccessLangNS = ({ errorId, globalState: { lang } }) => {
    return (
        <span className="">
            {translations['en'].errors[errorId] ||
                translations['en'].DEFAULTERROR}
        </span>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    auth: state.auth
});

const ErrorSuccessLang = connect(mapStateToProps)(ErrorSuccessLangNS);
export { ErrorSuccessLang };
