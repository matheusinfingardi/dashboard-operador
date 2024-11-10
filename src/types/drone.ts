// src/types/drone.ts

export interface Drone {
  id: number;            // ID do drone
  drone_id: string;      // ID do drone (string em vez de número)
  connection_type: string; // Tipo de conexão (SITL, TTY, etc.)
  connection_status: string; // Status da conexão (conectado, desconectado)
  created_at: string;    // Data de criação (ISO string ou Date)
}
