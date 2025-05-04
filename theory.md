# Theory

## Introduction

The study of the free vibration of an SDOF (Single Degree of Freedom) mass-spring system is fundamental in understanding mechanical vibrations. The system consists of a mass (m) attached to a spring with stiffness (k) and may include damping (c) to model energy dissipation. This virtual lab provides a simulated environment to explore motion, analyze its characteristics, and visualize key dynamic responses such as displacement, amplitude decay, and energy variation over time in such a system under free vibration.

## System Dynamics: Derivation of the Equation of Motion

When the system is displaced from its equilibrium position and released, it undergoes free vibration, meaning it vibrates under the influence of internal restoring forces and damping, without any external force. The motion of a Single Degree of Freedom (SDOF) Mass-Spring-Damper System is governed by Newton's Second Law of Motion. Below is the step-by-step derivation of the governing differential equation that describes free vibration behavior.

### Step 1: Identify the Forces Acting on the Mass

Consider a mass m attached to a spring of stiffness k and a damper with damping coefficient c. The system is constrained to move in one direction (typically horizontal or vertical).

**a) Spring Force (Fₛ) -- Restoring Force**

According to **Hooke's Law**, the restoring force provided by the spring is proportional to the displacement x, and it acts in the opposite direction:

Fₛ = -k·x

Where:
- k: Spring stiffness [N/m]
- x: Displacement from the equilibrium position [m]

**b) Damping Force (F_d) -- Dissipative Force**

The damper provides a resistive force proportional to the velocity dx/dt of the mass and opposes motion:

F_d = -c·(dx/dt)

Where:
- c: Damping coefficient [Ns/m]
- dx/dt: Velocity of the mass [m/s]

**c) Inertial Force (F_inertia) -- From Newton's Second Law**

The net force acting on the mass causes acceleration d²x/dt²:

F_inertia = m·(d²x/dt²)

Where:
- m: Mass [kg]
- d²x/dt²: Acceleration [m/s²]

### Step 2: Apply Newton's Second Law

According to Newton's Second Law:

Sum of Forces = m·(d²x/dt²)

So,

m·(d²x/dt²) = -c·(dx/dt) - k·x

### Step 3: Rearranging to Standard Form

Bringing all terms to one side gives the standard second-order differential equation for a damped SDOF system:

m·(d²x/dt²) + c·(dx/dt) + k·x = 0

This equation governs the free vibration of the system. The solution depends on the damping ratio ζ = c/(2√(km)), which determines the nature of vibration (underdamped, critically damped, or overdamped).

## Types of Vibrations in SDOF Systems

1. **Undamped Free Vibration (ζ=0)**
   - Equation: m·(d²x/dt²) + k·x = 0
   - Solution: x(t) = X₀·cos(ωₙ·t - φ)
   - Natural frequency: ωₙ = √(k/m)

2. **Underdamped Free Vibration (0<ζ<1)**
   - Solution: x(t) = X₀·e^(-ζωₙt)·cos(ω_d·t - φ)
   - Damped frequency: ω_d = ωₙ√(1 - ζ²)

3. **Critically Damped Vibration (ζ=1)**
   - Solution: x(t) = (C₁ + C₂·t)·e^(-ωₙt)

4. **Overdamped Vibration (ζ>1)**
   - Solution: x(t) = C₁·e^(s₁·t) + C₂·e^(s₂·t)

## Energy Analysis

1. **Undamped Systems**:
   Total mechanical energy E = ½kx² + ½m(dx/dt)² remains constant.

2. **Damped Systems**:
   Energy decays exponentially: E(t) = E₀·e^(-2ζωₙt)

