import { createContext, useState } from "react";
import main from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (index, newxtWord ) => {
        setTimeout(() => {
            setResultData(prev => prev + newxtWord);
        }, index * 75);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false)
    }
    // const onSent = async (prompt) => {
    //     setResultData('');
    //     setLoading(true);
    //     setShowResult(true);
    //     setRecentPrompt(input);
    //     const response = await main(input);
    //     let responseArray = response.split('**');
    //     let newResponse ='';
    //     for(let i =0; i<responseArray.length; i++){
    //         if(i === 0 || i%2 !== 1){
    //             newResponse += responseArray[i];
    //         }else{
    //             newResponse += "<b>"+ responseArray[i] +"</b>";
    //         }
    //     }
        
    //     let newResponse2 = newResponse.split('*').join('</br>');
    //     setResultData(newResponse2);
    //     setLoading(false);
    //     setInput('');
        
    // }

    const onSent = async (prompt) => {
        setResultData('');
        setLoading(true);
        setShowResult(true); 
        let response;
        if(prompt !== undefined) {   // check if prompt is empty
            response = await main(prompt);
            setRecentPrompt(prompt);
        }else{
            setPrevPrompt((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await main(input);
        }

        const responseArray = response.split('**');
        let newResponse = '';
    
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 === 1) {
                newResponse += `<span style="font-weight: bold;">${responseArray[i]}</span>`;
            } else {
                newResponse += responseArray[i];
            }
        }
    
        const newResponse2 = newResponse.split('*').join('</br>');
        let  newResponseArray = newResponse2.split(' ');
        for(let i = 0; i< newResponseArray.length; i++){
            const newxtWord = newResponseArray[i] + ' ';
            delayPara(i, newxtWord);
        }
        setLoading(false);
        setInput('');
    };
    

    // onSent('what is react js ?')

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompt,
        setPrevPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData, 
        setResultData,
        onSent,
        newChat
    };
    return (
        <Context.Provider value={contextValue}>
        {props.children}
        </Context.Provider>
    );
    }

    export default ContextProvider;