export const formatPrice = (value, currency, locale = 'en-US', options) => {
    let rounding;
    if (!options) rounding = currenciesObject[currency].budget_rounding;
    else {
        if (options.rounding) rounding = options.rounding;
        else rounding = 1;
    }

    const formatter = new Intl.NumberFormat(locale, {
        currency: currency === '000' || currency == null ? 'USD' : currency
    });
    return formatter.format(Math.round(value / rounding) * rounding);
};

export const pluralize = (nb, str) => {
    return nb > 1 ? 'nb ' + str + 's' : 'nb ' + str;
};

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const kreatorName = (profile) => {
    return profile?.displayname || profile?.first;
};

export const parseCart = (cart) => {
    const { digital, sub_total, grand_total, discount_total } = cart;
    const type = 'DIGITAL';
    const product = {
        type,
        title: '',
        description: '',
        featured_image: '',
        destinations: [],
        days: 0,
        username: '',
        first: '',
        price: 0,
        people: 0,
        travel_date: '',
        publish_id: '',
        experience_id: ''
    };

    if (type === 'DIGITAL') {
        const {
            price = 0,
            people = 0,
            product: {
                name: title = '',
                description = '',
                content: {
                    featured_image = '',
                    destinations = [],
                    days = 0,
                    username = '',
                    first = '',
                    publish_id,
                    experience_id
                }
            }
        } = digital[Object.keys(digital)[0]];

        product['featured_image'] = featured_image;
        product['destinations'] = destinations;
        product['days'] = days;
        product['title'] = title;
        product['username'] = username;
        product['first'] = first;
        product['description'] = description;
        product['price'] = price;
        product['publish_id'] = publish_id;
        product['experience_id'] = experience_id;
        product['people'] = people;
        product['sub_total'] = sub_total;
        product['grand_total'] = grand_total;
        product['discount_total'] = discount_total;
    }

    return product;
};
export const reduxMimic = (payload) => {
    let draft = null;
    const cart = {
        digital: {
    
        }
    }
    if(payload) {
        const {  sub_total, grand_total, discount_total } = payload;

        payload.items.forEach((item) => {
            const type = item.product.content.type.toLowerCase();
            const {
                id,
                variant_id,
                product: {
                    content: { experience_id }
                }
            } = item;
            if(type === 'digital') {
                cart[type][experience_id] = item;
            } else {
                if(!cart[type][experience_id]) {
                    cart[type][experience_id] = {}
                }
                cart[type][experience_id][variant_id] = item;
            }
            
        });
        draft = {
                ...cart,
                loading: false,
                error: false,
                sub_total,
                grand_total,
                discount_total
            }

            return draft;
    }

    return draft;
};