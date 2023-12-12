"use client";
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Home() {

  const [text, setText] = useState([]);

  async function getURLText(link: string) {
    const url: URL = new URL(link);
    const html = await fetch(url)
      .then(response => {
        return response.text()
      })
      .then((template) => {
        const paras = new DOMParser().parseFromString(template, "text/html").getElementsByTagName('p');
        const temp = [];
        for (let i = 0; i < paras.length; i++) {
          temp.push(paras[i].innerHTML + "\n\n");
        }
        setText(temp);
      });
  }

  useEffect(() => {
    getURLText("https://www.thehindu.com/opinion/editorial/welcome-direction-the-hindu-editorial-on-the-supreme-courts-deadline-to-conduct-elections-in-jk/article67631471.ece");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 bg-stone-300 ">
      <div className="flex w-full p-10 items-center text-black text-4xl border-b-4 border-black">
        GoodLetter
      </div>

      <div className="p-52 text-black">
        {text.map((p, i) => {
          return (
            <div key={i}>
              {p}
            </div>
          )
        })}
      </div>
    </main>
  )
}
