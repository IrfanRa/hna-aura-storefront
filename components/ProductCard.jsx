'use client'; // (1) "Add to Cart" ka click yahan hai

import { useCart } from './cart-context'; // (2) board se 'add' uthao
import { fmt, stripHtml } from './format'; // (3) keemat/naam saaf karne wale tools

// (4) Ek product ka card — product ka data aur tamgha props mein aata hai
export default function ProductCard({ product: p, badge, delay }) {
  const { add } = useCart();

  const img = p.images?.[0]?.src || '/logo.webp'; // (5) pehli tasveer; na ho to logo
  const hasSale = p.sale_price && p.sale_price !== ''; // (6) kya sale lagi hai?

  // (7) Card par click = product page; button par click = sirf cart (event roko)
  // Variable product (size/colour) par seedha add nahi — options select karne bhejo
  const isVariable = p.type === 'variable';
  const onAdd = (e) => {
    e.preventDefault(); // (8) parent <a> ko khulne se roko
    e.stopPropagation();
    add({
      id: p.id,
      name: stripHtml(p.name),
      price: Number(p.price) || 0,
      image: p.images?.[0]?.src || '/logo.webp',
    });
  };

  return (
    <article className={`card reveal ${delay || ''}`}>
      <div className="card-img">
        <span className="badge">{badge}</span>
        <img src={img} alt={stripHtml(p.name)} loading="lazy" />
      </div>
      <div className="card-body">
        <div className="card-cat">{p.categories?.[0]?.name || 'Jewellery'}</div>
        <h3>{stripHtml(p.name)}</h3>
        <div className="price">
          <span className="now">{fmt(p.price)}</span>
          {hasSale && <span className="was">{fmt(p.regular_price)}</span>}
        </div>
        {isVariable ? (
          // (9) Size/colour wala product — options product page par select hon ge
          // (button par click parent <a> tak jane do taake product page khule)
          <button className="add-btn" type="button">Select Options</button>
        ) : (
          <button className="add-btn" onClick={onAdd}>Add to Cart</button>
        )}
      </div>
    </article>
  );
}
