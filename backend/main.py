from contextlib import asynccontextmanager
from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

from src.model import load_fruit_model
from src.preprocessing import preprocess_image
from src.prediction import (
    predict,
    extract_probabilities,
    get_predicted_class,
    get_confidence,
    get_top_3_predictions,
)
from src.fruit_data import (
    CLASS_NAMES,
    FRUIT_METADATA,
    get_fruit_info,
)

# Shared model reference
model = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager to load the model once during application startup.
    """
    global model
    try:
        model = load_fruit_model()
        print("MobileNetV2_tuned.h5 model loaded successfully on startup!")
    except Exception as exc:
        print(f"CRITICAL: Failed to load model on startup: {exc}")
    yield


app = FastAPI(
    title="FruitVision AI API",
    description="REST API for Fruit Image Classification using MobileNetV2",
    version="1.0.0",
    lifespan=lifespan,
)

# Enable CORS for frontend development servers (Vite default: http://localhost:5173)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    """
    Health check endpoint returning backend status and model readiness.
    """
    is_loaded = model is not None
    return {
        "status": "ok" if is_loaded else "error",
        "model_loaded": is_loaded,
    }


@app.post("/predict")
async def predict_fruit(file: UploadFile = File(...)):
    """
    Predicts fruit class from uploaded image file.
    """
    if model is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Model is not loaded or unavailable.",
        )

    # Validate image content type
    if file.content_type and not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File provided is not a valid image.",
        )

    try:
        # Read raw image bytes
        image_bytes = await file.read()
        if not image_bytes:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty.",
            )

        # Preprocess image into (1, 224, 224, 3) float32 tensor
        tensor = preprocess_image(image_bytes)

        # Execute model forward pass
        raw_preds = predict(model, tensor)
        probs = extract_probabilities(raw_preds)

        # Determine top prediction and top 3 probabilities
        pred_idx, pred_name = get_predicted_class(probs, CLASS_NAMES)
        confidence = float(get_confidence(probs, pred_idx))
        top_3_raw = get_top_3_predictions(probs, CLASS_NAMES)

        # Format Top 3 list for API response
        top_predictions = [
            {
                "class_name": item["class_name"],
                "confidence": round(float(item["confidence"]), 4),
            }
            for item in top_3_raw
        ]

        # Retrieve fruit metadata
        fruit_info = get_fruit_info(pred_name)
        nutrition_data = fruit_info["nutrition_per_100g"]

        return {
            "prediction": pred_name,
            "confidence": round(confidence, 4),
            "top_predictions": top_predictions,
            "fruit": {
                "name": fruit_info["name"],
                "scientific_name": fruit_info["scientific_name"],
            },
            "nutrition": {
                "calories": nutrition_data["calories"],
                "carbs": nutrition_data["carbs"],
                "sugar": nutrition_data["sugar"],
                "fiber": nutrition_data["fiber"],
                "protein": nutrition_data["protein"],
                "fat": nutrition_data["fat"],
            },
        }

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred processing the image: {str(exc)}",
        ) from exc
