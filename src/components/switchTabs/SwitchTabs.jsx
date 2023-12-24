import { useState } from 'react';
import './SwtichTabs.scss';
import PropTypes from 'prop-types';

const SwitchTabs = ({data,onTabChange}) => {

    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTab = (tab,index) => {
        setLeft(index * 100);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(tab);
    }

  return (
      <div className='switchingTabs'>
        <div className="tabItems">
            {
                data.map((tab,index) => (
                    <span 
                    key={index} 
                    className={`tabItem ${selectedTab === index && 'active'}`}
                    onClick={() => activeTab(tab,index)}
                    >{tab}</span>
                ))
            }

            <span className="movingBg" style={{left}}></span>
        </div>
      </div>
  )
}

SwitchTabs.propTypes = {
    data:PropTypes.array,
    onTabChange: PropTypes.func
}

export default SwitchTabs;