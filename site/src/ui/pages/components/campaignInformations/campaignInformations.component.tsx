import React from "react";
import * as SC from "./campaignInformations.style";
import { Button } from "../../../components/index";

export const CampaignInfo = () => {
  return (
    <SC.Container>
      <SC.ImageCaipaignBox></SC.ImageCaipaignBox>
      <SC.MainInfoBox>
        <h2># Salve Pedrinho Ribeiro</h2>
        <p>Institudo de dobracao interna Pedrinho Ribeiro</p>
      </SC.MainInfoBox>
      <SC.MoreInfoBox>
        <p>até 26/06/2021</p>
        <p>A+, O+ </p>
      </SC.MoreInfoBox>
      <SC.restInfoBox>
        <h3>A urgencia de doação é Extrema</h3>
        <p>
          Pedrinho é um jovem estudante do ensino médio e <br />
          sofreu um acidente de carro, com o ajuda necessaria
          <br />
          ele podera continuar continuar curtindo a vida.
        </p>
        <Button title="Quero doar" />
      </SC.restInfoBox>
    </SC.Container>
  );
};
