import { motion } from 'framer-motion';
import { Search, Award, Phone, Instagram } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Discover Easily',
    description: 'Find salons & beauty professionals in your area with our intuitive search',
  },
  {
    icon: Award,
    title: 'Trusted Businesses',
    description: 'Explore established local beauty businesses with verified reviews',
  },
  {
    icon: Phone,
    title: 'Easy Contact',
    description: 'Call or connect with salons instantly with one-click communication',
  },
  {
    icon: Instagram,
    title: 'Explore Instagram',
    description: 'View salon profiles and their latest work on social media',
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-foreground mb-4">
            Why Choose Beauty District
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted platform for discovering exceptional beauty services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="text-center p-6 rounded-2xl bg-card border border-card-border hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                data-testid={`feature-card-${index}`}
              >
                <motion.div
                  className="inline-block p-4 bg-primary/10 rounded-2xl mb-4"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="h-8 w-8 text-primary" />
                </motion.div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
