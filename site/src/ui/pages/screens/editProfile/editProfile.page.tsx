import React, { useState, useCallback, ChangeEvent } from "react";

import { FiLock, FiUser, BiPhone, FiCamera, BiMap } from "react-icons/all";

import { useHistory } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

import { validationMessage, masks } from "../../../../constants";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useAuthenticated } from "../../../../hooks";

import { toastConfig } from "../../../../configs";

import imageDefaultProfile from "../../../assets/images/default_user_image.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FabTheme,
  InputPassword,
  InputText,
  Button,
} from "../../../components";

import { useGeocode } from "../../../../hooks";

import * as S from "./editProfile.style";

type FormData = {
  avatar: any;
  name_razaoSocial: string;
  oldPassword: string;
  newPassword: string;
  phone: string;
  cep?: string;
};

export const EditProfile = () => {
  const { getLatitudeLongitude } = useGeocode();

  const hande = async () => {
    await getLatitudeLongitude("Rua Serafim Leite, Santo Inácio, Esteio, RS");
  };
  return (
    <div>
      <h1>oie</h1>
      <button onClick={hande}>clica porra</button>
    </div>
  );
};
