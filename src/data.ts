import { UserProfile, MarketplaceProduct, BuyerOrder } from './types';

export const INITIAL_USER: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 000-0000',
  location: 'San Francisco, CA',
  role: 'buyer',
  preferredCategories: ['Tech', 'Fashion', 'Home'],
  preference: 'both',
  profilePhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDjHulJsRLAzBb-SDZ3dHg8VbsmscHBe8u3ac1gOk7YA9pw0UbKjA3awMyJFhk00nH5nq19Nb6VEWUXrmc6DtwG-2vAMBKIT_Zd3Yt5ajSb-baflnGErwml_eZLl8edj_BvREUyF50vp5TbHtCaCGPm8-P710NYs6YqMdzc6Lx9S5al1VefMYziIAIRNzGCY8tYGX_sSgWZau1OlJaLxyq774cZQ75IdcLKVK22hMDk_Lj058d2fYUZDOJKwtpT80H5BsntEDQL4nl',
  walletBalance: 1240,
  matePoints: 850,
  activeCoupons: 4,
};

// High-fidelity active product listings
export const INITIAL_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'prod-1',
    title: 'Premium Studio Headphones',
    sellerName: 'TechHub Global',
    price: 299.00,
    isNew: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ6dGHOcFeCgmG5iXXm9rVCSCtqaciWZXZdtsQSe_16mdXnLaIck8o_LmhU2UVh8e-OfmSAdH5xx8laEJ2VtU3DJNcbKMs0Czl2vU6SeqILrJKxVnRhTTKFOysdPvYgb1-1tO-l66x0j5AplL3F_bX4z1KkVTGuzH0jdG3cKGb34fcY5XrOJ8ZpnOkwS5cQJR14N1L1fotL_MZr_TYEqp5LlCI8peXmV9nI2ZZC8ff8bjYUk-nmoNzX4vq4SXFoQ3p596oiHWbW2gC',
    category: 'Tech',
    condition: 'Brand New',
  },
  {
    id: 'prod-2',
    title: 'Classic Leather Watch',
    sellerName: 'Marcus V.',
    price: 125.00,
    rating: 4.8,
    isNew: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9Mw-KxAp93FzmFCiVayPNiaDOYvLEKaGnRQKi57RTnC7yjP-x8KgJzcB-eJwbMwUrBHyTV-q2YhR6uS9j0gZvUNmqkLhYDz5pRd_pqnTetWgh-5IBfASwIHeSUjPK29apfQJA1d3TozGV-fNU1kUZZWIFJP4cQFS8BqrcbzMmBEh9xd2rQUGPXpdwaDO9CpLo0WOSfCbw_PcjgmGMe8qfHW_NTCcdL0SuibiTxcv7HfHMVwWOUSMDyhBCORpnwgD-99_4L4AVB1eZ',
    category: 'Fashion',
    condition: 'Second-Hand',
  },
  {
    id: 'prod-3',
    title: 'Performance Run Series',
    sellerName: 'Sporty Outlet',
    price: 89.50,
    isNew: true,
    hasShipping: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvcaj5EwVdnHye0gLK_dOvGo1AC720JUvKqhBT9kPzu_MOP-h7xKta_yvt3L_eg_-L_ZH6YqQq2IutGxu7vrJ05R4w5ikrMfh8XfZo9PKHkufh7OO7Gy6VcFDTw37Qk88VPrseswA9T25gKPu1darmMb6xYOp0aIkpEMuzQV7IgXJJekIoHfJ45uNErN70oKlk4Jzzn-BxrR1OuOIumTVbALkb7wftdmdD_xirec4yd3xqJ-bk9rzaAg0IXFEbK6auNP1e2BARwW-X',
    category: 'Footwear',
    condition: 'Brand New',
  },
  {
    id: 'prod-4',
    title: 'Vintage 35mm Film Camera',
    sellerName: "Sara's Attic",
    price: 450.00,
    isNew: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTP7HEsUgaRqm083AdePFJWLsVvsqwW7odDePhlKgjO_KNQJU6uBMDr7Nm6_npwY9P_zNPy3fXSxp-_9g2PJ9w6t-3WZR55YvczWWXMQv58oNDh1nPNI2SxlAeJE1fRmD8CZY5wIabWlYWnBczzgxSGKgwv0aKrQs20wAfymTxIRvt6aefrRLgiOo8Fix0Ty0BMMwUMLuZaNRDxosncKm-ZzMmatqdUTPCC6Ej4CFLFTbKZKp7-6LBr-GZZT2BCoXb4nxAtq5eV6EY',
    category: 'Photography',
    condition: 'Second-Hand',
  },
  {
    id: 'prod-5',
    title: 'ErgoFlow Pro Chair',
    sellerName: 'OfficeDirect',
    price: 180.00,
    isNew: true,
    isBestseller: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKpaZPUKKiyFYRFoP8-Rvyz_QeB-azS8U5pk5ZSzb0l6U7wtOZ1yPg0EVnsGu-or1n7O1wriIRNg_tKfl9TYbXIYI2Q0ooEVa7_malwI_74GWl8NEI3jHa6WwaQnd53YyVm3IEEcy5QXO7dF2ib3p2JclPftmQOB86v6ioJ93PKWCMC1jS86RaOnAptYVb5aGoLSH_RMw55ykejkwEcs9hbwAiLeApgwaAMjGmDGwQ4oqPpnTLfDlqiO-ZqI_cZDYm3drjU01uPy_9',
    category: 'Home',
    condition: 'Brand New',
  },
  {
    id: 'prod-6',
    title: 'X-Broadcaster Mic',
    sellerName: 'MediaMart',
    price: 210.00,
    isNew: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmCBtbkRMrt71G-lDr5KOcZLsw3fNJEM9G07mKCQ30pVgORBLqtbUL6PpfNuYFxGiY_039EuO7ScLr0kG7yjr-Z39Y0QFRhCxV9QhghQpQUrh475_RH8xW1iAIi9_B3zt1ncphCoonF_Rbpg63RPrMosntn5ub8mg_36_95McpTXC1VrrZ4k8CWtlf4jhZZofSJCCRYSd_gcpiLkFzxMfNmUlVhrVzgeRrEjgzgBxwXePoR9x7AQzy688RgaLzrNGhKZ2if-R-Sg6m',
    category: 'Tech',
    condition: 'Brand New',
  },
  {
    id: 'prod-7',
    title: 'Solid Oak Desk Set',
    sellerName: 'Woodcrafts',
    price: 45.00,
    isNew: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8pHjdcg5fekb5hms2exeNUj0I6RhhDkHPIbblirz1ZBFG3VzADmWp2fV8qUq3Xw4W7C42vnXi8OalJ6Vp3yFtTVqO6Rx-jlo8VKwtgovVQYzPRZuYifmKMc-UiJRxk-iSOSAJmcLobI9TR-uMJ0oNdL_YQt8Cpdctq6RpWqgrmeyFhYjdMLFwL4xOTxNJuY4A9hakWcuhIQUyz0A4SO1vr6253Ooj7fe9bUzCm6eGMPweBsSPIJ5Lixxr5K0Xhkb25Yzcfu2kmzmI',
    category: 'Home',
    condition: 'Second-Hand',
  },
];

