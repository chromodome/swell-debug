import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardXl from 'components/blocks/CardXl';
import translations from 'constants/translations';
import IncludesModal from 'components/modals/IncludesModal';
import GenericBtn from 'components/blocks/GenericBtn';
import { experienceDetailsAction } from 'store/actions/experienceDetails/generic.js';
import IncludesExcludesList from 'components/blocks/IncludesExcludesList';
import ConfirmModal from 'components/modals/ConfirmModal';
import TipList from 'components/blocks/TipList.js';
import GenericDescription from 'components/blocks/GenericDescription';
import GenericGallery from 'components/blocks/GenericGallery';
import uiStruct from 'constants/uiStruct';
import ExpSubsection from 'components/blocks/ExpSubsection';
import CollapseButton from 'components/blocks/CollapseButton';
import PanelMarketing from 'components/blocks/PanelMarketing';

function SectionWhatsIncluded({
    experienceDetailsAction,
    globalState: { lang, edit },
    marketingData: {
        whatsIncluded: { includes, excluded, desc, tips, gallery: images }
    },
    actionType
}) {
    const [isMinimized, setIsMinimized] = useState(false);
    const [includesModalStatus, setIncludesModalStatus] = useState(false);
    const [delConfirmModalState, setDelConfirmModalState] = useState(false);
    const [updateObj, setUpdateObject] = useState({
        create: false,
        update: false,
        includeType: '',
        index: 0,
        data: {
            title: '',
            desc: ''
        }
    });
    const rtl = !!translations[lang].rtl;

    const openModal = () => {
        setUpdateObject({
            ...updateObj,
            create: true,
            data: {
                title: '',
                desc: ''
            },
            includeType: 'includes'
        });
        setIncludesModalStatus(true);
    };

    const addUpdateInclude = (dataObj) => {
        const { title, desc, includeType } = dataObj;
        const { create, index } = updateObj;
        if (create) {
            experienceDetailsAction({
                type: `ADD${actionType}`,
                includeData: {
                    title,
                    desc
                },
                includeType
            });
        } else {
            experienceDetailsAction({
                type: `UPDATE${actionType}`,
                includeData: {
                    title,
                    desc
                },
                index,
                includeType,
                prevType: updateObj.includeType
            });
        }
    };
    const handleArrange = (source, destination, includeType) => {
        experienceDetailsAction({
            type: `ARRANGE${actionType}`,
            source,
            destination,
            includeType
        });
    };

    const handleDelete = (index, includeType) => {
        setUpdateObject({
            ...updateObj,
            index,
            includeType
        });
        setDelConfirmModalState(true);
    };

    const confirmDelete = () => {
        const { index, includeType } = updateObj;

        experienceDetailsAction({
            type: `DELETE${actionType}`,
            index,
            includeType
        });
    };

    const handleUpdate = (index, includeType) => {
        setUpdateObject({
            ...updateObj,
            index,
            create: false,
            update: true,
            includeType,
            data: includeType === 'includes' ? includes[index] : excluded[index]
        });
        setIncludesModalStatus(true);
    };

    return (
        <>
            <ExpSubsection>
                <div className='marketing-title'>What's Included</div>

                {(edit || desc) && (
                    <GenericDescription
                        actionType={actionType}
                        descriptionHtml={desc}
                    >
                        {desc ? (
                            <div
                                className={` leading-7 ${
                                    desc ? 'text-gray-800' : 'italic'
                                }text-sm md:text-base`}
                                dangerouslySetInnerHTML={{
                                    __html: desc
                                }}
                            />
                        ) : (
                            <div
                                className={` leading-7 text-gray-400 italic text-sm md:text-base`}
                            >
                                Tell us a bit about where we'll be staying. Add
                                images if you want.
                            </div>
                        )}
                    </GenericDescription>
                )}

                {edit && (
                    <div className='flex justify-center w-full pt-8'>
                        <CollapseButton
                            labelHover='Add Item'
                            handleClick={openModal}
                            icon='ri-play-list-add-line text-2xl -ml-0.5'
                            size='10'
                            textSize='text-xs'
                            sizeHover='w-32'
                            offsetCenter='2'
                            btnColor='bg-green-400 hover:bg-gray-900 text-green-900'
                        />
                    </div>
                )}

                <div>
                    {includes.length ? (
                        // <PanelMarketing
                        //     title='Included'
                        //     padding='pt-6 pb-2'
                        //     paddingX='md:px-8'
                        // >
                        <IncludesExcludesList
                            handleUpdateAction={handleUpdate}
                            handleDeleteAction={handleDelete}
                            includeType={'includes'}
                            handleArrangeAction={handleArrange}
                            edit={edit}
                            includeData={includes}
                        />
                    ) : // </PanelMarketing>
                    null}

                    {excluded.length ? (
                        // <PanelMarketing
                        //     title='Excluded'
                        //     padding='pt-6 pb-2'
                        //     paddingX='md:px-8'
                        // >
                        <IncludesExcludesList
                            handleUpdateAction={handleUpdate}
                            handleDeleteAction={handleDelete}
                            includeType={'excluded'}
                            handleArrangeAction={handleArrange}
                            edit={edit}
                            includeData={excluded}
                        />
                    ) : // </PanelMarketing>
                    null}
                </div>
                <div className='w-full mb-14 '>
                    <div className='relative '>
                        <GenericGallery
                            actionType={actionType}
                            images={images}
                            lang={lang}
                            edit={edit}
                            slider={false}
                            max={16}
                            className=''
                            modalTitle="Marketing - Where you'll go and What you'll do"
                            scroll={4}
                            showThumnails={true}
                        >
                            <div className='absolute left-1/2 transform -translate-x-1/2 top-0'>
                                <CollapseButton
                                    labelHover='Manage Gallery'
                                    handleClick={() => console.log('test')}
                                    icon='ri-image-add-line text-2xl -ml-0.5'
                                    size='10'
                                    textSize='text-xs'
                                    sizeHover='w-40'
                                    offsetCenter='2'
                                    btnColor='bg-green-400 hover:bg-gray-900 text-green-900'
                                />
                            </div>
                        </GenericGallery>
                    </div>
                </div>

                {/* <TipList
                    actionType={actionType}
                    tips={tips}
                    dayIndex={null}
                    index={null}
                    offset={20}
                /> */}
            </ExpSubsection>

            {includesModalStatus ? (
                <IncludesModal
                    updateObject={updateObj}
                    handleActionBtn={addUpdateInclude}
                    setModalIsOpen={setIncludesModalStatus}
                />
            ) : null}
            {delConfirmModalState && (
                <ConfirmModal
                    setModalIsOpen={setDelConfirmModalState}
                    handleActionBtn={confirmDelete}
                />
            )}
        </>
    );
}

const mapStateToProps = (state) => ({
    marketingData: state.experienceDetails.content_marketing,
    globalState: state.globalState
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            experienceDetailsAction
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SectionWhatsIncluded);
