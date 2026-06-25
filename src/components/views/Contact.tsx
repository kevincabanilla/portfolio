import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { FieldErrors } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Data } from "@/utils";
import { rotateInUp, staggerContainer, staggerItem } from "@/animations";
import type { EmailFormStatus } from "@/models";
import { PageSection, Toast } from "../common/ui";
import { AppCard } from "../common/containers";
import ContactCard from "../contents/contact/ContactCard";
import ContactMessageSentAlert from "../contents/contact/ContactMessageSentAlert";
import ContactForm, {
  type EmailFormData,
} from "../contents/contact/ContactForm";
import { LiveIndicator } from "../common/indicators";

export default function Contact() {
  const contactData = Data.getContactData();

  const {
    isLoading,
    formStatus,
    senderName,
    showConfirmation,
    isToastVisible,
    handleFormSubmit,
    handleFormError,
    dismissToast,
    resetConfirmation,
  } = useContactForm();

  return (
    <PageSection
      id="contact"
      headerTitle="Let's Build Something Great"
      headerSubtitle="Get In Touch"
    >
      <motion.div
        className="max-w-xl mb-16 mx-auto"
        variants={staggerContainer}
      >
        <motion.p
          className="text-center text-primary/60 text-sm md:text-base"
          variants={staggerItem}
        >
          Have a project in mind or just want to say hello? I'd love to hear
          from you.
        </motion.p>
      </motion.div>

      <motion.div
        className="max-w-4xl my-0 mx-auto grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-[2fr_3fr]"
        variants={staggerContainer}
      >
        {/* Contact Options - Left Column */}
        <motion.div className="flex flex-col gap-3" variants={staggerContainer}>
          {contactData.contactOptions.map((option) => (
            <ContactCard key={option.id} option={option} />
          ))}

          {contactData.projectAvailability && (
            <motion.div
              className="flex items-center gap-3 py-2 px-4 border border-primary/30 rounded-xl bg-linear-to-br from-lime-500/5 to-green-700/5"
              variants={staggerItem}
            >
              <LiveIndicator active size="small" />

              <p className="font-mono text-xs text-primary">
                Currently&nbsp;
                <span className="text-green">available for new projects</span>.
                For urgent matters, Mobile is the fastest way to reach me.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Contact Form - Right Column */}
        <motion.div variants={rotateInUp}>
          <AnimatePresence mode="wait">
            {showConfirmation ? (
              <motion.div
                className="h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ContactMessageSentAlert
                  senderName={senderName}
                  onReset={resetConfirmation}
                />
              </motion.div>
            ) : (
              <motion.div
                className="h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <AppCard rounded className="h-full">
                  <ContactForm
                    isLoading={isLoading}
                    onSubmit={handleFormSubmit}
                    onError={handleFormError}
                  />
                </AppCard>
              </motion.div>
            )}
          </AnimatePresence>

          <Toast
            vertical="start"
            timeout={5000}
            type={formStatus.type}
            visible={isToastVisible}
            onClose={dismissToast}
          >
            {formStatus.message}
          </Toast>
        </motion.div>
      </motion.div>
    </PageSection>
  );
}

const useContactForm = () => {
  const emailConfig = Data.getEmailJSConfig();

  const [senderName, setSenderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formStatus, setFormStatus] = useState<EmailFormStatus>({
    type: null,
    message: "",
  });

  const dismissToast = useCallback(() => {
    setFormStatus({ type: null, message: "" });
  }, []);

  const handleFormSubmit = useCallback(
    async (data: EmailFormData, onComplete: () => void) => {
      setIsLoading(true);
      dismissToast();

      try {
        const result = await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          {
            from_name: data.name,
            from_email: data.email,
            email_subject: `A new message from ${data.name}`,
            message: data.message,
          },
          {
            publicKey: emailConfig.publicKey,
          },
        );

        if (result.status === 200) {
          setSenderName(data.name);
          setShowConfirmation(true);
          onComplete();
        }
      } catch {
        setFormStatus({
          type: "error",
          message: "Failed to send message. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [emailConfig, dismissToast],
  );

  const handleFormError = useCallback((errors: FieldErrors<EmailFormData>) => {
    setFormStatus({
      type: "error",
      message: (
        <ul>
          {Object.entries(errors).map(([fieldName, error]) => (
            <li key={fieldName}>{error?.message}</li>
          ))}
        </ul>
      ),
    });
  }, []);

  return {
    isLoading,
    formStatus,
    senderName,
    showConfirmation,
    isToastVisible: !!(formStatus.type && formStatus.message),
    handleFormSubmit,
    handleFormError,
    dismissToast,
    resetConfirmation: () => setShowConfirmation(false),
  };
};
