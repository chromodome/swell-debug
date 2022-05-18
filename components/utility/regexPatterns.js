export const regexString = /^([^0-9!@#$%^&*()_+=[\]{}\\|/<>,`~;:"?]*)$/;
export const regexWhiteSpace = /^\S+(?: \S+)*$/;
export const regexPassword = /^[a-zA-Z0-9$|~=[\]'_+@.-]{8,}$/;
export const regexUsername =
    /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
