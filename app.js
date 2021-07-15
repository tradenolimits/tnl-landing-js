import { GlowParticle } from 'https://cdn.jsdelivr.net/gh/tradenolimits/tnl-landing-js@v1.0.1/glowparticle';

const COLORS = [
  {r: 235, g: 123, b: 29},
  {r: 27, g: 188, b: 234},
  {r: 255, g: 217, b: 204},
  {r: 162, g: 52, b: 226},
]

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.getElementsByClassName('bg-gradient').appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

    this.totalParticles = 1;
    this.particles = [];
    this.maxRadius = 90;
    this.minRadius = 40;

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.createParticles();
  }

  createParticles() {
    let curColor = 0;
    this.particles = [];

    for (let i = 0; i < this.totalParticles; i++) {
      const item = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius, COLORS[curColor])
      );
      
      if (++curColor >= COLORS.length) {
        curColor = 0
      }
      
      this.particles[i] = item;
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.totalParticles; i++) {
      const item = this.particles[i];
      item.animate(this.ctx, this.stageWidth, this.stageHeight);
    }
  }
}

window.onLoad = () => {
  console.log('Particles!!!')
  new App();
}