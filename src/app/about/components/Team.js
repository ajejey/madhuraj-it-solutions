const teamMembers = [
  {
    name: 'Bharath',
    role: 'Founder & Technical Director',
    image: '/images/team/bharath.jpg',
    description: 'With extensive experience in IT solutions, Bharath leads our technical operations and ensures the highest quality of service delivery.'
  }
  // Add more team members if needed
];

const Team = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl text-primary font-bold mb-4">Our Team</h2>
            <p className="text-slate-600">
              Meet the experts behind our success
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <div className="aspect-[4/3] bg-cool">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-primary font-bold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-secondary mb-4">{member.role}</p>
                  <p className="text-slate-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
