import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { FaCreditCard, FaHome, FaTruck, FaCheckCircle, FaMobileAlt, FaPlus, FaTrash, FaPencilAlt, FaCheck } from "react-icons/fa";

const CheckoutPage = () => {
  const { cart, totalPrice } = useContext(CartContext);
  const [success, setSuccess] = useState(false);
  const COD_CHARGE = 50;

  // Address Management
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    id: null,
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    isDefault: false,
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    id: null,
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
    isDefault: false,
  });

  const [savedUPIs, setSavedUPIs] = useState([]);
  const [selectedUPIId, setSelectedUPIId] = useState(null);
  const [showUPIForm, setShowUPIForm] = useState(false);
  const [newUPI, setNewUPI] = useState({
    id: null,
    upiId: "",
    upiProvider: "googlePay",
    isDefault: false,
  });

  const UPI_PROVIDERS = [
    { id: "googlePay", label: "Google Pay", color: "bg-blue-100" },
    { id: "phonePe", label: "PhonePe", color: "bg-purple-100" },
    { id: "bhim", label: "BHIM", color: "bg-orange-100" },
    { id: "paytm", label: "Paytm", color: "bg-blue-50" },
  ];

  const tax = Math.floor(totalPrice * 0.18);
  const deliveryCharge = paymentMethod === "cod" ? COD_CHARGE : 0;
  const finalTotal = totalPrice + tax + deliveryCharge;

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedAddressesData = JSON.parse(localStorage.getItem("addresses")) || [];
      const savedCardsData = JSON.parse(localStorage.getItem("savedCards")) || [];
      const savedUPIsData = JSON.parse(localStorage.getItem("savedUPIs")) || [];

      setAddresses(savedAddressesData);
      setSavedCards(savedCardsData);
      setSavedUPIs(savedUPIsData);

      if (savedAddressesData.length > 0) {
        const defaultAddr = savedAddressesData.find((a) => a.isDefault);
        setSelectedAddressId(defaultAddr?.id || savedAddressesData[0].id);
      }

      if (savedCardsData.length > 0) {
        const defaultCard = savedCardsData.find((c) => c.isDefault);
        setSelectedCardId(defaultCard?.id || savedCardsData[0].id);
      }

      if (savedUPIsData.length > 0) {
        const defaultUPI = savedUPIsData.find((u) => u.isDefault);
        setSelectedUPIId(defaultUPI?.id || savedUPIsData[0].id);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  // Address Management Functions
  const handleAddAddress = () => {
    const id = Date.now();
    const addressToSave = { ...newAddress, id };
    const updatedAddresses = [...addresses, addressToSave];
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setSelectedAddressId(id);
    setNewAddress({
      id: null,
      name: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      isDefault: false,
    });
    setShowAddressForm(false);
  };

  const handleEditAddress = (id) => {
    const address = addresses.find((a) => a.id === id);
    setNewAddress(address);
    setEditingAddressId(id);
    setShowAddressForm(true);
  };

  const handleUpdateAddress = () => {
    const updatedAddresses = addresses.map((a) =>
      a.id === editingAddressId ? newAddress : a
    );
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setEditingAddressId(null);
    setNewAddress({
      id: null,
      name: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      isDefault: false,
    });
    setShowAddressForm(false);
  };

  const handleDeleteAddress = (id) => {
    const updatedAddresses = addresses.filter((a) => a.id !== id);
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    if (selectedAddressId === id) {
      setSelectedAddressId(updatedAddresses.length > 0 ? updatedAddresses[0].id : null);
    }
  };

  // Card Management Functions
  const handleAddCard = () => {
    const id = Date.now();
    const cardToSave = { ...cardInfo, id };
    const updatedCards = [...savedCards, cardToSave];
    setSavedCards(updatedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedCards));
    setSelectedCardId(id);
    setCardInfo({
      id: null,
      cardNumber: "",
      expiry: "",
      cvv: "",
      nameOnCard: "",
      isDefault: false,
    });
    setShowCardForm(false);
  };

  const handleDeleteCard = (id) => {
    const updatedCards = savedCards.filter((c) => c.id !== id);
    setSavedCards(updatedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedCards));
    if (selectedCardId === id) {
      setSelectedCardId(updatedCards.length > 0 ? updatedCards[0].id : null);
    }
  };

  // UPI Management Functions
  const handleAddUPI = () => {
    const id = Date.now();
    const upiToSave = { ...newUPI, id };
    const updatedUPIs = [...savedUPIs, upiToSave];
    setSavedUPIs(updatedUPIs);
    localStorage.setItem("savedUPIs", JSON.stringify(updatedUPIs));
    setSelectedUPIId(id);
    setNewUPI({
      id: null,
      upiId: "",
      upiProvider: "googlePay",
      isDefault: false,
    });
    setShowUPIForm(false);
  };

  const handleDeleteUPI = (id) => {
    const updatedUPIs = savedUPIs.filter((u) => u.id !== id);
    setSavedUPIs(updatedUPIs);
    localStorage.setItem("savedUPIs", JSON.stringify(updatedUPIs));
    if (selectedUPIId === id) {
      setSelectedUPIId(updatedUPIs.length > 0 ? updatedUPIs[0].id : null);
    }
  };

  const isCardValid = () => {
    return (
      cardInfo.cardNumber.replace(/\s+/g, "").length === 16 &&
      /^[0-9]{2}\/[0-9]{2}$/.test(cardInfo.expiry) &&
      /^[0-9]{3,4}$/.test(cardInfo.cvv) &&
      cardInfo.nameOnCard.trim().length > 0
    );
  };

  const handlePlaceOrder = () => {
    // Validate address selection
    if (!selectedAddressId) {
      alert("Please select or add a delivery address.");
      return;
    }

    // Validate payment method
    if (paymentMethod === "card") {
      if (!selectedCardId && !isCardValid()) {
        alert("Please select a saved card or add a new valid card.");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!selectedUPIId) {
        alert("Please select a saved UPI ID.");
        return;
      }
    }

    // Proceed with order
    setSuccess(true);
    setTimeout(() => {
      // Reset after 2 seconds
      setSuccess(false);
      window.location.href = "/";
    }, 3000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 px-4">
        <div className="text-center">
          <FaCheckCircle className="text-green-600 text-8xl mb-6 mx-auto animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
            🎉 Order Placed Successfully!
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-2">
            Thank you for shopping with us.
          </p>
          <p className="text-gray-600">Your order will be delivered soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SECTION - Delivery & Payment */}
          <div className="lg:col-span-2 space-y-6">

            {/* DELIVERY ADDRESS SECTION */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900">
                  <FaHome className="text-blue-600" /> Delivery Address
                </h2>
                <button
                  onClick={() => {
                    setShowAddressForm(true);
                    setEditingAddressId(null);
                    setNewAddress({
                      id: null,
                      name: "",
                      phone: "",
                      address: "",
                      city: "",
                      pincode: "",
                      isDefault: false,
                    });
                  }}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FaPlus size={14} /> Add New Address
                </button>
              </div>

              {/* Saved Addresses */}
              {addresses.length > 0 && (
                <div className="space-y-3 mb-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition ${
                        selectedAddressId === addr.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{addr.name}</h3>
                          <p className="text-sm text-gray-600">{addr.phone}</p>
                          <p className="text-sm text-gray-600">{addr.address}</p>
                          <p className="text-sm text-gray-600">
                            {addr.city} - {addr.pincode}
                          </p>
                          {addr.isDefault && (
                            <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              Default Address
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAddress(addr.id);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded transition"
                          >
                            <FaPencilAlt size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(addr.id);
                            }}
                            className="p-2 text-red-600 hover:bg-red-100 rounded transition"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add/Edit Address Form */}
              {showAddressForm && (
                <div className="border-t pt-6 space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    {editingAddressId ? "Edit Address" : "Add New Address"}
                  </h3>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Full Address"
                    rows="2"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={newAddress.isDefault}
                      onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">Set as default address</span>
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={editingAddressId ? handleUpdateAddress : handleAddAddress}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                      {editingAddressId ? "Update Address" : "Add Address"}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddressForm(false);
                        setEditingAddressId(null);
                        setNewAddress({
                          id: null,
                          name: "",
                          phone: "",
                          address: "",
                          city: "",
                          pincode: "",
                          isDefault: false,
                        });
                      }}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* PAYMENT METHOD SECTION */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                <FaCreditCard className="text-green-600" /> Payment Method
              </h2>

              <div className="flex flex-col md:flex-row gap-3 mb-6">
                {[
                  { id: "card", label: "Debit/Credit Card", icon: FaCreditCard },
                  { id: "upi", label: "UPI", icon: FaMobileAlt },
                  { id: "cod", label: "Cash on Delivery", icon: FaTruck },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setPaymentMethod(id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition font-semibold ${
                      paymentMethod === id
                        ? "border-green-600 bg-green-50 text-green-700"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                ))}
              </div>

              {/* CARD PAYMENT */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  {savedCards.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-900">Saved Cards</h3>
                      <div className="space-y-2 mb-4">
                        {savedCards.map((card) => (
                          <div
                            key={card.id}
                            onClick={() => setSelectedCardId(card.id)}
                            className={`p-4 border rounded-lg cursor-pointer transition flex items-center justify-between ${
                              selectedCardId === card.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <FaCreditCard className="text-gray-600" size={20} />
                              <div>
                                <p className="font-semibold text-gray-900">{card.nameOnCard}</p>
                                <p className="text-sm text-gray-600">
                                  •••• •••• •••• {card.cardNumber.slice(-4)}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCard(card.id);
                              }}
                              className="p-2 text-red-600 hover:bg-red-100 rounded transition"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setShowCardForm(!showCardForm);
                      if (!showCardForm) {
                        setCardInfo({
                          id: null,
                          cardNumber: "",
                          expiry: "",
                          cvv: "",
                          nameOnCard: "",
                          isDefault: false,
                        });
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                  >
                    <FaPlus size={14} /> {savedCards.length > 0 ? "Add Another Card" : "Add Card"}
                  </button>

                  {showCardForm && (
                    <div className="border-t pt-4 space-y-4">
                      <h3 className="font-semibold text-gray-900">Add New Card</h3>
                      <input
                        type="text"
                        placeholder="Card Number (16 digits)"
                        maxLength="19"
                        value={cardInfo.cardNumber}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\s/g, "");
                          val = val.replace(/(\d{4})/g, "$1 ").trim();
                          setCardInfo({ ...cardInfo, cardNumber: val });
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength="5"
                          value={cardInfo.expiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "");
                            if (val.length >= 2) {
                              val = val.slice(0, 2) + "/" + val.slice(2, 4);
                            }
                            setCardInfo({ ...cardInfo, expiry: val });
                          }}
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          maxLength="4"
                          value={cardInfo.cvv}
                          onChange={(e) =>
                            setCardInfo({ ...cardInfo, cvv: e.target.value.replace(/\D/g, "") })
                          }
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Name on Card"
                        value={cardInfo.nameOnCard}
                        onChange={(e) => setCardInfo({ ...cardInfo, nameOnCard: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={cardInfo.isDefault}
                          onChange={(e) => setCardInfo({ ...cardInfo, isDefault: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-gray-700">Save this card for future purchases</span>
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={handleAddCard}
                          disabled={!isCardValid()}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold transition"
                        >
                          Save Card
                        </button>
                        <button
                          onClick={() => {
                            setShowCardForm(false);
                            setCardInfo({
                              id: null,
                              cardNumber: "",
                              expiry: "",
                              cvv: "",
                              nameOnCard: "",
                              isDefault: false,
                            });
                          }}
                          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* UPI PAYMENT */}
              {paymentMethod === "upi" && (
                <div className="space-y-4">
                  {savedUPIs.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-900">Saved UPI IDs</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {savedUPIs.map((upi) => {
                          const provider = UPI_PROVIDERS.find((p) => p.id === upi.upiProvider);
                          return (
                            <div
                              key={upi.id}
                              onClick={() => setSelectedUPIId(upi.id)}
                              className={`p-4 border rounded-lg cursor-pointer transition ${
                                selectedUPIId === upi.id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className={`p-3 rounded ${provider?.color} mb-2 text-center font-semibold text-sm`}>
                                {provider?.label}
                              </div>
                              <p className="text-sm text-gray-600">{upi.upiId}</p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteUPI(upi.id);
                                }}
                                className="mt-2 w-full p-2 text-red-600 hover:bg-red-100 rounded transition text-sm"
                              >
                                <FaTrash size={12} /> Remove
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setShowUPIForm(!showUPIForm);
                      if (!showUPIForm) {
                        setNewUPI({
                          id: null,
                          upiId: "",
                          upiProvider: "googlePay",
                          isDefault: false,
                        });
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                  >
                    <FaPlus size={14} /> {savedUPIs.length > 0 ? "Add Another UPI" : "Add UPI ID"}
                  </button>

                  {showUPIForm && (
                    <div className="border-t pt-4 space-y-4">
                      <h3 className="font-semibold text-gray-900">Add UPI ID</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select UPI Provider
                        </label>
                        <select
                          value={newUPI.upiProvider}
                          onChange={(e) => setNewUPI({ ...newUPI, upiProvider: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          {UPI_PROVIDERS.map((provider) => (
                            <option key={provider.id} value={provider.id}>
                              {provider.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter UPI ID (e.g. yourname@googlepay)"
                        value={newUPI.upiId}
                        onChange={(e) => setNewUPI({ ...newUPI, upiId: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={newUPI.isDefault}
                          onChange={(e) => setNewUPI({ ...newUPI, isDefault: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-gray-700">Save this UPI ID for future purchases</span>
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={handleAddUPI}
                          disabled={newUPI.upiId.trim() === ""}
                          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold transition"
                        >
                          Save UPI ID
                        </button>
                        <button
                          onClick={() => {
                            setShowUPIForm(false);
                            setNewUPI({
                              id: null,
                              upiId: "",
                              upiProvider: "googlePay",
                              isDefault: false,
                            });
                          }}
                          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* COD PAYMENT */}
              {paymentMethod === "cod" && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-900 font-semibold mb-2">✓ Cash on Delivery Selected</p>
                  <p className="text-blue-800 text-sm">
                    You will pay ₹{finalTotal} in cash when your order arrives. A delivery charge of ₹{COD_CHARGE} will be added.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SECTION - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-fit sticky top-20 hover:shadow-lg transition">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                <FaTruck /> Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-600 py-4">Your cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ₹{item.price} × {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          ₹{parseInt(item.price) * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t space-y-3 pt-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>GST (18%)</span>
                  <span className="font-semibold">₹{tax}</span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Charge (COD)</span>
                    <span className="font-semibold">₹{deliveryCharge}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t">
                  <span>Total</span>
                  <span className="text-green-600">₹{finalTotal}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold mt-6 transition transform hover:scale-105 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <FaCheck size={16} /> Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
