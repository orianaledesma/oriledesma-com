import { Link } from "react-router";
import { PATHS } from "~/config/routes";
import type { FaqItem } from "~/shared/ui/Faq";

export const HOME_FAQ: FaqItem[] = [
  {
    question: "¿Necesito saber de tecnología?",
    answer: (
      <p>
        No. Todo está explicado en palabras de negocio: horas, clientes y tareas, sin jerga. Si
        sabés mandar un WhatsApp, podés arrancar con la guía gratis o con los videos de nivel 0.
      </p>
    ),
  },
  {
    question: "¿Qué diferencia hay entre el curso, los talleres y la implementación?",
    answer: (
      <p>
        En el <Link to={PATHS.course}>curso</Link> aprendés a armar una marca entera con IA
        siguiendo la mía, paso a paso. Los <Link to={PATHS.workshops}>talleres</Link> son grupales y
        en vivo, y cada dueño sale con algo resuelto en su negocio. En la{" "}
        <Link to={PATHS.implementation}>implementación</Link> te armo yo el sistema a medida, con
        alcance y precio cerrados.
      </p>
    ),
  },
  {
    question: "¿Sirve para un negocio físico?",
    answer: (
      <p>
        Sí. Trabajo con negocios físicos y digitales, con foco en lo digital: tiendas online,
        servicios y creadores. Una heladería o una joyería también tienen pedidos, mensajes y
        catálogo que la IA puede ordenar.
      </p>
    ),
  },
  {
    question: "¿Cómo postulo mi negocio a la consultoría en vivo?",
    answer: (
      <p>
        Completás el formulario de <Link to={`${PATHS.lives}#postular`}>Vivos</Link>. Cada mes elijo
        un negocio entre los que se postulan y le armo un sistema con IA en vivo, en YouTube, Twitch
        y Kick.
      </p>
    ),
  },
  {
    question: "¿En qué idioma trabajás?",
    answer: (
      <p>
        Todo el contenido está en español. La implementación también la hago en inglés para clientes
        internacionales.
      </p>
    ),
  },
  {
    question: "¿Qué herramientas de IA usás?",
    answer: (
      <p>
        Las que mejor le sirvan al sistema de cada negocio. En los videos muestro todas las que uso,
        con lo que me funciona y lo que no.
      </p>
    ),
  },
];
