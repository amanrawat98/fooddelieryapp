import { Box } from '@mui/material'
import React from 'react'

export default function BannerImage({bannerImageUrl,title}) {
  return (
    <Box
    sx={{
      borderRadius: 2,
      overflow: "hidden",
      height:"35vh",
      width: "100%",
      backgroundImage: `url(${bannerImageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}
  >
   {title}
  </Box>
  )
}
