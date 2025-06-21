import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaBars } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import emailjs from '@emailjs/browser';


const PaginaInicial: React.FC = () => {
  const seccionMisionVision = useRef<HTMLDivElement>(null);
  const seccionEquipo = useRef<HTMLDivElement>(null);
  const seccionComentarios = useRef<HTMLDivElement>(null);
  const nuestrotrabajo = useRef<HTMLDivElement>(null);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"image" | "video">("image");
  const [menuOpen, setMenuOpen] = useState(false);
  
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const openModal = (src: string, type: "image" | "video") => {
    setModalSrc(src);
    setModalType(type);
  };

  const closeModal = () => {
    setModalSrc(null);
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
  
    emailjs.sendForm(
      'service_9bijnlb',
      'template_ysxiyzk',
      form.current!,
      'YZcnjruOTI79ompqD'
    )
    .then(() => {
      alert('Mensaje enviado correctamente ✅');
      form.current?.reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error al enviar el mensaje ❌');
    });
  };

  return (
    <div className="bg-white text-black font-sans w-full overflow-x-hidden">
      <header className="bg-black text-[#FFD700] px-6 py-4 shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold animate-pulse">Pintado Barber Shop</h1>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars className="text-2xl" />
            </button>
          </div>
          <nav className="hidden md:flex gap-6 text-lg">
            <button onClick={() => scrollToSection(seccionMisionVision)} className="hover:text-white transition">Misión y Visión</button>
            <button onClick={() => scrollToSection(seccionEquipo)} className="hover:text-white transition">Nuestro Equipo</button>
            <button onClick={() => scrollToSection(seccionComentarios)} className="hover:text-white transition">Contáctanos</button>
            <button onClick={() => scrollToSection(nuestrotrabajo)} className="hover:text-white transition">Nuestro Trabajo</button>
          </nav>
          <Link to="/Login" className="hidden md:inline-block bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded transition">Inicio</Link>
        </div>
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4">
            <button onClick={() => scrollToSection(seccionMisionVision)} className="hover:text-white transition">Misión y Visión</button>
            <button onClick={() => scrollToSection(seccionEquipo)} className="hover:text-white transition">Nuestro Equipo</button>
            <button onClick={() => scrollToSection(seccionComentarios)} className="hover:text-white transition">Contáctanos</button>
            <button onClick={() => scrollToSection(nuestrotrabajo)} className="hover:text-white transition">Nuestro Trabajo</button>
            <Link to="/Login" className="bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded transition text-center">Inicio</Link>
          </div>
        )}
      </header>

      <section
  className="relative flex items-center justify-center group"
  style={{
    backgroundImage: 'url("/assets/Grupal1.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: window.innerWidth >= 768 ? 'fixed' : 'scroll', 
    height: 'clamp(60vh, 90vh, 100vh)'
  }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
  <h2 className="z-10 text-center text-white font-bold px-4"
      style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)' }}>
    TU ESTILO EN LAS <span className="text-[#FFD700]">MEJORES MANOS</span>
  </h2>
</section>



<section
  ref={seccionMisionVision}
  className="py-20 px-4 sm:px-6 bg-gradient-to-br from-white via-gray-100 to-white"
>
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-center sm:text-left">
    {[{
      titulo: 'Misión',
      texto:
        'En Pintado Barber Shop nos dedicamos a ofrecer servicios de barbería de alta calidad, fusionando estilo, tradición y modernidad. Nuestro compromiso es brindar una experiencia personalizada que resalte la identidad y confianza de cada cliente, en un ambiente profesional, acogedor y con los más altos estándares de higiene y excelencia.'
    },
    {
      titulo: 'Visión',
      texto:
        'Ser la barbería de referencia en Ecuador por nuestra innovación, profesionalismo y dedicación al detalle, consolidándonos como un ícono de estilo y confianza masculina. Aspiramos a expandir nuestra marca, elevando el arte del grooming y empoderando a hombres de todas las edades con estilo y actitud.'
    }].map((item, index) => (
      <div
        key={index}
        className="bg-white border-2 border-[#FFD700]/30 hover:border-[#FFD700] p-8 sm:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.03]"
        data-aos="zoom-in"
      >
        <h2 className="text-3xl font-bold text-[#FFD700] mb-4">{item.titulo}</h2>
        <p className="text-gray-700 text-justify leading-relaxed">{item.texto}</p>
      </div>
    ))}
  </div>
</section>


      <a
        href="https://wa.me/593998008311?text=Hola,%20quiero%20agendar%20una%20cita%20en%20Pintado%20Barber%20Shop"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 hover:bg-green-600 transition duration-300 animate-pulse z-50"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Nuestro Equipo + Mensaje */}
  {/* Nuestro Equipo + Mensaje */}
