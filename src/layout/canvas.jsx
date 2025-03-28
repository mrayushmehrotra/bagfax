import React from "react";
import SwatchWrapper from "./swatchWrapper";
import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.InitialStep();
  }

  InitialStep = () => {
    this.container = document.getElementById("container");
    const item = this.container.getBoundingClientRect();

    this.sizes = {
      widht: item.width,
      height: item.height,
    };

    this.canvas = document.querySelector("canvas.webgl");

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      10,
      5000,
    );
    this.camera.position.set(150, 20, 100);

    this.scene.add(this.camera);

    this.manager = new THREE.LoadingManager();
    this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const ProgressVal = (itemsLoaded / itemsTotal) * 100;
      if (ProgressVal === 100) {
        console.log("loaded");
      }
    };

    this.controls = new OrbitControls(this.camera, this.canvas);

    this.controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };
    // smoothness scrolling in model
    this.controls.enableDamping = true;

    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 2;
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    // kitna upar jayega
    this.controls.maxPolarAngle = Math.PI / 1.9;
    // kitna niche jayegs
    this.controls.minPolarAngle = -Math.PI / 2;
    // kitna zoom in hoga
    // this.controls.minDistance = 100;
    // kitna zoom out hoga
    // this.controls.maxDistance = 150;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      // anitaliasing true hai isliye model staircase type na ho jae islitye true rakh rhe hai
      antialias: true,
      //canvas mera transparent rhe islitye alpha true warna black ho sakta hai
      alpha: true,
    });
  };
  render() {
    const { activeData, swatchData, handleSwatchClick } = this.props;
    return (
      <div
        id="container"
        className="w-full h-3/5 relative z-10 lg:w-1/2 lg:h-full"
      >
        <canvas className="webgl w-full h-full relative z-10" />
        <SwatchWrapper
          activeData={activeData}
          handleSwatchClick={handleSwatchClick}
          swatchData={swatchData}
        />
      </div>
    );
  }
}

export default Canvas;
