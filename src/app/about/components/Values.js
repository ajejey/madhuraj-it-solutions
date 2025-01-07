import { Shield, Users, Lightbulb, Heart } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Trust & Reliability',
    description: 'We build lasting relationships through transparent practices and dependable service.'
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Your success is our priority. We go above and beyond to exceed your expectations.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We stay ahead of technology trends to provide cutting-edge solutions.'
  },
  {
    icon: Heart,
    title: 'Passion',
    description: "We're passionate about technology and its power to transform businesses."
  }
];

const Values = () => {
  return (
    <section className="py-16 bg-cool/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl text-primary font-bold mb-4">Our Values</h2>
            <p className="text-slate-600">
              The principles that guide us in delivering excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-cool rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg text-primary font-bold mb-2">
                        {value.title}
                      </h3>
                      <p className="text-slate-600">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
