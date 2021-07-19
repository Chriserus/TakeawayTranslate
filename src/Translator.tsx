import React, { FC, useState } from 'react';
import { Translation } from './App';
import { Button, TextField, Typography } from '@material-ui/core';

function deleteQuotes(text: string) {
  return text.replace(/['"]+/g, '');
}

enum Language {
  ENG,
  PL,
}

interface TranslatorProps {
  translations: Translation[];
  setTranslations?: (value: Translation[]) => void;
}

const Translator: FC<TranslatorProps> = (props: TranslatorProps) => {
  const [firstLetterUppercase, setFirstLetterUppercase] = useState(true);
  const [rawText, setRawText] = useState('');
  const [textToTranslate, setTextToTranslate] = useState<string[]>([]);
  const [translatedText, setTranslatedText] = useState('');

  function handleChange(event: { target: { value: React.SetStateAction<string> } }) {
    const text = event.target.value.toString().trim();
    setRawText(text);
    if (text) {
      setTextToTranslate(splitRawText(text));
    }
  }

  function splitRawText(rawTextToSplit: string): string[] {
    console.log('On split raw text');
    setFirstLetterUppercase(isLetterUppercase(rawTextToSplit[0]));
    let textAfterSplit;
    const lowercaseText = rawTextToSplit.toLowerCase();
    const match = lowercaseText.match(/(?:[^\s"]+|"[^"]*")+/g);
    if (match) {
      textAfterSplit = match.map((match) => deleteQuotes(match.toString()));
    }
    return textAfterSplit ? textAfterSplit : [];
  }
  function isLetterUppercase(letter: string) {
    return letter == letter.toUpperCase();
  }

  function translateText() {
    const joinedString = textToTranslate
      .map((toTranslate) => translate(toTranslate, Language.PL))
      .join(' ');
    const result = firstLetterUppercase ? raiseFirstLetter(joinedString) : joinedString;
    setTranslatedText(result);
  }

  function raiseFirstLetter(text: string) {
    return text[0].toUpperCase() + text.slice(1);
  }

  function translate(text: string, translationLanguage: Language) {
    if (translationLanguage == Language.PL) {
      const translation = props.translations.find((translation) => translation.ENG === text);
      if (translation) {
        return translation.PL;
      } else {
        return text;
      }
    } else if (translationLanguage == Language.ENG) {
      const translation = props.translations.find((translation) => translation.PL === text);
      if (translation) {
        return translation.ENG;
      } else {
        return text;
      }
    }
  }

  return (
    <>
      <TextField
        margin="normal"
        fullWidth
        label="Text to translate"
        autoFocus
        value={rawText}
        onChange={handleChange}
        required
      />
      <Button type="submit" color="primary" variant="contained" onClick={translateText}>
        Translate!
      </Button>
      <Typography variant="h1">{deleteQuotes(rawText)}</Typography>
      <Typography variant="h1">{translatedText}</Typography>
    </>
  );
};

export default Translator;
