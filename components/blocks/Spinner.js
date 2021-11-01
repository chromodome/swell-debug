export default function Spinner({
    size = '20',
    strokeWidth = '40',
    strokeColor = null,
    bgStrokeColor = 'text-gray-400',
    bgStrokeOpacity = 'opacity-25'
}) {
    return (
        <svg
            className={`animate-spin`}
            width={size}
            height={size}
            viewBox="0 0 500 500">
            <defs>
                <linearGradient
                    id="linearGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%">
                    <stop offset="0%" stopColor="#1D4ED8" />
                    <stop offset="100%" stopColor="#00cc97" />
                </linearGradient>
            </defs>
            <circle
                className={`${bgStrokeOpacity} ${bgStrokeColor}`}
                cx="250"
                cy="250"
                r="200"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="none"
            />
            <path
                className={`${strokeColor ? strokeColor : ''}`}
                d="M 250,50 A 200 200 0 1 1 250 450 A 200 200 0 1 1 250 50"
                stroke={strokeColor ? 'currentColor' : 'url(#linearGrad)'}
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray="750,1256"
            />
        </svg>
    );
}
