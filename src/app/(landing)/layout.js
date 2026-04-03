import Navbar from "../../Components/layouts/Navbar";
import Footer from "../../Components/layouts/Footer";
export default function LandingLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}