export type RentalCartItem = {
    bookId: string;
    title: string;
    author: string;
    coverImage: string;
    dailyRentalPrice: number;
    rentalDays: number;
    ownerId: string; // who owns the book
  };
  
  export type RentalCartState = {
    rentalItems: RentalCartItem[];
    totalBooks: number;
    rentalSubtotal: number;
    estimatedShipping: number;
    tax: number;
    totalRentalCost: number;
  };
  export type Book = {
  id: string;
  title: string; // Bilingual title
  author: string; // Bilingual author name
  isbn: string;
  publisher: string; // Bilingual publisher
  edition: string; // Bilingual edition
  description: string; // Bilingual description
  condition: 'NEW' | 'LIKE_NEW' | 'VERY_GOOD';
  category: string; // Bilingual category
  language: string; // Bilingual language
  pageCount: number;
  images: string[]; // Array of image URLs
  dailyPrice: number;
  deposit: number;
  status: 'AVAILABLE' | 'RENTED' | 'UNDER_MAINTENANCE' | 'LOST' | 'RESERVED';
  featured: boolean;
  ownerId: string;
  location: string; // Bilingual location
  createdAt: string | Date; // ISO date string or Date object
  updatedAt: string | Date; // ISO date string or Date object
  // Optional fields if they exist in some books:
  altTitle?: string; // Bilingual alternative title
  tags?: string[]; // Array of tags
  views?: number;
};
export type CartItem = {
  book: Book | null;
  id: string;
  userId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};