import axios from 'axios';
import { serverErrors } from '@/helpers/serverErrors';

export const getDate = async () => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/settings/date`);
    } catch (error) {
        // Handle Error Here
        serverErrors(error);
        return error;
    }
}



// export const createDataAdmin = (type, end, data) => {
//     return (dispatch) =>
//         dispatch({
//             type,
//             payload: axios.post(
//                 `${process.env.NEXT_PUBLIC_API_URL}/${end}`,
//                 data
//             )
//         })
//             .then((res) => res)
//             .catch((error) => {
//                 serverErrors(error);

//                 return { error };
//             });
// };