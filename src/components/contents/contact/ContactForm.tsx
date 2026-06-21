import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import clsx from "clsx";
import AppTextField from "@/components/common/inputs/AppTextField";
import AppTextArea from "@/components/common/inputs/AppTextArea";
import { AppButton } from "@/components/common/buttons";

const emailFormSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod.email("Invalid email address"),
  message: zod.string().min(1, "Message is required"),
  website: zod.string().max(0, "Spam detected"),
});

type EmailFormData = zod.infer<typeof emailFormSchema>;

export default function ContactForm({
  isLoading,
  onSubmit,
}: {
  isLoading: boolean;
  onSubmit: (data: EmailFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppTextField
        required
        id="name"
        label="Name"
        placeholder="John Doe"
        {...register("name")}
      >
        {errors.name && <p>{errors.name.message}</p>}
      </AppTextField>

      <AppTextField
        required
        id="email"
        label="Email"
        placeholder="john.doe@example.com"
        type="email"
        {...register("email")}
      >
        {errors.email && <p>{errors.email.message}</p>}
      </AppTextField>

      <AppTextArea
        required
        rows={5}
        id="message"
        label="Message"
        placeholder="Tell me about your project or idea..."
        className="resize-none"
        {...register("message")}
      >
        {errors.message && <p>{errors.message.message}</p>}
      </AppTextArea>

      {/* Honeypot field */}
      <div aria-hidden="true" className="absolute hidden -left-2499.75">
        <AppTextField
          required
          tabIndex={-1}
          id="website"
          label="Website"
          autoComplete="off"
          placeholder="john.doe@example.com"
          {...register("website")}
        />
      </div>

      <AppButton
        type="submit"
        disabled={isLoading}
        aria-label={isLoading ? "Sending..." : "Send message"}
        className={clsx(
          "w-full flex items-center justify-center gap-2",
          isLoading
            ? "opacity-60 cursor-not-allowed"
            : "opacity-100 cursor-pointer",
        )}
      >
        {isLoading ? (
          <motion.div
            role="status"
            aria-label="Sending message"
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 0.7,
            }}
          />
        ) : (
          <span>
            <Send size={16} />
            Send Message
          </span>
        )}
      </AppButton>
    </form>
  );
}
