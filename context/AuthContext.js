import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

const tmpUser1 = {
    firstname: 'Mahmoud',
    lastname: 'Hafiz',
    handle: '@wolfalpha',
    email: 'mahmoud@viakonnect.com',
    image: 'https://ucarecdn.com/5122fb4e-54fc-4da6-9a2f-24aeb634e61f/mahmoud_avatar.jpg',
};

const tmpUser2 = null;

const tmpTopBar = {
    pill: {
        bgColor: 'bg-white',
        textColor: 'text-black',
        text: 'COVID 19',
    },
    bar: {
        bgColor: 'bg-gray-600',
        textColor: 'text-black',
        text: 'Find out about our COVID 19 response',
    },
    link: 'https://kreator.viakonnect.com',
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(tmpUser1);
    const [error, setError] = useState(null);
    const [lang, setLang] = useState('en');
    const [rtl, setRtl] = useState(false);
    const [navIsOpen, toggleNav] = useState(false);
    const [topBar, setTopBar] = useState(tmpTopBar);
    const router = useRouter();

    useEffect(() => checkUserLoggedIn(), []);

    // Register user
    const register = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await res.json();

        if (res.ok) {
            setUser(data.user);
            router.push('/account/dashboard');
        } else {
            setError(data.message);
            setError(null);
        }
    };

    // Login user
    const login = async ({ email: identifier, password }) => {
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier,
                password,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            setUser(data.user);
            router.push('/account/dashboard');
        } else {
            setError(data.message);
            setError(null);
        }
    };

    // Logout user
    const logout = async () => {
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: 'POST',
        });

        if (res.ok) {
            setUser(null);
            router.push('/');
        }
    };

    // Check if user is logged in
    const checkUserLoggedIn = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/user`);
        const data = await res.json();

        if (res.ok) {
            setUser(data.user);
        } else {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                lang,
                setLang,
                rtl,
                setRtl,
                error,
                navIsOpen,
                toggleNav,
                register,
                login,
                logout,
                topBar,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
