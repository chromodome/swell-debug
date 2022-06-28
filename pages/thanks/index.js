import Row from '@/components/blocks/Row';
import SectionTitle from '@/components/blocks/SectionTitle';
import classNames from 'classnames';

const LandingPage = () => {
    return (
        <>
            <div
                className={classNames(
                    'mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40'
                )}>
                <div className="px-4 mt-12 md:mt-20">
                    <SectionTitle
                        section={{
                            title: 'Order Summary'
                        }}
                        padding=""
                        size="text-4xl md:text-4xl"
                        className=""
                    />
                    <div className="text-xl font-bold mb-1">
                        Success! Thank you for your purchase.
                    </div>

                    <div className="mb-12">
                        Kindly find your order summary below.
                    </div>
                </div>
            </div>
            <Row>
                <div
                    className={classNames(
                        'bg-gray-50 rounded-lg  flex w-full h-96 items-center justify-center mt-12'
                    )}>
                    <div className="flex flex-col items-center px-4">
                        <div className="text-center mt-4">
                            You will receive an email with your order
                            details in the next couple of mins.
                        </div>
                    </div>
                </div>
            </Row>
        </>
    );
};


export default LandingPage;
