// src/types/drone.ts
export type Drone = {
    id: string;
    status: "Disponível" | "Em uso" | "Manutenção";
    local: string;
    nivelBateria: number;
    condicaoUso: "Boa" | "Regular" | "Ruim";
  };
  