import Hero from "../../components/home/Hero/Hero";
import Features from "../../components/home/Features/Features";
import Category from "../../components/home/Category/Categories";
import Products from "../../components/home/Products/Products";
import WhyChoose from "../../components/home/WhyChoose/WhyChoose";
import PromoBanner from "../../components/home/PromoBanner/PromoBanner";  
import RecipeSection from "../../components/home/RecipeSection/RecipeSection";
import testimonialData from "../../components/home/Testimonials/testimonialData";
import Testimonials from "../../components/home/Testimonials/Testimonials";
import InstagramGallery from "../../components/home/InstagramGallery/InstagramGallery";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Category />
      <Products />
      <WhyChoose/>
      <PromoBanner />
      <RecipeSection />
      <Testimonials testimonials={testimonialData} />
      <InstagramGallery />
    </>
  );
}

export default Home;