<section ref={seccionEquipo} className="py-20 px-4 sm:px-8 bg-gradient-to-b from-gray-100 via-white to-gray-100">
  <h2 className="text-4xl font-bold text-center mb-16 text-[#FFD700] drop-shadow-lg">
    Nuestro Equipo
  </h2>

  <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
    {/* Tarjeta Barberos */}
    <div className="bg-white border-2 border-[#FFD700]/40 hover:border-[#FFD700] p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center text-center">
      <h3 className="text-2xl font-bold text-[#FFD700] mb-4">Barberos Profesionales</h3>
      <img
        src="/assets/Grupal2.jpg"
        alt="Grupo de barberos"
        className="w-full h-[400px] object-cover rounded-xl mb-4 shadow-md"
      />
      <p className="text-gray-700 text-md">
        Un equipo apasionado y con experiencia que transforma cada corte en una obra de arte.
      </p>
    </div>

    {/* Tarjeta CEO */}
    <div className="bg-white border-2 border-[#FFD700]/40 hover:border-[#FFD700] p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center text-center">
      <img
        src="/assets/Pintado.jpg"
        alt="CEO Ahitofel Pintado"
        className="w-full h-[400px] object-contain rounded-xl mb-4 shadow-md"
      />
      <h3 className="text-2xl font-bold text-black mb-1">Ahitofel Luztein Pintado Calle</h3>
      <p className="text-gray-600 mb-2">CEO & BARBERO PROFESIONAL</p>
      <p className="text-gray-700 text-md">
        Lidera con visión, arte y compromiso, guiando a nuestro equipo a ofrecer excelencia.
      </p>
    </div>
  </div>

  {/* Mensaje Especial */}
  <div className="mt-16 max-w-4xl mx-auto bg-black text-[#FFD700] rounded-2xl shadow-lg hover:shadow-2xl transition p-8 sm:p-10 text-center">
    <h2 className="text-3xl font-bold mb-4">Mensaje</h2>
    <p className="text-lg text-gray-200 leading-relaxed">
      En <strong className="text-[#FFD700]">Pintado Barber Shop</strong> no solo cortamos cabello:
      creamos estilo, confianza y actitud. Cada visita es una experiencia diseñada para ti, donde
      la tradición se une con la innovación y el talento de nuestros barberos transforma tu imagen.
      <br className="hidden sm:block" />
      Si buscas precisión, profesionalismo y una atención que marque la diferencia… este es tu lugar.
    </p>
  </div>
</section>


    {/* GALERÍA */}
<section
  ref={nuestrotrabajo}
  className="py-20 px-4 sm:px-6 bg-gradient-to-b from-zinc-800 to-black text-[#FFD700]"
>
  <div className="max-w-7xl mx-auto bg-zinc-900 rounded-2xl shadow-2xl py-12 px-4 sm:px-10 border border-[#FFD700]/20">

    {/* TÍTULO PRINCIPAL */}
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 drop-shadow-lg">
      Galería de Estilos
    </h2>

    {/* FOTOS */}
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-4">Fotos</h3>
      <div className="flex overflow-x-auto gap-6 py-4 scrollbar-thin scrollbar-thumb-[#FFD700]/70 scrollbar-track-zinc-700">
        {["/assets/1.jpg", "/assets/2.jpg"].map((foto, index) => (
          <img
            key={index}
            src={foto}
            alt={`Corte ${index + 1}`}
            className="w-60 sm:w-72 md:w-80 h-auto object-cover rounded-xl border-2 border-[#FFD700]/30 hover:border-[#FFD700] shadow-md hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => openModal(foto, "image")}
          />
        ))}
      </div>
    </div>

    {/* VIDEOS */}
    <div>
      <h3 className="text-2xl font-bold mb-4">Videos</h3>
      <div className="flex overflow-x-auto gap-6 py-4 scrollbar-thin scrollbar-thumb-[#FFD700]/70 scrollbar-track-zinc-700">
        {[
          "/assets/1.mp4",
          "/assets/2.mp4",
          "/assets/3.mp4",
          "/assets/4.mp4",
          "/assets/5.mp4"
        ].map((video, index) => (
          <video
            key={index}
            className="w-72 sm:w-80 md:w-96 rounded-xl border-2 border-[#FFD700]/30 hover:border-[#FFD700] shadow-md hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => openModal(video, "video")}
            controls
          >
            <source src={video} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        ))}
      </div>
    </div>

  </div>
