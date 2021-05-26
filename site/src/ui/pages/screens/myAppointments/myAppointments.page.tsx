import React from "react";

import { useAuthenticated } from "../../../../hooks";
import { Header, FabButton } from "../../../components";

import { DonatorAppointments, ManageAppointments } from "../../components";

export const MyAppointments = () => {
  const { user } = useAuthenticated();

  return (
    <>
      <Header />
      {user.user.isDonator ? <DonatorAppointments /> : <ManageAppointments />}
      <FabButton />
    </>
  );
};
