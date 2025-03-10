import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Vision from "./pages/Vision";
import Mission from "./pages/Mission";
import Property from "./pages/Property";
import PropertyDetails from "./pages/PropertyDetails";
import Agency from "./pages/Agency";
import AgencyDetails from "./pages/AgencyDetails";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Termsandcondition from "./pages/Termsandcondition";



function App() {
  return (
  <>
    <Routes>

    <Route path="/" element={<Home />} />
    <Route path="/Aboutus" element={<Aboutus />} />
    <Route path="/Mission" element={<Mission />} />
    <Route path="/Vision" element={<Vision />} />
    <Route path="/Property" element={<Property />} />
    <Route path="/PropertyDetails" element={<PropertyDetails />} />
    <Route path="/Agency" element={<Agency />} />
    <Route path="/AgencyDetails" element={<AgencyDetails />} />
    <Route path="/Blog" element={<Blog />} />
    <Route path="/BlogDetails" element={<BlogDetails />} />
    <Route path="/Contact" element={<Contact />} />
    <Route path="/Faq" element={<Faq />} />
    <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
    <Route path="/Termsandcondition" element={<Termsandcondition />} />
      
    </Routes>
  </>
  );
}

export default App;
