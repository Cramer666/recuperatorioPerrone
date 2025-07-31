import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useAsyncEffect from '../helpers/useAsyncEffect';
import useAPI from '../contexts/useAPI';
import type { DigimonWithId } from '../models/digimon';
import DigimonForm from '../components/DigimonForm';


const DigimonViewPage: React.FC = () => {
  const [digimon, setDigimon] = useState<DigimonWithId>({} as DigimonWithId);
  const navigate = useNavigate();
  const api = useAPI();
  const { id } = useParams();

  useAsyncEffect(async () => {
    const result = await api.digimon.get(id!);
    setDigimon(result);
  }, []);

   return <>
      { !digimon ?
        <Alert variant="info">
          Cargando...
        </Alert>
        :
        <DigimonForm
          digimon={digimon}
          disabled={true}
          onGuardar={() => {}}
          onCancelar={() => navigate('/')}
        />
      }
      </>
};

export default DigimonViewPage;
