document.addEventListener("DOMContentLoaded", function () {
  const ingredientTable = document.getElementById("ingredientTable");
  const addButton = document.getElementById("addButton");
  const ingredientInput = document.getElementById("ingredient");
  const quantityUsedInput = document.getElementById("quantityUsed");
  const unitSelectUsed = document.getElementById("unitSelectUsed");
  const quantityPurchasedInput = document.getElementById("quantityPurchased");
  const unitSelectPurchased = document.getElementById("unitSelectPurchased");
  const totalCostInput = document.getElementById("totalCost");
  const totalCostDisplay = document.getElementById("totalCostDisplay");
  
  const unitConversions = {
    "ml": 1,
    "L": 1000,
    "oz": 29.5735,
    "lbs": 453.592,
    "g": 1,
    "kg": 1000,
  };
  
  let totalCostPerCocktail = 0;

  addButton.addEventListener("click", function () {
    const ingredient = ingredientInput.value;
    const quantityUsed = parseFloat(quantityUsedInput.value);
    const unitUsed = unitSelectUsed.value;
    const quantityPurchased = parseFloat(quantityPurchasedInput.value);
    const unitPurchased = unitSelectPurchased.value;
    const totalCost = parseFloat(totalCostInput.value);
    
    if (!ingredient || isNaN(quantityUsed) || isNaN(quantityPurchased) || isNaN(totalCost)) {
      return;
    }
    
    const convertedQuantityUsed = quantityUsed * unitConversions[unitUsed];
    const convertedQuantityPurchased = quantityPurchased * unitConversions[unitPurchased];
    
    const costPerUnit = totalCost / convertedQuantityPurchased;
    const costPerCocktail = costPerUnit * convertedQuantityUsed;
    
    const row = ingredientTable.insertRow(-1);
    const ingredientCell = row.insertCell(0);
    const costPerCocktailCell = row.insertCell(1);
    const amountUsedCell = row.insertCell(2);
    const actionsCell = row.insertCell(3);
    
    ingredientCell.textContent = ingredient;
    costPerCocktailCell.textContent = "$" + costPerCocktail.toFixed(2);
    amountUsedCell.textContent = quantityUsed.toFixed(2) + " " + unitUsed;
    actionsCell.innerHTML = '<button class="remove-button">Remove</button>';
    
    totalCostPerCocktail += costPerCocktail;
    totalCostDisplay.textContent = "Total Cost per Cocktail: $" + totalCostPerCocktail.toFixed(2);
    
    ingredientInput.value = "";
    quantityUsedInput.value = "";
    unitSelectUsed.value = "ml";
    quantityPurchasedInput.value = "";
    unitSelectPurchased.value = "ml";
    totalCostInput.value = "";
    
    // Add event listener to remove button
    const removeButton = row.querySelector(".remove-button");
    removeButton.addEventListener("click", function () {
      ingredientTable.deleteRow(row.rowIndex);
      totalCostPerCocktail -= costPerCocktail;
      totalCostDisplay.textContent = "Total Cost per Cocktail: $" + totalCostPerCocktail.toFixed(2);
    });
  });
});
