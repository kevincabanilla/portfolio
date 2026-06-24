import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
  type FieldErrors,
} from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import clsx from "clsx";
import { AppButton } from "@/components/common/buttons";
import { AppTextArea, AppTextField } from "@/components/common/inputs";

const MAX_NAME_LENGTH = 50;
const MAX_EMAIL_LENGTH = 50;
const MAX_MESSAGE_LENGTH = 1000;

const emailFormSchema = zod.object({
  name: zod
    .string()
    .min(1, "Name is required")
    .max(MAX_NAME_LENGTH, "Cannot exceed max character limit for Name."),
  email: zod
    .email("Invalid email address")
    .max(MAX_EMAIL_LENGTH, "Cannot exceed max character limit for Email."),
  message: zod
    .string()
    .min(1, "Message is required")
    .max(MAX_MESSAGE_LENGTH, "Cannot exceed max character limit for Message."),
  emailSubject: zod.string().max(0, "Spam detected"),
});

export type EmailFormData = zod.infer<typeof emailFormSchema>;

export default function ContactForm({
  isLoading,
  onSubmit,
  onError,
}: {
  isLoading: boolean;
  onSubmit: (data: EmailFormData, onComplete: () => void) => void;
  onError: (errors: FieldErrors<EmailFormData>) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      emailSubject: "",
    },
  });

  const onValidSubmit: SubmitHandler<EmailFormData> = (data) => {
    onSubmit(data, reset);
  };

  const onInvalidSubmit: SubmitErrorHandler<EmailFormData> = (data) => {
    onError(data);
  };

  return (
    <form
      className="flex flex-col gap-4 py-5 px-4.5 md:py-8 md:px-7"
      onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
    >
      <div>
        <AppTextField
          id="name"
          label="Name"
          placeholder="John Doe"
          maxLength={MAX_NAME_LENGTH}
          errorMessage={errors.name?.message}
          {...register("name")}
        />
      </div>

      <div>
        <AppTextField
          id="email"
          label="Email"
          type="email"
          placeholder="john.doe@example.com"
          maxLength={MAX_EMAIL_LENGTH}
          errorMessage={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div>
        <AppTextArea
          rows={5}
          id="message"
          label="Message"
          placeholder="Tell me about your project or just say hi..."
          className="resize-none"
          maxLength={MAX_MESSAGE_LENGTH}
          errorMessage={errors.message?.message}
          {...register("message")}
        />
      </div>

      {/* Honeypot field */}
      <div aria-hidden="true" className="absolute hidden -left-2499.75">
        <AppTextField
          tabIndex={-1}
          id="emailSubject"
          label="Subject"
          autoComplete="off"
          placeholder="Email Subject"
          {...register("emailSubject")}
        />
      </div>

      <AppButton
        rounded
        type="submit"
        loadingMessage="Sending..."
        disabled={isLoading}
        isLoading={isLoading}
        aria-label={isLoading ? "Sending..." : "Send message"}
        className={clsx("flex flex-row items-center justify-center gap-2")}
      >
        <Send size={16} />
        <span>Send Message</span>
      </AppButton>
    </form>
  );
}
