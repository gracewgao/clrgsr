import React, { useEffect, useState } from 'react';
import './App.css';
import { MySlider, SLIDER_MAX } from './components/MySlider';
import styled from '@emotion/styled';
import { Button, rgbToHex } from '@mui/material';

const COLORS = 3;

const App: React.FC = () => {
  const [activeNumber, setActiveNumber] = useState(0);
  const [sliderValues, setSliderValues] = useState(Array(COLORS).fill(Math.round(SLIDER_MAX / 2)));
  const [mouseX, setMouseX] = useState(0);
  const [isHex, setIsHex] = useState(false);

  const sliderBox = document
    ?.getElementsByClassName('slider-section')?.[0]
    ?.getBoundingClientRect();

  const updateActiveSlider = () => {
    if (!sliderBox) return;

    const cappedX = Math.min(sliderBox.x + sliderBox.width, Math.max(mouseX, sliderBox.x));
    const newVal = Math.round(((cappedX - sliderBox.x) / sliderBox.width) * SLIDER_MAX);
    updateSliderValues(newVal, activeNumber);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseX(event.clientX);
      updateActiveSlider();
    };
    const handleSpaceKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        setActiveNumber((activeNumber + 1) % (COLORS + 1));
        event.preventDefault();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleSpaceKeyDown);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleSpaceKeyDown);
    };
  }, [activeNumber, mouseX, setActiveNumber, setMouseX]);

  useEffect(() => {
    updateActiveSlider();
  }, [activeNumber]);

  const updateSliderValues = (value: number, index: number) => {
    if (index < 0 || index >= COLORS) {
      return;
    }
    const newValues = sliderValues;
    newValues[index] = value;
    setSliderValues([...newValues]);
  };

  const rgb = sliderValues.join(', ');
  const colorText = isHex ? rgbToHex(`rgb(${rgb})`) : rgb;

  return (
    <Page rgb={`rgb(${rgb})`}>
      <SliderSection className='slider-section'>
        {sliderValues.map((value, index) => {
          return <MySlider key={index} isActive={index === activeNumber} sliderValue={value} />;
        })}
      </SliderSection>

      <ColorSection>
        <span
          onClick={() => {
            setIsHex(!isHex);
          }}
          style={{ cursor: 'pointer' }}
        >
          {colorText}
        </span>
      </ColorSection>
      <SubmitButton variant={activeNumber === COLORS ? 'contained' : 'outlined'}>
        submit
      </SubmitButton>
    </Page>
  );
};

const Page = styled.div<{ rgb: string }>`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.rgb};
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

const SubmitButton = styled(Button)`
  margin-top: 30px;
  font-size: 18px;
  border-radius: 10px;
  padding: 5px 20px;
`;

export default App;
