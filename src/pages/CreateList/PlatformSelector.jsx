import {
  ToggleButton,
  ToggleButtonGroup,
 } from "@mui/material";

const PlatformSelector = ({ platform, handleChange}) => (
  <ToggleButtonGroup
    color="primary"
    value={platform}
    exclusive
    onChange={handleChange}
    aria-label="Platform"
  >
    <ToggleButton value="moxfield">Moxfield</ToggleButton>
    <ToggleButton value="tcgplayer">TCG Player</ToggleButton>
    <ToggleButton value="delverscan">Delver Scan</ToggleButton>
  </ToggleButtonGroup>
);

export default PlatformSelector;
