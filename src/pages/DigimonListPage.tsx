import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAsyncEffect from '../helpers/useAsyncEffect';
import useAPI from '../contexts/useAPI';
import type { DigimonWithId } from '../models/digimon';
import DigimonTable from '../components/DigimonTable';


const DigimonListPage: React.FC = () => {
  const navigate = useNavigate();
  const [digimons, setDigimons] = useState<DigimonWithId[]>([]);
  const api = useAPI();

  useAsyncEffect(async () => {
    const all = await api.digimon.all();
    setDigimons(all);
  }, [digimons]);

  const handleCrear = () => {
    navigate(`/nuevo`);
  }

  const handleVer = (id: string) => {
    navigate(`/ver/${id}`);
  }

  const handleEditar = (id: string) => {
    navigate(`/editar/${id}`);
  }

  const handleBorrar = async (id: string) => {
    await api.digimon.delete(id);
    navigate(`/`);
  }

  return (
    <DigimonTable
      digimons={digimons}
      onCrearNuevo={() => handleCrear()}
      onVerUno={(id: string) => handleVer(id)}
      onEditarUno={(id: string) => handleEditar(id)}
      onBorrarUno={(id: string) => handleBorrar(id)}
    />
  );
};

export default DigimonListPage;
