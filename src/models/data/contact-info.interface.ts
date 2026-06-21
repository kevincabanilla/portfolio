import type { ToastType } from "@/components/common/ui/Toast";

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

export interface EmailFormData {
  name: string;
  email: string;
  message: string;
}

export interface EmailFormStatus {
  type: ToastType;
  message: string;
}
