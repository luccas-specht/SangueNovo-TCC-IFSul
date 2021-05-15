import React, { useState } from "react";

import { FiLock, FiUser, BiPhone, FiCamera, BiMap } from "react-icons/all";

import { FiArrowLeft } from "react-icons/fi";
import { masks } from "../../../../constants";
import { useFormik } from "formik";

import { useAuthenticated } from "../../../../hooks";

import imageDefaultProfile from "../../../assets/images/default_user_image.png";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useViaCep } from "../../../../hooks";

import {
  FabTheme,
  InputPassword,
  InputText,
  Button,
  FabButton,
} from "../../../components";

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
  const { getAddress } = useViaCep();
  const { cepMask } = masks();
  const { user } = useAuthenticated();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: FormData = {
    avatar: user?.user?.avatar,
    name_razaoSocial: user?.user?.userName,
    phone: user?.user?.phone,
    newPassword: "",
    oldPassword: "",
  };

  const initialValuesInstitution: FormData = {
    ...initialValues,
    cep: user?.user?.cep,
  };

  const validations = {};

  const onEdit = async ({
    name_razaoSocial,
    phone,
    avatar,
    newPassword,
  }: FormData): Promise<void> => {
    setIsLoading(true);
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: user?.user?.isDonator
      ? initialValues
      : initialValuesInstitution,
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
                alt={user?.user?.userName ?? "imagem de perfil"}
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
                name="name_razaoSocial"
                placeholder={user?.user?.isDonator ? "Nome" : "Razão Social"}
                value={formik.values.name_razaoSocial}
                error={
                  formik.touched.name_razaoSocial &&
                  formik.errors.name_razaoSocial
                }
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
              {!user?.user?.isDonator && (
                <InputText
                  icon={<BiMap size={20} />}
                  id="cep"
                  name="cep"
                  placeholder="CEP"
                  maxLength={9}
                  value={cepMask(formik?.values?.cep || "")}
                  error={formik.touched.cep && formik.errors.cep}
                  onChange={formik.handleChange}
                />
              )}

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
      <FabButton url="criar-campanha" />
    </>
  );
};
