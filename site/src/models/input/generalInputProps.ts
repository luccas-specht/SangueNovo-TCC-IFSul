import { ReactNode } from "react";

export interface GeneralInputProps {
  id: string;
  icon: ReactNode;
  name: string;
  value: string;
  error?: string | false;
  placeholder: string;
  onChange: (e: any) => void;
}
