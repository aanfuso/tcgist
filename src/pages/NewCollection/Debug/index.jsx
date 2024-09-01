import { Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { parseList } from './utils';

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

export default function Debug({ setList }) {
  const reader = new FileReader();

  reader.onload = function(e) {
    const text = e.target.result;
    const parsed = parseList(text).slice(1);

    setList(parsed);
  }

  const handleFile = (e) => {
    const files = Array.from(e.target.files);

    reader.readAsText(files[0]);
  }


  return (
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
  );
}
