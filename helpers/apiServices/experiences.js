import { makeRequest } from './makeRequest';
import { API_URL } from '../../config';

export const getExperiences = () => {
    return makeRequest({
        url: `${API_URL}/experiences`,
        method: 'GET'
    });
};

// export const getExperienceById = (id) => {
//     return makeRequest({
//         url: `${API_URL}/publisheds`,
//         method: 'GET',
//         params: {
//             id
//         }
//     });
// };

export const getExperiencesByCreator = (id) => {
    const newRequest = makeRequest({
        url: `${API_URL}/graphql`,
        method: 'post',
        data: {
            query: `
                    query fetchExperienceById {
                        publisheds (where: {isPublished: true, user:${id}}, limit: 12, start: 0, sort: "createdAt:desc")
                        {
                            id,
                            experience_id,
                            isPublished,
                            short_content,
                            type,
                            experience_price,
                            tags,
                            cats,
                            createdAt,
                            user {
                                username,
                                profile {
                                    first,
                                    last,
                                    displayname,
                                    avatar
                                }
                            }
                        }
                    }`
        }
    });

    return newRequest;
};

export const getExperienceById = (id) => {
    const newRequest = makeRequest({
        url: `${API_URL}/graphql`,
        method: 'post',
        data: {
            query: `
                    query fetchExperienceById {
                        publisheds (where: {isPublished: true, experience_id: "${id}"})
                        {
                            id,
                            experience_id,
                            isPublished,
                            short_content,
                            content,
                            content_marketing
                            budget_min
                            budget_max
                            type,
                            experience_price,
                            tags,
                            cats,
                            cats_list {
                                name
                            },
                            places_lists {
                                name
                                code
                            },
                            days
                            createdAt,
                            user {
                                username,
                                profile {
                                    first,
                                    last,
                                    avatar,
                                    displayname
                                }
                            },
                            skus {
                                id,
                                booking_date,
                                price,
                                capacity
                                inventory
                            }
                        }
                    }`
        }
    });

    return newRequest;
};

export const getArticleById = (id) => {
    const newRequest = makeRequest({
        url: `${API_URL}/graphql`,
        method: 'post',
        data: {
            query: `
                        query fetchHelpArticle {
                            marketplaceHelps (where: { help_id: "${id}"}) {
                            help_id
                            order_id
                            menu_name
                            page_name
                            content
                            marketplace_topic {
                                type
                                topic_id
                                menu_name
                            }
                            
                            }
                            
                            marketplaceTopics (where: { type: "help"}, , sort: "order_id") {
                            topic_id
                            menu_name
                            page_name
                            child_pages (sort: "order_id"){
                                help_id
                                order_id
                                menu_name
                                page_name
                            
                            }
                        }
                    }`
        }
    });

    return newRequest;
};

export const getLandingPage = () => {
    const newRequest = makeRequest({
        url: `${API_URL}/graphql`,
        method: 'post',
        data: {
            query: `
            query fetchLandingPage {
                landing: features(where: { isLive: true, isLanding: true }) {
                    id
                    title
                    headline
                    description
                    button
                    label
                    url
                    blackPill
                    blackPillTxt
                    username
                    image
                    dark_theme
                    user_id {
                        id
                        username
                        profile {
                            first
                            last
                            avatar
                            displayname,
                        }
                    }
                }
                features(where: { isLive: true, isLanding_ne: true }) {
                    id
                    title
                    headline
                    description
                    button
                    label
                    url
                    blackPill
                    blackPillTxt
                    username
                    image
                    dark_theme
                    user_id {
                        id
                        username
                        profile {
                            first
                            last
                            avatar
                            displayname,
                        }
                    }
                }
                curated: collections(where: { live: true }, sort: "order_index:asc") {
                    id
                    thumb
                    title
                    subheadline
                    order_index
                }
            }`
        }
    });

    return newRequest;
};

export const getLatestExperiences = (qty) => {
    const newRequest = makeRequest({
        url: `${API_URL}/graphql`,
        method: 'post',
        data: {
            query: `
                    query fetchLatestExperiences {
                        publisheds (where: {isPublished: true} limit: 12, start: 0, sort: "createdAt:desc")
                        {
                            id,
                            experience_id,
                            isPublished,
                            short_content,
                            type,
                            experience_price,
                            tags,
                            cats,
                            createdAt,
                            user {
                                username,
                                profile {
                                    first
                                    last
                                    avatar
                                    displayname,
                                }
                            }
                        }
                    }`
        }
    });

    return newRequest;
};

const getLatestExperiences2 = (qty) => {
    return makeRequest({
        url: `${API_URL}/graphql`,
        method: 'POST',
        params: {
            query: `
                    query fetchLatestExperiences {
                        experiences (limit: 12, start: 0, sort: "createAt:desc", where: {experience_status:  {status_in: ["initial"]}})
                        {
                            tags
                            id, 
                            createdAt,
                            experience_status {
                                id,
                                status,
                                inPublished
                            },
                        }
                    }`
        }
    });
};

// export { getExperiences, getExperienceById, getLatestExperiences };
