import { makeRequest } from './makeRequest';
import { API_URL } from '../../config';

export const getCheckoutData = (query) => {
    const { sku: sku_id, isPrivate, guests } = query;
    const newRequest = makeRequest({
        url: `${API_URL}/graphql`,
        method: 'post',
        data: {
            query: `
                    query fetchCheckoutData {
                        skus (where: {id: "${sku_id}"})
                        {
                            id,
                            booking_date,
                            price,
                            capacity
                            inventory
                            coupons {
                                id
                                code,
                                description
                                type
                                value
                                start_date
                                end_date
                                is_active
                                timeless
                                site_wide
                              }
                            product {
                              experience_id
                              type
                              short_content
                              days
                              places_lists {
                                code
                              }
                              user {
                                username
                                profile {
                                    first
                                    last
                                    displayname
                                    avatar
                                }
                              }
                            }
                          }
                        
                    }`
        }
    });

    return newRequest;
};
