# Theory

## Introduction

The study of the free vibration of an SDOF (Single Degree of Freedom) mass-spring system is fundamental in understanding mechanical vibrations. The system consists of a mass (m) attached to a spring with stiffness (k) and may include damping (c) to model energy dissipation. This virtual lab provides a simulated environment to explore motion, analyze its characteristics, and visualize key dynamic responses such as displacement, amplitude decay, and energy variation over time in such a system under free vibration.

## System Dynamics: Derivation of the Equation of Motion

When the system is displaced from its equilibrium position and released, it undergoes free vibration, meaning it vibrates under the influence of internal restoring forces and damping, without any external force. The motion of a Single Degree of Freedom (SDOF) Mass-Spring-Damper System is governed by Newton's Second Law of Motion. Below is the step-by-step derivation of the governing differential equation that describes free vibration behavior.

### Step 1: Identify the Forces Acting on the Mass

Consider a mass $m$ attached to a spring of stiffness $k$ and a damper with damping coefficient $c$. The system is constrained to move in one direction (typically horizontal or vertical).

**a) Spring Force ($F_s$) -- Restoring Force**

According to **Hooke's Law**, the restoring force provided by the spring is proportional to the displacement $x$, and it acts in the opposite direction:

$$F_{s} = - kx$$

Where,

- $k$: Spring stiffness [N/m]
- $x$: Displacement from the equilibrium position (m)

**b) Damping Force ($F_d$) -- Dissipative Force**

The damper provides a resistive force proportional to the velocity $\dot{x}$ of the mass and opposes motion:

$$F_{d} = - c\dot{x}$$

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

$$\text{Sum of Forces} = m\ddot{x}$$

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

## Types of Vibrations in SDOF Systems

The free-vibration response of a single-degree-of-freedom (SDOF) mass-spring-damper system is fundamentally governed by the damping ratio, $\zeta$, which quantifies the energy dissipation relative to critical damping. The system exhibits distinct vibrational behaviors depending on the value of $\zeta$, categorized as follows:

1. **Undamped Free Vibration ($\zeta=0$)**
   
   In the idealized case of zero damping, the system obeys the equation $m\ddot{x} + kx = 0$, derived from Newton's Second Law and Hooke's Law. The general solution to this second-order linear differential equation is harmonic and expressed as:

   $$x(t) = X_{0}\cos\left( \omega_{n}t - \phi \right)$$

   Where, $\omega_{n} = \sqrt{\frac{k}{m}}$ denotes the natural frequency of the system. Here, $X_{0}$ and $\phi$ are constants determined by initial displacement and velocity. The absence of damping ensures conservation of mechanical energy, resulting in sustained sinusoidal oscillations with constant amplitude. Such behavior, while theoretically significant, is rarely observed in physical systems due to inevitable energy losses.

2. **Underdamped Free Vibration ($0<\zeta<1$)**
   
   When damping is introduced but remains subcritical ($\zeta<1$), the governing equation becomes $m\ddot{x} + c\dot{x} + kx = 0$. The characteristic equation yields complex conjugate roots, leading to a solution of the form:

   $$x(t) = X_{0}e^{- \zeta\omega_{n}t}\cos\left( \omega_{d}t - \phi \right)$$

   Where, $\omega_{d} = \omega_{n}\sqrt{1 - \zeta^{2}}$ is the damped natural frequency. The exponential term $e^{- \zeta\omega_{n}t}$ imposes an amplitude decay envelope, causing oscillations to diminish over time.

   This regime is characterized by a logarithmic decrement:

   $$\delta = \ln{\left[ \frac{x(t)}{x\left( t + T_{d} \right)} \right]} = \frac{2\pi\zeta}{\sqrt{1 - \zeta^{2}}}$$

   a key experimental metric for estimating $\zeta$ from displacement-time data. Underdamped systems are prevalent in engineering applications such as vehicle suspensions and building dynamics, where controlled energy dissipation is essential.

3. **Critically Damped Vibration ($\zeta=1$)**
   
   At critical damping ($\zeta=1$), the system achieves the fastest possible return to equilibrium without oscillating. The characteristic equation produces a repeated real root $s = \omega_{n}$, resulting in the solution:

   $$x(t) = \left( C_{1} + C_{2}t \right)e^{- \omega_{n}t}$$

   The linear term $C_{2}t$ in the solution reflects the non-oscillatory nature of the motion. Critical damping is often engineered into safety mechanisms, such as elevator braking systems, to prevent hazardous oscillations while ensuring rapid stabilization.

4. **Overdamped Vibration ($\zeta>1$)**
   
   For overdamped systems ($\zeta>1$), the characteristic equation yields two distinct real roots:

   $$s_{1} = - \zeta\omega_{n} + \omega_{n}\sqrt{\zeta^{2} - 1}$$

   and

   $$s_{2} = - \zeta\omega_{n} - \omega_{n}\sqrt{\zeta^{2} - 1}$$

   leading to a solution:

   $$x(t) = C_{1}e^{s_{1}t} + C_{2}e^{s_{2}t}$$

   Both terms decay exponentially, but the dominant term (with the smaller magnitude root) dictates the sluggish return to equilibrium. Overdamped behavior is intentionally designed into systems requiring gradual energy dissipation, such as industrial dampers or hydraulic door closers, where abrupt motions are undesirable.

## Energy Analysis

1. **Energy Conservation in Undamped Systems**

   In an undamped SDOF system ($\zeta=0$), the total mechanical energy $E$ is the sum of kinetic energy ($T$) and potential energy ($U$):

   $$\text{Total mechanical energy } E = T + U = \frac{1}{2}kx^{2} + \frac{1}{2}m{\dot{x}}^{2} \text{ remains constant.}$$

2. **Energy Dissipation in Damped Systems**

   For damped systems ($\zeta>0$), energy dissipates due to the damping force $F_{d} = - c\dot{x}$.

   **Derivation of Energy Decay**:

   i. Start with the damped equation of motion:

   $$m\ddot{x} + c\dot{x} + kx = 0$$

   ii. Multiply by $\dot{x}$ (power = force × velocity):

   $$m\dot{x}\ddot{x} + c\dot{x}\dot{x} + kx\dot{x} = 0$$

   iii. Recognize $\frac{dE}{dt} = m\dot{x}\ddot{x} + kx\dot{x}$:

   $$\frac{dE}{dt} = - c{\dot{x}}^{2}$$

   iv. Integrate over time:

   $$E(t) = E_{0}e^{- \frac{c}{m}t} = E_{0}e^{- 2\zeta\omega_{n}t}$$

   Where $\zeta = \frac{c}{2\sqrt{km}}$ and $\omega_{n} = \sqrt{\frac{k}{m}}$.

   Energy decays exponentially, governed by the damping ratio $\zeta$ and natural frequency $\omega_{n}$.

