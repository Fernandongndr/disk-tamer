"use client";
import { TitleBar } from "./Page Components/TitleBar";
import { DirectorySelector } from "./File Tree/FileTree";
import * as Separator from "@radix-ui/react-separator";

export default function Home() {
  return (
    <>
      <TitleBar />
      <Separator.Root className="separator-main" style={{ margin: "15px 0" }} />
      <DirectorySelector />
    </>
  );
}
