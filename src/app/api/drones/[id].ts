// src/pages/api/drones/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient'; // Certifique-se de que o cliente Supabase está configurado corretamente
import { Drone } from '@/types/drone'; // Tipo do drone

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Id do drone na URL

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'ID inválido ou ausente' });
  }

  // GET: Recuperar um drone específico do Supabase
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('drones')
        .select('*')
        .eq('id', id)
        .single(); // Usamos 'single()' porque esperamos um único resultado

      if (error) {
        return res.status(500).json({ message: 'Erro ao buscar drone', error });
      }

      if (!data) {
        return res.status(404).json({ message: 'Drone não encontrado' });
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor', error });
    }
  }

  // PUT: Editar um drone no Supabase
  if (req.method === 'PUT') {
    const { status, local, nivelBateria, condicaoUso } = req.body;

    // Verificar se os dados obrigatórios foram passados
    if (!status || !local || !nivelBateria || !condicaoUso) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    }

    try {
      const { data, error } = await supabase
        .from('drones')
        .update({ status, local, nivelBateria, condicaoUso })
        .eq('id', id) // Encontrar o drone pelo ID
        .single(); // Esperamos apenas um registro

      if (error) {
        return res.status(500).json({ message: 'Erro ao atualizar drone', error });
      }

      if (!data) {
        return res.status(404).json({ message: 'Drone não encontrado para atualização' });
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno ao tentar atualizar o drone', error });
    }
  }

  // DELETE: Deletar um drone no Supabase
  if (req.method === 'DELETE') {
    try {
      const { data, error } = await supabase
        .from('drones')
        .delete()
        .eq('id', id); // Deleta o drone com o ID correspondente

      if (error) {
        return res.status(500).json({ message: 'Erro ao remover drone', error });
      }

      if (!data) {
        return res.status(404).json({ message: 'Drone não encontrado para remoção' });
      }

      return res.status(200).json({ message: 'Drone removido com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno ao tentar remover o drone', error });
    }
  }

  // Se o método não for suportado
  res.status(405).json({ message: 'Método não permitido' });
}
