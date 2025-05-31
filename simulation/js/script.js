function getElement(id){
    return document.getElementById(id);
}

const setText = (id, text) => {
    document.getElementById(id).innerText = text
}


var inputValues = {
    mass: 1,  // kg
    k: 100,      // N/m (spring constant)
    c: 0,       // Ns/m (damping coefficient
    x_0: 0.05,  // Initial displacement (meters)
    v_0: 0      // Initial velocity (m/s)
};


const canvas1 = getElement("cnv1");
const ctx1 = canvas1.getContext("2d");
const canvas2 = getElement("cnv2");
const ctx2 = canvas2.getContext("2d");
const canvas3 = getElement("cnv3");
const ctx3 = canvas3.getContext("2d");

const resetButton = getElement("resetButton");
const pauseButton = getElement("pauseButton");
const playButton = getElement("playButton");
const lockButton = getElement("lock_button");


getElement("mass").addEventListener("input",()=>{
    inputValues.mass = parseFloat(getElement("mass").value);
    getElement("mass_value").innerHTML = inputValues.mass;
})

getElement("stiffness").addEventListener("input",()=>{
    inputValues.k = parseFloat(getElement("stiffness").value);
    getElement("stiffness_value").innerHTML = inputValues.k;
})

getElement("damping").addEventListener("input",()=>{
    inputValues.c = parseFloat(getElement("damping").value);
    getElement("damping_value").innerHTML = inputValues.c;
})

getElement("displacement").addEventListener("input",()=>{
    inputValues.x_0 = parseFloat(getElement("displacement").value);
    getElement("displacement_value").innerHTML = inputValues.x_0;
})

getElement("velocity").addEventListener("input",()=>{
    inputValues.v_0 = parseFloat(getElement("velocity").value);
    getElement("velocity_value").innerHTML = inputValues.v_0;
})





const checkBox = ()=>{

    if (lockButton.checked){
        getElement('mass').disabled = true;
        getElement('stiffness').disabled = true;
        getElement('damping').disabled = true;
        getElement('displacement').disabled = true;
        getElement('velocity').disabled = true;

        getElement('lock_button').disabled = true;

    }
    else{
        getElement('mass').disabled = false;
        getElement('stiffness').disabled = false;
        getElement('damping').disabled = false;
        getElement('displacement').disabled = false;
        getElement('velocity').disabled = false;
    }



}




function drawSpring(ctx1, x, y, length, coils, amplitude) {
    const coilLength = length / coils;
    ctx1.beginPath();
    ctx1.moveTo(x, y);

    ctx1.strokeStyle = '#07309e'

    for (let i = 0; i < coils; i++) {
        const cx1 = x + amplitude;
        const cy1 = y + coilLength * i + coilLength / 4;
        const cx2 = x - amplitude;
        const cy2 = y + coilLength * i + coilLength * 3 / 4;
        const ex = x;
        const ey = y + coilLength * (i + 1);



        ctx1.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey);
    }


    ctx1.stroke();
}



function drawDamper(ctx1,x,y,pistonLength,offset){

    // piston length
    ctx1.strokeStyle = 'black';
    ctx1.beginPath();
    ctx1.moveTo(x,80+offset);
    ctx1.lineTo(x,y+pistonLength);
    ctx1.stroke();



    // piston ellipse
    ctx1.fillStyle = '#eeca8b';
    ctx1.strokeStyle = 'black';
    ctx1.lineWidth = 3
    ctx1.beginPath();
    ctx1.ellipse(x,y+pistonLength,16,6,0,0,2*Math.PI);
    ctx1.stroke()
    ctx1.fill();

    ctx1.fillStyle = 'black';
    ctx1.font = '15px Roboto';
    ctx1.fillText('c', x-4, y + pistonLength+3);


    // upper ellipse
    ctx1.lineWidth  = 2
    ctx1.beginPath();
    ctx1.ellipse(x,100+20, 16, 6, 0, 0, 2 * Math.PI); 
    ctx1.stroke();




    // lines
    
    ctx1.beginPath();
    ctx1.moveTo(x-16,120)
    ctx1.lineTo(x-16,200)
    ctx1.stroke();


    ctx1.beginPath();
    ctx1.moveTo(x+16,120)
    ctx1.lineTo(x+16,200)
    ctx1.stroke();


    // bottom ellipse
    ctx1.beginPath();
    ctx1.ellipse(x,200, 16, 6, 0, 0, Math.PI); 
    ctx1.stroke();



    // bottom line
    ctx1.beginPath();
    ctx1.moveTo(400,205);
    ctx1.lineTo(400,220);
    ctx1.stroke();


}










