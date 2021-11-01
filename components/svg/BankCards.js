import React from 'react';

export function CardMastercard(props) {
    const title = props.title || 'card mastercard';

    return (
        <div className="flex items-center w-8 h-8">
            <svg
                height="144"
                width="203"
                viewBox="0 0 152.407 108"
                xmlns="http://www.w3.org/2000/svg">
                <title>{title}</title>
                <g>
                    <path d="M0 0h152.407v108H0z" fill="none" />
                    <path
                        d="M60.412 25.697h31.5v56.606h-31.5z"
                        fill="#ff5f00"
                    />
                    <path
                        d="M62.412 54a35.938 35.938 0 0 1 13.75-28.303 36 36 0 1 0 0 56.606A35.938 35.938 0 0 1 62.412 54z"
                        fill="#eb001b"
                    />
                    <path
                        d="M134.407 54a35.999 35.999 0 0 1-58.245 28.303 36.005 36.005 0 0 0 0-56.606A35.999 35.999 0 0 1 134.407 54z"
                        fill="#f79e1b"
                    />
                    <path
                        d="M130.973 76.308v-1.16h.467v-.235h-1.19v.236h.468v1.159zm2.31 0V74.91h-.364l-.42.962-.42-.962h-.365v1.398h.258v-1.054l.393.908h.267l.394-.91v1.056z"
                        fill="#f79e1b"
                    />
                </g>
            </svg>
        </div>
    );
}

export function CardVisa(props) {
    const title = props.title || 'card visa';

    return (
        <div className="flex items-center w-8 h-8">
            <svg
                height="324"
                width="1000"
                viewBox="0 0 1000 324.684"
                xmlns="http://www.w3.org/2000/svg">
                <title>{title}</title>
                <g>
                    <defs id="defs3737">
                        <linearGradient id="linearGradient3801">
                            <stop
                                id="stop3803"
                                offset="0"
                                stopColor="#20225f"
                                stopOpacity="1"
                            />
                            <stop
                                id="stop3815"
                                offset=".2"
                                stopColor="#1a1f61"
                                stopOpacity="1"
                            />
                            <stop
                                id="stop3813"
                                offset=".41"
                                stopColor="#172272"
                                stopOpacity="1"
                            />
                            <stop
                                id="stop3811"
                                offset=".595"
                                stopColor="#152682"
                                stopOpacity="1"
                            />
                            <stop
                                id="stop3809"
                                offset=".802"
                                stopColor="#12288e"
                                stopOpacity="1"
                            />
                            <stop
                                id="stop3805"
                                offset="1"
                                stopColor="#0e2c9a"
                                stopOpacity="1"
                            />
                        </linearGradient>
                    </defs>
                    <path
                        id="path3789"
                        d="M651.185.5c-70.933 0-134.322 36.766-134.322 104.694 0 77.9 112.423 83.28 112.423 122.415 0 16.478-18.884 31.229-51.137 31.229-45.773 0-79.984-20.611-79.984-20.611l-14.638 68.547s39.41 17.41 91.734 17.41c77.552 0 138.576-38.572 138.576-107.66 0-82.316-112.89-87.537-112.89-123.86 0-12.91 15.501-27.053 47.662-27.053 36.286 0 65.892 14.99 65.892 14.99l14.326-66.204S696.614.5 651.185.5zM2.218 5.497L.5 15.49s29.842 5.461 56.719 16.356c34.606 12.492 37.072 19.765 42.9 42.353l63.51 244.832h85.138L379.927 5.497h-84.942L210.707 218.67l-34.39-180.696c-3.154-20.68-19.13-32.477-38.685-32.477H2.218zm411.865 0L347.449 319.03h80.999l66.4-313.534h-80.765zm451.759 0c-19.532 0-29.88 10.457-37.474 28.73L709.699 319.03h84.942l16.434-47.468h103.483l9.994 47.468H999.5L934.115 5.497h-68.273zm11.047 84.707l25.178 117.653h-67.454L876.89 90.204z"
                        fill="#1434cb"
                        fillOpacity="1"
                        stroke="none"
                    />
                </g>
            </svg>
        </div>
    );
}

export function CardAmex(props) {
    const title = props.title || 'card amex';

    return (
        <div className="flex items-center w-8 h-8">
            <svg
                height="26"
                width="40"
                viewBox="0 0 40 26"
                xmlns="http://www.w3.org/2000/svg">
                <title>{title}</title>
                <g>
                    <path d="M0 26h40V0H0v26z" fill="#016FD0" />
                    <path
                        d="M30.69 13.63v1.64h-4.17v1.14h4.07v1.64h-4.07v1.12h4.17v1.66l3.38-3.6-3.38-3.6zm-1.1-6.14l-1.4-3.19h-4l-4.1 9.32h3.33v8.27l10.28.01 1.61-1.8 1.63 1.8H40v-2.63l-1.92-2.06L40 15.16v-2.59l-1.93.01V7.6l-1.81 4.98H34.5l-1.86-5v5h-4.2l-.6-1.46h-3.3l-.6 1.46h-2.22l3.23-7.27V5.3h2.55l3.19 7.21V5.3l3.1.01 1.6 4.47 1.62-4.48H40v-1h-3.77l-.85 2.39-.85-2.39h-4.94v3.19zm-5.06 6.11v7.27h6.16v-.01h2.54l2.1-2.32 2.12 2.32H40v-.1l-3.34-3.53L40 13.65v-.05h-2.52l-2.1 2.3-2.08-2.3h-8.77zm.7-4.11l.96-2.31.97 2.31h-1.93z"
                        fill="#fff"
                        fillRule="evenodd"
                    />
                </g>
            </svg>
        </div>
    );
}
