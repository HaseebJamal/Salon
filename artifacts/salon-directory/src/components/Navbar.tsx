import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Explore', id: 'salons' },
    { label: 'Categories', id: 'categories' },
    { label: 'About', id: 'why-choose' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-xl shadow-md border-b border-border'
            : 'bg-gradient-to-b from-black/40 to-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection('hero')}
              className="text-primary font-serif text-2xl md:text-3xl font-semibold tracking-wide"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="logo-button"
            >
              BEAUTY DISTRICT
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`transition-colors duration-300 text-sm font-medium tracking-wide hover:text-primary ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}
                  data-testid={`nav-link-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollToSection('salons')}
                className={`transition-colors duration-300 ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-primary'}`}
                data-testid="search-icon-button"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => scrollToSection('salons')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="explore-salons-button"
              >
                Explore Salons
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground"
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-20 right-0 bottom-0 w-full bg-background z-40 md:hidden overflow-y-auto"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-2xl font-serif text-foreground hover:text-primary transition-colors"
                  data-testid={`mobile-nav-link-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('salons')}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-8"
                data-testid="mobile-explore-button"
              >
                Explore Salons
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