function drawSetup(offset) {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    
    ctx1.beginPath();
    ctx1.moveTo(200, 220);
    ctx1.lineTo(500, 220);
    ctx1.stroke();
    
    let gap = 0;
    ctx1.strokeStyle = 'black';
    ctx1.lineWidth = 1.5
    for (let i = 0; i < 21; i++) {
        ctx1.beginPath();
        ctx1.moveTo(200 + gap, 220);
        ctx1.lineTo(180 + gap, 240);
        ctx1.stroke();
        gap += 15;
    }

    // write a text 'M' in rectangle
    ctx1.fillStyle = 'black';
    ctx1.fillText('M', 275 + 75, 30 + offset + 35);




    ctx1.strokeStyle = 'black';
    ctx1.lineWidth = 2
    
    ctx1.strokeRect(275, 30 + offset, 150, 50); // Box moves with displacement


    ctx1.strokeStyle = 'black';
    ctx1.lineWidth = 1.5;
    drawSpring(ctx1, 300, 80 + offset, 140-offset, 12, 60);
    drawDamper(ctx1, 400, 100 + offset, 70,offset);

   

}






function drawDisplacementGraph(displacementValues, timeValues) {
    // Canvas dimensions
    const width = canvas2.width;
    const height = canvas2.height;

    // Graph dimensions and margins
    const margin = 50;
    const graphWidth = width - 2 * margin;
    const graphHeight = height - 2 * margin;

    ctx2.clearRect(0, 0, width, height);

    // Calculate maximum and minimum displacement
    const maxTime = Math.max(...timeValues);
    const maxDisplacement = Math.max(...displacementValues);
    const minDisplacement = Math.min(...displacementValues);

    // Adjust scaling for y-axis to handle negative values
    const yRange = maxDisplacement - minDisplacement;
    const yScale = graphHeight / yRange;

    // Draw background grid
    ctx2.strokeStyle = '#ced3d3'; // Light gray gridlines
    ctx2.lineWidth = 1;

    // Vertical gridlines (x-axis)
    for (let x = margin; x <= width - margin; x += graphWidth / 10) {
        ctx2.beginPath();
        ctx2.moveTo(x, margin);
        ctx2.lineTo(x, height - margin);
        ctx2.stroke();
    }

    // Horizontal gridlines (y-axis)
    for (let y = margin; y <= height - margin; y += graphHeight / 10) {
        ctx2.beginPath();
        ctx2.moveTo(margin, y);
        ctx2.lineTo(width - margin, y);
        ctx2.stroke();
    }

    // Draw axes
    ctx2.strokeStyle = '#333'; // Dark axes
    ctx2.lineWidth = 2;

    // X-axis
    ctx2.beginPath();
    ctx2.moveTo(margin, height - margin);
    ctx2.lineTo(width - margin, height - margin);
    ctx2.stroke();

    // Y-axis (centered vertically)
    const yAxisY = height - margin - (maxDisplacement / yRange) * graphHeight;
    ctx2.beginPath();
    ctx2.moveTo(margin, margin);
    ctx2.lineTo(margin, height - margin);
    ctx2.stroke();

    // Add title
    ctx2.fillStyle = '#000'; // Black title
    ctx2.font = '16px Arial';
    ctx2.textAlign = 'center';
    ctx2.fillText('Displacement vs Time Graph', width / 2, margin / 2);

    // Add axis labels
    ctx2.fillStyle = '#000';
    ctx2.font = '10px Arial';

    // X-axis label
    ctx2.fillText('Time (s)', width / 2, height - margin / 4);

    // Y-axis label
    ctx2.save();
    ctx2.translate(margin / 4, height / 2);
    ctx2.rotate(-Math.PI / 2);
    ctx2.fillText('Displacement (m)', 0, 0);
    ctx2.restore();

    // Add tick marks and labels for x-axis
    ctx2.font = '10px Arial';
    ctx2.textAlign = 'center';
    ctx2.textBaseline = 'middle';


    // X-axis ticks
    let dummy = 1;
    let dummyNan = 0;

    for (let x = margin; x <= width - margin; x += graphWidth / 10) {
        let timeLabel = ((x - margin) / graphWidth * maxTime).toFixed(1);
        if (timeLabel == '-Infinity') {
            timeLabel = dummy;
            dummy += 1;
        }
        if (timeLabel == 'NaN') {
            timeLabel = dummyNan;
        }
        ctx2.beginPath();
        ctx2.moveTo(x, height - margin - 5);
        ctx2.lineTo(x, height - margin + 5);
        ctx2.stroke();
        ctx2.fillText(timeLabel, x, height - margin + 15);
    }

    // Add tick marks and labels for y-axis
    dummy = 10
    dummyNan = 10
    
    ctx2.textAlign = 'right';
    for (let y = margin; y <= height - margin; y += graphHeight / 10) {
        let displacementLabel = (maxDisplacement - ((y - margin) / graphHeight) * yRange).toFixed(2);

        if (displacementLabel == '-Infinity') {
            displacementLabel = dummy;
            dummy -= 1;
        }
        if (displacementLabel == 'NaN') {
            displacementLabel = dummyNan;
            dummyNan -= 1;
        }
        ctx2.beginPath();
        ctx2.moveTo(margin - 5, y);
        ctx2.lineTo(margin + 5, y);
        ctx2.stroke();
        ctx2.fillText(displacementLabel, margin - 10, y);
    }

    // Plot Displacement
    ctx2.strokeStyle = '#e74c3c'; // Red line for displacement
    ctx2.lineWidth = 1;
    ctx2.beginPath();
    for (let i = 0; i < displacementValues.length; i++) {
        const x = margin + (timeValues[i] / maxTime) * graphWidth;
        const y = height - margin - ((displacementValues[i] - minDisplacement) / yRange) * graphHeight;
        if (i === 0) {
            ctx2.moveTo(x, y);
        } else {
            ctx2.lineTo(x, y);
        }
    }
    ctx2.stroke();
}

