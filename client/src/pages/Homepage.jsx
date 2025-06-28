import PublicLayout from "../layout/PublicLayout.jsx";
import HeroSection from "../components/section/HeroSection.jsx";
import TaglineSection from "../components/section/TaglineSection.jsx";
import HowItWorksSection from "../components/section/HowItWorksSection.jsx";
import MeetAISection from "../components/section/MeetAISection.jsx";
import KeyFeatureAndBenefitsSection from "../components/section/KeyFeature&BenefitsSection.jsx";

const Homepage = () => {


    return (
        <PublicLayout>
            <HeroSection />
            <TaglineSection />
            <HowItWorksSection />
            <MeetAISection />
            <KeyFeatureAndBenefitsSection />
        </PublicLayout>
    )
}

export default Homepage;