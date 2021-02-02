/*mobileL:
     Pixel 2, 
     Pixel 2 XL, 
     Iphone PLus: 6/7/8 */

  /* mobileM:
     Moto g4, 
     Galaxys5, 
     Iphone 6/7/8, 
     Iphone X */

    /*mobileS:
      Iphone 5/SE */

const size = {
    mobileL: {
      max: () => '415px'
    }
 };
 
export const device = {
    mobileL: () => `(max-width: ${size.mobileL.max()})`
};