function drawAmplitudeGraph(amplitudeValues, timeValues) {
    // Canvas dimensions
    const width = canvas3.width;
    const height = canvas3.height;

   

    // Graph dimensions and margins
    const margin = 50;
    const graphWidth = width - 2 * margin;
    const graphHeight = height - 2 * margin;

    ctx3.clearRect(0, 0, width, height);

    // Find the maximum energy and time values for scaling
    const maxAmplitude = Math.max(...amplitudeValues);
    const maxTime = Math.max(...timeValues);

    // Draw background grid
    ctx3.strokeStyle = '#ced3d3'; // Light gray gridlines
    ctx3.lineWidth = 1;

    // Vertical gridlines (x-axis)
    for (let x = margin; x <= width - margin; x += graphWidth / 10) {
        ctx3.beginPath();
        ctx3.moveTo(x, margin);
        ctx3.lineTo(x, height - margin);
        ctx3.stroke();
    }

    // Horizontal gridlines (y-axis)
    for (let y = margin; y <= height - margin; y += graphHeight / 10) {
        ctx3.beginPath();
        ctx3.moveTo(margin, y);
        ctx3.lineTo(width - margin, y);
        ctx3.stroke();
    }

    // Draw axes
    ctx3.strokeStyle = '#333'; // Dark axes
    ctx3.lineWidth = 2;

    // X-axis
    ctx3.beginPath();
    ctx3.moveTo(margin, height - margin);
    ctx3.lineTo(width - margin, height - margin);
    ctx3.stroke();

    // Y-axis
    ctx3.beginPath();
    ctx3.moveTo(margin, margin);
    ctx3.lineTo(margin, height - margin);
    ctx3.stroke();

    // Add title
    ctx3.fillStyle = '#000'; // Black title
    ctx3.font = '16px Arial';
    ctx3.textAlign = 'center';
    ctx3.fillText('Amplitude vs Time Graph', width / 2, margin / 2);

    // Add axis labels
    ctx3.fillStyle = '#000';
    ctx3.font = '10px Arial';

    // X-axis label
    ctx3.fillText('Time (s)', width / 2, height - margin / 4 -10);

    // Y-axis label
    ctx3.save();
    ctx3.translate(margin / 4, height / 2);
    ctx3.rotate(-Math.PI / 2);
    ctx3.fillText('Amplitude', 0, 0);
    ctx3.restore();

    // Add tick marks and labels
    ctx3.font = '10px Arial';
    ctx3.textAlign = 'center';
    ctx3.textBaseline = 'middle';

    // X-axis ticks
    let dummy = 1;
    let dummyNan = 0;
    for (let x = margin; x <= width - margin; x += graphWidth / 10) {
        var timeLabel = ((x - margin) / graphWidth * maxTime).toFixed(1);
        if (timeLabel == '-Infinity') {
            timeLabel = dummy;
            dummy += 1;
        }
        if (timeLabel == 'NaN') {
            timeLabel = dummyNan;
        }

        ctx3.beginPath();
        ctx3.moveTo(x, height - margin - 5);
        ctx3.lineTo(x, height - margin + 5);
        ctx3.stroke();
        ctx3.fillText(timeLabel, x, height - margin + 15);
    }

    // Y-axis ticks
    ctx3.textAlign = 'right';
    dummy = 10;
    dummyNan = 10
    for (let y = margin; y <= height - margin; y += graphHeight / 10) {
        var amplitudeLabel = ((maxAmplitude * (height - margin - y)) / graphHeight).toFixed(2);
        if (amplitudeLabel == '-Infinity') {
            amplitudeLabel = dummy;
            dummy -= 1;
        }
        if (amplitudeLabel == 'NaN') {
            amplitudeLabel = dummyNan;
            dummyNan -= 1;
        }
        ctx3.beginPath();
        ctx3.moveTo(margin - 5, y);
        ctx3.lineTo(margin + 5, y);
        ctx3.stroke();
        ctx3.fillText(amplitudeLabel, margin - 10, y);
    }

    // Plot Total Energy
    ctx3.strokeStyle = '#e74c3c'; // Red for Total Energy
    ctx3.lineWidth = 2;
    ctx3.beginPath();
    for (let i = 0; i < amplitudeValues.length; i++) {
        const x = margin + (timeValues[i] / maxTime) * graphWidth;
        const y = height - margin - (amplitudeValues[i] / maxAmplitude) * graphHeight;
        if (i === 0) {
            ctx3.moveTo(x, y);
        } else {
            ctx3.lineTo(x, y);
        }
    }
    ctx3.stroke();
}




