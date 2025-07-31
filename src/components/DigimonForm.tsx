import React, { useState, useEffect } from 'react';
import { Form, Button, Stack } from 'react-bootstrap';
import { Attributes, Levels, Types, type Digimon, type DigimonWithId } from '../models/digimon';
import useAsyncEffect from '../helpers/useAsyncEffect';
import useAPI from '../contexts/useAPI';

type DigimonFormProps = {
  digimon?: Digimon;
  disabled: boolean;
  onGuardar?: (m: Digimon) => void;
  onCancelar: () => void;
};

const DigimonForm: React.FC<DigimonFormProps> = ({
  digimon,
  disabled,
  onGuardar,
  onCancelar
}) => {
  const defaultDigimon: Digimon = {
    name: '',
    level: 'Fresh',
    type: 'Unknown',
    attribute: 'Unknown',
    description: '',
    image: '',
    evolvesFrom: undefined,
    alternateForm: undefined,
  }
  const [formData, setFormData] = useState<Digimon>(digimon ?? defaultDigimon);

  // START $
  const [digimons, setDigimons] = useState<DigimonWithId[]>([]);
  const api = useAPI();

  useAsyncEffect(async () => {
    const all = await api.digimon.all();
    setDigimons(all);
  }, [digimons]);
  // END 4

  useEffect(() => {
    if (digimon) {
      setFormData(digimon);
    }
  }, [digimon]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    onGuardar?.(formData);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={disabled}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="level">
        <Form.Label>Nivel</Form.Label>
        <Form.Select
          name="level"
          value={formData.level}
          onChange={handleChange}
          disabled={disabled}
        >
          {Levels.map((op) => (
            <option key={op} value={op}>{op}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="type">
        <Form.Label>Tipo</Form.Label>
        <Form.Select
          name="type"
          value={formData.type}
          onChange={handleChange}
          disabled={disabled}
        >
          {Types.map((op) => (
            <option key={op} value={op}>{op}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="attribute">
        <Form.Label>Atributo</Form.Label>
        <Form.Select
          name="attribute"
          value={formData.attribute}
          onChange={handleChange}
          disabled={disabled}
        >
          {Attributes.map((op) => (
            <option key={op} value={op}>{op}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          disabled={disabled}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="evolvesFrom">
        <Form.Label>Evoluciona de</Form.Label>
        <Form.Select
          name="evolvesFrom"
          value={formData.evolvesFrom}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value={undefined}>No seleccionado</option>
          {
          // START 4
            digimons.map((op) => (
              <option key={op._id} value={op._id}>{op.name}</option>
            ))
          // END 4
          }
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="alternateForm">
        <Form.Label>Forma alternativa</Form.Label>
        <Form.Select
          name="alternateForm"
          value={formData.alternateForm}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value={undefined}>No seleccionado</option>
          {
          // START 4
            digimons.map((op) => (
              <option key={op._id} value={op._id}>{op.name}</option>
            ))
          // END 4
          }
        </Form.Select>
      </Form.Group>

      <Stack direction="horizontal" gap={2}>
        { !disabled && formData.name && <Button variant="success" onClick={handleSubmit}>
            Guardar
          </Button>
        }
        <Button variant="secondary" onClick={onCancelar}>
          {disabled ? 'Volver' : 'Cancelar'}
        </Button>
      </Stack>
    </Form>
  );
};

export default DigimonForm;
