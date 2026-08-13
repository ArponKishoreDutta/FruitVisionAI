from typing import List, Dict, Tuple, Any
import numpy as np


def predict(model: Any, preprocessed_image: np.ndarray) -> np.ndarray:
    """
    Executes model inference on a preprocessed image tensor (1, 224, 224, 3).
    Returns the prediction output from the model.
    """
    if preprocessed_image.shape != (1, 224, 224, 3):
        raise ValueError(
            f"Expected preprocessed image shape (1, 224, 224, 3), got {preprocessed_image.shape}"
        )
    # Model forward pass (training=False ensures Dropout/Augmentation layers are inactive)
    predictions = model(preprocessed_image, training=False)
    return predictions.numpy() if hasattr(predictions, "numpy") else np.array(predictions)


def extract_probabilities(predictions: np.ndarray) -> np.ndarray:
    """
    Extracts a 1D float NumPy array of class probabilities from model predictions.
    """
    probs = np.squeeze(predictions)
    if probs.ndim != 1:
        raise ValueError(f"Expected 1D probability vector after squeeze, got shape {probs.shape}")
    return probs.astype(np.float64)


def get_predicted_class(probabilities: np.ndarray, class_names: List[str]) -> Tuple[int, str]:
    """
    Determines predicted class index and fruit name using argmax on probability vector.
    """
    if len(probabilities) != len(class_names):
        raise ValueError(
            f"Probabilities length ({len(probabilities)}) does not match class_names length ({len(class_names)})"
        )
    class_idx = int(np.argmax(probabilities))
    class_name = class_names[class_idx]
    return class_idx, class_name


def get_confidence(probabilities: np.ndarray, class_index: int) -> float:
    """
    Retrieves confidence score (probability) for the specified class index.
    """
    if not (0 <= class_index < len(probabilities)):
        raise IndexError(f"class_index {class_index} out of bounds for length {len(probabilities)}")
    return float(probabilities[class_index])


def get_top_3_predictions(
    probabilities: np.ndarray, class_names: List[str]
) -> List[Dict[str, Any]]:
    """
    Extracts Top-3 predictions sorted from highest probability to lowest.
    Returns a list of dicts with keys: 'class_index', 'class_name', and 'confidence'.
    """
    if len(probabilities) != len(class_names):
        raise ValueError(
            f"Probabilities length ({len(probabilities)}) does not match class_names length ({len(class_names)})"
        )

    # Get indices of top 3 highest probabilities sorted descending
    top_indices = np.argsort(probabilities)[::-1][:3]

    top_3 = []
    for idx in top_indices:
        idx_int = int(idx)
        top_3.append(
            {
                "class_index": idx_int,
                "class_name": class_names[idx_int],
                "confidence": float(probabilities[idx_int]),
            }
        )

    return top_3
