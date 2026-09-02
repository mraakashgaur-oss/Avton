// ─── Mock Data ─────────────────────────────────────────────────────────────────
window.mockData = {

  assets: [
    {
      id: 'CHG-001',
      name: 'EV Eco Plug Pro 7.4kW AC',
      type: 'AC Level 2 Charger',
      serial: 'EVP-7K-2024-001842',
      location: 'Site A – Basement P1, Bay 03',
      installed: '2024-03-15',
      warrantyYears: 3,
      warrantyExpiry: '2027-03-15',
      firmware: 'v2.4.1',
      status: 'online',
      sessions: 142,
      energyDelivered: '1,874 kWh',
      connector: 'Type 2 (IEC 62196)',
      phases: '1-phase / 32A',
      specs: { maxPower: '7.4 kW', voltage: '230V AC', current: '32A', protection: 'IP54, IK08' }
    },
    {
      id: 'CHG-002',
      name: 'EV Eco Plug DC Fast 60kW',
      type: 'DC Fast Charger',
      serial: 'EVP-60K-2024-005301',
      location: 'Site B – Open Parking, Bay 01',
      installed: '2024-06-01',
      warrantyYears: 3,
      warrantyExpiry: '2027-06-01',
      firmware: 'v3.1.0',
      status: 'online',
      sessions: 89,
      energyDelivered: '3,421 kWh',
      connector: 'CCS2 + CHAdeMO',
      phases: '3-phase / 100A',
      specs: { maxPower: '60 kW', voltage: '200–920V DC', current: '100A DC', protection: 'IP55, IK10' }
    },
    {
      id: 'CHG-003',
      name: 'EV Eco Plug Compact 3.3kW',
      type: 'AC Level 1 Charger',
      serial: 'EVP-3K-2023-009917',
      location: 'Office Fleet – Carport Bay 07',
      installed: '2023-11-20',
      warrantyYears: 2,
      warrantyExpiry: '2025-11-20',
      firmware: 'v1.9.3',
      status: 'offline',
      sessions: 204,
      energyDelivered: '2,012 kWh',
      connector: 'Type 2 (IEC 62196)',
      phases: '1-phase / 16A',
      specs: { maxPower: '3.3 kW', voltage: '230V AC', current: '16A', protection: 'IP44, IK07' }
    }
  ],

  tickets: [
    {
      id: 'TKT-2024-0391',
      asset: 'CHG-003',
      assetName: 'EV Eco Plug Compact 3.3kW',
      category: 'Connectivity Issue',
      description: 'Charger shows offline in dashboard. LED indicator is solid red. Tried power-cycling twice.',
      created: '2024-08-28',
      status: 'resolved',
      steps: [
        { label: 'Received',       time: '2024-08-28 09:14', done: true },
        { label: 'OEM Escalated',  time: '2024-08-28 14:22', done: true },
        { label: 'Resolved',       time: '2024-08-29 11:05', done: true }
      ],
      resolution: 'Firmware rollback to v1.8.7 resolved MQTT broker reconnect loop. Updated to v1.9.3 with fix.'
    },
    {
      id: 'TKT-2024-0458',
      asset: 'CHG-001',
      assetName: 'EV Eco Plug Pro 7.4kW AC',
      category: 'Billing / Meter Issue',
      description: 'Energy meter reading appears to drift by ~3% compared to vehicle onboard computer.',
      created: '2024-09-01',
      status: 'escalated',
      steps: [
        { label: 'Received',      time: '2024-09-01 10:30', done: true },
        { label: 'OEM Escalated', time: '2024-09-01 16:45', done: true, inprog: true },
        { label: 'Resolved',      time: null, done: false }
      ],
      resolution: null
    }
  ],

  chatFAQ: [
    {
      triggers: ['ac','ac charging','ac charger','level 1','level 2','type 2'],
      response: `**AC Charging** uses alternating current from the grid and relies on the car's onboard charger to convert it to DC for the battery.\n\n• **Level 1 (3.3 kW):** Standard 230V/16A socket — adds ~20 km/hr\n• **Level 2 (7.4 kW):** Dedicated 230V/32A circuit — adds ~50 km/hr\n• **3-phase (22 kW):** 3×32A — adds ~130 km/hr (car must support it)\n\n*Best for:* Home, office, and overnight charging.`
    },
    {
      triggers: ['dc','dc fast','ccs','chademo','fast charging','rapid'],
      response: `**DC Fast Charging** bypasses the car's onboard charger and pushes DC directly into the battery pack.\n\n• **60–150 kW:** Commercial/highway chargers — 0→80% in 30–60 min\n• **150–350 kW:** Ultra-rapid (HPC) — 0→80% in 10–20 min\n\n*Connectors:* CCS2 (European standard), CHAdeMO (Japanese), GB/T (China)\n\n⚠️ Frequent DC fast charging may slightly degrade battery longevity over time.`
    },
    {
      triggers: ['kw','kilowatt','power','how fast'],
      response: `**kW (Kilowatt)** = charging *speed*.\n\n| Power | Type | Est. range added/hr |\n|-------|------|--------------------|\n| 3.3 kW | AC L1 | ~20 km |\n| 7.4 kW | AC L2 | ~45 km |\n| 22 kW | AC 3-phase | ~130 km |\n| 60 kW | DC Fast | ~400 km |\n\n*Rule of thumb:* Higher kW = faster charge, but your car/battery must support it.`
    },
    {
      triggers: ['phase','3 phase','single phase','three phase','phase loading'],
      response: `**Phase Loading** refers to how many electrical phases your charger uses:\n\n• **Single-phase (1Ø):** Standard home wiring — up to 7.4 kW\n• **Three-phase (3Ø):** Industrial/commercial wiring — up to 22 kW (AC) or required for DC chargers\n\n**Load balancing** is critical in multi-charger installations to avoid tripping the main breaker or incurring demand charges. EV Eco Plug supports dynamic load management across all units.`
    },
    {
      triggers: ['ocpp','protocol','smart','backend'],
      response: `**OCPP (Open Charge Point Protocol)** is the global standard communication protocol between EV chargers and Charge Point Management Systems (CPMS).\n\nEV Eco Plug supports **OCPP 1.6J** and **OCPP 2.0.1**, enabling:\n• Remote start/stop\n• Real-time energy monitoring\n• Tariff management\n• OTA firmware updates\n• Fault diagnostics`
    },
    {
      triggers: ['offline','not working','red light','not charging','error','fault','fail'],
      response: `Here's a quick **troubleshooting checklist**:\n\n1. **Check LED indicator** — solid red = connectivity fault, flashing = session error\n2. **Power-cycle** the unit (turn off breaker for 30s)\n3. **Check Wi-Fi/LAN** — ensure the charger's network is reachable\n4. **Verify the cable** — reseat the connector on both ends\n5. **Check the app** — session might be locked by another user\n\nIf the issue persists after these steps, raise a support ticket below ↓`
    },
    {
      triggers: ['warranty','guarantee','cover'],
      response: `**EV Eco Plug Warranty:**\n\n• Standard hardware: **3 years** on fast chargers, **2–3 years** on AC units\n• Covers manufacturing defects, controller failures, and connectivity modules\n• **Excludes:** Physical damage, improper installation, voltage surges without SPD\n\nYou can view your warranty status and serial numbers in the **My Assets** section of your portal.`
    }
  ]
};
