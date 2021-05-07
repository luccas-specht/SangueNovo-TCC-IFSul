import { fromAddress, setApiKey, setLanguage, setRegion } from "react-geocode";

export const useGeocode = () => {
  setApiKey(`${process.env.REACT_APP_KEY_GOOGLE}`);
  setLanguage("pt-BR");
  setRegion("br");

  const getLatitudeLongitude = async (address: string) => {
    try {
      const response = await fromAddress(address);
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    } catch (error) {}
  };

  return {
    getLatitudeLongitude,
  };
};
