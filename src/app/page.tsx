"use client";
import { generateKey } from 'crypto';
import Image from 'next/image'
import { createElement, useEffect, useState } from 'react';

export default function Home() {

  const [mainHeading, setMainHeading] = useState<HTMLHeadingElement[]>();
  const [otherHeadings, setOtherHeadings] = useState<HTMLHeadingElement[]>([]);
  const [paras, setParas] = useState<HTMLParagraphElement[]>([]);
  const [url, setUrl] = useState<string>();


  async function getURLText(link: string | undefined) {
  if (!link)
    return;

  const url: URL = new URL(link);
  const html = await fetch(url)
    .then(response => {
      return response.text()
    })
    .then((template) => {
      var document = new DOMParser().parseFromString(template, "text/html");
      const h1: Array<HTMLHeadingElement> = Array.from(document.getElementsByTagName("h1"));
      setMainHeading(h1);

      const h2: Array<HTMLHeadingElement> = Array.from(document.getElementsByTagName("h2"));
      const h3: Array<HTMLHeadingElement> = Array.from(document.getElementsByTagName("h3"));
      setOtherHeadings(h2.concat(h3));

      const p = Array.from(document.getElementsByTagName("p"));
      setParas(p);
    });
  }

  // useEffect(() => {
  //   getURLText("https://www.thehindu.com/opinion/editorial/welcome-direction-the-hindu-editorial-on-the-supreme-courts-deadline-to-conduct-elections-in-jk/article67631471.ece");
  // }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-5 bg-stone-300 ">
      <div className="flex w-full p-10 items-center text-black text-4xl border-b-4 border-black">
        GoodLetter
      </div>

      <div className="flex w-full border-1 p-10 gap-5">
        <input className='input w-10/12' type="text" placeholder='Enter URL' value={url} onChange={(e) => setUrl(e.target.value)}></input>
        <button className='btn btn-neutral w-2/12' onClick={() => getURLText(url)}>GET</button>
      </div>

      <div className="px-52 py-20 text-black">

        <div className="flex flex-col gap-5">
          {mainHeading && Object.values(mainHeading).map((h1: HTMLHeadingElement) => {
            let inner = h1.outerHTML;
            // console.log("h1", h1.tagName, h1.outerHTML);
            return (
              <div key={inner.slice(0, 10)} dangerouslySetInnerHTML={{__html: `${inner}`}} className='text-5xl'/>
            )
          })}
        </div>


        {/* {otherHeadings.length > 0 &&
          <> 
            <hr className="bg-black h-1 my-10"/>
            <div className="flex flex-col gap-5">
              {Object.values(otherHeadings).map((h2: HTMLHeadingElement) => {
                if (h2.innerText.length < 30)
                  return;
                let inner = h2.outerHTML;
                return (
                  <div key={inner.slice(10)} dangerouslySetInnerHTML={{__html: `${inner}`}} className='text-xl'/>
                )
              })}
            </div>
          </>
        } */}

        {paras.length > 0 &&
          <>
            <hr className="bg-black h-1 my-10"/>
            <div className="flex flex-col gap-5">
              {Object.values(paras).map((p: HTMLParagraphElement) => {
                if (p.innerText.length < 30)
                  return;

                return (
                  <div key={p.innerText} dangerouslySetInnerHTML={{__html: `${p.innerHTML}`}} className='text-lg'/>
                )
              })}
            </div>
          </>
        }
      </div>
    </main>
  )
}