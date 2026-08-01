import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { salons } from '@/data/salons';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = Array.from(new Set(salons.map((s) => s.category)));
  const instagramSalons = salons.filter((s) => s.instagram);

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl font-serif font-semibold text-primary">
              BEAUTY DISTRICT
            </h3>
            <p className="text-background/70 italic">
              Where Beauty Meets Elegance
            </p>
            <p className="text-sm text-background/60">
              Your premier directory for discovering exceptional salons and beauty professionals
              in Jaranwala and Faisalabad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4 text-background">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Explore', 'Categories', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                    data-testid={`footer-link-${link.toLowerCase()}`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4 text-background">Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((category) => (
                <li key={category}>
                  <button
                    onClick={() => scrollToSection('salons')}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                    data-testid={`footer-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Salons */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4 text-background">
              Follow Our Salons
            </h4>
            <ul className="space-y-3">
              {instagramSalons.map((salon) => (
                <li key={salon.id}>
                  <a
                    href={salon.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors text-sm group"
                    data-testid={`footer-instagram-${salon.id}`}
                  >
                    <Instagram className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{salon.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © 2026 Beauty District. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm text-background/70 hover:text-primary transition-colors"
              data-testid="footer-business-listings"
            >
              Business Listings
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm text-background/70 hover:text-primary transition-colors"
              data-testid="footer-contact"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
