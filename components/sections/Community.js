import ButtonPath from '@/blocks/Button/ButtonPath';
import classNames from 'classnames';
import KreatorCard from '../blocks/Card/KreatorCard';
import { Pill__Logo } from '../blocks/Pills';
import SliderList from '../blocks/SliderList';
import SectionTitle from '../blocks/Title/SectionTitle';
import Row from './Row';

const breakPoints = {
    default: { width: 320, slides: 2 },
    sm: { width: 640, slides: 2 },
    md: { width: 768, slides: 4 },
    lg: { width: 1024, slides: 4 },
    xl: { width: 1280, slides: 4 }
};

const kreators = [
    {
        image: 'https://ucarecdn.com/2c73a69d-cbad-4d52-987b-fc9f1e3ee3fa/-/preview/360x360/',
        name: 'Maria Ronning',

        link: '/experiences/user/mariaronnn/all'
    },
    {
        image: 'https://ucarecdn.com/7255a900-4a82-4384-aa5d-7c5c1c869bff/-/preview/360x360/',
        name: 'Turki Shoaib',
        link: '/experiences/user/arabiantrails/all'
    },
    {
        image: 'https://ucarecdn.com/10ffd7ea-5dbb-4b06-8e03-dc2d1f306c97/-/preview/360x360/',
        name: 'Leslie Leroy',
        link: '/'
    },
    {
        image: 'https://ucarecdn.com/4382d930-d07f-4248-b852-390026f36b5f/-/preview/360x360/',
        name: 'Jason Bilam',
        link: '/experiences/user/jasonbillamtravel/all'
    }
];

const Community = ({ dataLoading = false }) => {
    return (
        <div className="w-full py-16 lg:py-0 bg-gray-200 relative">
            <div className="absolute inset-0 bg-gray-200 overflow-hidden">
                <img
                    src={
                        'https://ucarecdn.com/03eebdef-9731-4d9b-910a-c163c4edf315/'
                    }
                    //  src={`${data.image}-/preview/300x300/`}
                    className={` object-cover w-full h-full filter blur-2xl transform scale-150 opacity-50a`}
                />
            </div>
            <Row>
                <div
                    className={`relative 
                                 bg-contain bg-no-repeat bg-center lg:pt-24  lg:pb-12 d-hdpi-2:pt-vw-24 d-hdpi-2:pb-vw-12 `}>
                    <div
                        className={`absolute z-100 top-0 -translate-y-1/2 left-1/2 transform -translate-x-1/2`}>
                        <Pill__Logo />
                    </div>

                    <div className="flex flex-col-reverse items-center lg:items-start lg:flex-row justify-between gap-4 lg:gap-16 ">
                        <div className="lg:w-screen-3/7 flex flex-col px-8 md:px-0">
                            <SectionTitle
                                titleColor="text-green-400"
                                subtitleColor="text-white"
                                section={{
                                    title: 'Meet our Kreators'
                                }}
                                padding=""
                                // size="text-4xl md:text-5xl"
                                titlePadding="pb-1"
                            />
                            <div className="text-2xl md:text-2xl xl:text-2xl d-hdpi-2:text-vw-2xl tracking-tight text-white font-semibold leading-tight mb-4 d-hdpi-2:mb-vw-4">
                                The real people behind Konnect
                            </div>
                            <div className="text-white text-opacity-75 text-base md:text-lg xl:text-xl d-hdpi-2:text-vw-xl font-normal mb-8 d-hdpi-2:mb-vw-8">
                                The only way the Konnect community is possible
                                is thorough a diverse group of amazing locals
                                and travelers like{' '}
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
                                    Leslie
                                </a>
                                , and{' '}
                                <a
                                    className="text-green-400 font-bold"
                                    href="http://instagram.com/jasonbillamtravel">
                                    Jason
                                </a>{' '}
                                who are helping us drive change in the travel
                                industry.
                            </div>
                            <ButtonPath
                                shadow=""
                                dark
                                url="https://kreator.viakonnect.com"
                                width="md:w-72 d-hdpi-2:w-vw-72"
                                label={'Become a Kreator'}
                            />
                        </div>
                        <div className="px-4 md:px-0 mb-8 d-hdpi-2:mb-vw-8 d-hdpi-2:px-vw-4 lg:w-screen-4/7">
                            <SliderList
                                // classes={classes}
                                randomStart={true}
                                useRow={false}
                                loop={true}
                                margins={'mt-0 mb-0 lg:mt-0 lg:mb-0'}
                                padding="py-4 d-hdpi-2:py-vw-4"
                                breakPoints={breakPoints}
                                // section={sectionTitles}
                                dataLoading={dataLoading}>
                                {kreators.map((item, index) => {
                                    return (
                                        <KreatorCard
                                            key={`dest_${item.image}`}
                                            data={item}
                                            containerClass="embla__slide x2 md:x4 "
                                            type=""
                                            tagMargins="mt-3 lg:mt-4 "
                                            tagPadding="px-2 lg:px-2 pb-0"
                                            // linkName="slug"
                                            // padding={tagPadding}
                                            // margins={tagMargins}
                                            // preset={tagRatio}
                                        />
                                    );
                                })}
                            </SliderList>
                        </div>
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default Community;
