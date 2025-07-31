import React from 'react';
import { Button, Row, Col, Stack, Table } from 'react-bootstrap';
import DigimonRow from './DigimonRow';
import type { DigimonWithId } from '../models/digimon';


type DigimonTableProps = {
  digimons: DigimonWithId[];
  onCrearNuevo: () => void;
  onVerUno: (id: string) => void;
  onEditarUno: (id: string) => void;
  onBorrarUno: (id: string) => void;
};


const DigimonTable: React.FC<DigimonTableProps> = ({ digimons, onCrearNuevo, onVerUno, onEditarUno, onBorrarUno }) => (
  <Stack gap={3}>
    <Row className="align-items-center">
      <Col><h2>Digimons</h2></Col>
      <Col className="text-end">
        <Button variant="success" onClick={onCrearNuevo}>
          Crear nueva
        </Button>
      </Col>
    </Row>

    <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nivel</th>
            <th>Tipo</th>
            <th>Atributo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {digimons.map((digimon, index) => (
            <DigimonRow
              key={index}
              rowElement={digimon}
              onVer={() => onVerUno(digimon._id)}
              onEditar={() => onEditarUno(digimon._id)}
              onBorrar={() => onBorrarUno(digimon._id)}
            />
          ))}
        </tbody>
      </Table>
    </div>
  </Stack>
);

export default DigimonTable;