// Buyer specific orders: matching "Active Orders" inside Buyer Dashboard
export const INITIAL_BUYER_ORDERS: BuyerOrder[] = [
  {
    id: 'bo-1',
    productTitle: 'Nike Air Zoom Pegasus',
    orderNumber: '#MM-82931',
    arrivesString: 'Arrives Friday',
    status: 'In Transit',
    price: 120.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU7ULwVfW0T98j7d2V2ZsMvXdaUStu3OcYZcozmGZS1gwsjsH0qeL1Bs51hIExhHIIexDFHuH98qP_UJm7G8JTaPiEz1lsuScqBJrrxTTAB0XleP5UeFtEhN437i5LJzBAVPmKz4iIvAntXJcPbFzZNfHlItYmxNF_FWxL95W-ucTOkmzKVCCCqkRYnT4RZYhXIhD1aDEddSohhkrsQ1cRGm3q1795Xnutfhkz4zcmIMjJ5qI1nFemhFuljlVEJJhCl3Q8qR9BDrlL',
  },
  {
    id: 'bo-2',
    productTitle: 'Classic Leather Watch',
    orderNumber: '#MM-82945',
    arrivesString: 'Estimated Monday',
    status: 'Processing',
    price: 195.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBjr7w07QIgHgLMuM9cejMNu5o8Wz7FxdZwfWYzB_lFi-ME_HYKojd-mfskF4mlQ_aMsQ6pyEJZwcTbAm6vm--ANgxiwA92OjDk2Go9B9SaJuZ4opnSFwVYqTgm-0JboI6mknGPRvgvgnNJzW2TsKqEF2tpZA-5nujZzqJky9PS8DjGRH1DdbZBa-Hbt7W-n8hQ0vzRs4apTVaRUT0dpRL2qT09VEO6VKuICObPSJt-LtbGR0TTCh9mATBdIMssWbgJBjCxe9mD-KP',
  },
];

