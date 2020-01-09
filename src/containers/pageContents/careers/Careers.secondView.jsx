import React from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse } from 'antd';
import PanelSection from '../../../components/componentsLib/PanelSection';
import { firstPanelList, firstPanelFooter, firstPanelText } from './vacancies';

const { Panel } = Collapse;


const CareersSecondView = () => {
    const [t] = useTranslation();

    const handleSelectPanel = (panelProps) => {
        return <img className='img-icon' src={panelProps.isActive ? '/assets/images/diagonal-arrow-white.svg' : '/assets/images/diagonal-arrow.svg'} />
    };

    return (
        <div className='careers-second-view'>
            <p className='careers-second-view-header'>{t('Open Positions')}</p>
            <Collapse
                accordion
                expandIcon={(panelProps) => handleSelectPanel(panelProps)}
                expandIconPosition={'right'}
            >

                <Panel className='collapse-item' header='UI/UX Teacher' key="1">
                    <PanelSection
                        panelSectionHeader='Required qualifications:'
                        ordered
                        showFooter
                        listOfStrings={firstPanelList}
                        panelSectionFooter={firstPanelFooter}
                    />
                    <PanelSection
                        panelSectionHeader='Privacy Notice'
                        unOrderedText={firstPanelText}
                    />
                </Panel>
                <Panel className='collapse-item' header='UI/UX Teacher' key="2">
                    <PanelSection
                        panelSectionHeader='Required qualifications:'
                        ordered
                        listOfStrings={firstPanelList}
                    />
                    <PanelSection
                        panelSectionHeader='Privacy Notice'
                        unOrderedText={firstPanelText}
                    />
                </Panel>
                <Panel className='collapse-item' header='UI/UX Teacher' key="3">
                    <PanelSection
                        panelSectionHeader='Required qualifications:'
                        ordered
                        listOfStrings={firstPanelList}
                    />
                    <PanelSection
                        panelSectionHeader='Privacy Notice'
                        unOrderedText={firstPanelText}
                    />
                </Panel>
            </Collapse>
        </div>
    )
};
export default CareersSecondView;
