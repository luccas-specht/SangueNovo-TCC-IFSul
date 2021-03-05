import React from "react";

import Lottie from "react-lottie";

import animation from "../../../assets/animations/animation_page_not_found.json";

export const CreateCampaign = () => (
  <Lottie
    options={{
      loop: true,
      autoplay: true,
      animationData: animation,
    }}
    width={600}
    height={600}
  />
);
