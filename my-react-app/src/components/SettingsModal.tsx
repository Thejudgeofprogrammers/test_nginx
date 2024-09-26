import React from 'react';
import { Dialog, DialogTitle, DialogContent, FormControlLabel, Switch } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

interface SettingsModalProps {
    onClose: () => void;  // Define the onClose prop type
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { toggleTheme, mode } = useThemeContext();

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
          label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;



// import React from 'react';
// import { Dialog, DialogTitle, DialogContent, FormControlLabel, Switch } from '@mui/material';
// import { useThemeContext } from '../context/ThemeContext';
// import { useNavigate } from 'react-router-dom';

// const SettingsModal: React.FC = () => {
//   const { toggleTheme, mode } = useThemeContext();
//   const navigate = useNavigate();

//   const handleClose = () => {
//     navigate('/dashboard');
//   };

//   return (
//     <Dialog open={true} onClose={handleClose} BackdropProps={{ onClick: handleClose }}>
//       <DialogTitle>Settings</DialogTitle>
//       <DialogContent>
//         <FormControlLabel
//           control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
//           label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
//         />
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default SettingsModal;
