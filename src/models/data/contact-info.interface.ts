export interface ContactInfo {
  contactOptions: ContactOption[];
}

export interface ContactOption {
  id: number;
  icon: string;
  title: string;
  value: string;
  link: string;
  message: string;
}
