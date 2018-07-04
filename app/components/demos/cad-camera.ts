import { LitElement, html } from '@polymer/lit-element'
import { Engine, Scene, FreeCamera, Vector3, MeshBuilder, StandardMaterial } from 'babylonjs'
import { MousePanInputs } from '@rammbulanz/babylonjs-cameras/lib/inputs/MousePanInputs'

export class CadCameraDemo extends LitElement {

   readonly shadowRoot: ShadowRoot

   engine: Engine
   scene: Scene
   camera: FreeCamera
   panInputs: MousePanInputs

   get canvas() {
      return this.shadowRoot.querySelector("canvas.scene") as HTMLCanvasElement;
   }

   init() {

      let canvas = this.canvas;
      if (!canvas) {
         alert("canvas not found");
      }

      let engine = this.engine = new Engine(canvas, true);
      let scene = this.scene = new Scene(engine);

      let camera = this.camera = new FreeCamera("freeCaemra", new Vector3(0, 200, 0), scene, true);
      camera.setTarget(Vector3.Zero());

      camera.inputs.clear();

      let inputs = this.panInputs = new MousePanInputs();
      inputs.camera = this.camera;
      inputs.attachControl(canvas);

      this.generateEnvironment();

      this.engine.runRenderLoop(() => {
         scene.render();
      });

   }

   generateEnvironment() {
      let size = 300;

      let min = -size / 2;
      let max = size / 2;

      let addedCounter = 0;

      for (let x = min; x <= max; x += 50) {

         for (let y = min; y <= max; y += 50) {

            for (let z = min; z <= max; z += 50) {

               let box = MeshBuilder.CreateBox(`box:${x}:${z}`, {
                  size: 15
               }, this.scene);

               box.position = new Vector3(x, y, z);

               let material = new StandardMaterial("material:" + box.name, this.scene);
               material.diffuseColor = BABYLON.Color3.Random();
               box.material = material;

               addedCounter++;

            }

         }

      }

      console.log(`${addedCounter} boxes added.`)
   }

   connectedCallback() {
      super.connectedCallback();
      this.init();
   }

   _render(props: any) {
      return html`
         <style>
            :host {
               display:flex;
               flex-direction:column;
            }
            canvas.scene {
               height: 700px;
            }
         </style>
         
         <canvas class="scene"></canvas>

      `
   }

}

customElements.define("cad-camera-demo", CadCameraDemo);