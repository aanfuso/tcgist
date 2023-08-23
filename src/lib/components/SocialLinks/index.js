import { IconButton } from '@mui/material'

import { DiscordIcon } from 'lib/components/CustomIcons'

const DISCORD_URL = 'https://discord.gg/'

const SocialLink = ({
  url,
  ...props
}) => (
  <IconButton color="primary" href={url} target="_blank" {...props} />
)

function SocialLinks({ iconSize }) {
  return (
    <>
      <SocialLink url={DISCORD_URL} ><DiscordIcon fontSize={iconSize} /></SocialLink>
    </>
  )
}

export default SocialLinks
