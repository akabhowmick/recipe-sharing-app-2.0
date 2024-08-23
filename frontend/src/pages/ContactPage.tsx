import { ContactForm } from "../components/Contact/ContactForm.tsx";

export const ContactPage = () => {
  return (
    <div className="min-h-screen mb-6">
      <h1 className="text-3xl font-bold underline my-4 mx-auto text-center">
        {" "}
        Contact Us! 
      </h1>
      <ContactForm />
    </div>
  );
};
