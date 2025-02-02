"use client";
import { useState } from "react";
import { TitleBar } from "./Page Components/TitleBar";
import { DirectorySelector } from "./File Tree/FileTree";
import * as Separator from "@radix-ui/react-separator";
import Measure from "react-measure";
import { ContentRect } from "./typings";
import "./page.scss";

export default function Home() {
  const [dimensions, setDimensions] = useState<ContentRect | undefined>(undefined);
  const [language, setLanguage] = useState("en");

  return (
    <div lang={language}>
      <TitleBar language={language} setLanguage={setLanguage} />
      <Separator.Root className="separator-main" />
      <Measure
        bounds
        onResize={(contentRect) => {
          // Update state only if the measured dimensions actually change.
          const newWidth = contentRect.bounds?.width;
          const newHeight = contentRect.bounds?.height;
          if (dimensions?.bounds?.width !== newWidth || dimensions?.bounds?.height !== newHeight) {
            setDimensions(contentRect);
          }
        }}
      >
        {({ measureRef }) => (
          <div
            ref={measureRef}
            style={{
              width: "90vw",
              height: "85vh",
            }}
          >
            <DirectorySelector dimensions={dimensions} />
          </div>
        )}
      </Measure>
    </div>
  );
}
