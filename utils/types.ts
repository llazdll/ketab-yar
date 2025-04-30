
export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;
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
  