'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    text: "Got my OS issue fixed in a quick time. Very friendly person. Do visit for any computer related issues.",
    rating: 5
  },
  {
    text: "PURCHASED P3424WE -- DELL GOT IT FOR VERY CHEAP PRICE WITH DELL WARRANTY. Mr. BHARATH WAS FRIENDLY AND TECH STRONG.",
    rating: 5
  },
  {
    text: "The best place if you need any genuine software or have any OS related issues. They are reasonable on prices and have good workmanship. Highly suggested.",
    rating: 5
  },
  {
    text: "Excellent service. I am very happy with the service received from Mr. Bharath. Professional work. I'm happy with the CCTV quality. The fitting work is neat and clean. On time work.",
    rating: 5
  },
  {
    text: "Very sincere and honest service by Bharath. Quick and efficient service while other centres had scared us that this laptop had to be junked.",
    rating: 5
  },
  {
    text: "Reached out to Bharath with regard to an issue with my external hard drive. Very impressed by his systematic problem-solving approach. Reflects his technical expertise.",
    rating: 5
  },
  {
    text: "Team of professionals with quick response time and resolution and cost effective too. They suggest what's best for the customer. Customer service is their obsession.",
    rating: 5
  }
];

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
    <div className="flex gap-1 mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
      ))}
    </div>
    <p className="text-white/80 italic">{testimonial.text}</p>
  </div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 3 >= testimonials.length ? 0 : prevIndex + 3
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 3 < 0 ? testimonials.length - 3 : prevIndex - 3
    );
  };

  return (
    <section className="py-20 bg-primary/95">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-white/70">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {Array(Math.ceil(testimonials.length / 3)).fill(0).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / 3) === index
                    ? 'bg-secondary'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
