import { Code, Smartphone, Palette, Zap } from 'lucide-react';

export const servicesData = [
  {
    id: 'web-dev',
    icon: Code,
    gradient: "from-blue-500 to-cyan-500",
    titleKey: 'services.service1.title',
    descriptionKey: 'services.service1.description'
  },
  {
    id: 'mobile-dev',
    icon: Smartphone,
    gradient: "from-purple-500 to-pink-500",
    titleKey: 'services.service2.title',
    descriptionKey: 'services.service2.description'
  },
  {
    id: 'ui-ux',
    icon: Palette,
    gradient: "from-orange-500 to-red-500",
    titleKey: 'services.service3.title',
    descriptionKey: 'services.service3.description'
  },
  {
    id: 'cloud',
    icon: Zap,
    gradient: "from-green-500 to-teal-500",
    titleKey: 'services.service4.title',
    descriptionKey: 'services.service4.description'
  }
];