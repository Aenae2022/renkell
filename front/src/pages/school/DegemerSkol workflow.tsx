import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios, { AxiosError } from "axios";
import { Utilitaires } from "../../utils/Utilitaires";
import { SchoolRefSchema, type SchoolType } from "@shared/schema/school.schema";
import { TypeCTSchema } from "@shared/schema/typeUser.schema";
import {
  ClassroomRefSchema,
  type ClassroomWithLinksType,
  type ClassroomType,
} from "@shared/schema/classroom.schema";
import { type UserWithLinksType } from "@shared/schema/user.schema";
import HeaderDegemer from "../../components/degemer/HeaderDegemer";
import LinkItem from "../../components/core/LinkItem";
import { useDegemer } from "@srcFront/features/degemer/useDegemer";

export function DegemerSkol() {
  const { school } = useDegemer();

  return (
    <>
      <p>coucou</p>
    </>
  );
}

export default DegemerSkol;
