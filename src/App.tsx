import React, { FC, useState } from 'react';
import './App.css';
import Reader from './Reader';
import Translator from './Translator';

export interface Translation {
  index: number;
  PL: string;
  ENG: string;
}

const sampleTranslations = [
  {
    index: 1,
    PL: 'polski',
    ENG: 'english',
  },
  {
    index: 2,
    PL: 'chleb',
    ENG: 'bread',
  },
  {
    index: 3,
    PL: 'chleb',
    ENG: 'bread',
  },
  {
    index: 4,
    PL: 'orzech pistacjowy',
    ENG: 'pistachio nut',
  },
  {
    index: 6,
    PL: 'malina',
    ENG: 'raspberry',
  },
];

const App: FC = () => {
  const [translations, setTranslations] = useState<Translation[]>(sampleTranslations);
  return (
    <div className="App">
      <Translator translations={translations} />
      <Reader translations={translations} setTranslations={setTranslations} />
    </div>
  );
};

export default App;
