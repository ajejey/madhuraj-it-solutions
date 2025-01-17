import Footer from "../components/layout/Footer";

export const dynamic = 'force-dynamic';

export default function OrdersLayout({ children }) {
  return (
    <section className="min-h-screen bg-gray-50">
      {children}
      <Footer />
    </section>
  );
}
