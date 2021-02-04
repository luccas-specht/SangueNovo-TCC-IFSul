const size = {
    mobileL: {
      max: () => '415px'
    }
 };
 
export const device = {
    mobileL: () => `(max-width: ${size.mobileL.max()})`
};