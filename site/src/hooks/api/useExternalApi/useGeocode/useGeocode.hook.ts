import Geocode from "react-geocode";

export const useGeocode = () => {
  Geocode.setApiKey(`${process.env.REACT_APP_KEY_GOOGLE}`);
  Geocode.setLanguage("pt-BR");
  Geocode.setRegion("br");

  const getLatitudeLongitude = async (address: string) => {
    try {
      const response = await Geocode.fromAddress(address);
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return {
    getLatitudeLongitude,
  };
};
