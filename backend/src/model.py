import os
from pathlib import Path
import tensorflow as tf
from tensorflow import keras

# backend/src/model.py lives at: <project_root>/backend/src/
# So PROJECT_ROOT is: Path(__file__).parent.parent.parent
BACKEND_SRC_DIR = Path(__file__).resolve().parent   # backend/src/
BACKEND_DIR = BACKEND_SRC_DIR.parent                # backend/
PROJECT_ROOT = BACKEND_DIR.parent                   # <project_root>/
DEFAULT_MODEL_PATH = PROJECT_ROOT / "MobileNetV2_tuned.h5"

EXPECTED_INPUT_SHAPE = (None, 224, 224, 3)
EXPECTED_OUTPUT_SHAPE = (None, 11)
EXPECTED_NUM_CLASSES = 11

_model_instance = None


def validate_model(model: keras.Model) -> None:
    """
    Validates model input shape, output shape, and class count.
    Raises ValueError if validation fails.
    """
    input_shape = model.input_shape
    output_shape = model.output_shape

    if input_shape != EXPECTED_INPUT_SHAPE:
        raise ValueError(
            f"Invalid model input shape: expected {EXPECTED_INPUT_SHAPE}, got {input_shape}"
        )

    if output_shape != EXPECTED_OUTPUT_SHAPE:
        raise ValueError(
            f"Invalid model output shape: expected {EXPECTED_OUTPUT_SHAPE}, got {output_shape}"
        )

    num_classes = output_shape[-1]
    if num_classes != EXPECTED_NUM_CLASSES:
        raise ValueError(
            f"Invalid number of output classes: expected {EXPECTED_NUM_CLASSES}, got {num_classes}"
        )


def load_fruit_model(model_path=None) -> keras.Model:
    """
    Loads and validates the fine-tuned MobileNetV2 Keras model.
    Uses singleton caching so model is loaded once.
    """
    global _model_instance
    if _model_instance is not None:
        return _model_instance

    if model_path is None:
        model_path = DEFAULT_MODEL_PATH
    else:
        model_path = Path(model_path)

    if not model_path.exists():
        raise FileNotFoundError(f"Model file not found at path: {model_path}")

    # Register preprocess_input custom object for Lambda layer deserialization
    custom_objects = {
        'preprocess_input': tf.keras.applications.mobilenet_v2.preprocess_input
    }

    try:
        model = keras.models.load_model(str(model_path), custom_objects=custom_objects, compile=False)
    except Exception as exc:
        raise RuntimeError(f"Failed to load Keras model from {model_path}: {exc}") from exc

    # Perform strict shape and architecture validation
    validate_model(model)

    _model_instance = model
    return _model_instance
