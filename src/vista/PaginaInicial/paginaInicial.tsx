import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const PaginaInicial: React.FC = () => {
  
  const seccionMisionVision = useRef<HTMLDivElement>(null);
  const seccionEquipo = useRef<HTMLDivElement>(null);
  const seccionComentarios = useRef<HTMLDivElement>(null);
  const nuestrotrabajo = useRef<HTMLDivElement>(null);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"image" | "video">("image");


  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openModal = (src: string, type: "image" | "video") => {
    setModalSrc(src);
    setModalType(type);
  };

  const closeModal = () => {
    setModalSrc(null);
  };

  return (
    <div className="bg-white text-black font-sans">

      {/* Barra de navegación */}
      <header className="bg-black text-[#FFD700] flex items-center justify-between px-8 py-4 shadow-md">
        <h1 className="text-2xl font-bold">Pintado Barber Shop</h1>
        <nav className="flex gap-6 text-lg">
          <button onClick={() => scrollToSection(seccionMisionVision)} className="hover:text-white transition">Misión y Visión</button>
          <button onClick={() => scrollToSection(seccionEquipo)} className="hover:text-white transition">Nuestro Equipo</button>
          <button onClick={() => scrollToSection(seccionComentarios)} className="hover:text-white transition">Contáctanos</button>
          <button onClick={() => scrollToSection(nuestrotrabajo)} className="hover:text-white transition">Nuestro Trabajo</button>
        </nav>
        <Link
          to="/Login"
          className="bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded transition"
        >
          Inicio
        </Link>
      </header>

      {/* Portada */}
      <section
        className="h-[90vh] bg-cover bg-center flex items-center justify-center relative group transition-all duration-1000 ease-in-out animate-fade-in"
        style={{ backgroundImage: 'url("/assets/Grupal1.jpg")' }}
      >
        <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 text-black px-6 py-3 rounded-lg shadow-md text-lg font-semibold tracking-wide animate-slide-up">
          TU ESTILO EN LAS MEJORES MANOS
        </div>
      </section>

      {/* Misión y Visión */}
      <section ref={seccionMisionVision} className="py-20 px-10 grid md:grid-cols-2 gap-10 text-center">
        {[
          {
            titulo: 'Misión',
            texto: 'En Pintado Barber Shop nos dedicamos a ofrecer servicios de barbería de alta calidad, fusionando estilo, tradición y modernidad. Nuestro compromiso es brindar una experiencia personalizada que resalte la identidad y confianza de cada cliente, en un ambiente profesional, acogedor y con los más altos estándares de higiene y excelencia.'
          },
          {
            titulo: 'Visión',
            texto: 'Ser la barbería de referencia en Ecuador por nuestra innovación, profesionalismo y dedicación al detalle, consolidándonos como un ícono de estilo y confianza masculina. Aspiramos a expandir nuestra marca, elevando el arte del grooming y empoderando a hombres de todas las edades con estilo y actitud.'
          },
        ].map((item, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">{item.titulo}</h2>
            <p className="text-gray-700">{item.texto}</p>
          </div>
        ))}
      </section>

      {/* Nuestro Equipo + Mensaje */}
      <section ref={seccionEquipo} className="py-20 px-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#FFD700]">Nuestro Equipo</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center">
            <h3 className="text-2xl font-bold text-[#FFD700] mb-4 text-center">Grupo de Barberos Profesionales</h3>
            <img src="/assets/Grupal2.jpg" alt="Grupo de barberos" className="w-full h-[450px] object-cover rounded-lg mb-4" />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center">
            <img src="/assets/Pintado.jpg" alt="CEO Ahitofel Pintado" className="w-full h-[450px] object-contain rounded-lg mb-4" />
            <h3 className="text-2xl font-bold text-black text-center mb-1">Ahitofel luztein pintado calle</h3>
            <p className="text-gray-600 text-center">CEO & BARBERO PROFESIONAL</p>
          </div>
        </div>
        <div className="mt-10 bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto text-center hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-4">Mensaje</h2>
          <p className="text-gray-700 text-lg">
            En Pintado Barber Shop no solo cortamos cabello: creamos estilo, confianza y actitud. Cada visita es una experiencia pensada para ti, donde la tradición se encuentra con la innovación y el talento de nuestros barberos transforma tu imagen. Si buscas precisión, profesionalismo y una atención que marque la diferencia… Este es tu lugar.
          </p>
        </div>
      </section>

      {/* GALERÍA */}
      <section ref={nuestrotrabajo} className="py-20 px-10 bg-white border-t border-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#FFD700] mb-12">Galería de Estilos</h2>

        {/* FOTOS */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#FFD700] mb-4">Fotos</h3>
          <div className="flex overflow-x-auto space-x-6 py-4">
            {["/assets/1.jpg", "/assets/2.jpg"].map((foto, index) => (
              <img
                key={index}
                src={foto}
                alt={`Corte ${index + 1}`}
                className="w-[300px] h-[400px] object-cover rounded-lg shadow-md hover:opacity-80 cursor-pointer transition"
                onClick={() => openModal(foto, "image")}
              />
            ))}
          </div>
        </div>

        {/* VIDEOS */}
        <div>
          <h3 className="text-2xl font-bold text-[#FFD700] mb-4">Videos</h3>
          <div className="flex overflow-x-auto space-x-6 py-4">
            {[
              "/assets/1.mp4",
              "/assets/2.mp4",
              "/assets/3.mp4",
              "/assets/4.mp4",
              "/assets/5.mp4"
            ].map((video, index) => (
              <video
                key={index}
                className="w-[400px] h-[400px] rounded-lg shadow-md cursor-pointer"
                onClick={() => openModal(video, "video")}
              >
                <source src={video} type="video/mp4" />
                Tu navegador no soporta el video.
              </video>
            ))}
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
      <section ref={seccionComentarios} className="py-20 px-6 bg-white border-t-2 border-gray-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold text-[#FFD700] mb-4">Queremos Escucharte</h2>
            <p className="text-gray-600 mb-6">Tu opinión es muy importante para nosotros.</p>
            <form className="grid gap-6">
              <input type="text" placeholder="Nombres y Apellidos" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]" />
              <input type="email" placeholder="Correo electrónico" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]" />
              <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]">
                <option value="">Tipo de mensaje</option>
                <option value="sugerencia">Sugerencia</option>
                <option value="queja">Queja</option>
                <option value="felicitacion">Felicitación</option>
              </select>
              <textarea placeholder="Escribe tu mensaje..." rows={4} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]" />
              <button type="submit" className="bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg transition duration-300">
                Enviar Comentario
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center justify-center bg-black text-[#FFD700] p-8 rounded-xl shadow-md text-center">
            <div className="w-full h-64 mb-6 rounded-lg overflow-hidden shadow-md">
              <iframe
                title="Ubicación de Pintado Barber Shop"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4519.5889706514245!2d-78.76568302447637!3d-2.7791987390814468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd0da76aad0671%3A0x74807bd715066d90!2sPINTADO%20BARBER%20SHOP!5e1!3m2!1ses!2sec!4v1746228727422!5m2!1ses!2sec"
                width="100%" height="100%" allowFullScreen loading="lazy" className="border-0 rounded-lg shadow-md"
              />
            </div>
            <img src="public\assets\rekoj.png" alt="Horario" className="w-32 h-32 mb-4" />
            <h3 className="text-2xl font-bold mb-2">ATENCIÓN TODOS LOS DÍAS</h3>
            <p className="text-xl">09H00 a 20H00</p>
          </div>
        </div>
      </section>

      {/* Redes sociales */}
      <footer className="py-8 bg-black text-[#FFD700] flex justify-center space-x-8 text-xl">
        <a href="https://www.facebook.com/share/1BjBkJoYvV/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300 hover:scale-110 flex items-center gap-2">
          <FaFacebook /> Facebook
        </a>
        <a href="https://www.instagram.com/pintadobarbershop.ec?igsh=MWNyd2J1NWxscXM1bQ==" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300 hover:scale-110 flex items-center gap-2">
          <FaInstagram /> Instagram
        </a>
        <a href="https://wa.me/593998008311?text=Hola%2C%20quiero%20agendar%20una%20cita%20en%20Pintado%20Barber%20Shop" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300 hover:scale-110 flex items-center gap-2">
          <FaWhatsapp /> WhatsApp
        </a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ahitofelpintado@gmail.com&su=Agendar%20Cita&body=Hola,%20quisiera%20agendar%20una%20cita%20en%20Pintado%20Barber%20Shop." target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300 hover:scale-110 flex items-center gap-2">
          <FaEnvelope /> Email
        </a>
      </footer>
    </div>
  );
};

export default PaginaInicial;
