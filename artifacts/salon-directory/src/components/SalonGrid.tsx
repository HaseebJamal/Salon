import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SalonCard } from '@/components/SalonCard';
import { salons } from '@/data/salons';
import type { Salon } from '@/data/salons';

interface SalonGridProps {
  onViewDetails: (salon: Salon) => void;
}

export function SalonGrid({ onViewDetails }: SalonGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('reviews');
  const [filteredSalons, setFilteredSalons] = useState(salons);

  useEffect(() => {
    // Listen for hero search/category events
    const handleHeroSearch = (e: Event) => {
      const customEvent = e as CustomEvent;
      setSearchQuery(customEvent.detail);
    };

    const handleHeroCategory = (e: Event) => {
      const customEvent = e as CustomEvent;
      setCategoryFilter(customEvent.detail);
    };

    window.addEventListener('hero-search', handleHeroSearch);
    window.addEventListener('hero-category', handleHeroCategory);

    return () => {
      window.removeEventListener('hero-search', handleHeroSearch);
      window.removeEventListener('hero-category', handleHeroCategory);
    };
  }, []);

  useEffect(() => {
    let results = [...salons];

    // Search filter
    if (searchQuery) {
      results = results.filter(
        (salon) =>
          salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          salon.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          salon.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'All') {
      results = results.filter((salon) => salon.category === categoryFilter);
    }

    // City filter
    if (cityFilter !== 'All') {
      results = results.filter((salon) => salon.city === cityFilter);
    }

    // Sort
    if (sortBy === 'reviews') {
      results.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === 'az') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredSalons(results);
  }, [searchQuery, categoryFilter, cityFilter, sortBy]);

  const categories = ['All', ...Array.from(new Set(salons.map((s) => s.category)))];
  const cities = ['All', ...Array.from(new Set(salons.map((s) => s.city)))];

  return (
    <section id="salons" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-foreground mb-4">
            Featured Beauty Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated collection of premium salons and beauty professionals
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, address, or city..."
                className="pl-12 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="salon-search-input"
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px] bg-background" data-testid="category-filter">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-[200px] bg-background" data-testid="city-filter">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px] bg-background" data-testid="sort-filter">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reviews">Most Reviewed</SelectItem>
                <SelectItem value="az">A-Z</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1 text-right">
              <span className="text-sm text-muted-foreground" data-testid="results-count">
                {filteredSalons.length} {filteredSalons.length === 1 ? 'salon' : 'salons'} found
              </span>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {filteredSalons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSalons.map((salon, index) => (
              <SalonCard
                key={salon.id}
                salon={salon}
                index={index}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">💇</div>
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
              No salons found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
