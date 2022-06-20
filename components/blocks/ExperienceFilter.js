import router from 'next/router';
import Row from '@/sections/Row';
import ButtonsRow from '@/blocks/Button/ButtonsRow';
import { NEXT_PUBLIC_DIGITAL_ONLY } from '@/constants/public';

const ExperienceFilter = ({ query, classes = 'mt-20 d-hdpi-2:mt-vw-20' }) => {
    const isArrayType = Array.isArray(query?.id);
    const handleExpTypeClick = (data) => {
        let type = '';

        switch (data.toLowerCase()) {
            case 'all types':
                type = 'all';
                break;
            default:
                type = data.toLowerCase();
                break;
        }
        if (isArrayType) {
            if (query.id.length > 1) {
                if (type !== query.id[1].toLowerCase()) {
                    router.push(`${query.id[0]}/${type}`);
                }
            } else {
                router.push(`${query.id[0]}/${type}`);
            }
        } else {
            if (type !== query.id.toLowerCase()) {
                router.push(`${type}`);
            }
        }
    };

    const setType = () => {
        let type;
        if (isArrayType) {
            type = query.id.length > 1 ? query.id[1].toLowerCase() : 'all';
        } else {
            type = query.id;
        }

        if (type === 'all') {
            return 'All Types';
        } else if (type === 'digital') {
            return 'Digital';
        } else if (type === 'guided') {
            return 'Guided';
        }

        return 'All Types';
    };

    return (
        <>
            {!NEXT_PUBLIC_DIGITAL_ONLY && (
                <Row classes={classes}>
                    <ButtonsRow
                        handleClick={handleExpTypeClick}
                        type="selectable"
                        startItem={setType()}
                        items={['All Types', 'Guided', 'Digital']}
                    />
                </Row>
            )}
        </>
    );
};

export default ExperienceFilter;
