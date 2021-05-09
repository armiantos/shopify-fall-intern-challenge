import React, { FunctionComponent } from 'react';

export interface BannerProps {
    display: boolean;
}

export const Banner: FunctionComponent<BannerProps> = ({ display, children }) => {
    return (
        <div
            className={`Banner fixed grid place-items-center z-10 w-full h-full transition-all ${
                display ? '' : 'hidden'
            } backdrop-filter backdrop-brightness-50`}
        >
            <div className="container sm bg-white rounded-lg shadow-lg mx-auto p-4">{children}</div>
        </div>
    );
};
