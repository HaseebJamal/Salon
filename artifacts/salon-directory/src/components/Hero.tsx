import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import heroBgPath from '@assets/generated_images/hero-bg.jpg';

const categories = [
  'Hair Salon',
  'Beauty Parlour',
  'Makeup Studio',
  'Spa',
  'Bridal Makeup'
];

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const element = document.getElementById('salons');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Trigger search in parent component via event
      window.dispatchEvent(new CustomEvent('hero-search', { detail: searchQuery }));
    }
  };

  const handleCategoryClick = (category: string) => {
    const element = document.getElementById('salons');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('hero-category', { detail: category }));
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBgPath})`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/50 to-foreground/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-background mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ letterSpacing: '0.05em' }}
        >
          Discover Beauty.
          <br />
          Discover Confidence.
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-background/90 mb-12 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Explore the finest salons, beauty parlours, hair studios, makeup artists, and spas in
          Jaranwala and Faisalabad.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex gap-2 bg-background/95 backdrop-blur-sm rounded-full p-2 shadow-xl">
            <Input
              type="text"
              placeholder="Search salons, beauty parlours, hair studios..."
              className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 px-6"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              data-testid="hero-search-input"
            />
            <Button
              onClick={handleSearch}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
              data-testid="hero-search-button"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="px-6 py-2 bg-background/20 backdrop-blur-sm text-background border border-background/30 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              data-testid={`category-pill-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5, duration: 0.6 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
        >
          <ChevronDown className="h-8 w-8 text-background/70" />
        </motion.div>
      </div>
    </section>
  );
}
