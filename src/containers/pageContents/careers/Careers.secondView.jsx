import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
// import Collapse from '../../../components/componentsLib/collapse/Collapse';
import PanelSection from '../../../components/componentsLib/collapse/PanelSection';
import { Collapse, Button, CardBody, Card } from 'reactstrap';


const CareersSecondView = () => {
    const [t] = useTranslation();
    const panelHeaders = ['UI/UX Teacher', 'UI/UX Teacher'];
    const firstPanelList = ['Familiarity with Software Development Practices (C#, OOP, SCM),',
        'Good knowledge of C# ecosystem (ASP.NET WebForms, SQL, Crystal Reports),',
        'Willingness to learn new technologies and frameworks',
        'Good command of written and spoken English.',
        'Good to have qualifications:',
        '2 years of experience in designing and developing information systems,',
        'Practical knowledge of IT systems development methods, techniques and processes,',
        'Experience in XP practices, Agile or Lean,',
        'Experience with TFS, Confluence,',
        'Good knowledge of development based on relational databases (SQL, Query Performance and Debugging, DB Modelling),',
        'General knowledge of card business technology and processes.',
        'If you are ready for new challenges, join our Development team and be at the frontier of designing MPSI future. You just have to send us your CV on career@mercury-processing.com.',
        '',
        'We look forward to meeting you!'
    ];
    const firstPanelText = 'By submitting Your curriculum vitae You give us the right to process Your personal data in relation to vacant job positions. The processing is based on point (f) of Article 6(1) of GDPR. The recipients of personal data are internal only. The period for which the personal data will be stored is 3 years. You have a right to request from Us access to and rectification or erasure of personal data or restriction of processing concerning Your data or to object to processing as well as the right to data portability. You have a right to lodge a complaint with a personal data protection authority in Croatia or Slovenia. Controller details: Mercury Processing Services International Ltd. (Croatia & Slovenia), Radnička cesta 50, Zagreb, Croatia and Slovenčeva ulica 24, Ljubljana, Slovenia. Contact details of data protection officer: dpo(at)mercury-processing(dot)com.'
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className='careers-second-view'>
            <p className='careers-second-view-header'>{t('Open Positions')}</p>
            <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        Anim pariatur cliche reprehenderit,
                         enim eiusmod high life accusamus terry richardson ad squid. Nihil
                         anim keffiyeh helvetica, craft beer labore wes anderson cred
                         nesciunt sapiente ea proident.
                    </CardBody>
                </Card>
            </Collapse>
            {/* <Collapse
                headers={panelHeaders}
            > */}
            {/* id atribut is required */}
            {/* id must start with panel keyword */}
            <div id='panel_0'>
                {/* <PanelSection
                        ordered
                        panelSectionHeader='Required qualifications:'
                        listOfStrings={firstPanelList}
                    /> */}
                {/* <PanelSection
                        panelSectionHeader=' Privacy Notice'
                        unOrderedText = {firstPanelText}
                    /> */}
            </div >
            {/* <div id='panel_1'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus iusto ipsum quibusdam culpa animi veniam quaerat eius, pariatur quia dolor, nihil tempore cum magni quos quisquam ab dolorum mollitia exercitationem.
                </div> */}

            {/* <Panel id='panel_1'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus iusto ipsum quibusdam culpa animi veniam quaerat eius, pariatur quia dolor, nihil tempore cum magni quos quisquam ab dolorum mollitia exercitationem.
                </Panel>
                <Panel id='panel_2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt modi soluta deserunt ducimus fugit quisquam officia perferendis illum et neque similique nihil dolorum totam, exercitationem animi officiis, nam magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt modi soluta deserunt ducimus fugit quisquam officia perferendis illum et neque similique nihil dolorum totam, exercitationem animi officiis, nam magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt modi soluta deserunt ducimus fugit quisquam officia perferendis illum et neque similique nihil dolorum totam, exercitationem animi officiis, nam magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt modi soluta deserunt ducimus fugit quisquam officia perferendis illum et neque similique nihil dolorum totam, exercitationem animi officiis, nam magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt modi soluta deserunt ducimus fugit quisquam officia perferendis illum et neque similique nihil dolorum totam, exercitationem animi officiis, nam magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt modi soluta deserunt ducimus fugit quisquam officia perferendis illum et neque similique nihil dolorum totam, exercitationem animi officiis, nam magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus iusto ipsum quibusdam culpa animi veniam quaerat eius, pariatur quia dolor, nihil tempore cum magni quos quisquam ab dolorum mollitia exercitationem.
                </Panel> */}


            {/* </Collapse> */}
        </div>
    )
};
export default CareersSecondView;
