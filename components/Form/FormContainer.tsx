'use client'

import { toast } from "sonner";

interface FormContainerProps {
  action: (prevState: Record<string, unknown>, formData: FormData) => Promise<{ message: string }>;
  children: React.ReactNode;
}

const FormContainer = ({ action, children }: FormContainerProps) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    action({}, formData).then((res) => {
      toast.message(res.message);
    });
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default FormContainer;
