function buy(button) {
  const product = button.closest('.product');

  const itemName = product.getAttribute('item');
  const price = parseFloat(product.getAttribute('price'));
  const stockSpan = product.querySelector('.stock');
  let stock = parseInt(stockSpan.textContent);
  const quantityInput = product.querySelector('.quantity');
  const quantity = parseInt(quantityInput.value);

  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  if (quantity > stock) {
    alert("Not enough stock available!");
    return;
  }

  let totalCost = price * quantity;

  let discount = 0;
  if (quantity > 5) {
    discount = totalCost * 0.10;
    totalCost = totalCost - discount;
  }

  stock -= quantity;
  stockSpan.textContent = stock;
  quantityInput.value = "";

  let payment = prompt(
    `Total cost: $${totalCost.toFixed(2)}${discount > 0 ? " (10% discount applied!)" : ""}\nChoose payment method: Cash or GPay`
  );

  if (!payment) {
    alert("Payment cancelled.");
    stock += quantity;
    stockSpan.textContent = stock;
    return;
  }

  payment = payment.trim().toLowerCase();

  
  if (payment === "cash") {
    alert(`Payment successful!\nYou bought ${quantity} ${itemName}(s) for $${totalCost.toFixed(2)} using CASH.`);
  }

  else if (payment === "gpay") {
    const correctPIN = "1234"; 
    let attempts = 0;
    let verified = false;

    while (attempts < 3) {
      const enteredPIN = prompt(`Enter your GPay PIN (attempt ${attempts + 1} of 3):`);
      if (enteredPIN === null) {
        alert("Payment cancelled.");
        stock += quantity;
        stockSpan.textContent = stock;
        return;
      }
      if (enteredPIN === correctPIN) {
        verified = true;
        break;
      } else {
        alert("Incorrect PIN.");
        attempts++;
      }
    }

    if (verified) {
      alert(`Payment successful!\nYou bought ${quantity} ${itemName}(s) for $${totalCost.toFixed(2)} using GPay.`);
    } else {
      alert("GPay payment failed after 3 incorrect attempts.");
      stock += quantity;
      stockSpan.textContent = stock;
      return;
    }
  } else {
    alert("Invalid payment method. Please choose either Cash or GPay.");
  }
}
