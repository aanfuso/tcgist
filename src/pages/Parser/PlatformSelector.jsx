import {
  ToggleButton,
  ToggleButtonGroup,
 } from "@mui/material";

import { MOXFIELD, TCGPLAYER, DELVERSCAN } from "./constants";

const PlatformSelector = ({ platform, handleChange}) => (
  <ToggleButtonGroup
    color="primary"
    value={platform}
    exclusive
    onChange={handleChange}
    aria-label="Platform"
  >
    <ToggleButton value={MOXFIELD}>Moxfield</ToggleButton>
    <ToggleButton value={TCGPLAYER}>TCG Player</ToggleButton>
    <ToggleButton value={DELVERSCAN}>Delver Scan</ToggleButton>
  </ToggleButtonGroup>
);

export default PlatformSelector;
