import { Window } from "~/shared/ui/Window";
import styles from "./ChatDemo.module.css";

/** Chat de WhatsApp de ejemplo dentro de la ventana girada. */
export function ChatDemo() {
  return (
    <Window caption="Ejemplo ilustrativo · atención por WhatsApp">
      <div
        className={styles.chat}
        role="img"
        aria-label="Ejemplo de chat de WhatsApp respondido por un sistema con IA"
      >
        <p className={styles.customer}>¿Tienen talle M?</p>
        <p className={styles.business}>¡Sí! Te paso precios y colores</p>
        <p className={styles.business}>Si pedís hoy, llega en [plazo]</p>
      </div>
    </Window>
  );
}

/** Panel "13 agentes · hoy". */
export function AgentsPanel() {
  const agents = [
    { name: "Agente Contenido", status: "listo", busy: false },
    { name: "Agente Ventas", status: "listo", busy: false },
    { name: "Agente Emails", status: "trabajando", busy: true },
  ];
  return (
    <Window className={styles.panelWindow}>
      <div role="img" aria-label="Panel de ejemplo: 13 agentes trabajando hoy">
        <div className={styles.panelTitle}>13 agentes · hoy</div>
        {agents.map((agent) => (
          <div key={agent.name} className={styles.panelRow}>
            <span>{agent.name}</span>
            <span className={agent.busy ? styles.statusBusy : styles.status}>{agent.status}</span>
          </div>
        ))}
      </div>
    </Window>
  );
}
