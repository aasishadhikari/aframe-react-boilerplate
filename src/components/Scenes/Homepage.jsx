/**
 * @file Homepage.jsx
 * This file exports all scenes for initial page.
 */

import { Entity } from 'aframe-react';
import React from 'react';
require('aframe-look-at-component');

const Homepage = {
  name: 'homepage',
  sky: './assets/scenes/equirectangular.jpg',
  scene: () => (
    <Entity
      primitive='a-text'
      id='welcome__title'
      scale='3 3 3'
      color='#FFFFFF'
      wrap-count='30'
      align='center'
      value='Working with the AFrame react boilerplate'
      position={{ x: 0, y: 1.6, z: -12 }}
    />
  )
};

export default Homepage;
