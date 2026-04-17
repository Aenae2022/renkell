import React from "react";
//import JVdictation from "../components/dictation/JVdictation";
import MaJbdbHome from "../pages/ma-jbdb/MaJbdbHome";

export type componentKey =
  |// "JV_DICTATION"
  | "MA_JBDB";

export const componentsRegistry: Record<
  componentKey,
  React.ComponentType<unknown>
> = {
  //JV_DICTATION: JVdictation,
  MA_JBDB: MaJbdbHome,
};