let peakTimes = [];
let timeValues = [];
let displacementValues = [];
let amplitudeValues = [];



function updateSystem (time) {

    const totalTime = 5; // Total simulation time

    // Validate input values
    if (!inputValues || typeof inputValues !== 'object') throw new Error("Invalid input values.");
    let { mass, k, c, x_0, v_0 } = inputValues;

    if (mass <= 0 || k <= 0) throw new Error("Mass and stiffness must be positive values.");
    if (typeof c !== 'number' || typeof x_0 !== 'number' || typeof v_0 !== 'number') throw new Error("Invalid input types.");

    let x = x_0;
    let v = v_0;

    let omega_n = Math.sqrt(k / mass); // Natural frequency
    let zeta = c / (2 * Math.sqrt(mass * k)); // Damping ratio



    try {
        if (time > totalTime){
            getElement('showObservationsBtn').hidden = false;
            getElement('download-graph').hidden =false
            generateObservations()
            populateTable();
            stopAnimation()
        }

        // Displacement calculation based on damping ratio
        if (c === 0) {
            // Undamped system (SHM)
            x = x_0 * Math.cos(omega_n * time) + (v_0 / omega_n) * Math.sin(omega_n * time);
        } else if (zeta < 1) {
            // Underdamped case
            let omega_d = omega_n * Math.sqrt(1 - zeta ** 2);
            let A = Math.sqrt(x_0 ** 2 + (v_0 / omega_d) ** 2);
            let phi = Math.atan2(v_0, omega_d * x_0);
            x = A * Math.exp(-zeta * omega_n * time) * Math.cos(omega_d * time + phi);
        } else if (zeta === 1) {
            // Critically damped
            x = (x_0 + (v_0 + omega_n * x_0) * time) * Math.exp(-omega_n * time);
        } else {
            // Overdamped
            let alpha1 = -zeta * omega_n + omega_n * Math.sqrt(zeta ** 2 - 1);
            let alpha2 = -zeta * omega_n - omega_n * Math.sqrt(zeta ** 2 - 1);
            let C1 = (v_0 - alpha2 * x_0) / (alpha1 - alpha2);
            let C2 = (v_0 - alpha1 * x_0) / (alpha2 - alpha1);
            x = C1 * Math.exp(alpha1 * time) + C2 * Math.exp(alpha2 * time);
        }

        // Store values for plotting
        timeValues.push(time);
        displacementValues.push(x);

        let amplitude;
        if (zeta < 1) {
            let omega_d = omega_n * Math.sqrt(1 - zeta * zeta);
            let A = Math.sqrt(x_0 ** 2 + ((v_0 + zeta * omega_n * x_0) / omega_d) ** 2);
            let phi = Math.atan2(v_0 + zeta * omega_n * x_0, omega_d * x_0);
            x = A * Math.exp(-zeta * omega_n * time) * Math.cos(omega_d * time - phi);
            amplitude = A * Math.exp(-zeta * omega_n * time);
        } else {
            amplitude = Math.abs(x);
        }
        amplitudeValues.push(amplitude);

        // Visualization
        drawSetup(x * 100);
        drawDisplacementGraph(displacementValues, timeValues);
        if (amplitude > 0) drawAmplitudeGraph(amplitudeValues, timeValues);




    } catch (error) {
        console.error("Error in update function:", error.message);
    }
}



