import { createClient } from 'contentful-management';

import { CONTENTFUL_PUBLIC_KEY, CONTENTFUL_SPACE_ID } from './const';

async function Connect() {
    try {
        let client = await createClient({
            accessToken: CONTENTFUL_PUBLIC_KEY
        });
        let space = await client.getSpace(CONTENTFUL_SPACE_ID);
        return await space.getEnvironment("master");
    } catch (error) {
        console.log(error);
    }
}

const contentFullConnect = async () => {
    return await Connect()
}

export default contentFullConnect;
// module.exports = {
//     // async create(data) {
//     //   let env = await Connect();
//     //   console.log(env);
//     //   console.log(data);
//     // },

//     async update(data, pubId) {
//         try {
//             let env = await Connect();
//             let entryTrial = await env.getEntries({
//                 content_type: "pageExperienceMarketing",
//                 "fields.publishedId": pubId,
//                 include: 5,
//             });

//             // if it exists
//             if (entryTrial.total > 0) {
//                 // get the single entry
//                 entryId = entryTrial.items[0].sys.id;
//                 let entry = await env.getEntry(entryId);

//                 entry.fields.default_lang["en-US"] = "en-US";
//                 entry.fields.type["en-US"] = data.type;
//                 entry.fields.title["en-US"] = data.title;
//                 entry.fields.featured_image["en-US"] = data.featured_image;
//                 entry.fields.days["en-US"] = data.days;
//                 entry.fields.budget_min["en-US"] = data.budget_min;
//                 entry.fields.budget_max["en-US"] = data.budget_max;
//                 entry.fields.budget_currency["en-US"] = data.budget_currency;
//                 entry.fields.content_marketing["en-US"] = data.content_marketing;

//                 await entry.update();
//                 entry = await env.getEntry(entryId);
//                 return await entry.publish();
//             }

//             // else create new entry
//             else {
//                 let createEntry = await env.createEntry("pageExperienceMarketing", {
//                     fields: {
//                         name: { "en-US": data.title },
//                         type: { "en-US": data.type },
//                         title: { "en-US": data.title },
//                         default_lang: { "en-US": "en-US" },
//                         featured_image: { "en-US": data.featured_image },
//                         days: { "en-US": data.days },
//                         budget_min: { "en-US": data.budget_min },
//                         budget_max: { "en-US": data.budget_max },
//                         budget_currency: { "en-US": data.budget_currency },
//                         status: { "en-US": "unpublished" },
//                         experienceId: { "en-US": data.experience_id },
//                         publishedId: { "en-US": data.id },
//                         //    commerceId: {"en-US": ""},
//                         content_marketing: { "en-US": data.content_marketing },
//                     },
//                 });
//                 return await createEntry.publish();
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     },
// };
