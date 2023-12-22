"use client";
import dynamic from 'next/dynamic';
import { PageViewport } from 'pdfjs-dist';
import { RenderParameters } from 'pdfjs-dist/types/src/display/api';
import React, { useEffect, useRef, useState } from 'react';

export default function Pdf() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfJS, setPDFJs] = useState<any>();
  const [pdf, setPDF] = useState<any>();
  const [pageNum, setPageNum] = useState(1);

  const pageChangeHandler = (value: string) => {
    if (value === 'back') {
      if (pageNum > 0)
        setPageNum(pageNum-1);
    }
    if (value === 'forward') {
      if (pageNum < 20)
        setPageNum(pageNum+1)
    }
  }

  const loadBook = async () => {
    const doc = await pdfJS.getDocument('mybook.pdf').promise;
    setPDF(doc);
  }

  useEffect(() => {
    const loadPage = async () => {
      if (!canvasRef.current)
      return;

      const page = await pdf.getPage(pageNum);
      const viewPort: PageViewport = page.getViewport({ scale: 1.5});

      const canvas = canvasRef.current;
      canvas.height = viewPort.height;
      canvas.width = viewPort.width;

      const canvasContext: CanvasRenderingContext2D | null = canvasRef.current.getContext('2d');
      if (!canvasContext)
        return;

      const renderContext: RenderParameters = { canvasContext: canvasContext, viewport: viewPort};
      page.render(renderContext);
    }

    if (!pdf)
      return;

    loadPage();

    return () => {};

  }, [pageNum, pdf]);

  useEffect(() => {
    const loadModule = async () => {
      const mod = await import('pdfjs-dist');
      let str = String(window.location);
      str = str.substring(0, str.lastIndexOf("/") + 1);
      mod.GlobalWorkerOptions.workerSrc = str + '/pdf.worker.mjs';
      setPDFJs(mod);
    }

    loadModule();
    return () => {};
  }, []);

	return (
    <div className='h-screen w-screen flex flex-col items-center'>
      <button className='btn' onClick={loadBook}>LOAD</button>
      <div className='flex items-center justify-evenly w-full h-full'>
        <button className='btn' onClick={() => pageChangeHandler('back')}>BACK</button>
        <canvas ref={canvasRef} className='h-full' />
        <button className='btn' onClick={() => pageChangeHandler('forward')}>FORWARD</button>
      </div>
    </div>
  )
;
}