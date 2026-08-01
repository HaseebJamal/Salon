import { motion } from 'framer-motion';
import { X, Phone, Instagram, MapPin, Star, Navigation } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import type { Salon } from '@/data/salons';
import { salonImages } from '@/assets/salonImages';

function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) return '92' + digits.slice(1);
  return digits;
}

interface SalonDetailModalProps {
  salon: Salon | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SalonDetailModal({ salon, isOpen, onClose }: SalonDetailModalProps) {
  if (!salon) return null;

  const imagePath = salon.image || `/@assets/generated_images/salon-${salon.id}.jpg`;

  const handleGetDirections = () => {
    const query = encodeURIComponent(`${salon.address} ${salon.city} Pakistan`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  const services = {
    'Hair Salon': ['Haircut & Styling', 'Hair Coloring', 'Hair Treatment', 'Blow Dry'],
    'Beauty Parlour': ['Facial Treatment', 'Threading', 'Waxing', 'Manicure & Pedicure'],
    'Makeup Studio': ['Bridal Makeup', 'Party Makeup', 'Makeup Lessons', 'Photoshoot Makeup'],
    'Spa': ['Massage Therapy', 'Body Treatments', 'Relaxation Packages', 'Aromatherapy'],
    'Signature Salon': ['Premium Haircut', 'Advanced Styling', 'Hair Color', 'Treatments'],
    'Beauty Salon': ['Full Beauty Services', 'Hair & Makeup', 'Skin Treatments', 'Nails'],
    'Makeup Studio & Spa': ['Makeup Services', 'Spa Treatments', 'Bridal Packages', 'Wellness'],
  };

  const salonServices = services[salon.category as keyof typeof services] || [
    'Hair Services',
    'Beauty Treatments',
    'Styling',
    'Consultations',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0" data-testid="salon-detail-modal">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {/* Hero Image */}
          <div className="relative h-80 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imagePath})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
              data-testid="close-modal-button"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-4xl font-serif font-semibold text-background mb-3">
                {salon.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-primary text-primary-foreground border-0">
                  {salon.category}
                </Badge>
                <Badge variant="outline" className="border-background/30 text-background bg-background/10 backdrop-blur-sm">
                  <MapPin className="h-3 w-3 mr-1" />
                  {salon.city}
                </Badge>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-semibold text-foreground">Contact Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`tel:${salon.phone}`}
                  className="flex items-center gap-3 p-4 bg-card border border-card-border rounded-xl hover:border-primary transition-colors"
                  data-testid="modal-phone-link"
                >
                  <div className="bg-primary/10 rounded-full p-3">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{salon.phone}</p>
                  </div>
                </a>

                <button
                  onClick={handleGetDirections}
                  className="flex items-center gap-3 p-4 bg-card border border-card-border rounded-xl hover:border-primary transition-colors text-left"
                  data-testid="modal-directions-button"
                >
                  <div className="bg-primary/10 rounded-full p-3">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium line-clamp-1">{salon.address}</p>
                  </div>
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 p-4 bg-card border border-card-border rounded-xl">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.min(Math.ceil(salon.reviewCount / 10), 5)
                          ? 'fill-primary text-primary'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  ({salon.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* About */}
            <div className="space-y-3">
              <h3 className="text-2xl font-serif font-semibold text-foreground">About</h3>
              <p className="text-muted-foreground leading-relaxed">
                {salon.name} is a premier {salon.category.toLowerCase()} in {salon.city}, offering exceptional beauty and wellness services. 
                Our professional team is dedicated to providing personalized care and outstanding results, 
                ensuring every client leaves feeling confident and beautiful.
              </p>
            </div>

            {/* Services */}
            <div className="space-y-3">
              <h3 className="text-2xl font-serif font-semibold text-foreground">Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {salonServices.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-2 p-3 bg-card border border-card-border rounded-lg"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleGetDirections}
                variant="outline"
                className="flex-1"
                data-testid="get-directions-button"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
              {salon.instagram && (
                <Button
                  onClick={() => window.open(salon.instagram, '_blank', 'noopener,noreferrer')}
                  variant="outline"
                  className="flex-1"
                  data-testid="modal-instagram-button"
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  View Instagram
                </Button>
              )}
              <Button
                onClick={() => (window.location.href = `tel:${salon.phone}`)}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="modal-call-button"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
