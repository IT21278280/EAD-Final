import React, { useState } from "react";

function AddRating({ addRatingModalSetting, handlePageUpdate }) {
  const [productId, setProductId] = useState("");
  const [vendor, setVendor] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleAddRating = () => {
    const newRating = { productId, vendor, rating, comment };

    fetch(`http://localhost:4000/api/rating/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRating),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        handlePageUpdate(); // Refresh the ratings data
        addRatingModalSetting(); // Close the modal
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded p-5 shadow-lg">
        <h2 className="text-lg font-semibold">Add Rating</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Product ID"
            className="border rounded p-2 w-full"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Vendor"
            className="border rounded p-2 w-full"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <input
            type="number"
            placeholder="Rating (1-5)"
            className="border rounded p-2 w-full"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Comment"
            className="border rounded p-2 w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddRating}
          >
            Submit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            onClick={addRatingModalSetting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRating;
