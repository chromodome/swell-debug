import React from 'react';
import {
    Heart,
    LayoutGrid,
    Inbox,
    Grid,
    User,
    DollarSign,
    LogOut,
    HelpCircle,
    Sliders,
    Settings,
    X,
} from 'lucide-react';

const IconsLucide = ({ icon, size, color, strokeWidth = '2' }) => {
    return Map[icon] ? (
        <span className={color}>
            {React.createElement(Map[icon], {
                size,
                color: 'currentColor',
                strokeWidth,
            })}
        </span>
    ) : null;
};

const Map = {
    Heart,
    LayoutGrid,
    Inbox,
    Grid,
    User,
    DollarSign,
    LogOut,
    HelpCircle,
    Sliders,
    Settings,
    X,
};

export default IconsLucide;
