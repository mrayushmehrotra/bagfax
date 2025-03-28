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

  componentDidUpdate(prevProps, prevState) {
    const { activeData } = this.props;
    if (prevProps.activeData !== activeData) {
      this.applyMaterial(activeData);
    }
  }

  componentDidMount() {
    this.InitialStep();
  }

  InitialStep = () => {
    this.container = document.getElementById("container");
    const item = this.container.getBoundingClientRect();

    this.sizes = {
      width: item.width,
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
    this.controls.autoRotateSpeed = 3;
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    // kitna upar jayega
    this.controls.maxPolarAngle = Math.PI / 1.9;
    // kitna niche jayegs
    this.controls.minPolarAngle = -Math.PI / 2;
    // kitna zoom in hoga
    this.controls.minDistance = 100;
    // kitna zoom out hoga
    this.controls.maxDistance = 150;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      // anitaliasing true hai isliye model staircase type na ho jae islitye true rakh rhe hai
      antialias: true,
      //canvas mera transparent rhe islitye alpha true warna black ho sakta hai
      alpha: true,
    });

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.outputEncoding = THREE.SRGBEncoding;
    // this.renderer.shadowMap.enabled = true;

    this.loadHDR();
    this.addModel();
    window.addEventListener("resize", this.resize);
    const render = () => {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(render);
    };
    render();
  };

  resize = () => {
    this.sizes.width = this.container.offsetWidth;
    this.sizes.height = this.container.offsetHeight;

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  };

  loadHDR = () => {
    new RGBELoader(this.manager)
      .setDataType(THREE.HalfFloatType)
      .load("default.hdr", (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.needsUpdate = true;
        this.scene.environment = texture;
      });
  };

  addModel = () => {
    const THREE_PATH = `https://unpkg.com/three@@.${THREE.REVISION}`;
    const DRACO_LOADER = new DRACOLoader(this.manager).setDecoderPath(
      `${THREE_PATH}/examples/js/libs/draco/gltf`,
    );

    const bag = "bag.glb";
    const GltfLoader = new GLTFLoader(this.manager).setDRACOLoader(
      DRACO_LOADER,
    );

    GltfLoader.load(bag, (gltf) => {
      gltf.scene.position.set(0, -30, 0);
      this.scene.add(gltf.scene);
    });
  };

  applyMaterial = (data) => {
    this.scene.traverse((element) => {
      if (element.isMesh) {
        Object.entries(data.itemList).forEach((mesh) => {
          if (mesh[0] === element.name) {
            var value = new THREE.Color(mesh[1].color).convertSRGBToLinear();
            gsap.to(element.material.color, {
              r: value.r,
              g: value.g,
              b: value.b,
              ease: "power3.inOut",
              duration: 0.8,
            });
            element.material.needsUpdate = true;
          }
        });
      }
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
