import React , {useContext, useState} from 'react';
import './Sidebar.css'; 
import { Add, HistorySharp, Menu, ChatBubbleOutlineOutlined, QuestionMark, Settings } from '@mui/icons-material'; 
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const {onSent, prevPrompt, setRecentPrompt, newChat} = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    return (
        <div className="sidebar">
           <div className='top'>
            <Menu className='menu f_s_20' onClick ={() => setExtended(prev => !prev)} />
            <div className='new-chat' onClick={() => newChat()}>
                <Add className='add-icon f_s_20'  />
                {extended ? <p>New chat </p> : null}
            </div>
            {extended ? 
            <div className='recent'>
                <p className='recent-title'> Recent </p>
                {prevPrompt.map ((item,index) => {
                    return (
                        <div className='recent-entry' key={index} onClick={() => loadPrompt(item)}>
                    <ChatBubbleOutlineOutlined className='recent-icon f_s_20'  />
                    <p> {item.slice(0,18)}...</p>
                </div>
                    )
 })}
                
            </div> 
            : null
        }
           </div>
           <div className='bottom'>
            <div className='bottom-item recent-entry'>
                <QuestionMark className='recent-icon f_s_20'  />
               {extended ? <p>Help </p> : null}
            </div>
            <div className='bottom-item recent-entry'>
                <HistorySharp className='recent-icon f_s_20'  />
                {extended ? <p>Activity </p> : null}
                </div>
                <div className='bottom-item recent-entry'>
                <Settings className='recent-icon f_s_20'  />
                {extended ? <p>setting </p> : null}
            </div>
            
           </div>
        </div>
    );
};

export default Sidebar;