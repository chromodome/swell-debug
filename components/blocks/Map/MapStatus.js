import { connect } from 'react-redux';
import translations from 'constants/translations';

const MapStatus = ({
    globalState: {
        lang,
        googleMaps: {
            loading: {
                isLoading,
                msg: loadingMessage
            },
            error:{
                isError,
                msg: errorMessage 
            } 
        }  
    },
}) => {

    const buildMessage = () => {
        if(isLoading) {
            return <p>{translations[lang][loadingMessage]}</p>
        } else if (isError) {
            return <p>{translations[lang][errorMessage]}</p>
        } else {
            return null;
        }
    }

    return (
        <div>  
            {buildMessage()}
        </div>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
});

export default connect(mapStateToProps, null)(MapStatus);
