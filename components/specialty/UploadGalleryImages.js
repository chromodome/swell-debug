import { Widget } from '@uploadcare/react-widget';
import { useReducer } from 'react';
import { useEffect } from 'react';

import classNames from 'classnames';

const UploadGalleryImages = ({
    handleUpdate,
    multiple = true,
    maxImages = 1,
    imageCount
}) => {
    const isOnline = true;
    const [key, rerender] = useReducer((v) => !v);
    const galleryStrToMultiple = (cdnRes) => {
        const gallArr = [];
        const { isImage, isStored, count, cdnUrl } = cdnRes;

        if (isImage && isStored && count > 0) {
            for (let i = 0; i < count; i++) {
                gallArr.push({
                    url: `${cdnUrl}nth/${i}/`,
                    caption: `` // caption here
                });
            }
        }

        return gallArr;
    };

    const uploadChange = (res) => {
        handleUpdate(
            multiple
                ? galleryStrToMultiple(res)
                : [
                      {
                          url: `${res.cdnUrl}`,
                          caption: `Caption here ${maxImages}`,
                          type: 'img'
                      }
                  ]
        );
        // Uploadcare updated and this code no longer needed
        // if in future there are problems un comment bellow as it may help
        // rerender();
    };

    useEffect(() => {
        rerender();
    }, [maxImages, imageCount]);

    const fileTypeLimit = (allowedFileTypes) => {
        const types = allowedFileTypes.split(' ');

        return function (fileInfo) {
            if (fileInfo.name === null) {
                return;
            }
            const extension = fileInfo.name.split('.').pop();

            if (extension && !types.includes(extension)) {
                throw new Error('fileType');
            }
        };
    };
    function maxDimensions(width, height) {
        return function (fileInfo) {
            var imageInfo = fileInfo.originalImageInfo;
            if (imageInfo !== null) {
                if (imageInfo.width > width || imageInfo.height > height) {
                    throw new Error('dimensions');
                }
            }
        };
    }
    function maxSize(fileSize) {
        return function (fileInfo) {
            if (fileInfo !== null) {
                if (fileInfo.size > fileSize) {
                    throw new Error('fileSize');
                }
            }
        };
    }
    const errors = {
        errors: {
            dimensions: 'Max Dimensions 1600 x 1600',
            fileType: 'allowed: jpg png webp',
            fileSize: 'Max filesize 2 MB'
        },
        dialog: {
            tabs: {
                preview: {
                    error: {
                        dimensions: {
                            title: 'Title.',
                            text: 'Text.',
                            back: 'Back'
                        },
                        fileType: {
                            title: 'Title.',
                            text: 'Text.',
                            back: 'Back'
                        },
                        fileSize: {
                            title: 'Title.',
                            text: 'Text.',
                            back: 'Back'
                        }
                    }
                }
            }
        }
    };

    const validators = [
        fileTypeLimit('jpg JPG Jpg Jpeg png PNG Png jpeg webp Webp'),
        maxDimensions(3200, 3200),
        maxSize(2 * 1024 * 1024)
    ];

    return isOnline ? (
        <Widget
            disabled
            key={key}
            validators={validators}
            onChange={uploadChange}
            publicKey={process.env.REACT_APP_UPLOAD_CARE_PUBLIC_KEY}
            multiple={multiple}
            imagesOnly={true}
            multipleMax={maxImages}
            tabs={'file camera instagram'}
            imageShrink="1600x1600"
            multipartMinSize={104857600}
            inputAcceptTypes=""
            localeTranslations={errors}
            locale
        />
    ) : (
        <button
            disabled
            className={classNames(
                'focus:outline-none mx-auto md:mx-0 outline-none font-medium text-base d-hdpi-2:text-vw-base rounded-md d-hdpi-2:rounded text-gray-400 bg-gray-200 flex items-center justify-center'
            )}
            style={{ width: 175, height: 37 }}>
            Choose images
        </button>
    );
};

export default UploadGalleryImages;
