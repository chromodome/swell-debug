import classNames from 'classnames';

const Thanks = () => {
    return (
        <>
            <div
                className={classNames(
                    'mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40'
                )}>
                <div className="px-4 mt-12 md:mt-20">
                    <div className={``}>
                        <div className="inline-block text-green-400 font-bold text-3xl tracking-tight leading-none pb-8 d-hdpi-2:text-vw-3xl d-hdpi-2:pb-vw-8">
                            Order Summary
                        </div>
                    </div>

                    <div className="text-xl font-bold mb-1">
                        Success! Thank you for your purchase.
                    </div>

                    <div className="mb-12">
                        Kindly find your order summary below.
                    </div>
                </div>
            </div>
            <div className="mx-auto px-44">
                <div
                    className={classNames(
                        'bg-gray-50 rounded-lg  flex w-full h-96 items-center justify-center mt-12'
                    )}>
                    <div className="flex flex-col items-center px-4">
                        <div className="text-center mt-4">
                            You will receive an email with your order details in
                            the next couple of mins.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Thanks;
