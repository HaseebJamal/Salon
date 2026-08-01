import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Instagram, Heart, MapPin, Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Salon } from '@/data/salons';
import { salonImages } from '@/assets/salonImages';

function toWhatsAppNumber(phone: string): string {
  // Convert Pakistani local number (03xxxxxxxxx) to international (923xxxxxxxxx)
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) return '92' + digits.slice(1);
  return digits;
}

interface SalonCardProps {
  salon: Salon;
  index: number;
  onViewDetails: (salon: Salon) => void;
}

export function SalonCard({ salon, index, onViewDetails }: SalonCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const imagePath = salon.image || salonImages[salon.id] || '';

  return (
    <motion.div
      className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-lg group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      data-testid={`salon-card-${salon.id}`}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imagePath})` }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
          data-testid={`favorite-button-${salon.id}`}
        >
          <Heart
            className={`h-5 w-5 ${isFavorited ? 'fill-primary text-primary' : 'text-foreground'}`}
          />
        </button>

        {/* Salon Name */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-serif font-semibold text-background">{salon.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
            {salon.category}
          </Badge>
          <Badge variant="outline" className="border-border">
            <MapPin className="h-3 w-3 mr-1" />
            {salon.city}
          </Badge>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.min(Math.ceil(salon.reviewCount / 10), 5)
                    ? 'fill-primary text-primary'
                    : 'text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({salon.reviewCount} reviews)
          </span>
        </div>

        {/* Phone */}
        <a
          href={`tel:${salon.phone}`}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          data-testid={`phone-link-${salon.id}`}
        >
          <Phone className="h-4 w-4" />
          {salon.phone}
        </a>

        {/* Actions */}
        <div className="flex gap-2 pt-2 flex-wrap">
          <Button
            onClick={() => onViewDetails(salon)}
            variant="outline"
            className="flex-1 min-w-[100px]"
            data-testid={`view-details-button-${salon.id}`}
          >
            View Details
          </Button>
          <a
            href={`https://wa.me/${toWhatsAppNumber(salon.phone)}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`whatsapp-button-${salon.id}`}
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <FaWhatsapp className="h-5 w-5" />
            </Button>
          </a>
          {salon.instagram ? (
            <a
              href={salon.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`instagram-button-${salon.id}`}
            >
              <Button variant="ghost" size="icon" className="text-pink-600 hover:text-pink-700 hover:bg-pink-50">
                <Instagram className="h-5 w-5" />
              </Button>
            </a>
          ) : null}
          <a
            href={`tel:${salon.phone}`}
            className="flex-1 min-w-[100px]"
            data-testid={`call-button-${salon.id}`}
          >
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
