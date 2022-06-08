import ButtonPath from '@/blocks/Button/ButtonPath';
import classNames from 'classnames';
import SectionTitle from '../blocks/Title/SectionTitle';
import Row from './Row';

const Community = () => {
    return (
        <div className="w-full py-16 lg:py-0 bg-gray-100 ">
            <Row>
                <div
                    className={`relative 
                                 bg-contain bg-no-repeat bg-center py-0 xl:py-16 `}>
                    <div className="flex flex-col-reverse lg:flex-row justify-between items-center mb-8 md:gap-16 ">
                        <div className="lg:w-1/2 flex flex-col px-8 md:px-0">
                            <SectionTitle
                                section={{
                                    title: 'A Community'
                                }}
                                padding=""
                                size="text-4xl md:text-5xl"
                                className=""
                            />
                            <div className="text-2xl md:text-4xl xl:text-5xl tracking-tight text-gray-900 font-semibold leading-tight mb-8">
                                Join our community of growing kreators
                            </div>
                            <div className="text-green-900 text-base md:text-lg xl:text-xl font-normal mb-8">
                                Join{' '}
                                <a
                                    className="text-green-400 font-bold"
                                    href="https://www.instagram.com/mariaronnn/">
                                    Maria
                                </a>
                                ,{' '}
                                <a
                                    className="text-green-400 font-bold"
                                    href="https://www.instagram.com/arabiantrails">
                                    Turki
                                </a>
                                ,{' '}
                                <a
                                    className="text-green-400 font-bold"
                                    href="http://instagram.com/jasonbillamtravel">
                                    Jason
                                </a>{' '}
                                and a growing list of amazing Kreators and
                                influencers from all around the world.
                            </div>
                            <ButtonPath
                                url="https://kreator.viakonnect.com"
                                width="md:w-96"
                                label={'Become a Kreator'}
                            />
                        </div>
                        <div className="px-4 md:px-0 mb-8">
                            <img src="/assets/media/community_2.png" />
                        </div>
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default Community;
