import { useEffect, useState } from "react";
import MeasuringInformationService from "../../services/MeasuringInformationService";

export default function MeasuringInformation() {
    const [text, setText] = useState("");
    const [alphabetSet, setAlphabetSet] = useState("ru");
    const [alphabet, setAlphabet] = useState("");
    const [customAlphabet, setCustomAlphabet] = useState("");
    
    const currentAlphabet = alphabetSet === "custom" ? customAlphabet : alphabet; 
  
    const [volume, setVolume] = useState(0);
    const [amount, setAmount] = useState(0);
  
    useEffect(() => {
      // ge
    }, [])
  
    useEffect(() => {
      getVolume();
    }, [alphabetSet])
  
    const getVolume = () => {
      MeasuringInformationService.getVolume(alphabetSet, currentAlphabet)
        .then((data) => {
          setVolume(data.payload)
          console.log(data.payload)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
    const getAlphabet = () => {
      MeasuringInformationService.getAlphabet(alphabetSet)
        .then((data) => {
          setAlphabet(data.payload)
          console.log(data.payload)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
    useEffect(() => {
      getAlphabet()
    }, [alphabetSet])
  
    const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value)
    }
  
    const changeAlphabetSet = (v: string) => {
      setAlphabetSet(v);
    }
    const changeAlphabetHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomAlphabet(e.target.value);
    }
  
    const onClickHandle = () => {
      MeasuringInformationService.getAmount(text, alphabetSet, currentAlphabet)
        .then((data) => {
          setAmount(data.payload)
          console.log(data.payload)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
    return(
        <> 
            <h3 className="title">Измерение информации - Алфавитный подход</h3>
            <div className='container'>
                <div className='block half'>
                    <p>Текст</p>
                    <input 
                    type="text" 
                    name="text" 
                    id="" 
                    value={text} 
                    onChange={changeText}
                    />
                    <div className='row'>
                    <RadioButton
                        name="alphabet_set"
                        text='Ru'
                        value='ru'
                        curValue={alphabetSet}
                        onChange={changeAlphabetSet}
                    />
                    <RadioButton
                        name="alphabet_set"
                        text='En'
                        value='en'
                        curValue={alphabetSet}
                        onChange={changeAlphabetSet}
                    />
                    <RadioButton
                        name="alphabet_set"
                        text='Custom'
                        value='custom'
                        curValue={alphabetSet}
                        onChange={changeAlphabetSet}
                    />
                    </div>
                    {alphabetSet === "custom" &&
                    <>
                    <p>Алфавит</p>
                    <input 
                        type="text"
                        name="alphabet"
                        id=""
                        value={customAlphabet}
                        onChange={changeAlphabetHandle}
                        onBlur={getVolume}
                    />
                    </>
                    }
                    <button type='button' onClick={onClickHandle}>
                    Измерить информацию
                    </button>
                </div>
                <div className='block half'>
                    <p>Мощность алфавита: {currentAlphabet.length}</p>
                    <p>Инфориационный объём символа: {volume} бит</p>
                    <p>Объём информации: {amount} бит</p>
                </div>
            </div>
        </>
    );
}

function RadioButton({name, text, value, curValue, onChange}: {name: string, text: string, value: string, curValue: string, onChange: (v: string)=>void}) {
    function onChangeHandle(e: React.ChangeEvent<HTMLInputElement>) {
      onChange(e.target.value);
    }
    return(
      <div className='radio-button'>
        <input 
          type="radio"
          name={name} 
          id={`${name}_${value}`} 
          value={value}
          checked={curValue === value}
          onChange={onChangeHandle}
        />
        <label htmlFor={`${name}_${value}`} >{text}</label>
      </div>
    );
  }
  