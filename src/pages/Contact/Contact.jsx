import style from "./Contact.module.css";

export default function Contact() {
  return (
    <main className={style.contact}>
      <h1>Contact Us</h1>
      <p>
        You can find us at our farm store located at 123 Farm Lane, Countryside.
        For inquiries, please email us at farmland@gmail.community or call us at
        (123) 456-7890.
      </p>
    </main>
  );
}