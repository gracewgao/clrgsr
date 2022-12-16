import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { MySlider, SLIDER_MAX } from './components/MySlider';
import styled from '@emotion/styled';

const COLORS = 3;

const App = () => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [sliderValues, setSliderValues] = useState(Array(COLORS).fill(0));
  const [mouseX, setMouseX] = useState(0);

  const sliderBox = document
    ?.getElementsByClassName('slider-section')?.[0]
    ?.getBoundingClientRect();

  const updateActiveSlider = () => {
    if (!sliderBox) return;

    const cappedX = Math.min(sliderBox.x + sliderBox.width, Math.max(mouseX, sliderBox.x));

    const newVal = Math.round(((cappedX - sliderBox.x) / sliderBox.width) * SLIDER_MAX);
    updateSliderValues(newVal, activeSlider);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseX(event.clientX);
      updateActiveSlider();
    };
    const handleSpaceKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        setActiveSlider((activeSlider + 1) % COLORS);
        updateActiveSlider();
        event.preventDefault();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleSpaceKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleSpaceKeyDown);
    };
  }, [activeSlider, setActiveSlider, mouseX, setMouseX]);

  const updateSliderValues = (value: number, index: number) => {
    if (index < 0 || index >= COLORS) {
      return;
    }
    const newValues = sliderValues;
    newValues[index] = value;
    setSliderValues([...newValues]);
  };

  return (
    <Page sliderValues={sliderValues}>
      <SliderSection className='slider-section'>
        {sliderValues.map((value, index) => {
          return (
            <MySlider
              key={index}
              isActive={index === activeSlider}
              sliderValue={value}
              setSliderValue={(_value) => {
                updateSliderValues(_value, index);
              }}
            />
          );
        })}
      </SliderSection>

      <ColorSection>
        <span>Your color is</span>
        <span>{sliderValues.join(', ')}</span>
      </ColorSection>
    </Page>
  );
};

const Page = styled.div<{ sliderValues: number[] }>`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(${(props) => props.sliderValues.join(',')});
  height: 100%;
`;

const SliderSection = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const ColorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
  font-size: 40px;
`;

export default App;
