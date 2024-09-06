import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.png";
import pic3 from "../assets/pic3.png";
import pic4 from "../assets/pic4.png";
import pic5 from "../assets/pic5.png";
import pic6 from "../assets/pic6.png";
import pic7 from "../assets/pic7.png";
import pic8 from "../assets/pic8.png";

const images = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];
export const generateRandomImage = () => {
  const randomPic = images[Math.floor(Math.random() * images.length)];
  return randomPic;
};
