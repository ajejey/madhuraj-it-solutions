const Location = () => {
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl text-primary font-bold mb-4">Visit Us</h2>
            <p className="text-slate-600">
              Find us at our convenient location in Rajarajeshwari Nagar
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15553.886019164246!2d77.5197297!3d12.9263799!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f21222d9a95%3A0xce9ea137b855e4e7!2sMADHURAJ%20SYSTEM%20SOLUTIONS!5e0!3m2!1sen!2sin!4v1704557039591!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className=" transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
