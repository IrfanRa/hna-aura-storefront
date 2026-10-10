// ===== Chhoti madadgaar functions =====
// Sirf hisaab-kitab — koi dikhawa nahi, is liye 'use client' nahi chahiye.

// (1) Keemat ko "PKR 12,499" jaisa khubsurat banao
export const fmt = (n) => 'PKR ' + Number(n || 0).toLocaleString('en-PK');

// (2) WooCommerce ka naam kabhi <p> tags ke sath aata hai — HTML tags saaf karo
export const stripHtml = (s = '') => s.replace(/<[^>]*>/g, '').trim();

// (3) Product card par lagne wale tamghay (bari bari milenge)
export const BADGES = ['Bestseller', 'New', 'Limited', 'Premium'];
