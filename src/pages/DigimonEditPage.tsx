import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useAsyncEffect from '../helpers/useAsyncEffect';
import useAPI from '../contexts/useAPI';
import type { Digimon, DigimonWithId } from '../models/digimon';
import DigimonForm from '../components/DigimonForm';


const DigimonEditPage: React.FC = () => {
  const [digimon, setDigimon] = useState<DigimonWithId>({} as DigimonWithId);
  const navigate = useNavigate();
  const api = useAPI();
  const { id } = useParams();

  useAsyncEffect(async () => {
    const result = await api.digimon.get(id!);
    setDigimon(result);
  }, []);

  const handleGuardar = async(digimonActualizado: Digimon) => {
    await api.digimon.update(id!, digimonActualizado);
    navigate('/');
  }

  return <>
    { !digimon ?
      <Alert variant="info">
        Cargando...
      </Alert>
      :
      <DigimonForm
        digimon={digimon}
        // START 2
        // disabled={true}
        disabled={false}
        // END 2
        onGuardar={handleGuardar}
        onCancelar={() => navigate('/')}
      />
    }
    </>
};

export default DigimonEditPage;
