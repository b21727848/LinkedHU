import React, { useState } from "react";

import {
    PopupWrapper,
    PopupBackground,
    PopupContainer,
    PopupClose,
} from "../Style/scPopup";

import { AuthCloseIcon } from "../Assets/Images";

export default function Popup({ children, openPopup, setOpenPopup }) {
    return (
        <PopupWrapper openPopup={openPopup && "true"}>
            <PopupBackground />
            <PopupContainer>
                <PopupClose
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenPopup(false);
                    }}
                >
                    <AuthCloseIcon />
                </PopupClose>
                {children}
            </PopupContainer>
        </PopupWrapper>
    );
}
