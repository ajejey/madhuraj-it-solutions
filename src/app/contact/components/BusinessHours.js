import { Clock } from 'lucide-react';

const businessHours = {
  weekdays: '9:00 AM - 7:00 PM',
  friday: '10:00 AM - 7:00 PM',
  weekend: '10:00 AM - 5:00 PM'
};

const BusinessHours = () => {
  return (
    <section className="py-16 bg-cool/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl text-primary font-bold mb-4">Business Hours</h2>
            <p className="text-slate-600">
              Visit us during our business hours for expert IT solutions
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-secondary" />
              <h3 className="text-lg text-primary font-bold">Opening Hours</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Monday - Thursday</span>
                <span className="text-slate-600 font-medium">{businessHours.weekdays}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Friday - Saturday</span>
                <span className="text-slate-600 font-medium">{businessHours.friday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Sunday</span>
                <span className="text-slate-600 font-medium">{businessHours.weekend}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessHours;
