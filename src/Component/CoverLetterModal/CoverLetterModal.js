import React from 'react';
import styles from './CoverLetterModal.module.css'; // Import the CSS module
import { useSound } from "use-sound";
import clickSound from "../../Sounds/Click.mp3";

import { imageCoverLetter, chooseTemplates, coverLetterId } from "../../Recoil";
import { useRecoilState } from "recoil";

const CoverLetterModal = ({ showModal, closeModal }) => {
    const [play] = useSound(clickSound);
    const [clNo, setClNo] = useRecoilState(coverLetterId);

    const [template, setTempletes] = useRecoilState(imageCoverLetter);

    const handleClick = () => {
        play();
    };

    const handtemp = (id) => {
        handleClick();
        setClNo(id)
        closeModal(); // Close the modal when image is clicked
    };

    return (
        <div className={`${styles.modal} ${showModal ? styles.show : ''}`}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={closeModal}>&times;</span>

                <div className={styles.container}>
                    <h2>Templates List</h2>
                    <br/>
                    <div className={styles.template_box}>
                        {template.map((item, id) => (
                            <div className={styles.template_card} key={id}>
                                <div onClick={() => handtemp(id)}>
                                    <img src={item} className={styles._card} alt={`template-${id}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverLetterModal;
