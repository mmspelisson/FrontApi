import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardModal from '../modal/ModalCard';

const BasicCard = ({ title, description }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleVerMais = () => {
    setModalOpen(true);
  };

  return (
    <Card
      sx={{
        minWidth: 100,
        maxWidth: 250,
        boxShadow: 5,
        borderRadius: 2,
        padding: 2,
        margin: 2,
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
        }
      }}
    >
      <div
        style={{
          backgroundColor: '#f1f1f1',
          borderRadius: '8px 8px 0 0',
          padding: '10px',
          textAlign: 'center',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: 'bold', color: '#151F6D' }}
        >
          {title}
        </Typography>
      </div>
      <CardContent
        sx={{
          padding: '10px', // Padding ajustado para melhor visualização
          textAlign: 'center',
          maxHeight: '5em', // Ajuste para caber até três linhas de texto
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}
      >
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.5, color: 'text.secondary' }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          justifyContent: 'center',
          paddingTop: '10px', // Espaço adicionado acima do botão
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{ textTransform: 'none' }}
          onClick={handleVerMais}
        >
          Ver mais
        </Button>
      </CardActions>
      <CardModal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} title={title} description={description} />
    </Card>
  );
}

export default BasicCard;
