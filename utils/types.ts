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
  export type TypeBook = {
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
export type TypeUser = {
  name: string;
  email: string;
  image?: string;
}
export type TypeSession = {
  user: User | null;
}

export type TypeUserNavProps = {
  session: Session | undefined;
  data: CartItem[];
}

export type CartItem = {
  book: TypeBook | null;
  id: string;
  userId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};
export type TypeProduct = {
  id: string;
  title: string;
  altTitle: string | null;
  author: string;
  isbn: string | null;
  publisher: string;
  edition: string | null;
  description: string;
  rating: number;
  pages: number;
  publishedYear: string | number;
  dailyPrice: number;
  status: 'AVAILABLE' | 'RENTED' | 'UNDER_MAINTENANCE' | 'LOST' | 'RESERVED';
  category: string;
  language: string;
  condition: 'NEW' | 'LIKE_NEW' | 'VERY_GOOD';
  images: string[];
  deposit?: number;
  featured?: boolean;
  ownerId?: string;
  location?: string;
  tags?: string[];
  views?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};