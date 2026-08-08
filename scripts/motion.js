/* ==========================================================================
   scripts/motion.js — first-party spring/motion utility (AGENTS.md §13.6)

   Minimum API:
     animate(el, { transform: { y: targetY }, opacity: 1 }, { damping: 1.0, response: 0.4, velocity: 0 })
       -> runs a critically-damped spring on the element's current on-screen
          value to the target, via requestAnimationFrame, animating only
          transform/opacity. Interruptible at any frame; re-targets start
          from the live presentation value and blend velocity.
     cancelAnimation(el) -> stops the loop and keeps the element at its
          live value.
     reduceMotion() -> true when prefers-reduced-motion is set.

   Compositor-only: writes transform (translate/scale) and opacity, and sets
   will-change while motion is imminent. No bounce: damping defaults to 1.0
   (critical) and v1 has no momentum interactions (§11.6.2).
   ========================================================================== */
(function (global) {
  'use strict';

  var reduceQuery = global.matchMedia('(prefers-reduced-motion: reduce)');

  function reduceMotion() {
    return reduceQuery.matches;
  }

  var running = new WeakMap(); // el -> { current, vel, raf }

  function readTransform(el) {
    var m = global.getComputedStyle(el).transform;
    var x = 0;
    var y = 0;
    var scale = 1;
    if (m && m !== 'none') {
      var data = m.match(/^matrix\((.+)\)$/) || m.match(/^matrix3d\((.+)\)$/);
      if (data) {
        var v = data[1].split(',').map(parseFloat);
        if (data[0] === 'matrix3d(') {
          x = v[12] || 0;
          y = v[13] || 0;
          scale = Math.abs(v[0]) || 1;
        } else {
          x = v[4] || 0;
          y = v[5] || 0;
          scale = Math.abs(v[0]) || 1;
        }
      }
    }
    return { x: x, y: y, scale: scale };
  }

  function transformString(v) {
    return 'translate3d(' + v.x + 'px, ' + v.y + 'px, 0) scale(' + v.scale + ')';
  }

  function apply(el, v) {
    el.style.transform = transformString(v);
    el.style.opacity = String(v.opacity);
  }

  function cancelAnimation(el) {
    var state = running.get(el);
    if (state && state.raf) {
      global.cancelAnimationFrame(state.raf);
    }
    if (state) {
      el.style.willChange = '';
      running.delete(el);
    }
  }

  function animate(el, targets, options) {
    options = options || {};
    var damping = options.damping === undefined ? 1.0 : options.damping;
    var response = options.response === undefined ? 0.4 : options.response;
    var velocityIn = options.velocity === undefined ? 0 : options.velocity;

    cancelAnimation(el); // stop any previous loop, keep the live value

    var prev = running.get(el);
    var live;
    if (prev) {
      live = prev.current; // mid-flight: continue from the presentation value
    } else {
      var t = readTransform(el);
      var o = parseFloat(global.getComputedStyle(el).opacity);
      live = {
        x: t.x,
        y: t.y,
        scale: t.scale,
        opacity: isNaN(o) ? 1 : o
      };
    }

    var tf = targets.transform || {};
    var target = {
      x: tf.x === undefined ? live.x : tf.x,
      y: tf.y === undefined ? live.y : tf.y,
      scale: tf.scale === undefined ? live.scale : tf.scale,
      opacity: targets.opacity === undefined ? live.opacity : targets.opacity
    };

    // Blend velocity on re-target instead of hard-cutting (Apple Design §3)
    var vel = {
      x: prev ? (prev.vel.x + velocityIn) / 2 : velocityIn,
      y: prev ? (prev.vel.y + velocityIn) / 2 : velocityIn,
      scale: prev ? (prev.vel.scale + velocityIn) / 2 : velocityIn,
      opacity: prev ? (prev.vel.opacity + velocityIn) / 2 : velocityIn
    };

    var keys = ['x', 'y', 'scale', 'opacity'];
    var stiffness = Math.pow((2 * Math.PI) / response, 2);
    var c = 2 * damping * Math.sqrt(stiffness);
    var EPS = 0.001;
    var state = { current: live, vel: vel, raf: 0, last: 0 };
    running.set(el, state);

    el.style.willChange = 'transform, opacity';

    function step(now) {
      var dt = (now - state.last) / 1000;
      state.last = now;
      if (!isFinite(dt) || dt <= 0) dt = 1 / 60;
      dt = Math.min(dt, 1 / 30);

      // Sub-steps keep the semi-implicit integration stable at any frame rate
      var n = 4;
      var h = dt / n;
      for (var s = 0; s < n; s++) {
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          var a = -stiffness * (live[k] - target[k]) - c * vel[k];
          vel[k] += a * h;
          live[k] += vel[k] * h;
        }
      }

      apply(el, live);

      var settled = true;
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        if (Math.abs(target[key] - live[key]) > EPS || Math.abs(vel[key]) > EPS) {
          settled = false;
          break;
        }
      }

      if (settled) {
        // rest: return to stylesheet-controlled state (lets CSS :active press
        // feedback work on cards once the hover lift settles).
        if (options.rest && target.x === 0 && target.y === 0 && target.scale === 1 && target.opacity === 1) {
          el.style.transform = '';
          el.style.opacity = '';
        } else {
          apply(el, target);
        }
        el.style.willChange = '';
        running.delete(el);
        if (typeof options.onComplete === 'function') {
          options.onComplete();
        }
        return;
      }
      state.raf = global.requestAnimationFrame(step);
    }

    state.raf = global.requestAnimationFrame(step);
  }

  global.animate = animate;
  global.cancelAnimation = cancelAnimation;
  global.reduceMotion = reduceMotion;
})(window);
