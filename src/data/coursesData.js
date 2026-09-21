// Courses data shared between Presentation and Presenters

export const COURSES_DATA = [
  {
    title: "Model Rocketry 101",
    slides: [
      {
        title: "Introduction to Model Rocketry",
        content: "Model rocketry is a safe and educational hobby involving building and flying small models of real rockets. Today we'll review the physics of solid propellant motors, stability constraints (Center of Pressure vs. Center of Gravity), and multi-stage ignition sequences.",
        visualType: "media",
        associatedAsset: "pm2" // Rocket Video
      },
      {
        title: "Stability: CP vs. CG",
        content: "For a stable flight, the Center of Gravity (CG) must be in front of the Center of Pressure (CP) by at least one body diameter. If CP is in front of CG, the aerodynamic forces will cause the rocket to rotate uncontrollably, resulting in a catastrophic failure.",
        visualType: "diagram",
        diagramStyle: "stability"
      },
      {
        title: "Interactive: Staging & Thrust Simulator",
        content: "Test the physics of staging. Use the control panel to set booster fuel weights. Watch the booster burn, separate at T+2.0s, ignite the upper stage, and deploy the parachute at apogee. Observe the final maximum altitude achieved.",
        visualType: "simulator",
        simId: "rocket-staging"
      }
    ]
  },
  {
    title: "CanSat Telemetry & Sensors",
    slides: [
      {
        title: "What is a CanSat?",
        content: "A CanSat is a simulation of a real satellite integrated within the volume and shape of a regular soft drink can. The challenge is to fit all major sub-systems, such as sensors, transceiver, and battery, in this compact container and launch it.",
        visualType: "media",
        associatedAsset: "pm1" // Layers Diagram
      },
      {
        title: "CanSat Telemetry & RF Channels",
        content: "During descent, the CanSat transmits telemetry packet strings (Time, Temperature, Pressure, Altitude, Voltage) over Radio Frequency (RF) transmitters (typically 433MHz APC220) to a ground station laptop in real time.",
        visualType: "diagram",
        diagramStyle: "telemetry"
      },
      {
        title: "Interactive: Live Telemetry Plotter",
        content: "Connect live to CanSat. Below is a real-time telemetry sensor dashboard plotting Mock Altitude, Air Temperature, and Atmospheric Pressure. Switch toggle to turn on the live stream at 1Hz.",
        visualType: "simulator",
        simId: "cansat-telemetry"
      }
    ]
  },
  {
    title: "Orbital Mechanics & Kepler's Laws",
    slides: [
      {
        title: "Kepler's Laws of Planetary Motion",
        content: "1. The orbit of a planet is an ellipse with the Sun at one of the two foci.\n2. A line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time.\n3. The square of the orbital period is proportional to the cube of the semi-major axis.",
        visualType: "diagram",
        diagramStyle: "kepler"
      },
      {
        title: "Interactive: Gravitational Slingshot",
        content: "Explore gravity assists. A spacecraft is sent on a hyperbolic trajectory near a heavy planet. The planet's gravity captures the craft and flings it out, adding the planet's orbital speed to the craft. Click Launch to trigger.",
        visualType: "simulator",
        simId: "kepler-slingshot"
      }
    ]
  }
];
