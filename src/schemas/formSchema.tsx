// formSchema.ts
export interface ModelOption {
  value: string;
  label: string;
  departureOptions: Array<{ value: string; label: string }>;
  destinationOptions: Array<{ value: string; label: string }>;
}

export interface FormSchema {
  modelOptions: ModelOption[];
}

export const formSchema: FormSchema = {
  modelOptions: [
    {
      value: 'droneporto',
      label: 'Droneporto',
      departureOptions: [
        { value: 'localA', label: 'Local A - Trindade' },
        { value: 'localB', label: 'Local B - Gaia' },
        { value: 'localC', label: 'Local C - Matosinhos' },
      ],
      destinationOptions: [
        { value: 'destino1', label: 'Gaia' },
        { value: 'destino2', label: 'Destino 2' },
        { value: 'destino3', label: 'Destino 3' },
      ],
    },
    {
      value: 'rooftop',
      label: 'Estação Rooftop',
      departureOptions: [
        { value: 'localD', label: 'Local D' },
        { value: 'localE', label: 'Local E' },
        { value: 'localF', label: 'Local F' },
      ],
      destinationOptions: [
        { value: 'destino4', label: 'Destino 4' },
        { value: 'destino5', label: 'Destino 5' },
        { value: 'destino6', label: 'Destino 6' },
      ],
    },
    {
      value: 'armazem',
      label: 'Armazém Logístico',
      departureOptions: [
        { value: 'localG', label: 'Local G' },
        { value: 'localH', label: 'Local H' },
        { value: 'localI', label: 'Local I' },
      ],
      destinationOptions: [
        { value: 'destino7', label: 'Destino 7' },
        { value: 'destino8', label: 'Destino 8' },
        { value: 'destino9', label: 'Destino 9' },
      ],
    },
    {
      value: 'qrcode',
      label: 'QRcode Waypoint',
      departureOptions: [
        { value: 'localJ', label: 'Local J' },
        { value: 'localK', label: 'Local K' },
        { value: 'localL', label: 'Local L' },
      ],
      destinationOptions: [
        { value: 'destino10', label: 'Destino 10' },
        { value: 'destino11', label: 'Destino 11' },
        { value: 'destino12', label: 'Destino 12' },
      ],
    },
    {
      value: 'mailbox',
      label: 'Mailbox',
      departureOptions: [
        { value: 'localM', label: 'Local M' },
        { value: 'localN', label: 'Local N' },
        { value: 'localO', label: 'Local O' },
      ],
      destinationOptions: [
        { value: 'destino13', label: 'Destino 13' },
        { value: 'destino14', label: 'Destino 14' },
        { value: 'destino15', label: 'Destino 15' },
      ],
    },
  ],
};
