export interface Review {
  id: number;
  created_at: string;
  created_by: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  rate: number;
  text: string;
  product: number;
}
