import 'aframe';
import 'aframe-particle-system-component';
import { Entity, Scene } from 'aframe-react';
import React, { Component } from 'react';
import styles from './Index.scss';
import Camera from '../Camera';
import Homepage from '../Scenes/Homepage';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.scenes = [Homepage];
    this.state.initialScene = this.fetchSceneByName('homepage');
    this.state.currentScene = this.fetchSceneByUrl();
  }

  /**
   * When the window hash changes, adjust the current scene.
   */
  componentDidMount() {
    window.onhashchange = () => this.switchCurrentScene(this.fetchSceneByUrl());
  }

  /**
   * Fetches the scene object for the given scene ID.
   *
   * @param {string} name
   *   String containing the name of the scene that should returned.
   *
   * @returns {object}
   *   Object with scene data for the specified scene name.
   */
  fetchSceneByName(name) {
    const newScene = this.state.scenes.find((scene) => scene.name === name);

    // If no scene was found, return the 404 not found scene.
    if (!newScene) {
      return this.fetchSceneByName('no-match');
    }
    return newScene;
  }

  /**
   * Fetches and return all the image tags needed by every scene.
   *
   * @returns {array}
   *   Array of sky image tags.
   */
  fetchSkys() {
    return this.state.scenes.map((scene) => (
      <img key={scene.name} id={scene.name} src={scene.sky} />
    ));
  }

  /**
   * Fetches current scene based on URL
   *
   * @returns {object}
   *   Object with scene data from the name specified in the URL, or 404 if no
   *   scene is found.
   */
  fetchSceneByUrl() {
    let name = window.location.hash.replace('#', '');

    // If the name is empty, the initial scene should be returned.
    if (name.length <= 0) {
      name = this.state.initialScene.name;
    }

    const scene = this.fetchSceneByName(name);

    // If this is a no-match scene, ensure no-match is in the url.
    if (scene.name === 'no-match') {
      window.location.hash = 'no-match';
    }
    return scene;
  }
  /**
   * Switches the current scene to another scene.
   *
   * @param {object} scene
   *   Scene object that should become the current scene.
   */
  switchCurrentScene(scene) {
    this.setState({
      currentScene: scene
    });
  }

  render() {
    return (
      <Scene inspector='https://cdn.jsdelivr.net/gh/aframevr/aframe-inspector@master/dist/aframe-inspector.min.js'>
        <Entity laser-controls position={{ x: 0.3, y: -0.6, z: 0 }} />
        <Entity primative='a-assets'>{this.fetchSkys()}</Entity>
        <Entity
          primitive='a-sky'
          radius='30'
          src={`#${this.state.currentScene.name}`}
        />
        <Camera />
        {this.state.currentScene.scene()}
      </Scene>
    );
  }
}

export default Index;
