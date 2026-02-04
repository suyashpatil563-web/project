function estimateCost() {

  const distance = Number(document.getElementById("distance").value);
  const weight = Number(document.getElementById("weight").value);
  const vehicle = document.getElementById("vehicle").value;

  const loading = document.getElementById("loading");
  const result = document.getElementById("result");

  if (!distance || !weight || !vehicle) {
    alert("Please fill all required fields");
    return;
  }

  loading.classList.remove("hidden");
  result.classList.add("hidden");

  setTimeout(() => {

    let ratePerKm = 0;
    let speed = 0;
    let aiNote = "";

    switch (vehicle) {
      case "mini": ratePerKm = 12; speed = 50; aiNote = "Domestic last-mile delivery."; break;
      case "truck": ratePerKm = 18; speed = 45; aiNote = "Cross-border road freight."; break;
      case "container": ratePerKm = 25; speed = 40; aiNote = "Heavy containerized cargo."; break;
      case "rail": ratePerKm = 8; speed = 60; aiNote = "Efficient inland transport."; break;
      case "sea": ratePerKm = 5; speed = 30; aiNote = "International maritime trade."; break;
      case "air": ratePerKm = 50; speed = 500; aiNote = "Fastest global logistics."; break;
    }

    let baseCost = distance * ratePerKm;
    let extraCost = 0;

    if (vehicle === "air" && weight > 500) {
      extraCost = (weight - 500) * 2;
      aiNote += " Air cargo surcharge applied.";
    } else if (weight > 1000) {
      extraCost = (weight - 1000) * 0.5;
      aiNote += " Heavy cargo surcharge applied.";
    }

    const totalCost = baseCost + extraCost;
    const deliveryTime = (distance / speed).toFixed(2);

    result.innerHTML = `
      <h3>📦 AI Logistics Estimate</h3>
      <p><b>Base Cost:</b> ₹${baseCost.toFixed(2)}</p>
      <p><b>Extra Charges:</b> ₹${extraCost.toFixed(2)}</p>
      <p><b>Total Cost:</b> ₹${totalCost.toFixed(2)}</p>
      <p><b>Delivery Time:</b> ${deliveryTime} hrs</p>
      <p style="color:#00ffea"><i>AI Insight:</i> ${aiNote}</p>
    `;

    loading.classList.add("hidden");
    result.classList.remove("hidden");

  }, 1200);
}
