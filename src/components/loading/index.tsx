import React, { useEffect, useRef, useState } from 'react';
import LoadingImg from './loading.png';

import './style.css';

let bridge: {
  showLoading: ((text?: string) => void),
  hideLoading: () => void
} | null = null;

export function showLoading (text?: string) {
  if (bridge) {
    bridge.showLoading(text);
  }
}

export function hideLoading () {
  if (bridge) {
    bridge.hideLoading();
  }
}

export function Loading () {
  const [text, setText] = useState('loading...');
  const [show, setShow] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const timerRef = useRef<number>(0);

  useEffect(()=>{
    bridge = { showLoading, hideLoading, };

    return () => {
      bridge = null;
    };
  });

  const showLoading = (text:string)=>{
    setShow(true);
    setText(text || 'loading...');
    (timerRef as any).current = setTimeout(()=>{
      setShowLoad(true);
    }, 300);
  };

  const hideLoading = ()=>{
    clearTimeout(timerRef.current);
    setShowLoad(false);
    setShow(false);
  };

  if (show) {
    return(
      <div className='toast-box'>
        <div className='toast-main-box'>
          {
            showLoad && <div className='toast-main'>
              <img className='icon-loading' src={LoadingImg} alt=""/>
              <span className='wk-loading-title'>{text}</span>
            </div>
          }
        </div>
      </div>
    );
  }else {
    return null;
  }
}
