# THEORY

## Introduction

The study of the free vibration of an SDOF (Single Degree of Freedom) mass-spring system is fundamental in understanding mechanical vibrations. The system consists of a mass (m) attached to a spring with stiffness (k) and may include damping (c) to model energy dissipation. This virtual lab provides a simulated environment to explore motion, analyze its characteristics, and visualize key dynamic responses such as displacement, amplitude decay, and energy variation over time in such a system under free vibration.

---

## System Dynamics: Derivation of the Equation of Motion

When the system is displaced from its equilibrium position and released, it undergoes free vibration, meaning it vibrates under the influence of internal restoring forces and damping, without any external force. The motion of a Single Degree of Freedom (SDOF) Mass-Spring-Damper System is governed by Newton's Second Law of Motion. Below is the step-by-step derivation of the governing differential equation that describes free vibration behavior.

### Step 1: Identify the Forces Acting on the Mass

Consider a mass $m$ attached to a spring of stiffness $k$ and a damper with damping coefficient $c$. The system is constrained to move in one direction (typically horizontal or vertical).

**a) Spring Force ($F_s$) -- Restoring Force**

According to **Hooke's Law**, the restoring force provided by the spring is proportional to the displacement $x$, and it acts in the opposite direction:

$$F_s = - kx$$

Where,
- $k$: Spring stiffness [N/m]
- $x$: Displacement from the equilibrium position (m)

**b) Damping Force ($F_d$) -- Dissipative Force**

The damper provides a resistive force proportional to the velocity $\dot{x}$ of the mass and opposes motion:

$$F_d = - c\dot{x}$$

Where:
- $c$: Damping coefficient (Ns/m)
- $\dot{x}$: Velocity of the mass (m/s)

**c) Inertial Force ($F_{inertia}$) -- From Newton's Second Law**

The net force acting on the mass causes acceleration $\ddot{x}$:

$$F_{inertia} = m\ddot{x}$$

Where:
- $m$: Mass (kg)
- $\ddot{x}$: Acceleration (m/s²)

### Step 2: Apply Newton's Second Law

According to Newton's Second Law:

Sum of Forces = $m\ddot{x}$

So,

$$m\ddot{x} = - c\dot{x} - kx$$

### Step 3: Rearranging to Standard Form

Bringing all terms to one side of the equation gives the standard second-order differential equation of motion for a damped SDOF system:

$$m\ddot{x} + c\dot{x} + kx = 0$$

And writing it as function of time:

$$m\ddot{x}(t) + c\dot{x}(t) + kx(t) = 0$$

Where,
- $x(t)$: Displacement of the mass as a function of time
- $\dot{x}(t)$: Velocity
- $\ddot{x}(t)$: Acceleration
- $m$: Mass [kg]
- $c$: Damping coefficient [Ns/m]
- $k$: Spring stiffness [N/m]

This equation governs the **free vibration** of the system and forms the basis for analyzing its dynamic response. The solution to this equation depends on the damping ratio $\zeta = \frac{c}{2\sqrt{km}}$, which determines the nature of vibration (underdamped, critically damped, or overdamped).

### Summary Table: System Parameters and Variables

| Parameter/Variable | Symbol | Units | Physical Meaning |
|-------------------|--------|-------|------------------|
| Mass | $m$ | kg | Resistance to acceleration; larger mass requires more force |
| Spring Stiffness | $k$ | N/m | Resistance to displacement; higher stiffness increases $\omega_n$ |
| Damping Coefficient | $c$ | Ns/m | Energy dissipation rate; controls oscillation decay |
| Displacement | $x(t)$ | m | Position of mass from equilibrium at time $t$ |
| Velocity | $\dot{x}(t)$ | m/s | Rate of change of displacement |
| Acceleration | $\ddot{x}(t)$ | m/s² | Rate of change of velocity |
| Natural Frequency | $\omega_n$ | rad/s | Characteristic frequency of undamped oscillation |
| Damped Frequency | $\omega_d$ | rad/s | Frequency of oscillation with damping present |
| Damping Ratio | $\zeta$ | - | Dimensionless ratio: $\zeta = \frac{c}{2\sqrt{km}}$ |
| Time Period | $T$ | s | Time for one complete oscillation: $T = \frac{2\pi}{\omega_n}$ |
| Logarithmic Decrement | $\delta$ | - | Measure of amplitude decay between successive peaks |

*Table 1: Summary of System Parameters, Variables, and Physical Interpretations*

---

## Types of Vibrations in SDOF Systems

The free-vibration response of a single-degree-of-freedom (SDOF) mass-spring-damper system is fundamentally governed by the damping ratio, $\zeta$, which quantifies the energy dissipation relative to critical damping. The system exhibits distinct vibrational behaviors depending on the value of $\zeta$, categorized as follows:

### 1. Undamped Free Vibration ($\zeta = 0$)

In the idealized case of zero damping, the system obeys the equation $m\ddot{x} + kx = 0$, derived from Newton's Second Law and Hooke's Law. The general solution to this second-order linear differential equation is harmonic and expressed as:

$$x(t) = X_0 \cos(\omega_n t - \phi)$$

Where, $\omega_n = \sqrt{\frac{k}{m}}$ denotes the natural frequency of the system. Here, $X_0$ and $\phi$ are constants determined by initial displacement and velocity.

**Physical Interpretation:** The absence of damping ensures conservation of mechanical energy, resulting in sustained sinusoidal oscillations with constant amplitude. Such behavior, while theoretically significant, is rarely observed in physical systems due to inevitable energy losses.

### 2. Underdamped Free Vibration ($0 < \zeta < 1$)

When damping is introduced but remains subcritical ($\zeta < 1$), the governing equation becomes $m\ddot{x} + c\dot{x} + kx = 0$. The characteristic equation yields complex conjugate roots, leading to a solution of the form:

$$x(t) = X_0 e^{-\zeta\omega_n t} \cos(\omega_d t - \phi)$$

Where, $\omega_d = \omega_n \sqrt{1 - \zeta^2}$ is the damped natural frequency. The exponential term $e^{-\zeta\omega_n t}$ imposes an amplitude decay envelope, causing oscillations to diminish over time.

**Physical Interpretation:** Underdamped systems exhibit "ringing" behavior where oscillations gradually fade. This is the most common engineering scenario. Examples include vehicle suspensions that oscillate after hitting a bump before settling.

This regime is characterized by a logarithmic decrement:

$$\delta = \ln\left[ \frac{x(t)}{x(t + T_d)} \right] = \frac{2\pi\zeta}{\sqrt{1 - \zeta^2}}$$

This is a key experimental metric for estimating $\zeta$ from displacement-time data. Underdamped systems are prevalent in engineering applications such as vehicle suspensions and building dynamics, where controlled energy dissipation is essential.

### 3. Critically Damped Vibration ($\zeta = 1$)

At critical damping ($\zeta = 1$), the system achieves the fastest possible return to equilibrium without oscillating. The characteristic equation produces a repeated real root $s = \omega_n$, resulting in the solution:

$$x(t) = (C_1 + C_2 t) e^{-\omega_n t}$$

**Physical Interpretation:** Critical damping represents the "sweet spot" -- the system returns to rest as quickly as possible without overshooting or oscillating. This is ideal for precision instruments where quick stabilization without ringing is required.

The linear term $C_2 t$ in the solution reflects the non-oscillatory nature of the motion. Critical damping is often engineered into safety mechanisms, such as elevator braking systems, to prevent hazardous oscillations while ensuring rapid stabilization.

### 4. Overdamped Vibration ($\zeta > 1$)

For overdamped systems ($\zeta > 1$), the characteristic equation yields two distinct real roots:

$$s_1 = -\zeta\omega_n + \omega_n\sqrt{\zeta^2 - 1}$$
$$s_2 = -\zeta\omega_n - \omega_n\sqrt{\zeta^2 - 1}$$

leading to a solution:

$$x(t) = C_1 e^{s_1 t} + C_2 e^{s_2 t}$$

**Physical Interpretation:** Overdamped systems respond sluggishly to disturbances, taking a long time to return to equilibrium. While there's no oscillation (which can be desirable), the slow response might not be practical in many applications.

Both terms decay exponentially, but the dominant term (with the smaller magnitude root) dictates the sluggish return to equilibrium. Overdamped behavior is intentionally designed into systems requiring gradual energy dissipation, such as industrial dampers or hydraulic door closers, where abrupt motions are undesirable.

---

## Energy Analysis

### 1. Energy Conservation in Undamped Systems

In an undamped SDOF system ($\zeta = 0$), the total mechanical energy $E$ is the sum of kinetic energy ($T$) and potential energy ($U$):

Total mechanical energy $E = T + U = \frac{1}{2}kx^2 + \frac{1}{2}m\dot{x}^2$ remains constant.

### 2. Energy Dissipation in Damped Systems

For damped systems ($\zeta > 0$), energy dissipates due to the damping force $F_d = -c\dot{x}$.

**Derivation of Energy Decay:**

1. Start with the damped equation of motion:
   $$m\ddot{x} + c\dot{x} + kx = 0$$

2. Multiply by $\dot{x}$ (power = force × velocity):
   $$m\dot{x}\ddot{x} + c\dot{x}^2 + kx\dot{x} = 0$$

3. Recognize $\frac{dE}{dt} = m\dot{x}\ddot{x} + kx\dot{x}$:
   $$\frac{dE}{dt} = -c\dot{x}^2$$

4. Integrate over time:
   $$E(t) = E_0 e^{-\frac{c}{m}t} = E_0 e^{-2\zeta\omega_n t}$$

Where $\zeta = \frac{c}{2\sqrt{km}}$ and $\omega_n = \sqrt{\frac{k}{m}}$.

Energy decays exponentially, governed by the damping ratio $\zeta$ and natural frequency $\omega_n$.

---




<script>
MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']]
  },
  svg: {
    fontCache: 'global'
  }
};
</script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
