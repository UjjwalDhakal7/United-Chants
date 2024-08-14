"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";
import YtCard from "./ytcard"; 
import chantsData from "../../public/chants.json";  // Updated import path

type Chant = {
  title: string;
  description: string;
  content: string[];
  imageUrl: string;
  videoUrl: string; 
};

function extractVideoId(url: string): string | null {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : null;
}

export function ExpandableCardDemo() {
  const [active, setActive] = useState<Chant | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4 sm:p-8">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full h-3/4 md:w-[80%] lg:w-[700px] lg:h-[90%] flex justify-center items-center max-h-[90%] shadow-2xl shadow-black
              bg-white dark:bg-gradient-to-br from-red-700 to-red-200 sm:rounded-xl overflow-hidden"
            >
              <div className="p-2 md:p-4 flex items-center justify-center flex-col gap-2 sm:gap-4">
                {active.videoUrl && (
                  <motion.div layoutId={`video-${active.title}-${id}`} className="w-full">
                    <YtCard
                      videoId={extractVideoId(active.videoUrl) || ""}
                      title=""
                      description=""
                    />
                  </motion.div>
                )}
                <motion.h2
                  layoutId={`title-${active.title}-${id}`}
                  className="text-xl md:text-3xl lg:text-4xl font-bold font-mono text-stone-800 dark:text-stone-900 mt-4 text-left w-full pl-4 lg:pl-0"
                >
                  {active.title}
                </motion.h2>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm md:text-base lg:text-xl text-neutral-600 dark:text-stone-900 h-40 md:h-fit pb-10 flex flex-col items-start gap-2 md:gap-4 overflow-auto mt-4 text-left w-full pl-4 lg:pl-0"
                >
                  {active.content.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chantsData.map((chant: Chant) => (
          <motion.div
            layoutId={`card-${chant.title}`}
            key={`card-${chant.title}`}
            onClick={() => setActive(chant)}
            className="pt-6 flex flex-col md:flex justify-between items-center gap-4 lg:flex hover:bg-neutral-50 dark:hover:bg-gradient-to-br from-red-700 to-red-100 rounded-xl cursor-pointer text-gray-100  hover:text-black"
          >
            <div className="grid gap-4 md:flex-row">
              {chant.imageUrl && (
                <motion.div layoutId={`image-${chant.title}`}>
                  <img
                    src={chant.imageUrl}
                    alt={chant.title}
                    height={400}
                    width={400}
                    className="w-full h-auto md:w-[400px] md:h-[300px] lg:w-[450px] lg:h-[300px] object-cover rounded-md"
                  />
                </motion.div>
              )}
            </div>
            <motion.button
              layoutId={`button-${chant.title}`}
              className="px-4 py-2 text-lg uppercase md:text-xl lg:text-2xl rounded-md font-mono font-bold mt-4 md:mt-0"
            >
              <h2>{chant.title}</h2>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
