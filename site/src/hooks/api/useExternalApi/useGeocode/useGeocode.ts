import Geocode from "react-geocode";
export const useGeocode = () => {
  const getLatitudeLongitude = async (address: string) => {
    Geocode.setApiKey("AIzaSyDiKSawDpyuzjPP9aYo5QzAhsBv-OQNGHE");
    Geocode.setLanguage("pt-BR");
    Geocode.setRegion("br");
    Geocode.enableDebug();
    try {
      const response = await Geocode.fromAddress(address);
      const { lat, lng } = response.results[0].geometry.location;
      console.log("latitude e longitude:", lat, lng);
    } catch (error) {
      console.log("deu erro kk", error);
    }
  };
  return {
    getLatitudeLongitude,
  };
};
