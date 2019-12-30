import React from 'react';
import { useTranslation } from 'react-i18next';
import Collapse from '../../../components/componentsLib/Collapse';


const CareersSecondView = () => {
    const [t] = useTranslation();
    const panelHeaders = ['UI/UX Teacher', 'UI/UX Teacher', 'UI/UX Teacher'];
    return (
        <div className='careers-second-view'>
            <p className='careers-second-view-header'>{t('Open Positions')}</p>
            <Collapse
                headers={panelHeaders}
            >
                {/* id atribut is required */}
                {/* id must start with panel keyword */}
                <div id = 'panel_0'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus iusto ipsum quibusdam culpa animi veniam quaerat eius, pariatur quia dolor, nihil tempore cum magni quos quisquam ab dolorum mollitia exercitationem.
                </div>
                <div id = 'panel_1'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus iusto ipsum quibusdam culpa animi veniam quaerat eius, pariatur quia dolor, nihil tempore cum magni quos quisquam ab dolorum mollitia exercitationem.
                </div>
                <div id = 'panel_2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt modi soluta deserunt ducimus fugit quisquam officia perferendis illum et neque similique nihil dolorum totam, exercitationem animi officiis, nam magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt modi soluta deserunt ducimus fugit quisquam officia perferendis illum et neque similique nihil dolorum totam, exercitationem animi officiis, nam magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt modi soluta deserunt ducimus fugit quisquam officia perferendis illum et neque similique nihil dolorum totam, exercitationem animi officiis, nam magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt modi soluta deserunt ducimus fugit quisquam officia perferendis illum et neque similique nihil dolorum totam, exercitationem animi officiis, nam magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt modi soluta deserunt ducimus fugit quisquam officia perferendis illum et neque similique nihil dolorum totam, exercitationem animi officiis, nam magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt modi soluta deserunt ducimus fugit quisquam officia perferendis illum et neque similique nihil dolorum totam, exercitationem animi officiis, nam magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus iusto ipsum quibusdam culpa animi veniam quaerat eius, pariatur quia dolor, nihil tempore cum magni quos quisquam ab dolorum mollitia exercitationem.
                </div>
            </Collapse>
        </div>
    )
};
export default CareersSecondView;
