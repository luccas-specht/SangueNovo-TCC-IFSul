import React, { useState } from "react";

import { FiLock, FiUser, BiPhone, FiCamera } from "react-icons/all";

import { useHistory } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

import { validationMessage } from "../../../../constants";

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

import * as S from "./editProfile.style";

type FormData = {
  avatar: any;
  name: string;
  oldPassword: string;
  newPassword: string;
  phone: string;
};

export const EditProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useHistory();
  const { user } = useAuthenticated();

  const initialValues: FormData = {
    avatar: user?.user?.avatar,
    name: "",
    phone: "",
    newPassword: "",
    oldPassword: "",
  };

  const validations = {};

  const onEdit = async ({
    name,
    phone,
    avatar,
    newPassword,
  }: FormData): Promise<void> => {
    setIsLoading(true);
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: FormData) => {
      onEdit(values);
    },
  });
  return (
    <>
      <ToastContainer />
      <S.Header>
        <S.Back to="listar-campanhas">
          <FiArrowLeft size={30} />
        </S.Back>
        <FabTheme />
      </S.Header>
      <S.Content>
        <S.Wrapper>
          <S.Form onSubmit={formik.handleSubmit}>
            <S.Profile>
              <img
                src={formik.values.avatar ?? imageDefaultProfile}
                alt={user?.user?.name ?? "imagem de perfil"}
              />
              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" name="avatar" />
              </label>
            </S.Profile>

            <S.EditWrapper>
              <h1> Meu perfil</h1>
              <InputText
                icon={<FiUser size={20} />}
                id="name"
                name="name"
                placeholder="Nome"
                value={formik.values.name}
                error={formik.touched.name && formik.errors.name}
                onChange={formik.handleChange}
              />
              <InputText
                icon={<BiPhone size={20} />}
                id="phone"
                name="phone"
                placeholder="Telefone"
                value={formik.values.phone}
                error={formik.touched.phone && formik.errors.phone}
                onChange={formik.handleChange}
              />
              <InputPassword
                icon={<FiLock size={20} />}
                id="oldPassword"
                name="oldPassword"
                placeholder="Senha atual"
                value={formik.values.oldPassword}
                error={formik.touched.oldPassword && formik.errors.oldPassword}
                onChange={formik.handleChange}
              />
              <InputPassword
                icon={<FiLock size={20} />}
                id="newPassword"
                name="newPassword"
                placeholder="Nova senha"
                value={formik.values.newPassword}
                error={formik.touched.newPassword && formik.errors.newPassword}
                onChange={formik.handleChange}
              />
              <Button
                type="submit"
                title={
                  isLoading ? "Salvando mudanças..." : "Confirmar mudanças"
                }
              />
            </S.EditWrapper>
          </S.Form>
        </S.Wrapper>
      </S.Content>
    </>
  );
};