</section>



      {/* MODAL */}
      {modalSrc && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={closeModal}
        >
          <div className="relative max-w-[90%] max-h-[90%]">
            {modalType === "image" ? (
              <img
                src={modalSrc}
                alt="Ampliado"
                className="rounded-lg shadow-2xl max-w-full max-h-full"
              />
            ) : (
              <video
                src={modalSrc}
                controls
                autoPlay
                className="rounded-lg shadow-2xl max-w-full max-h-full"
              />
            )}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-3xl font-bold bg-black bg-opacity-60 px-3 py-1 rounded hover:bg-opacity-90"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Comentarios + Horario + Mapa */}
      <section ref={seccionComentarios} className="py-20 px-4 sm:px-6 bg-white border-t-2 border-gray-200">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
    
    {/* FORMULARIO */}
    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 hover:shadow-lg transition">
    <form className="grid gap-5" onSubmit={sendEmail} ref={form}>
  <input
    type="text"
    name="nombre"
    placeholder="Nombres y Apellidos"
    className="p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
    required
  />
  <input
    type="email"
    name="email"
    placeholder="Correo electrónico"
    className="p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
    required
  />
  <select
    name="tipo"
    className="p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
    required
  >
    <option value="">Tipo de mensaje</option>
    <option value="Sugerencia">Sugerencia</option>
    <option value="Queja">Queja</option>
    <option value="Felicitación">Felicitación</option>
  </select>
  <textarea
    name="mensaje"
    placeholder="Escribe tu mensaje..."
    rows={4}
    className="p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
    required
  />
  <button
    type="submit"
    className="bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md"
  >
    Enviar Comentario
  </button>
</form>

    </div>

    {/* INFORMACIÓN Y MAPA */}
    <div className="flex flex-col items-center justify-center bg-black text-[#FFD700] p-6 sm:p-8 rounded-xl shadow-md text-center">
      <div className="w-full h-64 mb-6 rounded-lg overflow-hidden shadow-md">
        <iframe
          title="Ubicación de Pintado Barber Shop"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4519.5889706514245!2d-78.76568302447637!3d-2.7791987390814468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd0da76aad0671%3A0x74807bd715066d90!2sPINTADO%20BARBER%20SHOP!5e1!3m2!1ses!2sec!4v1746228727422!5m2!1ses!2sec"
          width="100%" height="100%" allowFullScreen loading="lazy"
          className="border-0 rounded-lg shadow-md"
        />
      </div>
      <img src="/assets/rekoj.png" alt="Horario" className="w-28 h-28 sm:w-32 sm:h-32 mb-4" />
      <h3 className="text-2xl font-bold mb-1">ATENCIÓN TODOS LOS DÍAS</h3>
      <p className="text-lg sm:text-xl">09H00 a 20H00</p>
    </div>
  </div>
</section>

      {/* Redes sociales */}
      <footer className="py-10 bg-black text-[#FFD700] text-center">
  <h3 className="text-2xl font-bold mb-6">¡Síguenos en nuestras redes!</h3>
  <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-8 text-lg sm:text-xl">
    <a
      href="https://www.facebook.com/share/1BjBkJoYvV/?mibextid=wwXIfr"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-5 py-3 bg-[#1a1a1a] rounded-lg hover:bg-[#3b5998] hover:text-white hover:scale-105 transition duration-300 shadow-md"
    >
      <FaFacebook size={24} /> Facebook
    </a>

    <a
      href="https://www.instagram.com/pintadobarbershop.ec?igsh=MWNyd2J1NWxscXM1bQ=="
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-5 py-3 bg-[#1a1a1a] rounded-lg hover:bg-pink-600 hover:text-white hover:scale-105 transition duration-300 shadow-md"
    >
      <FaInstagram size={24} /> Instagram
    </a>

    <a
      href="https://wa.me/593998008311?text=Hola%2C%20quiero%20agendar%20una%20cita%20en%20Pintado%20Barber%20Shop"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-5 py-3 bg-[#1a1a1a] rounded-lg hover:bg-green-600 hover:text-white hover:scale-105 transition duration-300 shadow-md"
    >
      <FaWhatsapp size={24} /> WhatsApp
    </a>

    <a
      href="https://mail.google.com/mail/?view=cm&fs=1&to=ahitofelpintado@gmail.com&su=Agendar%20Cita&body=Hola,%20quisiera%20agendar%20una%20cita%20en%20Pintado%20Barber%20Shop."
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-5 py-3 bg-[#1a1a1a] rounded-lg hover:bg-red-600 hover:text-white hover:scale-105 transition duration-300 shadow-md"
    >
      <FaEnvelope size={24} /> Email
    </a>
  </div>
</footer>

    </div>
  );
};

export default PaginaInicial;
