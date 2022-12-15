import React from 'react';
import Slider from '@mui/material/Slider';

export const MySlider = () => {
    return (
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    );
}