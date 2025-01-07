'use client';

import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { Award, Computer, Users, CheckCircle } from 'lucide-react';

const achievements = [
  {
    icon: Computer,
    number: 500,
    suffix: '+',
    label: 'Computers Serviced',
    description: 'Comprehensive repairs and maintenance'
  },
  {
    icon: Users,
    number: 250,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Trusted by businesses and individuals'
  },
  {
    icon: Award,
    number: 10,
    suffix: '+',
    label: 'Years of Experience',
    description: 'Delivering top-notch IT solutions'
  },
  {
    icon: CheckCircle,
    number: 1000,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Successful IT implementations'
  }
];

const ProjectAchievements = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const achievementsSection = document.getElementById('achievements');
      if (achievementsSection) {
        const rect = achievementsSection.getBoundingClientRect();
        const isInView = (
          rect.top >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
        setIsVisible(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="achievements" className="py-16 bg-cool/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl text-primary font-bold mb-4">
            Our Achievements
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A testament to our commitment to excellence and customer satisfaction
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-cool rounded-full">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary mb-2">
                    {isVisible && (
                      <CountUp 
                        end={achievement.number} 
                        duration={2} 
                        suffix={achievement.suffix || ''} 
                      />
                    )}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {achievement.label}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {achievement.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectAchievements;
