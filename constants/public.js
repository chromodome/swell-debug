export const NEXT_PUBLIC_ITEMS_PER_PAGE = process.env.NEXT_PUBLIC_ITEMS_PER_PAGE;
export const NEXT_PUBLIC_LATEST_PER_PAGE = process.env.NEXT_PUBLIC_LATEST_PER_PAGE;
export const NEXT_PUBLIC_TRENDING_PER_PAGE = process.env.NEXT_PUBLIC_TRENDING_PER_PAGE;
export const NEXT_PUBLIC_KREATOR_BASE_URL = process.env.NEXT_PUBLIC_KREATOR_BASE_URL;
console.log('process.env.NEXT_PUBLIC_DIGITAL_ONLY', process.env.NEXT_PUBLIC_DIGITAL_ONLY)
export const NEXT_PUBLIC_DIGITAL_ONLY = process.env.NEXT_PUBLIC_DIGITAL_ONLY.toLowerCase() === 'true' ? true : false;
