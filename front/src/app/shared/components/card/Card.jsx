import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardModal from '../modal/ModalCard';

export default function BasicCard({ title, description }) {
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
      <CardContent>
        <Typography 
          sx={{ fontSize: 12, color: 'text.secondary' }} 
          gutterBottom
        >
          Título
        </Typography>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ fontWeight: 'bold', marginBottom: 1, color: '#151F6D' }}
        >
          {title}
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ mb: 1.5, color: 'text.secondary' }}
        >
          Descrição
        </Typography>
        <Typography 
          variant="body1"
          sx={{ lineHeight: 1.5 }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
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
