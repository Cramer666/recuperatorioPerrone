import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Attributes, Levels, type Digimon } from '../models/digimon';


type DigimonRowProps = {
  rowElement: Digimon;
  onVer: () => void;
  onEditar: () => void;
  onBorrar: () => void;
};

const DigimonRow: React.FC<DigimonRowProps> = ({ rowElement, onVer, onEditar, onBorrar }) => {
  const navigate = useNavigate();

  const handleBorrar = () => {
    onBorrar();
    navigate('/');
  }

  return (
    <tr>
      <td>{rowElement.name}</td>
      <td>{rowElement.type}</td>
      <td>{
        rowElement.level === Levels[0] ?
          <Badge bg="primary">{rowElement.level}</Badge>
      : rowElement.level === Levels[1] ?
          <Badge bg="info">{rowElement.level}</Badge>
      : rowElement.level === Levels[2] ?
          <Badge bg="success">{rowElement.level}</Badge>
      : rowElement.level === Levels[3] ?
          <Badge bg="warning">{rowElement.level}</Badge>
      :
          <Badge bg="danger">{rowElement.level}</Badge>
      }</td>
      <td>{
        rowElement.attribute === Attributes[0] ?
          <Badge bg="warning">{rowElement.attribute}</Badge>
      : rowElement.attribute === Attributes[1] ?
          <Badge bg="success">{rowElement.attribute}</Badge>
      : rowElement.attribute === Attributes[2] ?
          <Badge bg="danger">{rowElement.attribute}</Badge>
      : rowElement.attribute === Attributes[3] ?
          <Badge bg="info">{rowElement.attribute}</Badge>
      :
          <Badge bg="primary">{rowElement.attribute}</Badge>
      }</td>
      <td>
        <Button
          variant="info"
          size="sm"
          className="me-1"
          onClick={onVer}
        >
          Ver
        </Button>
        <Button
          variant="warning"
          size="sm"
          className="me-1"
          onClick={onEditar}
        >
          Editar
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleBorrar}
        >
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default DigimonRow;
