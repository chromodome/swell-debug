export const getSlidesPerBp = (breakPoints) => {
    if (typeof window !== 'undefined') {
        let cWidth = window.innerWidth;
        if (cWidth >= breakPoints.xl.width) return breakPoints.xl.slides;
        else if (cWidth >= breakPoints.lg.width) return breakPoints.lg.slides;
        else if (cWidth >= breakPoints.md.width) return breakPoints.md.slides;
        else if (cWidth >= breakPoints.sm.width) return breakPoints.sm.slides;
        else return breakPoints.default.slides;
    }
};

export const getTrendingGridColumns = (width) => {
    let items = 3;

    if (width >= 768) items = 6;
    if (width >= 1024) items = 8;
    if (width >= 1280) items = 10;

    return items;
};
