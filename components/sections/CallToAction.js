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

const CallToAction = ({ dataLoading = false }) => {
    return (
        <div className="w-full py-16 lg:py-0 bg-gray-200 relative min-h-128">
            <div className="absolute inset-0 bg-gray-200 overflow-hidden">
                <img
                    src={'/assets/media/wood2.svg'}
                    //  src={`${data.image}-/preview/300x300/`}
                    className={` object-cover w-full h-full transform`}
                />
            </div>
            <Row>
                <div
                    className={`relative 
                                 bg-contain bg-no-repeat bg-center min-h-128`}>
                    <div
                        className={`absolute z-100 top-0 -translate-y-1/2 left-1/2 transform -translate-x-1/2`}>
                        <Pill__Logo />
                    </div>

                    <div className="flex flex-col items-center gap-8 justify-center h-full py-20">
                        <div
                            className={classNames(
                                'flex  font-bold tracking-tight leading-none flex-shrink-0 flex-initial',
                                'pb-3 d-hdpi-2:pb-vw-3',
                                'text-5xl d-hdpi-2:text-vw-6xl',

                                'text-transparent bg-clip-text bg-gradient-to-l from-blue-600  to-green-400 mix-blend-multiply'
                            )}>
                            Let's change travel together
                        </div>
                        <div className="p-6 border-4 border-gray-300 border-opacity-25 rounded-full w-1/2 h-60">
                            <div className="p-2 border-4 border-gray-300 rounded-full w-full h-full">
                                <div className=" overflow-hidden rounded-full shadow-cards h-full">
                                    <img
                                        src={
                                            'https://ucarecdn.com/26928e64-b508-442e-b396-8c73b342ba21/-/preview/-/quality/smart/'
                                        }
                                        //  src={`${data.image}-/preview/300x300/`}
                                        className={` object-cover w-full h-full transform 
                                        `}
                                    />
                                </div>
                            </div>
                        </div>

                        <ButtonPath
                            // shadow=""
                            // dark
                            url="https://kreator.viakonnect.com"
                            width="md:w-96 d-hdpi-2:w-vw-96"
                            label={'Sign up today'}
                            height="h-16 h-vw-16"
                            rounded="rounded-xl d-hdpi-2:rounded-vw-xl"
                            textSize="text-2xl text-vw-2xl"
                        />
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default CallToAction;
