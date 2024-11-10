import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient'; // Ajuste o caminho de importação para o seu cliente do Supabase
import { Drone } from '@/types/drone'; // Importe o tipo Drone corretamente

// Função para manipular o POST dos drones
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { id, drone_id, connection_type, connection_status, created_at } = req.body;

      // Validar se os campos obrigatórios estão presentes
      if (!id || !drone_id || !connection_type || !connection_status || !created_at) {
        return res.status(400).json({ message: 'Faltam dados obrigatórios' });
      }

      // Inserir o novo drone no banco de dados (exemplo usando Supabase)
      const { data, error }: { data: Drone[] | null, error: any } = await supabase
        .from('drones')
        .insert([{ id, drone_id, connection_type, connection_status, created_at }]);

      // Verificar se ocorreu algum erro
      if (error) {
        return res.status(500).json({ message: 'Erro ao inserir drone', error });
      }

      // Verificar se 'data' não é null e se contém pelo menos um item
      if (data) {
        return res.status(201).json(data[0]); // Retorna o primeiro item inserido
      } else {
        return res.status(500).json({ message: 'Nenhum drone inserido ou erro ao inserir.' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor', error });
    }
  } else {
    // Caso o método não seja POST
    res.status(405).json({ message: 'Método não permitido' });
  }
}
