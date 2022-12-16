import React from 'react';
import Slider from '@mui/material/Slider';
import { BooleanLiteral, createSemanticDiagnosticsBuilderProgram } from 'typescript';

interface IMySlider {
  isActive: boolean;
  sliderValue: number;
}

export const SLIDER_MAX = 255;

export const MySlider: React.FC<IMySlider> = ({ isActive, sliderValue }) => {
  return (
    <input
      type='range'
      value={sliderValue}
      max={SLIDER_MAX}
      disabled={!isActive}
      aria-label='Default'
      //   valueLabelDisplay='auto'
    />
  );
};
