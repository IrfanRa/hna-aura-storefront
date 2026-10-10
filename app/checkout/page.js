// ===== Checkout page — SERVER wrapper, form CLIENT hai =====
import SiteShell from '@/components/SiteShell';
import CheckoutForm from '@/components/CheckoutForm';
import { getProducts } from '@/lib/woocommerce';

export const metadata = {
  title: 'Checkout',
  description: 'H&A Aura checkout — Cash on Delivery. Enter your name, address and phone to place your order.',
  // (1) Checkout Google mein index na ho
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const products = await getProducts(); // (2) shell ke cart drawer ke liye
  return (
    <SiteShell products={products}>
      <CheckoutForm />
    </SiteShell>
  );
}
