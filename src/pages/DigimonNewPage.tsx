import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAPI from '../contexts/useAPI';
import type { Digimon } from '../models/digimon';
import DigimonForm from '../components/DigimonForm';


const DigimonNewPage: React.FC = () => {
  const navigate = useNavigate();
  const api = useAPI()


  const handleGuardar = async(digimon: Digimon) => {
    await api.digimon.create(digimon);
    navigate('/');
  }

  return (
    <DigimonForm
        disabled={false}
        onGuardar={handleGuardar}
        onCancelar={() => navigate('/')}
      />
  );
};

export default DigimonNewPage;
