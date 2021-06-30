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
