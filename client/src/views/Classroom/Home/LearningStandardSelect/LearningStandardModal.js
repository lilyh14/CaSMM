import {Modal, Button, message} from 'antd';
import React, {useEffect, useState} from "react";
import LearningStandardSelect from "./LearningStandardSelect";
import {getLearningStandard, setSelection} from "../../../../Utils/requests";

export default function LearningStandardModal(props) {
    const [visible, setVisible] = useState(false);
    const [activePanel, setActivePanel] = useState('panel-1');
    const [selected, setSelected] = useState({});
    const {history, setActiveLearningStandard, gradeId, classroomId, viewing} = props;

    useEffect(() => {
        const fetchData = async () => {
            if (viewing) {
                setVisible(true);
                const res = await getLearningStandard(viewing);
                if (res.data) {
                    setSelected(res.data);
                    setActivePanel('panel-2')
                } else {
                    message.error(res.err);
                }
            }
        };
        fetchData()
    }, [viewing]);

    const showModal = () => {
        setActivePanel('panel-1');
        setVisible(true)
    };

    const handleCancel = () => {
        history.push('#home');
        setVisible(false)
    };

    const handleOk = async () => {
        history.push('#home');
        const res = await setSelection(classroomId, selected.id);
        if(res.err){
            message.error(res.err);
        } else {
            setActiveLearningStandard(selected);
            message.success("Successfully updated active learning standard.")
            setVisible(false)
        }
    };

    const handleReview = () => {
        history.push(`#home#${selected.id}`);
        setActivePanel('panel-2')
    };

    return (
        <div id='learning-standard-modal'>
            <button id="change-lesson-btn" onClick={showModal}>Change active learning standard</button>
            <Modal
                title={activePanel === 'panel-1' ? 'Select a Learning Standard:' : selected.name}
                visible={visible}
                onCancel={handleCancel}
                width='60vw'
                footer={[
                    <Button key="ok" type="primary" disabled={selected.id === undefined}
                            onClick={activePanel === 'panel-1' ? handleReview : handleOk}>
                        {activePanel === 'panel-1' ? 'Review' : 'Set as Active Learning Standard'}
                    </Button>,
                ]}
            >
                <LearningStandardSelect history={history} activePanel={activePanel} setActivePanel={setActivePanel}
                                        selected={selected} setSelected={setSelected} gradeId={gradeId}/>
            </Modal>
        </div>
    );
}