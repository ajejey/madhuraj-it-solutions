const Story = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl text-primary font-bold mb-6">Our Story</h2>
              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  Madhuraj System Solutions was founded with a vision to provide comprehensive IT solutions 
                  that combine technical expertise with exceptional customer service. Over the years, 
                  we've grown from a small computer service center to a full-service IT solutions provider.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Our journey has been marked by continuous learning, adaptation to emerging technologies, 
                  and an unwavering commitment to customer satisfaction. We've built lasting relationships 
                  with our clients, helping them navigate the ever-evolving technology landscape.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-cool rounded-2xl overflow-hidden">
                <img 
                  src="/images/about/office.jpg" 
                  alt="Our Office" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-sm">
                <p className="text-4xl font-bold text-primary">10+</p>
                <p className="text-slate-600">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
