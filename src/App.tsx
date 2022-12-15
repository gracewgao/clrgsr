import React from 'react';
import './App.css';
import { MySlider } from './components/Slider';
import styled from '@emotion/styled'

const App = () => {
  return (
    <Page>
      <header className="App-header">
        <MySlider></MySlider>
        <MySlider></MySlider>
        <MySlider></MySlider>
        <p>
        🙂hihihihi <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </Page>
  );
}

export default App;

const Page = styled.div`
  padding: 50px;
`