export const INITIAL_PURCHASE_HISTORY = [
  { id: '#MM-71204', date: 'Oct 24, 2023', status: 'Delivered', total: 42.50 },
  { id: '#MM-69812', date: 'Sep 15, 2023', status: 'Delivered', total: 315.00 },
  { id: '#MM-65230', date: 'Aug 02, 2023', status: 'Returned', total: 12.99 },
];

// Seller Dashboard generic orders ("Recent Orders")
export interface SellerOrder {
  id: string;
  title: string;
  orderNumber: string;
  timeString: string;
  price: number;
  status: 'Paid' | 'Pending';
  image: string;
}

export const INITIAL_SELLER_ORDERS: SellerOrder[] = [
  {
    id: 'so-1',
    title: 'Premium Chrono Watch',
    orderNumber: '#8421',
    timeString: '2 mins ago',
    price: 199.00,
    status: 'Paid',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfHnyaOfE5672yUH-vH-_5c7zhfuFdlxI-xjEmTIwf2-lWX0xcLEqhKpDzH9OPZeqKaBDdG7eF1_o7dAh1fgwEwvwVY3iZWbosVEKi5TGXqQ0VFmDyghKraQRt2pzrgwTVdfU-5zzQi5EUCE8HBo02aImyp4m0gNNNfgcecL6tFFlWmPk2OnISC_99IynRf_zxd89_nxD0--9XZSC63-Guvc1ZQklDVKFYWFuO4MKWxkXkpTo4CXl5H1AyOnHSNfETTz4J6n2f23hJ',
  },
  {
    id: 'so-2',
    title: 'Acoustic Pro Headphones',
    orderNumber: '#8420',
    timeString: '15 mins ago',
    price: 299.00,
    status: 'Pending',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuTY3G9SuYUk2BAKwjP33eN-30Zh-b1TF6U5VBzTau-WUOluZkWbW3WOh_mgVlBA6N1vUhUz6--hkJZMK-rDr9aBRB2wyruYbUdZKrQ9F_0-3BirT8OhyIASaCYk-qFA1uXXwH88KGcZCg6En5i248yp2eLwqZ2kwHZ1q9JYGQAeB9wC_2yN_jb8pziqTew8Sj3pVNGhoM1QmhTS45V9FsbwmSfV-GRcjpDkSGDSQl4IqtN3Kk2tX8Hrhmjm7GGPpPYvB6TYfb6b_h',
  },
  {
    id: 'so-3',
    title: 'Vortex Run Sneakers',
    orderNumber: '#8419',
    timeString: '1 hour ago',
    price: 89.00,
    status: 'Paid',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfPLYVYVnm728kgODXzix05lUp7jOh5MSQD3P3gjEtDVjk2ruhDorSnxtvnh_Zvme45Mfbuv76K9cLzErW4gEfiIZerqMhFtgOXsxBaFOxHUwQjvbAUHBJ2rOZOlw-pWfJDSALFbgfOAT9zi4jRECKvMmeVQ93j3zXJ76XGz4edUy9j7YC4__xCceY0noKd70AJc3VucVzrmgJ_5fPwiDwfkDvBXHOJ_i6bKyHEe0CMe8tZ6cjcxd12QU0_M_ctc_cdy1eEWPl8PVp',
  },
];

// Admin Panel related items
export interface AdminModerationCase {
  id: string;
  title: string;
  type: string;
  image?: string;
  reason: string;
  reporter: string;
}

