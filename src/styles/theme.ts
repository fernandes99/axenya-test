const theme = {
    colors: {
      primary: '#000000',
      secondary: '#3896B4',
      background: '#FFFFFF',

      gray_darker: '#3D3F42',
      gray_dark: '#67696C',
      gray: '#898B8E',
      gray_light: '#A7A8A9',
      gray_ligheter: '#D1D1CF',

      success: '#70BC39',
      error: '#FF6161',

      white: '#ffffff',
      black: '#000000'
    },

    mixins: {
      radius: {
        small: '4px',
        medium: '8px',
        large: '16px'
      },
      index: {
        none: -1,
        z0: 1,
        z1: 10,
        z2: 100,
        z3: 1000,
        z4: 10000,
        z5: 100000,
        zMax: 2147483647,
      }
    },

    media: {
      max_width: '1200px',
      desktop: '1240px',
      laptop: '980px',
      tablet: '768px',
      mobile: '520px'
    }
  }
  
  export default theme;