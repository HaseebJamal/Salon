import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Scissors, Sparkles, Palette, Flower2, Heart, Wand2, Leaf } from 'lucide-react';
import categoryHairPath from '@assets/generated_images/category-hair-salon.jpg';
import categoryBeautyPath from '@assets/generated_images/category-beauty-parlour.jpg';
import categoryMakeupPath from '@assets/generated_images/category-makeup-studio.jpg';
import categorySpaPath from '@assets/generated_images/category-spa.jpg';
import categoryBridalPath from '@assets/generated_images/category-bridal.jpg';
import categoryStylingPath from '@assets/generated_images/category-styling.jpg';
import categorySkincarePathfrom from '@assets/generated_images/category-skincare.jpg';

const categories = [
  { name: 'Hair Salons', icon: Scissors, count: 3, image: categoryHairPath },
  { name: 'Beauty Parlours', icon: Sparkles, count: 3, image: categoryBeautyPath },
  { name: 'Makeup Studios', icon: Palette, count: 1, image: categoryMakeupPath },
  { name: 'Spas', icon: Flower2, count: 1, image: categorySpaPath },
  { name: 'Bridal Makeup', icon: Heart, count: 2, image: categoryBridalPath },
  { name: 'Hair Styling', icon: Wand2, count: 4, image: categoryStylingPath },
  { name: 'Skincare', icon: Leaf, count: 2, image: categorySkincarePathfrom },
];

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = category.icon;

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      data-testid={`category-card-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
        {/* Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent group-hover:from-primary/80 group-hover:via-primary/40 transition-all duration-500" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-background/20 backdrop-blur-sm rounded-full p-3">
              <Icon className="h-6 w-6 text-background" />
            </div>
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              {category.count}
            </div>
          </div>

          <h3 className="text-2xl font-serif font-semibold text-background">
            {category.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export function CategoriesSection() {
  return (
    <section id="categories" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-foreground mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover specialized beauty services tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