export const INITIAL_MODERATION_CASES: AdminModerationCase[] = [
  {
    id: 'case-1',
    title: 'Nike Air Jordan',
    type: 'Listing #4920',
    reason: 'Counterfeit Claim',
    reporter: 'Alex Rivera',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6NiNn0UKU078bi-qyXHkqsjqHPKE9PjgRU_YGgEJFb_fPYpNu-ToCA29OdZHeFWzXuDrNFyRvqA5OSGYwXgQRsK1PlKu4zmaUIExdPzqRkSqapGMf5ltF_iLmLHKwZdV745Gf3GjmwZlZNqgE8X--pl2WBfQi10fKO_b8WAAia1jASsr_to8qn4lIxXBN9qWQvhUGxO17qa6-LJ9lND_YlGCBLEei8syvzBEvlDRBj8l5kulyA46tSlmW6ZURLe0d-0dRszGSmfXG',
  },
  {
    id: 'case-2',
    title: 'Review #1203',
    type: 'User @techie99',
    reason: 'Spam / Bots',
    reporter: 'System Audit',
  },
  {
    id: 'case-3',
    title: 'Seiko Presage',
    type: 'Listing #5011',
    reason: 'Inappropriate Img',
    reporter: 'Emma Wilson',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBjcGxa40C7SBZ1P9viZGk_aAI_-tD9kvpkcHIexy_FdieZFh3UGehAGnvTEZNf3uZq4AP8FR3UhfCOmr-meKA1aw7zZrI42qLMWkpf7_F3Ug6MliAgDdV6reCrNsp-Yn31FhJoC_KTAXtktbDJwfHojx9aVbnweO7WjDotTsqozK9PS4bhngdXiTSfR4W3YouGLdvas_H85Yz1D8bA3SEvlbAY-QN_hUgRdsn4AbCmacoC06ZY3E4aAAPEV5vTpSTIvY4rOW1jI7O',
  },
];

export interface AdminUserActivity {
  id: string;
  name: string;
  joined: string;
  type: 'Buyer' | 'Seller';
  status: 'Active' | 'Offline' | 'Suspended';
  timeAgo: string;
  avatar: string;
}

export const INITIAL_USER_ACTIVITIES: AdminUserActivity[] = [
  {
    id: 'ua-1',
    name: 'Felix Vance',
    joined: 'Joined Jan 2024',
    type: 'Buyer',
    status: 'Active',
    timeAgo: '2 mins ago',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmU983WubCOXTIyLg2kAbWuoyGP6jxeE6ChTwi22ERRgk3EzW5XJEIW77ycej36YmWTlzx8B1xqB2KNs9G8cTHQY__ac3jaPEV_WBHb2evF0YqpaElnHltXFBGw_4SccR1qoZGSf-Oz9OrEBa377ENwPKlQkfbfWlblKjjgi7yWmnaE37GRUrbLhRdqMMmqh0rKqUkiah8obLillQAZbacH2pKnbz6_CHxRDf2iGVn3N9qsvOvXEzdHujjaSFCjBMXZ2YppfBQsNWC',
  },
  {
    id: 'ua-2',
    name: 'Sarah Jenkins',
    joined: 'Joined Dec 2023',
    type: 'Seller',
    status: 'Offline',
    timeAgo: '4h ago',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwSx1NEzSVzM58BTK9u9Yv14Qah8ENvlcv6q5SrtgYAInLwxxklQK-rWzZYARZ_Ibf3Y8hqbtrDvN0eWlwd8GvGO8ygbr2VrEj6wO65Qx8mgGaz1wz9pwCfrjCKbXHhS-3-OGHWMqWjwbnEr77VOzeoARr1QTVLrmr0yLby_aqkTTZaM3WDDOglZGdNHT672zB5MExmRirwGt1pLY169lZ1IkAJ313d_Tytv_y6uldtgEJy1wekzYc8SUi9dbKUsmIqSo1edPOyT2z',
  },
  {
    id: 'ua-3',
    name: 'Marcus Thorne',
    joined: 'Joined Feb 2024',
    type: 'Seller',
    status: 'Suspended',
    timeAgo: 'Admin Restricted',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIBCMG-wgorvvv8K2VZK27M4wZeqjR0C6rGmBR0keNDQviMpPoo-WqrjRJfkJCwGyd7C3sciPh5iTuF6lK_lJYb6qaOvInFfr0GSQwEKIQI0RS1idkTW334rWygXDy6wvcLnAW0CyUFy5yVuykOAlU6jjjbeJmdmrUIKUGTfiYLqTiLcnqY6bj8VKuz-PsAUZYEaDu8cC-UxwcNQTVO8cvOwiJMZBSTkOYbjM8b_nWZQ2OsDxaeCOnmF8HMHMn3TeEFGx_90bdFWjQ',
  },
];
