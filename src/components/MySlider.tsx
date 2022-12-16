import React from 'react';
import Slider from '@mui/material/Slider';
import { BooleanLiteral, createSemanticDiagnosticsBuilderProgram } from 'typescript';

interface IMySlider {
  isActive: boolean;
  sliderValue: number;
  setSliderValue: (value: number) => void;
}

export const SLIDER_MAX = 255;

export const MySlider: React.FC<IMySlider> = ({ isActive, sliderValue, setSliderValue }) => {
  return (
    <input
      type='range'
      //   onChange={(_, value) => {
      //     if (typeof value === 'number') {
      //       setSliderValue(value);
      //     } else {
      //       setSliderValue(value[0]);
      //     }
      //   }}
      value={sliderValue}
      max={SLIDER_MAX}
      disabled={!isActive}
      aria-label='Default'
      //   valueLabelDisplay='auto'
    />
  );
};
