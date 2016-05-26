// $(document).ready(function() {

  (function() {
    var Particle;

    window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
      return window.setTimeout(function() {
        return callback(+new Date());
      }, 1000 / 60);
    });

    window.onmousemove = function(e) {
      return this.mouse = {
        x: e.x * this.pixelDensity,
        y: e.y * this.pixelDensity
      };
    };

    Particle = (function() {
      function Particle() {
        var velocityMax;
        velocityMax = 1;
        this.x = ~~(Math.random() * width);
        this.y = ~~(Math.random() * height);
        this.xVel = velocityMax * Math.random() * (~~(Math.random() * 2) ? -1 : 1);
        this.yVel = velocityMax * Math.random() * (~~(Math.random() * 2) ? -1 : 1);
        this.radius = 2.5 * window.pixelDensity;
      }

      Particle.prototype.tick = function() {
        if ((window.mouse != null) && Math.abs(this.x - window.mouse.x) < 50 && Math.abs(this.y - window.mouse.y) < 50) {
          this.xVel *= 1.1;
          this.yVel *= 1.1;
        }
        if (this.x + this.xVel <= 0 || this.x + this.xVel >= window.width) {
          this.xVel *= -0.9;
        }
        if (this.y + this.yVel <= 0 || this.y + this.yVel >= window.height) {
          this.yVel *= -0.9;
        }
        this.x += this.xVel;
        this.y += this.yVel;
        return this;
      };

      Particle.prototype.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 6.283185307179586, 0);
        ctx.fill();
        ctx.closePath();
        return this;
      };

      return Particle;

    })();

    window.onload = function() {
      var clock, connectNearParticles, ctx, drawParticles, elm, particles, pixelDensity, run, tick, xOffset, yOffset;
      ctx = void 0;
      elm = void 0;
      pixelDensity = void 0;
      clock = 0;
      xOffset = 100;
      yOffset = 100;
      particles = [];
      run = function() {
        var height, i, k, width;
        elm = document.getElementById('canvas');
        this.pixelDensity = pixelDensity = window.devicePixelRatio || 1;
        this.width = width = window.innerWidth * this.pixelDensity;
        this.height = height = window.innerHeight * this.pixelDensity;
        elm.style.width = width / this.pixelDensity + "px";
        elm.style.height = height / this.pixelDensity + "px";
        xOffset = width * pixelDensity / 2;
        elm.setAttribute('width', width);
        elm.setAttribute('height', height);
        ctx = elm.getContext('2d');
        ctx.lineWidth = 1;
        document.body.appendChild(elm);
        for (i = k = 0; k <= 100; i = ++k) {
          particles.push(new Particle);
        }
        return tick();
      };
      drawParticles = function() {
        var i, k, ref, results;
        ctx.fillStyle = "#FFFFFF";
        results = [];
        for (i = k = 0, ref = particles.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
          results.push(particles[i].draw(ctx).tick());
        }
        return results;
      };
      connectNearParticles = function() {
        var i, j, k, ref, results;
        ctx.strokeStyle = "rgba(34, 127, 187, 0.3)";
        results = [];
        for (i = k = 0, ref = particles.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
          results.push((function() {
            var l, ref1, results1;
            results1 = [];
            for (j = l = 0, ref1 = particles.length; 0 <= ref1 ? l < ref1 : l > ref1; j = 0 <= ref1 ? ++l : --l) {
              if (particles[i] !== particles[j]) {
                if (Math.abs(particles[i].x - particles[j].x) < window.innerWidth / 9 && Math.abs(particles[i].y - particles[j].y) < window.innerHeight / 6) {
                  ctx.beginPath();
                  ctx.moveTo(particles[i].x, particles[i].y);
                  ctx.lineTo(particles[j].x, particles[j].y);
                  ctx.stroke();
                  results1.push(ctx.closePath());
                } else {
                  results1.push(void 0);
                }
              } else {
                results1.push(void 0);
              }
            }
            return results1;
          })());
        }
        return results;
      };
      tick = function() {
        ctx.clearRect(0, 0, width * pixelDensity, height * pixelDensity);
        drawParticles();
        connectNearParticles();
        return requestAnimationFrame(tick);
      };
      return run();
    };

  }).call(this);

// })
