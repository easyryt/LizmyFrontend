import * as React from 'react';
import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from "./MobileViewModal.module.css"
import generatePDF from "react-to-pdf";
import { useState } from 'react';
import ColorPlate from '../ColorPlate/ColorPlate';
import { useRecoilValue, useRecoilState } from 'recoil';
import { resumeTemplates, chooseTemplates, imageresumeTemplates, modalValue } from '../../Recoil';
import Fonts from '../Fonts/Fonts';
import PreviewIcon from '@mui/icons-material/Preview';

const style = {
  position: 'absolute',
  display: "grid",
  gridTemplateColumns: "1fr",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1,
  height: 1,
  bgcolor: 'background.paper',
  border: 'none',
  outline: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function MobileViewModal() {
  const [modal, setModal] = useRecoilState(modalValue);
  const [templateNo, setTemplateNo] = useState(JSON.parse(localStorage.getItem("templateid")));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setModal(false)
  };

  const templates = useRecoilValue(resumeTemplates);
  const [imgtemplateNo, setImgTemplateNo] = useRecoilState(imageresumeTemplates);
  const targetRef = useRef();

  useEffect(() => {
    if (modal === true) {
      handleOpen() // Call your function when `modal` becomes true
    }
  }, [modal]);

  useEffect(() => {
    const storedTemplateId = JSON.parse(localStorage.getItem("templateid"));
    if (storedTemplateId !== templateNo) {
      setTemplateNo(storedTemplateId);
    }
  }, []);

  const pdfOptions = {
    unit: "mm",
    format: "a4",
    orientation: "portrait", // or 'landscape'
    fileName: "Easyryt.pdf",
  };

  const exportHTML = () => {
    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    const footer = '</body></html>';

    const sourceHTML =
      header + document.getElementById('content').innerHTML + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const handleFilterTemplates = (index) => {
    localStorage.setItem("templateid", JSON.stringify(index));
    setTemplateNo(index);
  }

  const handleExportClick = () => {
    const jsxCode = targetRef.current.textContent;
    const element = document.createElement('a');
    const file = new Blob([jsxCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'exported-jsx.txt';
    element.click();
  };

  return (
    <div>
      <div className={styles.preview_box} onClick={handleOpen}>
         <PreviewIcon sx={{fontSize:"40px"}} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button className={styles.download_btn} onClick={() => generatePDF(targetRef, pdfOptions)}>
            Export to Pdf
          </button>
          <button className={styles.download_btn2} onClick={exportHTML}>Export to DOC</button>
          <button className={styles.download_btn3} onClick={handleExportClick}>Export to txt</button>
          <div className={styles.resume_container}>
            <button onClick={() => handleClose()} className={styles.Close_btn}>X</button>
            <div className={styles.resume}>
              <div className={styles.reume_div}>
                {templates[templateNo]}
              </div>
            </div>
          </div>
          <div className={styles.tools_box}>
            <h3>Customized Your Resume</h3>
            <div className={styles.ColorPlate}>
              <ColorPlate />
            </div>
            <div>
              <Fonts />
            </div>
            <div className={styles.template_box}>
              {imgtemplateNo.map((item, index) =>
                <div className={styles.template_card} key={index} onClick={() => handleFilterTemplates(index)}>
                  <img className={styles._card} src={item} alt={`template-${index}`} />
                </div>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
