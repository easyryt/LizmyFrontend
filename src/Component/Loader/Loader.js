import React from 'react';
import style from './Loader.module.css';

const Loader = () => {
  return (
    <div className={style.loader}>
      <div className={style.dot}></div>
      <div className={style.dot} style={{ animationDelay: '0.25s' }}></div>
      <div className={style.dot} style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};

export default Loader;