// Function to display the formulae modal
function showFormulaeModal() {
    const modal = document.getElementById('formulaeModal');
    const formulaeList = document.getElementById('formulaeList');
    
    // List of provided formulae
    const formulae = [
        "1. <strong>Equation of Motion</strong><br>" +
        "   <em>Formula:</em> mẍ + cẋ + kx = 0<br>" +
        "   <em>Where:</em><br>" +
        "   - m = Mass of the system (kg)<br>" +
        "   - c = Damping coefficient (Ns/m)<br>" +
        "   - k = Stiffness of the spring (N/m)<br>" +
        "   - x = Displacement of the mass (m)<br>" +
        "   - ẋ = Velocity (m/s)<br>" +
        "   - ẍ = Acceleration (m/s²)",
    
        "2. <strong>Undamped Natural Frequency</strong> (ωₙ)<br>" +
        "   <em>Formula:</em> ωₙ = √(k / m)<br>" +
        "   <em>Where:</em><br>" +
        "   - k = Stiffness of the spring (N/m)<br>" +
        "   - m = Mass of the system (kg)",
    
        "3. <strong>Damping Ratio</strong> (ζ)<br>" +
        "   <em>Formula:</em> ζ = c / (2 × √(m × k))<br>" +
        "   <em>Where:</em><br>" +
        "   - c = Damping coefficient (Ns/m)<br>" +
        "   - m = Mass of the system (kg)<br>" +
        "   - k = Stiffness of the spring (N/m)",
    
        "4. <strong>Damped Natural Frequency</strong> (ω<sub>d</sub>)<br>" +
        "   <em>Formula:</em> ω<sub>d</sub> = ωₙ × √(1 - ζ²)<br>" +
        "   <em>Where:</em><br>" +
        "   - ωₙ = Undamped natural frequency (rad/s)<br>" +
        "   - ζ = Damping ratio",
    
        "5. <strong>General Solution for Displacement</strong> (Underdamped, ζ < 1)<br>" +
        "   <em>Formula:</em> x(t) = e<sup>-ζωₙt</sup> × (A cos(ω<sub>d</sub>t) + B sin(ω<sub>d</sub>t))<br>" +
        "   <em>Where:</em><br>" +
        "   - A, B = Constants determined from initial conditions<br>" +
        "   - t = Time (s)<br>" +
        "   - ω<sub>d</sub> = Damped natural frequency (rad/s)",
    
        "6. <strong>Logarithmic Decrement</strong> (δ)<br>" +
        "   <em>Formula:</em> δ = (1/n) × ln(x<sub>i</sub> / x<sub>i+n</sub>)<br>" +
        "   <em>Where:</em><br>" +
        "   - x<sub>i</sub> = Amplitude at i-th cycle<br>" +
        "   - x<sub>i+n</sub> = Amplitude after n cycles<br>" +
        "   - n = Number of cycles",
    
        "7. <strong>Critical Damping Coefficient</strong> (c<sub>c</sub>)<br>" +
        "   <em>Formula:</em> c<sub>c</sub> = 2 × √(m × k)<br>" +
        "   <em>Where:</em><br>" +
        "   - m = Mass of the system (kg)<br>" +
        "   - k = Stiffness of the spring (N/m)",
    
        "8. <strong>Overdamped System Response</strong> (ζ > 1)<br>" +
        "   <em>Formula:</em> x(t) = C<sub>1</sub> e<sup>r₁t</sup> + C<sub>2</sub> e<sup>r₂t</sup><br>" +
        "   <em>Where:</em><br>" +
        "   - r₁, r₂ = Roots of the characteristic equation (-ζωₙ ± ωₙ√(ζ² - 1))<br>" +
        "   - C<sub>1</sub>, C<sub>2</sub> = Constants determined from initial conditions",
    
        "9. <strong>Critically Damped System Response</strong> (ζ = 1)<br>" +
        "   <em>Formula:</em> x(t) = (C<sub>1</sub> + C<sub>2</sub>t) e<sup>-ωₙt</sup><br>" +
        "   <em>Where:</em><br>" +
        "   - C<sub>1</sub>, C<sub>2</sub> = Constants determined from initial conditions",
    
        "10. <strong>Energy Dissipation per Cycle</strong> (ΔE)<br>" +
        "   <em>Formula:</em> ΔE = 2πζE<sub>total</sub><br>" +
        "   <em>Where:</em><br>" +
        "   - ζ = Damping ratio<br>" +
        "   - E<sub>total</sub> = Total mechanical energy in the system"
    ];
    
      
  
    // Generate HTML for the formulae
    formulaeList.innerHTML = formulae.map(f => `<li>${f}</li>`).join('');
  
    // Show the modal
    modal.style.display = 'block';
  }
  
  // Close the formulae modal when the close button is clicked
  document.getElementById('closeFormulaeModal').onclick = function() {
    document.getElementById('formulaeModal').style.display = 'none';
  }
  
  // Close the modal if the user clicks outside of it
  window.onclick = function(event) {
    const formulaeModal = document.getElementById('formulaeModal');
    if (event.target === formulaeModal) {
      formulaeModal.style.display = 'none';
    }
  }




  const showObservationsBtn = document.getElementById("showObservationsBtn");
  const resultsModal = document.getElementById("resultsModal");
  const closeResultsModal = document.getElementById("closeResultsModal");
  const resultsTableContainer = document.getElementById("resultsTableContainer");
  
  // Sample observation data
