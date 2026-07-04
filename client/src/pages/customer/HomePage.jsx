import HeroSection from "../../components/home/HeroSection";
import CategorySection from "../../components/home/CategorySection";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import FeaturesSection from "../../components/home/FeatureSection";
import NewsletterSection from "../../components/home/NewsletterSection";
import Footer from "../../components/home/Footer";

function HomePage() {
    return (
        <div className="bg-white">

            <HeroSection />
            <CategorySection/>
            <FeaturedProducts/>
            <FeaturesSection/>
            <NewsletterSection/>
            <Footer/>

        </div>
    );
}

export default HomePage;