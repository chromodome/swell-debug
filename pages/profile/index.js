import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { updateUserAdmin } from '@/helpers/apiServices/user';
import uiStruct from 'constants/uiStruct';
import translations from 'constants/translations';
import Editor from 'components/blocks/Editor';

import UploadGalleryImages from 'components/specialty/UploadGalleryImages';
import { Block__InputSingle } from 'components/blocks/Blocks';
import { testValidUrl, validateEmail } from 'helpers/FEutils';
import { regexPassword, regexUsername } from 'components/utility/regexPatterns';
import Image from 'components/blocks/Image';
import { ButtonsClose } from 'components/blocks/Buttons';
import { ModalButton} from 'components/blocks/ModalTre';
import LayoutLoading from 'components/layouts/LayoutLoading';
//import InfoModal from 'components/modals/InfoModal';
import GenericCheckBox from 'components/blocks/GenericCheckBox';
import CurrencyList from 'components/blocks/CurrencyList';
import CountryList from 'components/blocks/CountryList';
import Script from 'next/script'
import Layout from '@/layouts/Layout';



function ProfilePage(props) {
    const {
        inModal = true,
        // globalState: { lang },
        auth,
        auth: { user, loading:userLoading },
        actionBtnObj = "uiStruct.ui.modals.editor.buttons.action",
        cancelBtnObj = "uiStruct.ui.modals.editor.buttons.cancel",
        updateUserAdmin,
    } = props;
    const router = useRouter();

  //  const rtl = !!translations[lang].rtl;
    // const countryList = buildCountryData(lang);
    const [busyCreating, setBusyCreating] = useState(false);
    const userDataDefault = {
        username: '',
        email: '',
        password: ''
    };
    const profileDataDefault = {
        first: '',
        last: '',
        displayname: '',
        city: '',
        country: '',
        currency: '',
        avatar: '',
        settings: ''
    };
    const socialDataDefault = {
        instagram: '',
        facebook: '',
        twitter: '',
        tiktok: '',
        youtube: '',
        website: ''
    };
    const [userDataObj, updateUserDataObj] = useState({ ...userDataDefault });
    const [profileDataObj, updateProfileDataObj] = useState({
        ...profileDataDefault
    });
    const [socialDataObj, updateSocialDataObj] = useState({
        ...socialDataDefault
    });
    // const [selectedCountry, setSelectedCountry] = useState(countryList[0]);
    const [formLocked, setFormLocked] = useState(false);
    const [lockedInputs, setLockedInputs] = useState({
        username: true && inModal,
        password: true && inModal,
        email: true && inModal
    });
    const [isLoading, setIsLoading] = useState(true);

    // const resetForm = () => {
    //     updateUserDataObj({
    //         ...userDataDefault
    //     });
    //     updateProfileDataObj({
    //         ...profileDataDefault
    //     });

    //     updateSocialDataObj({
    //         ...socialDataDefault
    //     });
    // };

    const toggleLock = (type) => {
        setLockedInputs({
            ...lockedInputs,
            [type]: !lockedInputs[type]
        });
    };

    const [validationObj, setValidationObj] = useState({
        username: { error: false },
        email: { error: false },
        password: { error: false },
        first: { error: false },
        last: { error: false },
        instagram: { error: false },
        facebook: { error: false },
        twitter: { error: false },
        tiktok: { error: false },
        youtube: { error: false },
        website: { error: false }
    });

    const validateForm = () => {
        const { username, email, password } = userDataObj;
        const socialKeys = [
            'instagram',
            'facebook',
            'twitter',
            'tiktok',
            'youtube',
            'website'
        ];
        const { first, last } = profileDataObj;
        let error = false;
        const tmpErrorObj = {
            username: { error: false },
            email: { error: false },
            password: { error: false },
            first: { error: false },
            last: { error: false },
            instagram: { error: false },
            facebook: { error: false },
            twitter: { error: false },
            tiktok: { error: false },
            youtube: { error: false },
            website: { error: false }
        };
        if (!first.length) {
            tmpErrorObj.first.error = true;
            error = true;
        }
        if (!last.length) {
            tmpErrorObj.last.error = true;
            error = true;
        }

        if (!username.length || !username.match(regexUsername)) {
            tmpErrorObj.username.error = true;
            error = true;
        }
        if (!validateEmail(email)) {
            tmpErrorObj.email.error = true;
            error = true;
        }

        if (password.length && inModal) {
            if (!password.match(regexPassword)) {
                tmpErrorObj.password.error = true;
                error = true;
            }
        } else if (inModal) {
            tmpErrorObj.password.error = false;
        }

        if (!inModal) {
            if (!password.match(regexPassword)) {
                tmpErrorObj.password.error = true;
                error = true;
            }
        }

        socialKeys.forEach((key) => {
            if (socialDataObj[key].length) {
                if (!testValidUrl(socialDataObj[key])) {
                    tmpErrorObj[key].error = true;
                    error = true;
                }
            }
        });

        if (error) {
            setValidationObj({
                ...tmpErrorObj
            });
        }

        return error;
    };

    const updateErrorObj = (key) => {
        if (validationObj[key]) {
            setValidationObj({
                ...validationObj,
                [key]: { error: false }
            });
        }
    };

    const updateUserDataObjInputs = (e, name) => {
        const data =
            name === 'description'
                ? e
                : name === 'email' || name === 'password' || name === 'username'
                ? e.target.value.replace(/ /g, '')
                : e.target.value;
        updateUserDataObj({
            ...userDataObj,
            [name]: data
        });

        updateErrorObj(name);
    };

    const updateProfileDataObjInputs = (e, name) => {
        updateProfileDataObj({
            ...profileDataObj,
            [name]: name === 'description' ? e : e.target.value
        });

        updateErrorObj(name);
    };

    const handleCurrencyChange = (val) => {
        updateProfileDataObj({
            ...profileDataObj,
            currency: val
        });
    };

    const handleCountryChange = (val) => {
        updateProfileDataObj({
            ...profileDataObj,
            country: val
        });
    };

    const updateSocialDataObjInputs = (e, name) => {
        updateSocialDataObj({
            ...socialDataObj,
            [name]: name === 'description' ? e : e.target.value
        });

        updateErrorObj(name);
    };

    const updateDescriptionHtml = (html) => {
        if(!isLoading) {
            updateProfileDataObj({
                ...profileDataObj,
                bio: html
            });
        }
        
    };

    const handleAvatarUpdate = (imageData) => {
        const { url } = imageData[0];
        updateProfileDataObj({ ...profileDataObj, avatar: url || '' });
    };
    const handleDeleteAvatar = () => {
        updateProfileDataObj({ ...profileDataObj, avatar: '' });
    };
    const finishUpdateCreate = () => {
        setBusyCreating(false);
    };

    const regroupData = () => {
        const fullData = {
            ...userDataObj,
            profile: {
                ...profileDataObj,
                social: socialDataObj
                // country: selectedCountry.id
            }
        };

        if (!validateForm()) {
            const {
                id: userId,
                profile: { _id: profileId }
            } = user;


            setBusyCreating(true);

            updateUserAdmin(userId, profileId, fullData).then(() => {
                finishUpdateCreate();
            });
        }
    };

    const { username, email, password } = userDataObj;

    const { first, last, displayname, city, currency, country, bio, avatar } =  profileDataObj;

    const { instagram, facebook, tiktok, youtube, twitter, website } = socialDataObj;
console.log('avatar', avatar)
    useEffect(() => {

        if (inModal && user) {

            updateUserDataObj({
                username: user.username,
                email: user.email,
                password: ''
            });
            updateProfileDataObj({
               // ...user.profile,
                avatar: user.profile.avatar,
                first: user.profile.first,
                last: user.profile.last,
                city: user.profile.city || '',
                currency: user.profile.currency || 'EUR',
                country: user.profile.country || '000',
                displayname: user.profile.displayname || '',
                bio: user.profile.bio || ''
            });
            updateSocialDataObj({
                instagram: user.profile.social?.instagram || '',
                facebook: user.profile.social?.facebook || '',
                twitter: user.profile.social?.twitter || '',
                tiktok: user.profile.social?.tiktok || '',
                youtube: user.profile.social?.youtube || '',
                website: user.profile.social?.website || ''
            });

            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!auth.isAuthenticated && !auth.loading) {
            router.push('/');
        }
    }, [auth])


    return (
        <Layout>
            <Script>
                UPLOADCARE_PUBLIC_KEY = '8655037f335d8f4f0419';
            </Script>
            {!isLoading && user ? (
                <>
                    <div className='mb-10 px-4'>
                        <div className='flex flex-col md:flex-row gap-8 md:gap-16 '>
                            <div className='md:w-1/2 '>
                                <div className='mb-16'>
                                    <div className='mb-4 ml2-40 flex items-center gap-2 text-green-500'>
                                        <i className='ri-account-circle-line text-2xl'></i>
                                        <span>Account</span>
                                    </div>
                                    <div className='flex flex-col gap-6 mb-4'>
                                        <Block__InputSingle
                                            responsive={true}
                                            whiteBg={true}
                                            isDisabled={true}
                                            normal
                                            error={validationObj.username.error}
                                            handleChange={(e) =>
                                                updateUserDataObjInputs(
                                                    e,
                                                    'username'
                                                )
                                            }
                                            id='username'
                                            margins=''
                                            value={username}
                                            placeholder={'username'}
                                            // rtl={rtl}
                                            height='h-10'
                                            fontSize='text-sm'
                                            label='Username'
                                            labelPos='top'
                                            labelJustify='text-right mr-2'
                                            labelMargin=''
                                        />

                                        <Block__InputSingle
                                            responsive={true}
                                            whiteBg={true}
                                            locked={{
                                                visible: inModal,
                                                isDisabled: lockedInputs.email,
                                                param: ['email'],
                                                handleClick: toggleLock
                                            }}
                                            normal
                                            error={validationObj.email.error}
                                            handleChange={(e) =>
                                                updateUserDataObjInputs(
                                                    e,
                                                    'email'
                                                )
                                            }
                                            id='email'
                                            margins=''
                                            value={email}
                                            placeholder={'email'}
                                            // rtl={rtl}
                                            height='h-10'
                                            fontSize='text-sm'
                                            label='Email'
                                            labelPos='top'
                                            labelJustify='text-right mr-2'
                                            labelMargin=''
                                        />
                                        <Block__InputSingle
                                            responsive={true}
                                            whiteBg={true}
                                            type={'password'}
                                            locked={{
                                                visible: inModal,
                                                isDisabled:
                                                    lockedInputs.password,
                                                param: ['password'],
                                                handleClick: toggleLock
                                            }}
                                            normal
                                            error={validationObj.password.error}
                                            handleChange={(e) =>
                                                updateUserDataObjInputs(
                                                    e,
                                                    'password'
                                                )
                                            }
                                            id='password'
                                            margins=''
                                            value={password}
                                            placeholder={'Type new password'}
                                            // rtl={rtl}
                                            height='h-10'
                                            fontSize='text-sm'
                                            label='Password'
                                            labelPos='left'
                                            labelJustify='text-right mr-2'
                                            labelMargin=''
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='md:w-1/2 '></div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-8 md:gap-16 '>
                            <div className='md:w-1/2 '>
                                <div className='mb-16'>
                                    <div className='mb-4 ml2-40 flex items-center gap-2 text-green-500'>
                                        <i className='ri-profile-line text-2xl'></i>
                                        <span>Profile</span>
                                    </div>
                                    <div className='flex flex-col gap-6 mb-4 '>
                                        <Block__InputSingle
                                            responsive={true}
                                            whiteBg={true}
                                            normal
                                            error={validationObj.first.error}
                                            handleChange={(e) =>
                                                updateProfileDataObjInputs(
                                                    e,
                                                    'first'
                                                )
                                            }
                                            id='first'
                                            margins=''
                                            value={first}
                                            placeholder={'first'}
                                            // rtl={rtl}
                                            height='h-10'
                                            fontSize='text-sm'
                                            label='First Name'
                                            labelPos='left'
                                            labelJustify='text-right mr-2'
                                            labelMargin=''
                                            labelWidth='w-32'
                                        />
                                        <Block__InputSingle
                                            responsive={true}
                                            whiteBg={true}
                                            normal
                                            error={validationObj.last.error}
                                            handleChange={(e) =>
                                                updateProfileDataObjInputs(
                                                    e,
                                                    'last'
                                                )
                                            }
                                            id='last'
                                            margins=''
                                            value={last}
                                            placeholder={'last'}
                                            // rtl={rtl}
                                            height='h-10'
                                            fontSize='text-sm'
                                            label='Last Name'
                                            labelPos='left'
                                            labelJustify='text-right mr-2'
                                            labelMargin=''
                                            labelWidth='w-32'
                                        />
                                        <Block__InputSingle
                                            responsive={true}
                                            whiteBg={true}
                                            normal
                                            error={false}
                                            handleChange={(e) =>
                                                updateProfileDataObjInputs(
                                                    e,
                                                    'displayname'
                                                )
                                            }
                                            id='displayname'
                                            margins=''
                                            value={displayname}
                                            placeholder={'Travel with Kony'}
                                            // rtl={rtl}
                                            height='h-10'
                                            fontSize='text-sm'
                                            label='Display Name'
                                            labelPos='left'
                                            labelJustify='text-right mr-2'
                                            labelMargin=''
                                        />

                                        <CountryList
                                            handleChange={handleCountryChange}
                                            selectedValue={country}
                                            height='2.5rem'
                                            width='w-full'
                                            bgColor='white'
                                            panelHeight='150px'
                                            label='Country of Residence'
                                            labelTextSize='0.875rem'
                                            menuTextSize='0.75rem'
                                            isLoading={isLoading}
                                        />
                                        <Block__InputSingle
                                            responsive={true}
                                            whiteBg={true}
                                            normal
                                            error={false}
                                            handleChange={(e) =>
                                                updateProfileDataObjInputs(
                                                    e,
                                                    'city'
                                                )
                                            }
                                            id='city'
                                            margins=''
                                            value={city}
                                            placeholder={''}
                                            // rtl={rtl}
                                            height='h-10'
                                            fontSize='text-sm'
                                            label='City'
                                            labelPos='left'
                                            labelJustify='text-right mr-2'
                                            labelMargin=''
                                            labelWidth='w-32'
                                        />

                                        <CurrencyList
                                            handleChange={handleCurrencyChange}
                                            selectedValue={currency}
                                            height='2.5rem'
                                            width='w-full'
                                            bgColor='white'
                                            panelHeight='150px'
                                            label='Preferred Currency'
                                            labelTextSize='0.875rem'
                                            menuTextSize='0.75rem'
                                            isLoading={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='md:w-1/2 '>
                                <div className='mb-16'>
                                    <div className='mb-4 ml2-40 flex items-center gap-2 text-green-500'>
                                        <i className='ri-links-line text-2xl'></i>
                                        <span>Social Media Links</span>
                                    </div>
                                    <div className='flex flex-col gap-6 mb-4 '>
                                        <Block__InputSingle
                                            responsive={true}
                                            whiteBg={true}
                                            normal
                                            error={
                                                validationObj.instagram.error
                                            }
                                            handleChange={(e) =>
                                                updateSocialDataObjInputs(
                                                    e,
                                                    'instagram'
                                                )
                                            }
                                            id='instagram'
                                            margins=''
                                            value={instagram}
                                            placeholder={'https://'}
                                            // rtl={rtl}
                                            height='h-10'
                                            fontSize='text-sm'
                                            label='Instagram'
                                            labelPos='left'
                                            labelJustify='text-right mr-2'
                                            labelMargin=''
                                            labelWidth='w-32'
                                        />
                                        <Block__InputSingle
                                            responsive={true}
                                            whiteBg={true}
                                            normal
                                            error={validationObj.facebook.error}
                                            handleChange={(e) =>
                                                updateSocialDataObjInputs(
                                                    e,
                                                    'facebook'
                                                )
                                            }
                                            id='facebook'
                                            margins=''
                                            value={facebook}
                                            placeholder={'https://'}
                                            // rtl={rtl}
                                            height='h-10'
                                            fontSize='text-sm'
                                            label='Facebook'
                                            labelPos='left'
                                            labelJustify='text-right mr-2'
                                            labelMargin=''
                                            labelWidth='w-32'
                                        />
                                        <Block__InputSingle
                                            responsive={true}
                                            whiteBg={true}
                                            normal
                                            error={validationObj.tiktok.error}
                                            handleChange={(e) =>
                                                updateSocialDataObjInputs(
                                                    e,
                                                    'tiktok'
                                                )
                                            }
                                            id='tiktok'
                                            margins=''
                                            value={tiktok}
                                            placeholder={'https://'}
                                            // rtl={rtl}
                                            height='h-10'
                                            fontSize='text-sm'
                                            label='Tik Tok'
                                            labelPos='left'
                                            labelJustify='text-right mr-2'
                                            labelMargin=''
                                            labelWidth='w-32'
                                        />
                                        <Block__InputSingle
                                            responsive={true}
                                            whiteBg={true}
                                            normal
                                            error={validationObj.youtube.error}
                                            handleChange={(e) =>
                                                updateSocialDataObjInputs(
                                                    e,
                                                    'youtube'
                                                )
                                            }
                                            id='youtube'
                                            margins=''
                                            value={youtube}
                                            placeholder={'https://'}
                                            // rtl={rtl}
                                            height='h-10'
                                            fontSize='text-sm'
                                            label='Youtube'
                                            labelPos='left'
                                            labelJustify='text-right mr-2'
                                            labelMargin=''
                                            labelWidth='w-32'
                                        />

                                        <Block__InputSingle
                                            responsive={true}
                                            whiteBg={true}
                                            normal
                                            error={validationObj.twitter.error}
                                            handleChange={(e) =>
                                                updateSocialDataObjInputs(
                                                    e,
                                                    'twitter'
                                                )
                                            }
                                            id='twitter'
                                            margins=''
                                            value={twitter}
                                            placeholder={'https://'}
                                            // rtl={rtl}
                                            height='h-10'
                                            fontSize='text-sm'
                                            label='Twitter'
                                            labelPos='left'
                                            labelJustify='text-right mr-2'
                                            labelMargin=''
                                            labelWidth='w-32'
                                        />
                                        <Block__InputSingle
                                            responsive={true}
                                            whiteBg={true}
                                            normal
                                            error={validationObj.website.error}
                                            handleChange={(e) =>
                                                updateSocialDataObjInputs(
                                                    e,
                                                    'website'
                                                )
                                            }
                                            id='website'
                                            margins=''
                                            value={website}
                                            placeholder={'https://'}
                                            // rtl={rtl}
                                            height='h-10'
                                            fontSize='text-sm'
                                            label='Website'
                                            labelPos='left'
                                            labelJustify='text-right mr-2'
                                            labelMargin=''
                                            labelWidth='w-32'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-8'>
                            <div className='mb-4 ml2-40 flex items-center gap-2 text-green-500'>
                                <i className='ri-article-line text-2xl'></i>
                                <span>Kreator Bio</span>
                            </div>
                            <div className='flex flex-col md:flex-row gap-16 md:gap-8'>
                                <div className='relative pt-4 '>
                                    <div className='text-xs mb-2 px-2 text-gray-600'>
                                        Avatar
                                    </div>
                                    <div className=' flex flex-col gap-4 '>
                                        {avatar ? (
                                            <>
                                                <Image
                                                    size='360'
                                                    src={avatar}
                                                    className='h-32 w-32 lg:h-48 lg:w-48 object-cover object-center overflow-hidden rounded-full shadow-images mx-auto'
                                                    fixEdge={true}
                                                    groupScope={true}
                                                >
                                                    {true && (
                                                        <ButtonsClose
                                                            rtl={false}
                                                            type='imageRound'
                                                            handleClose={
                                                                handleDeleteAvatar
                                                            }
                                                        />
                                                    )}
                                                </Image>
                                            </>
                                        ) : (
                                            <>
                                                <div className='h-32 w-32 lg:h-48 lg:w-48 border-2 border-gray-200 rounded-full relative'>
                                                    <div className='text-xs whitespace-nowrap tracking-widest uppercase absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
                                                        {/* <Icons iName='ADDIMAGE' /> */}
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className='text-sm w-full h-full flex tracking-widest uppercase justify-center items-center '>
                                            <UploadGalleryImages
                                                multiple={false}
                                                maxImages={1}
                                                handleUpdate={
                                                    handleAvatarUpdate
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-4 flex-1'>
                                    <div className='text-xs mb-2 px-2 text-gray-600'>
                                        Bio
                                    </div>
                                    <div
                                        id='profileEdit'
                                        className='rounded-xl bg-white hover:bg-white pt-2 focus-within:bg-white focus-within:ring-green-200 focus-within:border-green-400 hover:ring-green-200 border-transparent ring-4 ring-transparent border'
                                    >
                                        <Editor
                                            valError={false}
                                            editorBg='bg-white'
                                            scrollbarClass='scrollbar-thumb-kn-primary-500 scrollbar-track-kn-primary-100'
                                            handleChange={updateDescriptionHtml}
                                            html={bio}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-32'>
                        <div>
                            <div>
                                {inModal && (
                                    <div className='flex items-center mr-8 mb-8 md:mb-0'>
                                        <GenericCheckBox
                                            name='terms'
                                            isChecked={formLocked}
                                            setIsChecked={setFormLocked}
                                            bgColor='bg-white'
                                        />
                                        <div className='text-sm '>
                                            Confirm Changes to save
                                        </div>
                                    </div>
                                )}
                                <ModalButton
                                    isDisabled={!formLocked && inModal}
                                    handleClick={regroupData}
                                    // label={
                                    //     translations[lang][actionBtnObj.label]
                                    // }
                                    label="save"
                                    color={actionBtnObj.color}
                                    icon={actionBtnObj.icon}
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className={``}>
                    <LayoutLoading
                        height='h-screen-1/2'
                        message='Loading User data'
                    />
                </div>
            )}
        </Layout>)

}

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    auth: state.auth
});
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            updateUserAdmin
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);