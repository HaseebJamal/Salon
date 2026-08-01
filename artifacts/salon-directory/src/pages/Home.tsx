import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { CategoriesSection } from '@/components/CategoriesSection';
import { SalonGrid } from '@/components/SalonGrid';
import { SalonDetailModal } from '@/components/SalonDetailModal';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { ReviewStats } from '@/components/ReviewStats';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { useLenis } from '@/hooks/useLenis';
import type { Salon } from '@/data/salons';

export default function Home() {
  useLenis();

  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (salon: Salon) => {
    setSelectedSalon(salon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSalon(null), 300);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsBar />
      <CategoriesSection />
      <SalonGrid onViewDetails={handleViewDetails} />
      <WhyChooseUs />
      <ReviewStats />
      <ContactSection />
      <Footer />
      <SalonDetailModal
        salon={selectedSalon}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