//   const observations = [
//       { sn: 1, mass: 5, stiffness: 200, period: 1.41, frequency: 4.44, dampingRatio: 0.05 },
//       { sn: 2, mass: 10, stiffness: 500, period: 0.89, frequency: 7.07, dampingRatio: 0.02 },
//       { sn: 3, mass: 3, stiffness: 100, period: 1.73, frequency: 3.63, dampingRatio: 0.07 }
//   ];


  let observations = [];

  function generateObservations(){

    let { mass, k, c, x_0, v_0 } = inputValues;

    let omega_n = Math.sqrt(k / mass); // Natural frequency
    let zeta = c / (2 * Math.sqrt(mass * k)); // Damping ratio
    let timePeriod = (Math.PI * 2) / omega_n; // Time period


      var result ={
        sn:1,
        mass: inputValues.mass,
        stiffness: inputValues.k,
        period: timePeriod.toFixed(3),
        frequency: omega_n.toFixed(3),
        dampingRatio: zeta.toFixed(3)

      }

      observations.push(result)
  }

  // Function to populate table
  function populateTable() {
      let tableHTML = `<table border='1'>
          <tr>
              <th>S.N.</th>
              <th>Mass (m)</th>
              <th>Stiffness (k)</th>
              <th>Time Period (T)</th>
              <th>Natural Frequency (𝝎𝒏)</th>
              <th>Damping Ratio (ζ)</th>
          </tr>`;
      
      observations.forEach(obs => {
          tableHTML += `<tr>
              <td>${obs.sn}</td>
              <td>${obs.mass} kg</td>
              <td>${obs.stiffness} N/m</td>
              <td>${obs.period} s</td>
              <td>${obs.frequency} rad/s</td>
              <td>${obs.dampingRatio}</td>
          </tr>`;
      });
      
      tableHTML += `</table>`;
      resultsTableContainer.innerHTML = tableHTML;
  }

  // Show modal on button click
  showObservationsBtn.addEventListener("click", function () {
      resultsModal.style.display = "block";
  });

  // Close modal on close button click
  closeResultsModal.addEventListener("click", function () {
      resultsModal.style.display = "none";
  });

  // Close modal if user clicks outside the modal content
  window.addEventListener("click", function (event) {
      if (event.target === resultsModal) {
          resultsModal.style.display = "none";
      }
  });

  // Function to download results as CSV
  function downloadResults() {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "S.N.,Mass (m),Stiffness (k),Time Period (T),Natural Frequency (𝝎𝒏),Damping Ratio (ζ)\n";
      
      observations.forEach(obs => {
          csvContent += `${obs.sn},${obs.mass},${obs.stiffness},${obs.period},${obs.frequency},${obs.dampingRatio}\n`;
      });
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "observations.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }

  document.getElementById("download-btn").addEventListener("click", downloadResults);


  document.getElementById('download-graph').addEventListener('click', function () {

    function getImageWithWhiteBG(canvas) {
        const tempCanvas = document.createElement('canvas');
        const ctx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;

        // Fill background with white
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        // Draw the original canvas on top
        ctx.drawImage(canvas, 0, 0);

        return tempCanvas.toDataURL('image/png');
    }

    const imageUrl1 = getImageWithWhiteBG(canvas2);
    const imageUrl2 = getImageWithWhiteBG(canvas3);

    // Create and trigger downloads
    const link1 = document.createElement('a');
    const link2 = document.createElement('a');

    link1.href = imageUrl1;
    link1.download = 'displacement_graph.png';

    link2.href = imageUrl2;
    link2.download = 'amplitude_graph.png';

    link1.click();
    link2.click();
});




    














  let animationFrameId;
  let isAnimating = false;
  let startTime = 0;
  let elapsedTime = 0;
  let previousTime = 0;







  const giveAlert = () => {
    window.alert("Lock the values first")
}


  function updateTimer() {
    const currentTime = (performance.now() - startTime) / 1000; // Time in seconds
    setText("stopwatch", `Time: ${currentTime.toFixed(2)}s`);
}




  function stopAnimation() {
 
    if (isAnimating) {
        isAnimating = false;
        cancelAnimationFrame(animationFrameId);
        const currentTime = (performance.now() - startTime) / 1000; // Time in seconds
        elapsedTime = currentTime; // Save elapsed time
    }
}



  function animate(timestamp) {
    if (previousTime === 0) previousTime = timestamp;
    const deltaTime = (timestamp - previousTime) / 1000; // Time in seconds
    previousTime = timestamp;

    const currenttime = (performance.now() - startTime) / 1000;

    if (isAnimating) {
        updateSystem(currenttime);
        updateTimer();
        animationFrameId = requestAnimationFrame(animate);
    }
}



  function startAnimation() {
    if (!lockButton.checked) {
        giveAlert()
        return
    }
    if (!isAnimating) {
        startTime = performance.now() - elapsedTime * 1000; // Continue from where it was left
        previousTime = 0; // Reset the previous time
        isAnimating = true;
        animationFrameId = requestAnimationFrame(animate);
    }
}



 function resetAnimation (){
    stopAnimation();
    timeValues = [];
    displacementValues = [];
    amplitudeValues = [];
    drawSetup(inputValues.x_0 * 100);
    drawDisplacementGraph(displacementValues, timeValues);
    drawAmplitudeGraph(amplitudeValues, timeValues);
    setText("stopwatch", "Time: 0.00s");
    elapsedTime = 0;
    previousTime = 0;
    startTime = 0;




    getElement('mass').value = 1;
    getElement('stiffness').value = 100;
    getElement('damping').value = 0;
    getElement('displacement').value = 0.05;
    getElement('velocity').value = 0;

    getElement('mass_value').innerText = 1;
    getElement('stiffness_value').innerText = 100;
    getElement('damping_value').innerText= 0;
    getElement('displacement_value').innerText = 0.05;
    getElement('velocity_value').innerText = 0;



    getElement('showObservationsBtn').hidden = true;
    getElement('download-graph').hidden = true

    
    getElement('lock_button').disabled = false;


    inputValues = {
        mass: 1,  // kg
        k: 100,      // N/m (spring constant)
        c: 0,       // Ns/m (damping coefficient
        x_0: 0.05,  // Initial displacement (meters)
        v_0: 0      // Initial velocity (m/s)
    };


    observations = []




    getElement('mass').disabled = false;
    getElement('stiffness').disabled = false;
    getElement('damping').disabled = false;
    getElement('displacement').disabled = false;
    getElement('velocity').disabled = false;
    lockButton.checked = false;



 }








  playButton.addEventListener("click", startAnimation);
  pauseButton.addEventListener("click", stopAnimation);
  resetButton.addEventListener("click", resetAnimation);


drawSetup(inputValues.x_0 * 100);
drawDisplacementGraph(displacementValues, timeValues);
drawAmplitudeGraph(amplitudeValues, timeValues);

