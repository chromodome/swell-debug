import { makeRequest } from './makeRequest';
import { API_URL } from '../../config';

const getExperiences = () => {
    return makeRequest({
        url: `${API_URL}/experiences`,
        method: 'GET'
    });
};

const getExperienceById = (id) => {
    return makeRequest({
        url: `${API_URL}/experiences`,
        method: 'GET',
        params: {
            id
        }
    });
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
                        avatar
                      }
                    }
                  }
                
                
                exp_latest: publisheds(
                  where: { isPublished: true }
                  limit: 12
                  start: 0
                  sort: "createdAt:desc"
                ) {
                  short_content
                  type
                  experience_price
                  tags
                  cats
                  id
                  createdAt
                  isPublished
                  user {
                    username
                    profile {
                      first
                      last
                    }
                  }
                }
                interests: categories(where: { visible: true }, sort: "order_index:asc") {
                  id
                  name
                  image
                  description
                  order_index
                }
                destinations: destinations(where: { visible: true }, sort: "order_index:asc") {
                  id
                  name
                  image
                  description
                  country_list
                  order_index
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
                      avatar
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
                exp_trending: publisheds(
                  where: { isPublished: true }
                  limit: 15
                  start: 0
                  sort: "createdAt:desc"
                ) {
                  short_content
                  type
                  experience_price
                  tags
                  cats
                  id
                  createdAt
                  isPublished
                  user {
                    username
                    profile {
                      first
                      last
                    }
                  }
                }
              }`
        }
    });

    return newRequest;
};

const getLatestExperiences = (qty) => {
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
                                    first,
                                    last
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

export { getExperiences, getExperienceById, getLatestExperiences };
