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
import { ModalButton } from 'components/blocks/ModalTre';
import LayoutLoading from 'components/layouts/LayoutLoading';
//import InfoModal from 'components/modals/InfoModal';
import GenericCheckBox from 'components/blocks/GenericCheckBox';
import CurrencyList from 'components/blocks/CurrencyList';
import CountryList from 'components/blocks/CountryList';
import Script from 'next/script';
import Layout from '@/layouts/Layout';
import Row from '@/components/sections/Row';
import SectionTitle from '@/components/blocks/Title/SectionTitle';
// import ButtonLoad from '@/components/blocks/ButtonLoad';
import ButtonLoad from '@/blocks/Button/ButtonLoad';

function ProfilePage(props) {
    const {
        globalState: { lang },
        inModal = true,
        // globalState: { lang },
        auth,
        auth: { user, loading: userLoading },
        actionBtnObj = 'uiStruct.ui.modals.editor.buttons.action',
        cancelBtnObj = 'uiStruct.ui.modals.editor.buttons.cancel',
        updateUserAdmin
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
        if (!isLoading) {
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

    const { first, last, displayname, city, currency, country, bio, avatar } =
        profileDataObj;

    const { instagram, facebook, tiktok, youtube, twitter, website } =
        socialDataObj;
    console.log('avatar', avatar);
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
    }, [auth]);

    return (
        <Layout>
            <Script>UPLOADCARE_PUBLIC_KEY = '8655037f335d8f4f0419';</Script>
            {!isLoading && user ? (
                <div className="w-full mt-16 d-hdpi-2:mt-vw-16 d-hdpi-2:text-vw-base mb-16 d-hdpi-2:mb-vw-16">
                    <div
                        className={`relative 
                        px-4 md-px-0 max-w-2xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto d-hdpi-2:max-w-screen-2/3 `}>
                        <div className="mt-12 mb-0 px-4 d-hdpi-2:mt-vw-12 d-hdpi-2:px-vw-4">
                            <div className={`mb-12 d-hdpi-2:mb-vw-12`}>
                                <SectionTitle
                                    section={{
                                        title: 'My Profile'
                                    }}
                                    padding=""
                                    size="text-4xl md:text-5xl d-hdpi-2:text-vw-4xl"
                                    className=""
                                />
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 md:gap-16 d-hdpi-2:gap-8">
                                <div className="w-full">
                                    <div className="mb-16 d-hdpi-2:mb-vw-16">
                                        <div className="mb-4 ml2-40 flex items-center gap-2 text-green-500 d-hdpi-2:mb-vw-4">
                                            <i className="ri-account-circle-line text-2xl d-hdpi-2:text-vw-2xl"></i>
                                            <span>Account</span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 d-hdpi-2:gap-4">
                                            <div className="flex flex-col gap-6 mb-4 d-hdpi-2:gap-3 d-hdpi-2:mb-vw-4">
                                                <div className="relative pt-4 d-hdpi-2:pt-vw-4">
                                                    <div className="text-xs mb-2 px-2 text-gray-600 d-hdpi-2:text-vw-xs d-hdpi-2:mb-vw-2 d-hdpi-2:px-vw-2">
                                                        Avatar
                                                    </div>
                                                    <div className=" flex flex-col items-start gap-4 w-full md:w-max d-hdpi-2:gap-2">
                                                        {avatar ? (
                                                            <>
                                                                <Image
                                                                    size="360"
                                                                    src={avatar}
                                                                    className="h-32 w-32 lg:h-48 lg:w-48 object-cover object-center overflow-hidden rounded-full shadow-images mx-auto d-hdpi-2:h-vw-48 d-hdpi-2:w-vw-48"
                                                                    fixEdge={
                                                                        true
                                                                    }
                                                                    groupScope={
                                                                        true
                                                                    }>
                                                                    {true && (
                                                                        <ButtonsClose
                                                                            rtl={
                                                                                false
                                                                            }
                                                                            type="imageRound"
                                                                            handleClose={
                                                                                handleDeleteAvatar
                                                                            }
                                                                        />
                                                                    )}
                                                                </Image>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="h-32 w-32 lg:h-48 lg:w-48 d-hdpi-2:w-vw-48 d-hdpi-2:h-vw-48 border-2 d-hdpi-2:border border-gray-200 rounded-full relative">
                                                                    <div className="text-xs d-hdpi-2:text-vw-xs whitespace-nowrap tracking-widest uppercase absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                                                                        {/* <Icons iName='ADDIMAGE' /> */}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}

                                                        <div className="text-sm d-hdpi-2:text-vw-sm w-full h-full flex tracking-widest uppercase justify-center items-center ">
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
                                            </div>
                                            <div className="flex flex-col gap-6 mb-4 d-hdpi-2:gap-3 d-hdpi-2:mb-vw-4">
                                                <Block__InputSingle
                                                    responsive={true}
                                                    whiteBg={true}
                                                    isDisabled={true}
                                                    normal
                                                    error={
                                                        validationObj.username
                                                            .error
                                                    }
                                                    handleChange={(e) =>
                                                        updateUserDataObjInputs(
                                                            e,
                                                            'username'
                                                        )
                                                    }
                                                    id="username"
                                                    margins=""
                                                    value={username}
                                                    placeholder={'username'}
                                                    // rtl={rtl}
                                                    height="h-10 d-hdpi-2:h-vw-10"
                                                    fontSize="text-sm d-hdpi-2:text-vw-sm"
                                                    label="Username"
                                                    labelPos="top"
                                                    labelJustify="text-right mr-2 d-hdpi-2:mr-vw-2"
                                                    labelMargin=""
                                                />

                                                <Block__InputSingle
                                                    responsive={true}
                                                    whiteBg={true}
                                                    locked={{
                                                        visible: inModal,
                                                        isDisabled:
                                                            lockedInputs.email,
                                                        param: ['email'],
                                                        handleClick: toggleLock
                                                    }}
                                                    normal
                                                    error={
                                                        validationObj.email
                                                            .error
                                                    }
                                                    handleChange={(e) =>
                                                        updateUserDataObjInputs(
                                                            e,
                                                            'email'
                                                        )
                                                    }
                                                    id="email"
                                                    margins=""
                                                    value={email}
                                                    placeholder={'email'}
                                                    // rtl={rtl}
                                                    height="h-10 d-hdpi-2:h-vw-10 "
                                                    fontSize="text-sm d-hdpi-2:text-vw-sm"
                                                    label="Email"
                                                    labelPos="top"
                                                    labelJustify="text-right mr-2 d-hdpi-2:mr-vw-2"
                                                    labelMargin=""
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
                                                    error={
                                                        validationObj.password
                                                            .error
                                                    }
                                                    handleChange={(e) =>
                                                        updateUserDataObjInputs(
                                                            e,
                                                            'password'
                                                        )
                                                    }
                                                    id="password"
                                                    margins=""
                                                    value={password}
                                                    placeholder={
                                                        'Type new password'
                                                    }
                                                    // rtl={rtl}
                                                    height="h-10 d-hdpi-2:h-vw-10"
                                                    fontSize="text-sm d-hdpi-2:text-vw-sm"
                                                    label="Password"
                                                    labelPos="left"
                                                    labelJustify="text-right mr-2 d-hdpi-2:text-mr-2"
                                                    labelMargin=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 md:gap-16 d-hdpi-2:gap-8">
                                <div className="w-full">
                                    <div className="mb-16 d-hdpi-2:mb-vw-16">
                                        <div className="mb-4 ml2-40 flex items-center gap-2 text-green-500 d-hdpi-2:mb-vw-4 d-hdpi-2:gap-1">
                                            <i className="ri-profile-line text-2xl d-hdpi-2:text-vw-2xl"></i>
                                            <span>Profile</span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 d-hdpi-2:gap-4">
                                            <div className="flex flex-col gap-6 mb-4 d-hdpi-2:gap-3 d-hdpi-2:mb-vw-4">
                                                <Block__InputSingle
                                                    responsive={true}
                                                    whiteBg={true}
                                                    normal
                                                    error={
                                                        validationObj.first
                                                            .error
                                                    }
                                                    handleChange={(e) =>
                                                        updateProfileDataObjInputs(
                                                            e,
                                                            'first'
                                                        )
                                                    }
                                                    id="first"
                                                    margins=""
                                                    value={first}
                                                    placeholder={'first'}
                                                    // rtl={rtl}
                                                    height="h-10 d-hdpi-2:h-vw-10"
                                                    fontSize="text-sm d-hdpi-2:text-vw-sm"
                                                    label="First Name"
                                                    labelPos="left"
                                                    labelJustify="text-right mr-2 d-hdpi-2:mr-vw-2"
                                                    labelMargin=""
                                                    labelWidth="w-32 d-hdpi-2:w-vw-32"
                                                />
                                                <Block__InputSingle
                                                    responsive={true}
                                                    whiteBg={true}
                                                    normal
                                                    error={
                                                        validationObj.last.error
                                                    }
                                                    handleChange={(e) =>
                                                        updateProfileDataObjInputs(
                                                            e,
                                                            'last'
                                                        )
                                                    }
                                                    id="last"
                                                    margins=""
                                                    value={last}
                                                    placeholder={'last'}
                                                    // rtl={rtl}
                                                    height="h-10 d-hdpi-2:h-vw-10"
                                                    fontSize="text-sm d-hdpi-2:text-vw-sm"
                                                    label="Last Name"
                                                    labelPos="left"
                                                    labelJustify="text-right mr-2 d-hdpi-2:mr-vw-2"
                                                    labelMargin=""
                                                    labelWidth="w-32 d-hdpi-2:w-vw-32"
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
                                                    id="displayname"
                                                    margins=""
                                                    value={displayname}
                                                    placeholder={
                                                        'Travel with Kony'
                                                    }
                                                    // rtl={rtl}
                                                    height="h-10 d-hdpi-2:h-vw-10"
                                                    fontSize="text-sm d-hdpi-2:text-vw-sm"
                                                    label="Display Name"
                                                    labelPos="left"
                                                    labelJustify="text-right mr-2 d-hdpi-2:mr-vw-2"
                                                    labelMargin=""
                                                />
                                            </div>
                                            <div className="flex flex-col gap-6 mb-4 ">
                                                <CountryList
                                                    handleChange={
                                                        handleCountryChange
                                                    }
                                                    selectedValue={country}
                                                    height="2.5rem"
                                                    width="w-full"
                                                    bgColor="white"
                                                    panelHeight="150px"
                                                    label="Country of Residence"
                                                    labelTextSize="0.875rem"
                                                    menuTextSize="0.75rem"
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
                                                    id="city"
                                                    margins=""
                                                    value={city}
                                                    placeholder={''}
                                                    // rtl={rtl}
                                                    height="h-10 d-hdpi-2:h-vw-10"
                                                    fontSize="text-sm d-hdpi-2:text-vw-sm"
                                                    label="City"
                                                    labelPos="left"
                                                    labelJustify="text-right mr-2 d-hdpi-2:mr-vw-2"
                                                    labelMargin=""
                                                    labelWidth="w-32 d-hdpi-2:w-vw-32"
                                                />

                                                <CurrencyList
                                                    handleChange={
                                                        handleCurrencyChange
                                                    }
                                                    selectedValue={currency}
                                                    height="2.5rem"
                                                    width="w-full"
                                                    bgColor="white"
                                                    panelHeight="150px"
                                                    label="Preferred Currency"
                                                    labelTextSize="0.875rem"
                                                    menuTextSize="0.75rem"
                                                    isLoading={isLoading}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div>
                                <div className="w-full flex items-center justify-end gap-8 d-hdpi-2:gap-4">
                                    <div className="flex items-center">
                                        <GenericCheckBox
                                            name="terms"
                                            isChecked={formLocked}
                                            setIsChecked={setFormLocked}
                                            bgColor="bg-white"
                                        />
                                        <div className="text-sm d-hdpi-2:text-vw-sm">
                                            Confirm Changes to save
                                        </div>
                                    </div>

                                    <ButtonLoad
                                        disabled={!formLocked}
                                        handleClick={regroupData}
                                        isLoading={busyCreating}
                                        label={'Save changes'}
                                        margins=""
                                        animate={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={``}>
                    <LayoutLoading
                        height="h-screen-1/2"
                        message="Loading User data"
                    />
                </div>
            )}
        </Layout>
    );
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
