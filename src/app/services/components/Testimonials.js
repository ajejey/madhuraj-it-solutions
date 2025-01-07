'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    text: "Got my OS issue fixed in a quick time. Very friendly person. Do visit for any computer related issues.",
    rating: 5,
    content: "Got my OS issue fixed in a quick time. Very friendly person. Do visit for any computer related issues.",
    author: "Nik",
  },
  {
    text: "PURCHASED P3424WE -- DELL GOT IT FOR VERY CHEAP PRICE WITH DELL WARRANTY. Mr. BHARATH WAS FRIENDLY AND TECH STRONG.",
    rating: 5,
    content: "PURCHASED P3424WE -- DELL GOT IT FOR VERY CHEAP PRICE WITH DELL WARRANTY. Mr. BHARATH WAS FRIENDLY AND TECH STRONG.",
    author: "Karthick Kumar",
  },
  {
    text: "The best place if you need any genuine software or have any OS related issues. They are reasonable on prices and have good workmanship. Highly suggested.",
    rating: 5,
    content: "The best place if you need any genuine software or have any OS related issues. They are reasonable on prices and have good workmanship. Highly suggested.",
    author: "Ashrith Merve",
  },
  {
    text: "Excellent service. I am very happy with the service received from Mr. Bharath. Professional work. I'm happy with the CCTV quality. The fitting work is neat and clean. On time work.",
    rating: 5,
    content: "Excellent service. I am very happy with the service received from Mr. Bharath. Professional work. I'm happy with the CCTV quality. The fitting work is neat and clean. On time work.",
    author: "Siri Shree",
  },
  {
    text: "Very sincere and honest service by Bharath. Quick and efficient service while other centres had scared us that this laptop had to be junked.",
    rating: 5,
    content: "Very sincere and honest service by Bharath. Quick and efficient service while other centres had scared us that this laptop had to be junked.",
    author: "Anand Kakarla",
  },
  {
    text: "Reached out to Bharath with regard to an issue with my external hard drive. Very impressed by his systematic problem-solving approach. Reflects his technical expertise.",
    rating: 5,
    content: "Reached out to Bharath with regard to an issue with my external hard drive. Very impressed by his systematic problem-solving approach. Reflects his technical expertise.",
    author: "Ravi Kiran",
  },
  {
    text: "Team of professionals with quick response time and resolution and cost effective too. They suggest what's best for the customer. Customer service is their obsession.",
    rating: 5,
    content: "Team of professionals with quick response time and resolution and cost effective too. They suggest what's best for the customer. Customer service is their obsession.",
    author: "Jagadeesh G",
  }
];

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate/10">
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-accent" fill="#D97706" />
          ))}
        </div>
      </div>
      <p className="text-slate/70 font-montserrat mb-6 flex-grow">
        {testimonial.content}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-cool flex items-center justify-center">
            <span className="text-xl font-playfair text-primary">
              {testimonial.author[0]}
            </span>
          </div>
        </div>
        <div>
          <h4 className="font-playfair text-primary">{testimonial.author}</h4>
          <p className="text-sm text-slate/60 font-montserrat">{testimonial.title}</p>
        </div>
      </div>
    </div>
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
    <section className="py-24 bg-primary/95">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair text-white mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-white/60 font-montserrat">
            What our valued clients say about our services
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-3 rounded-full bg-white/[0.02] border border-white/[0.05] text-white/80 hover:bg-white/[0.05] transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-3 rounded-full bg-white/[0.02] border border-white/[0.05] text-white/80 hover:bg-white/[0.05] transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-12">
            {Array(Math.ceil(testimonials.length / 3)).fill(0).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / 3) === index
                    ? 'bg-secondary/80'
                    : 'bg-white/[0.05] hover:bg-white/[0.1]'
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
