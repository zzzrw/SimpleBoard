import React, { useState } from 'react';

const MenuButton = ({toggleMenu}) => {
    return (
        <div className="relative">
            <button
                onClick={toggleMenu}
                className="absolute top-1 right-2 p-2 rounded-lg hover:bg-gray-200"
            >
                ···
            </button>
        </div>
    );
};

export default MenuButton;
