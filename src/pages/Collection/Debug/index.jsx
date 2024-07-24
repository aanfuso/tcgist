import { Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { getStats } from '../utils';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Debug({ rows, handleFile }) {

  const stats = getStats(rows);

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUpload />}
        >
        Import
        <VisuallyHiddenInput type="file" onChange={handleFile} />
      </Button>

      <pre>{JSON.stringify(stats, null, 2) }</pre>);
    </>
  );
}
