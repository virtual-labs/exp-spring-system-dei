# Procedure

1. Set the parameters using sliders or input boxes.
2. Use a "Start Vibration" button to initiate the system's motion based on the set parameters.
3. View the mass oscillating in the animation area and observe how the amplitude changes over time, especially for damped systems.
4. Observe the time it takes for the mass to complete a full oscillation (T). Optionally, the system can display time taken for n oscillations and compute T automatically.
5. For damped systems, record the peak amplitudes $(x_{1}, x_{2}, x_{3}, \ldots)$ of the oscillations.
6. Displacement vs. time for the entire simulation duration will be plotted.

## Analyze Results

**Interpret Graphs**:

- Undamped System: Constant amplitude over time.
- Damped System: Amplitude decays exponentially based on the damping ratio.

**Compare Experimental vs. Theoretical Values:**

- Compute theoretical $\omega_{n} = \sqrt{\frac{k}{m}}$, $\zeta = \frac{c}{2\sqrt{km}}$, and $T_{th} = \frac{2\pi}{\omega_{n}}$.
- Tabulate discrepancies and discuss sources of error (e.g., numerical approximations).

7. Download the simulation results.
8. Use the "Reset" button to restore the system to its initial state.

# Observations

| S.N. | Mass (m) | Stiffness (k) | Time Period (T) | Natural Frequency ($\omega_{n}$) | Damping Ratio ($\zeta$) |
|------|----------|---------------|------------------|-----------------------------------|-------------------------|
|      |          |               |                  |                                   |                         |
|      |          |               |                  |                                   |                         |

# Graphical Representation

1. Plot displacement vs. time to visualize the free vibration response.
2. For damped systems, plot amplitude vs. time to observe the exponential decay.

## Graph Analysis

- **For an Underdamped System ($\zeta < 1$)**  
  The energy plot will show an exponential decay with oscillations.
  
- **For an Overdamped System ($\zeta > 1$)**  
  The energy decays exponentially without oscillations.
  
- **For a Critically Damped System ($\zeta = 1$)**  
  The energy decays quickly and smoothly without oscillations.
