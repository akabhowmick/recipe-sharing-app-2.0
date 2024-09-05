import Swal from "sweetalert2";

export const errorMessage = () =>
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  });

export const successMessage = (title: string, text: string) =>
  Swal.fire({ icon: "success", title: title, text: text });

export const contactMessage = () => {
  Swal.fire({
    title: "Message sent!",
    text: "We will get back to you soon!",
    icon: "info",
  });
};

export const logOutMessage = () => {
  Swal.fire({
    title: "Logged out!",
    text: "See you soon!",
    icon: "info",
  });
};

export const unauthorizedMessage = () => {
  Swal.fire({
    title: "Unauthorized!",
    text: "You don't have the necessary permissions to access this resource.",
    icon: "error",
  });
}