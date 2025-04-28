import React, {useContext} from 'react';
import {ExploreOutlined, LightbulbCircleOutlined,AccountCircleOutlined, AutoAwesomeOutlined,
     ChatBubbleOutlineOutlined, CodeOutlined, CollectionsOutlined, KeyboardVoiceOutlined, SendOutlined } from '@mui/icons-material'; 
import './Main.css';
import { Context } from '../../context/Context';

const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,input,setInput} = useContext(Context);

    return (
        <div className='main'>
            <div className='nav'>
            <p>Gemini</p>
            <AccountCircleOutlined className='person-icon' />
            </div>
            <div className='main-container'>

                { !showResult ?
                <>
                <div className='greet'>
                    <p><span>Hello, Folks.</span></p>
                    <p>How can I help you?</p>
                </div>
                <div className='cards'>
                    <div className='card'>
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <ExploreOutlined className='card-icon' />
                    </div>
                    <div className='card'>
                        <p>Briefly summaries this concept: urban planning</p>
                        <LightbulbCircleOutlined className='card-icon' />
                    </div>
                    <div className='card'>
                        <p>Brainstorm team bonding activities for our work retreat </p>
                        <ChatBubbleOutlineOutlined className='card-icon' />
                    </div>
                    <div className='card'>
                        <p>Improve the readability of the following code </p>
                        <CodeOutlined className='card-icon' />
                    </div>
                </div>
                </>
                : <div className='result'>
                    <div className='result-title'> 
                        <AccountCircleOutlined className='result-icon' />
                        <p> {recentPrompt} </p>
                    </div>
                    <div className='result-data'>
                        <AutoAwesomeOutlined className='result-icon' />
                        {loading ? <div className='loader'>
                            <hr/>
                            <hr/>
                            <hr/>
                        </div> 
                        : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
}
                        </div>

                    </div> 
                    }
                <div className='main-bottom'>
                    <div className='search-box'>
                        <input onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text" 
                        placeholder='Search for anything...' className='search-input' />
                        <div>
                            <CollectionsOutlined className='search-icon' />
                            <KeyboardVoiceOutlined className='search-icon' />
                            {input ?<SendOutlined onClick = { () => onSent() } className='search-icon' />:null }
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;